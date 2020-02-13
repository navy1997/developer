webpackJsonp([4],{"29u9":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l=a("3cXf"),n=a.n(l),r=a("0Njg"),i={data:function(){return{title:"项目修改",args:[],data:{name:null,prefix:null,header:null,jarUrl:null,kls:null,method:null,args:null,mark:null}}},computed:{},methods:{deleteArgs:function(t){this.args.splice(t,1)},addArgs:function(){this.args.push({key:"",value:""})},init:function(){var t=this;this.$route.params.id&&Object(r.l)(this.$route.params.id).then(function(e){t.data=e,t.args=e.args?JSON.parse(e.args):[]}).catch(function(t){console.log(t)}),this.title=this.$route.params.id?"修改项目":"添加项目"},add:function(){var t=this;this.$refs.edit.validate(function(e){e&&t.$confirm("确定保存？","提示",{type:"info"}).then(function(){t.data.args=n()(t.args.filter(function(t){return t.key&&t.value})),t.$route.params.id?Object(r.D)(t.$route.params.id,t.data).then(function(e){t.$transfer({back:"返回编辑",buttons:[{text:"去列表",link:"/project/list"}]})}).catch(function(t){console.log(t)}):Object(r.a)(t.data).then(function(e){t.$transfer({back:"继续添加",buttons:[{text:"去列表",link:"/project/list"}]})}).catch(function(t){console.log(t)})})})}},watch:{},components:{},beforeCreate:function(){},cteated:function(){},beforeMount:function(){},mounted:function(){this.init()},beforeUpdate:function(){},updated:function(){},beforeDestroy:function(){},destroyed:function(){}},s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("h4",{staticClass:"title"},[t._v(t._s(t.title))]),t._v(" "),a("hr"),t._v(" "),a("el-form",{ref:"edit",attrs:{model:t.data,"label-width":"8em"}},[a("el-form-item",{staticClass:"min_width",attrs:{label:"项目名称:",rules:[{required:!0,message:"请输入项目名称",trigger:["blur","change"]}],prop:"name"}},[a("el-input",{attrs:{placeholder:"输入项目名称"},model:{value:t.data.name,callback:function(e){t.$set(t.data,"name",e)},expression:"data.name"}})],1),t._v(" "),a("el-form-item",{staticClass:"min_width",attrs:{label:"项目前缀:",rules:[{required:!0,message:"请输入项目前缀",trigger:["blur","change"]}],prop:"prefix"}},[a("el-input",{attrs:{placeholder:"输入项目前缀"},model:{value:t.data.prefix,callback:function(e){t.$set(t.data,"prefix",e)},expression:"data.prefix"}})],1),t._v(" "),a("el-form-item",{staticClass:"min_width",attrs:{label:"jar包地址:"}},[a("el-input",{attrs:{placeholder:"输入项目前缀"},model:{value:t.data.jarUrl,callback:function(e){t.$set(t.data,"jarUrl",e)},expression:"data.jarUrl"}})],1),t._v(" "),a("el-form-item",{staticClass:"min_width",attrs:{label:"类名:"}},[a("el-input",{attrs:{placeholder:"输入项目前缀"},model:{value:t.data.kls,callback:function(e){t.$set(t.data,"kls",e)},expression:"data.kls"}})],1),t._v(" "),a("el-form-item",{staticClass:"min_width",attrs:{label:"方法:",prop:"method"}},[a("el-input",{attrs:{placeholder:"输入项目前缀"},model:{value:t.data.method,callback:function(e){t.$set(t.data,"method",e)},expression:"data.method"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"参数:"}},t._l(t.args,function(e,l){return t.args&&t.args.length>0?a("div",{key:l},[a("el-input",{staticClass:"half_min_width",attrs:{placeholder:"请输入参数名"},model:{value:e.key,callback:function(a){t.$set(e,"key",a)},expression:"arg.key"}},[a("template",{slot:"prepend"},[a("span",{staticClass:"table_title"},[t._v("参数类名")])])],2),t._v(" "),a("el-input",{staticClass:"hole_min_width",attrs:{placeholder:"请输入参数值"},model:{value:e.value,callback:function(a){t.$set(e,"value",a)},expression:"arg.value"}},[a("template",{slot:"prepend"},[a("span",{staticClass:"table_title"},[t._v("参数值")])])],2),t._v(" "),a("el-button",{attrs:{type:"primary",icon:"el-icon-plus",circle:"",size:"small"},on:{click:function(e){return t.addArgs()}}}),t._v(" "),a("el-button",{attrs:{type:"danger",icon:"el-icon-delete",circle:"",size:"small"},on:{click:function(e){return t.deleteArgs(l)}}})],1):a("div",[a("el-button",{attrs:{type:"primary",icon:"el-icon-plus",circle:"",size:"small"},on:{click:function(e){return t.addArgs()}}})],1)}),0),t._v(" "),a("el-form-item",{staticClass:"min_width",attrs:{label:"Header:"}},[a("el-input",{attrs:{placeholder:"输入header名"},model:{value:t.data.header,callback:function(e){t.$set(t.data,"header",e)},expression:"data.header"}})],1),t._v(" "),a("el-form-item",{staticClass:"min_width",attrs:{label:"备注:"}},[a("el-input",{attrs:{placeholder:"输入header参数说明"},model:{value:t.data.mark,callback:function(e){t.$set(t.data,"mark",e)},expression:"data.mark"}})],1),t._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary",icon:"el-icon-success"},on:{click:t.add}},[t._v("提交")]),t._v(" "),a("el-button",{attrs:{type:"info",icon:"el-icon-back"},on:{click:function(e){return t.$router.go(-1)}}},[t._v("返回")])],1)],1)],1)},staticRenderFns:[]};var o=a("C7Lr")(i,s,!1,function(t){a("tdrR")},"data-v-36deb96e",null);e.default=o.exports},tdrR:function(t,e){}});
//# sourceMappingURL=4.60a95a2e132901371d65.js.map