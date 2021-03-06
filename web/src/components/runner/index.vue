<template>
  <div>
    <el-form label-width="3em">
      <el-form-item label="环境：" style="width: 250px">
        <el-select v-model="env">
          <el-option v-for="(value, key) in ENV_DOMAIN_MAP" :key="key" :label="value" :value="key"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div style="margin: 10px 0">
      <span class="simple waiting"></span><span>-等待执行</span>&#12288;
      <span class="simple running"></span><span>-执行中</span>&#12288;
      <span class="simple success"></span><span>-执行成功</span>&#12288;
      <span class="simple failed"></span><span>-执行失败</span>
      <span class="simple ignore"></span><span>-不执行</span>
    </div>
    <el-container>
      <el-main class="running-history" :style="{width: '12%', height: height + 'px'}">
        <div v-for="(history, index) of historyList" :key="index" @click="viewHistory(index)" :class="currentIndex === index ? 'selected' : ''">
          <span :class="history.success == null && i * 0 ? 'el-icon-loading' : (history.success ? 'el-icon-circle-check' : 'el-icon-circle-close')"></span>
          <span>{{ `第${index + 1}次运行结果` }}</span>
        </div>
      </el-main>
      <el-aside :style="{width: '58%', height: height + 'px'}" class="runner-container">
        <div class="flow-container" style="position: relative;"></div>
      </el-aside>
      <el-aside :style="{width: '30%', height: height + 'px'}" class="runner-logger">
        <div v-for="(log, index) of logs" :key="index" style="min-height: 20px;">
          <span v-if="log.type === 'json'">
            <v-jsonformatter :json="log.data" :min-height="25"></v-jsonformatter>
          </span>
          <span v-else-if="log.type === 'error'" style="color: red;" v-html="log.data"></span>
          <span v-else v-html="log.data"></span>
        </div>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
import G6 from '@antv/g6'
import { originMockUrl, processParams, mockXhr, saveTestCaseHistorytApi } from '@/config/api/inserv-api'
import { toQueryString, sleep, constructExecutableDataModel, toJsonHtml } from '@/config/utils'
import { ENV_DOMAIN_MAP } from '@/config/mapping'
import insertCss from 'insert-css'

export default {
  props: {
    width: {
      type: Number,
      default: 1000
    },
    height: {
      type: Number,
      default: 618
    },
    finished: {
      type: Function,
      default: () => {}
    },
    prepared: {
      type: Function,
      default: () => {}
    }
  },
  data () {
    return {
      i: 0,
      ENV_DOMAIN_MAP,
      logs: [],
      env: 'testDomain',
      testCaseId: null,
      workflow: {
        nodes: null,
        edges: null
      },
      presetParams: null,
      model: [],
      success: true,
      currentIndex: 0,
      historyList: []
    }
  },
  methods: {
    viewHistory (index) {
      this.currentIndex = index
      const history = this.historyList[index]

      // render
      this.graph.data(history.workflow)
      this.graph.render()

      this.graph.getNodes().forEach(n => {
        this.setState(n, history.statesMap[n.getModel().id])
      })

      this.$set(this, 'logs', history.logs)
    },
    setData (data) {
      if (data.env) {
        this.env = data.env
      }

      if (data.historyList && data.historyList.length > 0) {
        this.$set(this, 'historyList', data.historyList)

        this.viewHistory(0)
      } else {
        this.testCaseId = data.testCaseId
        this.workflow = data.workflow
        this.presetParams = data.presetParams || []

        // render
        this.graph.data(this.workflow)
        this.graph.render()
        this.log('初始化完毕，等待执行')
        this.prepared && this.prepared()
      }
    },
    registerEdge () {
      // lineDash 的差值，可以在后面提供 util 方法自动计算
      const dashArray = [
        [ 0, 1 ],
        [ 0, 2 ],
        [ 1, 2 ],
        [ 0, 1, 1, 2 ],
        [ 0, 2, 1, 2 ],
        [ 1, 2, 1, 2 ],
        [ 2, 2, 1, 2 ],
        [ 3, 2, 1, 2 ],
        [ 4, 2, 1, 2 ]
      ]
      const lineDash = [ 4, 2, 1, 2 ]
      const interval = 9
      G6.registerEdge('running-line', {
        setState (name, value, item) {
          const shape = item.get('keyShape')
          if (name === 'running') {
            if (value) {
              // 后续 G 增加 totalLength 的接口
              const length = shape.getTotalLength()
              let totalArray = []
              for (let i = 0; i < length; i += interval) {
                totalArray = totalArray.concat(lineDash)
              }
              let index = 0
              shape.animate({
                onFrame () {
                  const cfg = {
                    lineDash: dashArray[index].concat(totalArray)
                  }
                  index = (index + 1) % interval
                  return cfg
                },
                repeat: true
              }, 1)
            } else {
              shape.stopAnimate()
              shape.attr('lineDash', null)
            }
          } else if (name === 'selected') {
            if (value) {
              shape.attr('shadowBlur', 5)
            } else {
              shape.attr('shadowBlur', 0)
            }
          }
        }
      }, 'line')
    },
    initGraph () {
      insertCss(`
        .g6-tooltip {
          border: 1px solid #e2e2e2;
          border-radius: 4px;
          font-size: 12px;
          color: #545454;
          background-color: rgba(255, 255, 255, 0.9);
          padding: 10px 8px;
          box-shadow: rgb(174, 174, 174) 0px 0px 10px;
          overflow: auto;
          line-height: 24px;
          max-height: 300px;
        }
      `)

      // 创建graph
      this.graph = new G6.Graph({
        container: this.$el.querySelectorAll('.flow-container')[0],
        width: this.width * 0.6,
        height: this.height,
        // 是否开启画布自适应。开启后图自动适配画布大小。
        // fitView: true,
        // fitViewPadding: 100,
        modes: {
          default: ['drag-node', 'drag-canvas', {
            type: 'tooltip',
            shouldBegin: (e) => {
              return !!e.item.getModel().description
            },
            formatText: (model) => {
              return model.description
            },
            offset: -1
          }],
          zoom: ['zoom-canvas', 'drag-node', 'drag-canvas', 'click-select']
        },
        nodeStateStyles: {
          waiting: {
            radius: 4,
            fill: 'yellow',
            stroke: '#4063ff'
          },
          running: {
            radius: 4,
            fill: 'green',
            stroke: '#4063ff'
          },
          success: {
            radius: 4,
            fill: 'springgreen',
            stroke: '#4063ff'
          },
          failed: {
            radius: 4,
            fill: 'red',
            stroke: '#4063ff'
          },
          ignore: {
            radius: 4,
            fill: 'darkgray',
            stroke: '#4063ff'
          }
        },
        defaultNode: {
          type: 'rect',
          size: [120, 50],
          label: '新增节点',
          style: {
            radius: 4,
            fill: '#fff',
            stroke: '#4063ff'
          }
        },
        defaultEdge: {
          type: 'running-line',
          style: {
            stroke: '#4063ff',
            shadowColor: 'black',
            endArrow: {
              path: 'M 6,0 L -6,-6 L -6,6 Z',
              d: 6
            },
            lineAppendWidth: 20
          }
        }
      })

      // 阻止右键事件
      this.graph.on('contextmenu', (event) => {
        event.preventDefault()
        event.stopPropagation()
      })

      this.graph.on('keydown', (ev) => {
        if (ev.key === 'Control') {
          this.graph.setMode('zoom')
        }
      })

      this.graph.on('keyup', (ev) => {
        this.graph.setMode('default')
      })
    },
    async initPresetParams () {
      this.log('初始化预置参数：')
      // 处理预置参数
      if (this.presetParams && this.presetParams.length > 0) {
        for (let index = 0; index < this.presetParams.length; ++index) {
          const p = this.presetParams[index]
          let key = p.key
          if (!key) {
            continue
          }
          window['$' + key] = await processParams(p)
          this.log(`$${key} => ${window['$' + key]}`)
          console.log(`初始化预置参数：$${key}=${window['$' + key]}`, p)
        }
      } else {
        this.log('没有需要初始化的预置参数')
      }
      this.log('预置参数初始化完毕')
    },
    clearState (node) {
      node = node == null ? this.graph.getNodes() : (node instanceof Array ? node : [node])

      node.forEach(n => {
        this.graph.clearItemStates(n, ['waiting', 'running', 'success', 'failed', 'selected', 'ignore'])
      })
    },
    setState (node, state, bool = true) {
      node = node == null ? this.graph.getNodes() : (node instanceof Array ? node : [node])
      this.clearState(node)

      state = state instanceof Array ? state : [state]
      node.forEach(n => state.forEach(s => this.graph.setItemState(n, s, bool)))
    },
    /**
     * 外部api，保存历史
     */
    saveHistory () {
      if (!this.historyList || this.historyList.length === 0) {
        this.$alert('没有执行结果可保存', '提示', {type: 'error'})
        return
      }

      this.$prompt('保存', '', {
        inputType: 'text',
        inputPlaceholder: '请输入要保存的名称',
        inputValidator: (d) => (d || '').trim().length > 0 || '请输入要保存的名称'
      }).then((d) => {
        saveTestCaseHistorytApi({
          testCaseId: this.testCaseId,
          name: d.value,
          env: this.env,
          total: this.historyList.length,
          success: this.historyList.filter(s => s.success).length,
          result: JSON.stringify(this.historyList)
        }).then((res) => {
          this.$confirm('保存成功！', '提示', {
            type: 'success',
            cancelButtonText: '关闭',
            confirmButtonText: '去查看'
          }).then(() => {
            this.$router.push(`/flow/testCase/history/${res}`)
          })
        })
      })
    },
    /**
     * 外部api，清空历史
     */
    clearHistory () {
      this.$set(this, 'historyList', [])
    },
    /**
     * 外部api，执行用例
     * @param times 执行次数
     * @param mock 是否执行mock数据，默认：false
     */
    async run (times = 1, mock = false) {
      // 清空执行历史
      this.$set(this, 'historyList', [])

      times = times <= 0 ? 1 : times
      for (let i = 0; i < times; ++i) {
        const history = {}
        this.historyList.push(history)
        this.currentIndex = this.historyList.length - 1
        // 滚动条滚到最下面
        setTimeout(() => {
          const container = this.$el.querySelector('.running-history')
          container.scrollTop = container.scrollHeight
        }, 1)

        await this._run(mock)

        const nodes = JSON.parse(JSON.stringify(this.graph.getNodes().map(s => s.getModel())))
        const edges = JSON.parse(JSON.stringify(this.graph.getEdges().map(s => s.getModel())))
        history.workflow = { nodes, edges }
        history.logs = this.logs.map(s => s)
        history.success = this.success
        history.statesMap = {}
        this.graph.getNodes().forEach(n => {
          history.statesMap[n.getModel().id] = [...n.getStates()]
        })
        this.i = this.i + 1
      }

      // 通知外部执行完毕
      this.finished && this.finished()
    },
    async _run (mock = false) {
      this.success = true
      this.$set(this, 'logs', [])

      this.log('========开始========')
      this.log('初始化运行流程：')
      // render
      this.graph.data(this.workflow)
      this.graph.render()
      // 构建model
      this.model = constructExecutableDataModel(this.graph)
      // logs
      let index = 1
      this.model.forEach(m => {
        this.log(index + ' => ' + m.map(mm => `${mm.getModel().label}（$${mm.getModel().id}）`).join('，'))
        index++
      })
      this.graph.getNodes().forEach(n => {
        n.getModel().data.shouldRun = true
      })
      this.log('运行流程初始化完毕')

      this.log('')
      this.log('开始节点执行：')

      // 标记所有节点等待执行
      this.setState(null, 'waiting')

      // 初始化预制参数
      await this.initPresetParams()
      // 开始执行
      await this.runLevel(0, mock)

      this.log('执行完毕！')
      this.log('')
    },
    async runLevel (level, mock) {
      if (level >= this.model.length) {
        return
      }

      const toBeRunning = this.model[level]
      const totalCount = toBeRunning.length

      for (let index = 0; index < totalCount; ++index) {
        const node = toBeRunning[index]
        const model = node.getModel()
        const data = model.data

        this.log('')
        this.log(`<b>开始执行节点：${model.label}（$${model.id}）</b>`)

        if (this.ignore(node, level)) {
          continue
        }

        // 休眠N秒执行
        if (data.sleep > 0) {
          this.log(`休眠${data.sleep}秒之后运行`)
          await sleep(data.sleep * 1000)
          this.log(`休眠结束，开始运行`)
        }
        // 下游节点和线亮起来
        const edges = node.getEdges().filter(e => e.getSource() === node)
        this.setState(edges.concat(node), ['selected', 'running'])

        let message
        // 条件
        if (model.type === 'diamond') {
          // 有脚本，则按照脚本重新赋值
          try {
            /* eslint-disable */
            const condition = new Function(data.javascript)() || []
            this.log('条件判断成功，执行路线：' + condition.join(','))
            // 找出下游不在condition中的线路， 然后把这些线路的终点节点标记不执行
            edges.filter(e => condition.indexOf(e.getModel().id) < 0)
              .forEach(e => {
                const m = e.getTarget().getModel()
                if (!m.data) {
                  m.data = {shouldRun: false}
                } else {
                  m.data.shouldRun = false
                }
                this.setState(e.getTarget(), ['ignore'])
                this.graph.updateItem(e.getTarget(), m)
              })

            this.clearState(edges)
            this.setState(node, ['success'])
            this.log('')
          } catch (e) {
            this.error(edges, node, `条件判断失败：${e.toString()}`)
          }
        } else {
          try {
            let url = mock ? originMockUrl(data.java[this.env], data.url) : (data.java[this.env] + data.url)
            const paramsName = '$' + model.id
            const res = await mockXhr(url, data.method, data.parameters, data.headers, data.preParams, data.javascript, paramsName)

            message = this.appendMessage('', `接口地址：${res.method.toUpperCase()}  ${res.url}`)
            message = this.appendMessage(message, `header：${res.headers.length > 0 ? res.headers.map(h => h.key + '=' + h.value).join('，') : '无'}`)
            message = this.appendMessage(message, `接口参数：${toQueryString(res.params)}`)
            message = this.appendMessage(message, res.body && `body：${res.body}`)
            message = this.appendMessage(message, '调用结果：')
            message = this.appendMessage(message, res.result.data, 'json')

            if (res.success) {
              if (res.check === false) {
                // 执行检查点失败
                this.error(edges, node, this.appendMessage(message, '检查点：执行失败，' + res.message))
              } else {
                // 将结果放到输送线上去
                edges.forEach(e => {
                  window['$' + e.getModel().id] = window[paramsName]
                })
                this.setState(edges.concat(node), ['selected', 'running'], false)
                this.setState(node, ['success'], true)
                model.description = res.check ? this.appendMessage(message, '检查点：执行成功！') : this.appendMessage(message, '检查点：无')
                this.graph.updateItem(node, model)
              }
            } else {
              // 接口调用失败
              this.error(edges, node, this.appendMessage(message, '接口调用失败：' + res.message))
            }
          } catch (e) {
            this.error(edges, node, this.appendMessage(message, `接口调用失败：${e.toString()}`))
          }
        }
      }

      await this.runLevel(level + 1, mock)
    },
    appendMessage(message, cache, type) {
      if (!cache) {
        return message
      }

      if (type === 'json') {
        this.log(cache, type)
        cache = `<div class="json-container">${toJsonHtml(cache)}</div>`
      } else {
        this.log(cache, type)
      }
      return message + '<p>' + cache + '</p>'
    },
    ignore (node, level) {
      const model = node.getModel()
      const data = model.data

      // 如果被标记不执行则跳过下游线路
      if (!data.shouldRun) {
        const message = `上游阻断，本节点【${model.id}】不执行`
        model.description = message
        this.log(message)
        this.setState(node, ['ignore'])
        this.graph.updateItem(node, model)
        return true
      }

      // 上游节点存在未执行节点, 本节点不执行
      const preEdges = node.getEdges().filter(e => e.getTarget() === node)
      if (level !== 0 && preEdges.filter(e => !e.getSource().getModel().data.shouldRun).length > 0) {
        const message = `上游阻断，本节点【${model.id}】不执行`
        model.description = message
        this.log(message)
        this.setState(node, ['ignore'])
        data.shouldRun = false
        this.graph.updateItem(node, model)
        return true
      }
      return false
    },
    error (edges, node, message) {
      this.success = false
      const model = node.getModel()
      const data = model.data
      model.description = message
      data.shouldRun = false
      this.clearState(edges, ['selected', 'running'], false)
      this.setState(node, ['failed'])

      this.graph.updateItem(node, model)
    },
    log (log, type = 'text') {
      this.logs.push({data: log, type: type})
      // 滚动条滚到最下面
      setTimeout(() => {
        const container = this.$el.querySelector('.runner-logger')
        container.scrollTop = container.scrollHeight
      }, 1)
    }
  },
  mounted () {
    // registerEdge
    this.registerEdge()

    // initGraph
    this.initGraph()

    window.that = this
  },
  components: {
    'v-jsonformatter': () => import('@/components/jsonformatter')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/css" lang="scss" scoped>
  @import 'index';
</style>
