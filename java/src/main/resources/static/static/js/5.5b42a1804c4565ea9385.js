webpackJsonp([5],{SwPz:function(e,t){},Z9Qs:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a("3cXf"),s=a.n(l),n=a("VoE9"),r=a("0Njg"),i=a("R2SV"),o={props:{},data:function(){return{data:{id:null,hash:null,name:null,url:null,method:null,parameters:null,returns:null,createTime:null,deprecated:null,end:{id:null,name:null,prefix:null,header:null},java:{id:null,name:null,devDomain:null,testDomain:null,prevDomain:null,onlineDomain:null}},method:"GET",parameters:null,headers:[],env:"testDomain",result:null,bodyParams:null}},computed:{showUrl:function(){if(!this.data.id)return"";var e=this.data.java[this.env]+this.data.url;return this.parameters.filter(function(t){return e.indexOf("{"+t.key+"}")>=0}).forEach(function(t){t.defaults&&(e=e.replace("{"+t.key+"}",t.defaults))}),e}},mounted:function(){this.init()},methods:{paste:function(e){Object(i.a)(e,this.parameters)},init:function(){var e=this;this.env=this.$route.params.env||this.env,Object(r.m)(this.$route.params.id).then(function(t){e.data=t,e.method=e.data.method||e.method,Object(r.n)(e.data.id).then(function(t){e.headers=t?[t]:[]}),e.parameters=Object(i.c)(e.data.parameters)}),this.$el.addEventListener("paste",this.paste)},testUrl:function(){var e=this,t=void 0,a=this.method.toLowerCase(),l=void 0,r=void 0;if(0===this.parameters.length?r="":(r={},this.parameters.forEach(function(e){void 0===r[e.key]?r[e.key]=e.defaults:r[e.key]=[e.defaults].concat(r[e.key])})),t=["put","post","patch"].indexOf(a)>=0?r:{params:r},this.bodyParams){var o=s()(JSON.parse(r[this.bodyParams]));delete r[this.bodyParams],l=n.a[a](this.showUrl+"?"+Object(i.j)(r),o,{type:"json",customHeaders:this.headers})}else t.customHeaders=this.headers,l=n.a[a](this.showUrl,t);l.then(function(t){e.result=t.data}).catch(function(e){console.log(e)})},addParams:function(){this.parameters.push({key:"",value:"",type:""})},addHeader:function(){this.headers.push({key:"",value:""})},delParam:function(e){this.parameters.splice(e,1)},delHeader:function(e){this.headers.splice(e,1)}},components:{"v-jsonformatter":function(){return a.e(22).then(a.bind(null,"9YOq"))}}},u={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("h4",{staticClass:"title"},[e._v("接口测试: "+e._s(e.data.name))]),e._v(" "),a("hr"),e._v(" "),a("el-form",{attrs:{inline:!0}},[a("el-form-item",{staticStyle:{width:"100px"},attrs:{label:""}},[a("el-select",{model:{value:e.env,callback:function(t){e.env=t},expression:"env"}},[a("el-option",{attrs:{label:"开发",value:"devDomain"}}),e._v(" "),a("el-option",{attrs:{label:"测试",value:"testDomain"}}),e._v(" "),a("el-option",{attrs:{label:"预发",value:"prevDomain"}}),e._v(" "),a("el-option",{attrs:{label:"线上",value:"onlineDomain"}})],1)],1),e._v(" "),a("el-form-item",{staticStyle:{width:"100px"},attrs:{label:""}},[a("el-select",{attrs:{value:"POST"},model:{value:e.method,callback:function(t){e.method=t},expression:"method"}},[a("el-option",{attrs:{label:"POST",value:"POST"}}),e._v(" "),a("el-option",{attrs:{label:"GET",value:"GET"}}),e._v(" "),a("el-option",{attrs:{label:"PATCH",value:"PATCH"}}),e._v(" "),a("el-option",{attrs:{label:"PUT",value:"PUT"}}),e._v(" "),a("el-option",{attrs:{label:"DELETE",value:"DELETE"}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:""}},[a("el-input",{staticClass:"min_width",model:{value:e.showUrl,callback:function(t){e.showUrl=t},expression:"showUrl"}})],1),e._v(" "),a("el-form-item",{attrs:{label:""}},[a("el-button",{attrs:{type:"primary"},on:{click:e.testUrl}},[e._v("发射!!!")])],1)],1),e._v(" "),a("div",[a("div",{staticClass:"left"},[a("h4",{staticClass:"title"},[e._v("返回结果")]),e._v(" "),a("hr"),e._v(" "),a("el-form",[a("el-form-item",{attrs:{label:""}},[a("v-jsonformatter",{staticStyle:{"max-height":"600px","overflow-x":"hidden"},attrs:{json:e.result}})],1)],1)],1),e._v(" "),a("div",{staticClass:"right"},[a("h4",{staticClass:"title"},[e._v("header    "),a("el-button",{attrs:{type:"primary",icon:"el-icon-plus",circle:"",size:"small"},on:{click:function(t){return e.addHeader()}}})],1),e._v(" "),a("hr"),e._v(" "),e.headers?a("el-form",e._l(e.headers,function(t,l){return a("el-form-item",{key:l},[a("el-input",{staticClass:"half_min_width",attrs:{placeholder:"请输入headers参数名"},model:{value:t.key,callback:function(a){e.$set(t,"key",a)},expression:"h.key"}},[a("template",{slot:"prepend"},[a("span",{staticClass:"table_title"},[e._v("参数名")])])],2),e._v(" "),a("el-input",{staticClass:"half_min_width",attrs:{placeholder:"请输入headers参数值"},model:{value:t.value,callback:function(a){e.$set(t,"value",a)},expression:"h.value"}},[a("template",{slot:"prepend"},[a("span",{staticClass:"table_title"},[e._v("参数值")])])],2),e._v(" "),a("el-button",{attrs:{type:"danger"},on:{click:function(t){return e.delHeader(l)}}},[e._v("删除")])],1)}),1):e._e(),e._v(" "),a("h4",{staticClass:"title"},[e._v("参数")]),e._v(" "),a("hr"),e._v(" "),e.parameters&&e.parameters.length>0?a("el-form",{staticClass:"params-form"},e._l(e.parameters,function(t,l){return a("el-form-item",{key:l,attrs:{label:""}},[a("el-input",{staticClass:"half_min_width",attrs:{placeholder:"请输入参数名"},model:{value:t.key,callback:function(a){e.$set(t,"key",a)},expression:"param.key"}},[a("template",{slot:"prepend"},[a("span",{staticClass:"table_title"},[e._v("参数名")])])],2),e._v(" "),"textarea"===t.inputType&&(e.bodyParams=t.key)?a("el-input",{staticClass:"half_max_width",attrs:{placeholder:"请输入参数值",rows:15,type:"textarea",name:t.key},model:{value:t.defaults,callback:function(a){e.$set(t,"defaults",a)},expression:"param.defaults"}},[a("template",{slot:"prepend"},[a("span",{staticClass:"table_title"},[e._v("参数值")])])],2):a("el-input",{staticClass:"half_max_width",attrs:{placeholder:"请输入参数值",name:t.key},model:{value:t.defaults,callback:function(a){e.$set(t,"defaults",a)},expression:"param.defaults"}},[a("template",{slot:"prepend"},[a("span",{staticClass:"table_title"},[e._v("参数值")])])],2),e._v(" "),a("el-button",{attrs:{type:"primary",icon:"el-icon-plus",circle:"",size:"small"},on:{click:function(t){return e.addParams()}}}),e._v(" "),a("el-button",{attrs:{type:"danger",icon:"el-icon-delete",circle:"",size:"small"},on:{click:function(t){return e.delParam(l)}}})],1)}),1):a("el-form",[a("el-form-item",{attrs:{label:""}},[a("el-button",{attrs:{type:"primary",icon:"el-icon-plus",circle:"",size:"small"},on:{click:function(t){return e.addParams()}}})],1)],1)],1)])],1)},staticRenderFns:[]};var c=a("C7Lr")(o,u,!1,function(e){a("SwPz")},null,null);t.default=c.exports}});
//# sourceMappingURL=5.5b42a1804c4565ea9385.js.map