(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-caeee956"],{2226:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-container",{style:{padding:0,backgroundColor:"white"},attrs:{fluid:""}},[a("v-layout",[a("v-flex",{attrs:{"mt-5":"",xs10:"","offset-xs1":""}},[a("section",[a("b-table",{attrs:{data:e.isEmpty?[]:e.refuels,bordered:!0,striped:!0,narrowed:!1,hoverable:!1,loading:!1,focusable:!1,"mobile-cards":!0},scopedSlots:e._u([{key:"default",fn:function(t){return[a("b-table-column",{attrs:{field:"date",label:"Dátum",centered:"",sortable:""}},[a("span",{staticClass:"tag is-success",style:{backgroundColor:"#1A237E"}},[e._v(e._s(e.formatDate(new Date(t.row.date))))])]),a("b-table-column",{attrs:{centered:"",field:"station",label:"Čerpacia stanica"}},[e._v(e._s(t.row.station))]),a("b-table-column",{attrs:{centered:"",field:"amount",label:"Množstvo"}},[e._v(e._s(t.row.amount)+" L")]),a("b-table-column",{attrs:{centered:"",field:"full",label:"Nádrž"}},[t.row.full?a("span",{staticClass:"tag is-success",style:{backgroundColor:"#1A237E"}},[e._v("plná")]):e._e()]),a("b-table-column",{attrs:{centered:"",field:"price",label:"Cena"}},[e._v(e._s(t.row.price)+" €")]),a("b-table-column",{attrs:{centered:"",field:"km",label:"Najazdené"}},[e._v(e._s(t.row.km)+" km")]),a("b-table-column",{attrs:{centered:"",field:"",label:"Zmazať"}},[a("v-btn",{staticClass:"btn-remove",attrs:{flat:""},on:{click:function(a){e.remove(t.row.id)}}},[a("v-icon",{attrs:{color:e.primary}},[e._v("delete")])],1)],1)]}}])},[a("template",{slot:"empty"},[a("section",{staticClass:"section"},[a("div",{staticClass:"content has-text-grey has-text-centered"},[a("p",[a("b-icon",{attrs:{icon:"emoticon-sad",size:"is-large"}})],1),a("p",[e._v("Žiadne dáta na zobrazenie...")])])])])],2)],1)])],1)],1)},r=[],s=a("be94"),o=a("2f62"),l=(a("c1df"),{data:function(){return{primary:"indigo darken-4",isEmpty:!1}},computed:Object(s["a"])({},Object(o["c"])(["refuels"]),{monthNames:function(){return["Január","Február","Marec","Apríl","Máj","Jún","Júl","August","September","Október","November","December"]}}),methods:Object(s["a"])({},Object(o["b"])(["fetchRefuels","removeRefuel"]),{remove:function(e){this.removeRefuel(e),this.fetchRefuels()},formatDate:function(e){var t=e.getDate(),a=e.getMonth(),n=e.getFullYear();return"".concat(t," ").concat(this.monthNames[a]," ").concat(n)}}),mounted:function(){this.fetchRefuels()}}),c=l,i=(a("a45d"),a("2877")),u=a("6544"),d=a.n(u),b=a("8336"),f=a("a523"),m=a("0e8f"),v=a("132d"),p=a("a722"),h=Object(i["a"])(c,n,r,!1,null,null,null);t["default"]=h.exports;d()(h,{VBtn:b["a"],VContainer:f["a"],VFlex:m["a"],VIcon:v["a"],VLayout:p["a"]})},"375a":function(e,t,a){},a45d:function(e,t,a){"use strict";var n=a("375a"),r=a.n(n);r.a},a523:function(e,t,a){"use strict";a("db6d");var n=a("e8f2");t["a"]=Object(n["a"])("container")}}]);
//# sourceMappingURL=chunk-caeee956.2ea6bf97.js.map