/***********************
 * @name JS
 * @author Jo.gel
 * @date 2019/8/14 0014 下午 4:08
 ***********************/
const Vue = function () {
	return function (options) {
		if ("development" !== 'production' &&
			!(this instanceof Vue)
		) {
			warn('Vue is a constructor and should be called with the `new` keyword');
		}
		_init(options);
	};
	
};

Vue.prototype = {
	$delete: del, // $delete 删除响应式key函数
	$destroy: function () {
	
	}
};
//疑问TODO？为什么这个destroy不用变量来声明函数
Vue.prototype.$destroy = function () {

};
Vue.prototype.$emit = function (...args) {
	console.info(args);
};
// 强制更新Vue实例
Vue.prototype.$forceUpdate = function () {

};
Vue.prototype.$mount = function (el, hydrating) {

};

Vue.prototype.$nextTick = function (fn) {
};

Vue.prototype.$off = function (event, fn) {

};

Vue.prototype.$on = function (event, fn) {
};
Vue.prototype.$once = function (event, fn) {

};
Vue.prototype.$set = function (target, key, val) {

};
Vue.prototype.$watch = function (expOrn, cb, options) {

};
Vue.prototype.__patch__ = patch;

Vue.prototype._b = bindObjectProps;

Vue.prototype._e = function (text) {

};
Vue.prototype._f = resolveFilter;

Vue.prototype._g = bindObjectListeners;

Vue.prototype._i = looseIndexOf;

Vue.prototype._init = _init;

Vue.prototype._k = checkKeyCodes;

Vue.prototype._l = renderList;

Vue.prototype._m = renderStatic;

Vue.prototype._n = toNumber;

Vue.prototype._o = markOnce;

Vue.prototype._q = looseEqual;

Vue.prototype._render = function () {

};
Vue.prototype._s = toString;

Vue.prototype._t = renderSlot;

Vue.prototype._u = resolveScopedSlots;

Vue.prototype._update = function (vnode, hydrating) {

};
Vue.prototype._v = createTextVNode;

function _init(options) {

}

function del(target, key) {

}

function f() {

}

// 补丁
function patch(oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {

}

function bindObjectProps(data, tag, value, arProp, isSync) {

}

function resolveFilter(id) {

}

function bindObjectListeners(data, value) {

}

function looseIndexOf(arr, val) {

}

function checkKeyCodes(eventKeyCode, key, builtInKeyCode, eventKeyName, builtInKeyName) {

}

function renderList(val, render) {

}

function renderStatic(index, isInFor) {

}

function toNumber(val) {

}

function markOnce(tree, index, key) {

}

function looseEqual(a, b) {

}

function toString(val) {

}

function renderSlot(name, fallback, props, bindObject) {

}

function resolveScopedSlots(fns,
//see flow.vnode
res) {

}

function createTextVNode(val) {

}

const dataDef={
	get:function () {
		return this._data
	},
	set:function (value) {
		console.info(value);
	}
};

const propsDef={
	get:function () {
		return this._props
	},
	set:function (value) {
		console.info(value);
	}
};
const isServerDef={
	get:function () {
		return false
	},
	set:function (value) {
		console.info(value);
	}
};
const ssrContextDef ={
	get:function () {
		return false
	},
	set:function (value) {
		console.info(value);
	}
};
Object.defineProperty(Vue.prototype, '$data', dataDef);
Object.defineProperty(Vue.prototype, '$props', propsDef);
Object.defineProperty(Vue.prototype, '$isServer', isServerDef);
Object.defineProperty(Vue.prototype, '$ssrContext', ssrContextDef);

// Vue的构造器指向他自己
