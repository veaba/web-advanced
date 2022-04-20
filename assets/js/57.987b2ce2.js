(window.webpackJsonp=window.webpackJsonp||[]).push([[57],{466:function(e,t,v){"use strict";v.r(t);var _=v(62),r=Object(_.a)({},(function(){var e=this,t=e.$createElement,v=e._self._c||t;return v("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[v("h1",{attrs:{id:"eventloop"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#eventloop"}},[e._v("#")]),e._v(" EventLoop")]),e._v(" "),v("h2",{attrs:{id:"javascript-事件"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#javascript-事件"}},[e._v("#")]),e._v(" JavaScript 事件")]),e._v(" "),v("p",[e._v("分为两种事件类型：")]),e._v(" "),v("ul",[v("li",[v("p",[e._v("宏任务(macro-task)/Task 中的异步任务：")]),e._v(" "),v("ul",[v("li",[e._v("setTimeout")]),e._v(" "),v("li",[e._v("setInterval")]),e._v(" "),v("li",[e._v("setImmediate (Node)")]),e._v(" "),v("li",[e._v("requestAnimationFrame(browser)")]),e._v(" "),v("li",[e._v("I/O")]),e._v(" "),v("li",[e._v("UI rendering(browser)")])])]),e._v(" "),v("li",[v("p",[e._v("微任务(micro-task)/jobs 中的异步任务：")]),e._v(" "),v("ul",[v("li",[e._v("process.nextTick(node,limit=1000)")]),e._v(" "),v("li",[e._v("Promise")]),e._v(" "),v("li",[e._v("Object.observe")]),e._v(" "),v("li",[e._v("MutationObserve")])])])]),e._v(" "),v("p",[e._v("事件的执行顺序：先"),v("code",[e._v("宏任务")]),e._v(" ——> "),v("code",[e._v("微任务")]),e._v("。")]),e._v(" "),v("p",[e._v("任务中有"),v("code",[e._v("同步任务")]),e._v("和"),v("code",[e._v("异步任务")]),e._v(":")]),e._v(" "),v("ul",[v("li",[e._v("——> 同步的进入主线程")]),e._v(" "),v("li",[e._v("——> 异步进入 event table 并注册函数")]),e._v(" "),v("li",[e._v("——> 异步完成后")]),e._v(" "),v("li",[e._v("——> 将回调放入 event queue（宏任务和微任务是不同的 event queue），此时不执行异步快里的代码")]),e._v(" "),v("li",[e._v("——> 同步任务完成后，从 event queue 读取事件放入主线程")]),e._v(" "),v("li",[e._v("——> 回调函数可能包含不同的任务，因此循环执行上述")])]),e._v(" "),v("h2",{attrs:{id:"node"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#node"}},[e._v("#")]),e._v(" Node")]),e._v(" "),v("ul",[v("li",[e._v("略")])]),e._v(" "),v("h2",{attrs:{id:"reference"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#reference"}},[e._v("#")]),e._v(" reference:")]),e._v(" "),v("ul",[v("li",[v("a",{attrs:{href:"https://segmentfault.com/a/1190000016278115",target:"_blank",rel:"noopener noreferrer"}},[e._v("带你彻底弄懂Event Loop"),v("OutboundLink")],1)])])])}),[],!1,null,null,null);t.default=r.exports}}]);