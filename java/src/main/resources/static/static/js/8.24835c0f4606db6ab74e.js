webpackJsonp([8],{"9+f8":function(t,e){},s09X:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a("0Njg"),n=a("R2SV"),s={name:"interfacesDetail",data:function(){return{data:null,formatDate:n.b,returns:null,parameters:null,generatedReturns:null}},computed:{},methods:{init:function(){var t=this;Object(r.o)(this.$route.params.id).then(function(e){t.data=e,t.returns=JSON.parse(t.data.returns),t.generatedReturns=Object(n.d)(t.returns),t.parameters=JSON.parse(t.data.parameters)})},linkTo:function(t,e){this.$router.push("/test/"+t.id+"/"+e)}},components:{"v-datagrid":function(){return a.e(21).then(a.bind(null,"mW4C"))},"v-jsonformatter":function(){return a.e(22).then(a.bind(null,"9YOq"))},"v-parameter":function(){return a.e(26).then(a.bind(null,"Kq1y"))}},mounted:function(){this.init()}},l={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"customer"},[t._m(0),t._v(" "),a("div",{staticClass:"index_more"},[a("div",{staticClass:"index_chunk"},[a("h4",{staticClass:"title"},[t._v("接口详情")]),t._v(" "),a("hr"),t._v(" "),t.data?a("el-form",{attrs:{"label-width":"9em"}},[a("el-form-item",{attrs:{label:"接口名称:"}},[t._v(t._s(t.data.name)),t.data.deprecated?a("b",{staticStyle:{color:"red"}},[t._v("（已废弃）")]):t._e()]),t._v(" "),a("el-form-item",{attrs:{label:"访问类型:"}},[t._v(t._s(t.data.method))]),t._v(" "),a("el-form-item",{attrs:{label:"所属项目:"}},[t._v(t._s(t.data.end.name))]),t._v(" "),a("el-form-item",{attrs:{label:"header参数说明:"}},[a("i",{staticStyle:{color:"red"}},[t._v("header名:"+t._s(t.data.end.header)),a("br"),t._v(t._s(t.data.end.mark))])]),t._v(" "),a("el-form-item",{attrs:{label:"所属模块:"}},[t._v(t._s(t.data.java.name))]),t._v(" "),a("el-form-item",{attrs:{label:"测试环境地址:"}},[t._v(t._s(""+t.data.java.testDomain+t.data.url))]),t._v(" "),a("el-form-item",{attrs:{label:"线上环境地址:"}},[t._v(t._s(""+t.data.java.onlineDomain+t.data.url))]),t._v(" "),a("el-form-item",{attrs:{label:"创建时间:"}},[t._v(t._s(t.formatDate(t.data.createTime)))]),t._v(" "),a("el-form-item",{attrs:{label:"接口参数:"}},[a("v-parameter",{attrs:{json:t.parameters||[]}})],1),t._v(" "),a("el-form-item",{attrs:{label:"接口说明:"}},[a("div",{domProps:{innerHTML:t._s(t.data.mark||"无")}})]),t._v(" "),a("el-form-item",{attrs:{label:"返回值:"}},[t.generatedReturns?a("v-jsonformatter",{attrs:{json:t.generatedReturns}}):t._e()],1)],1):t._e()],1)])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"header"},[e("img",{staticClass:"logo",attrs:{src:a("dLd/")}}),this._v(" "),e("h3",[this._v("开发者中心")])])}]};var i=a("C7Lr")(s,l,!1,function(t){a("9+f8")},null,null);e.default=i.exports}});
//# sourceMappingURL=8.24835c0f4606db6ab74e.js.map