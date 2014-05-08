(function () { "use strict";
var $hxClasses = {},$estr = function() { return js_Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
$hxClasses["EReg"] = EReg;
EReg.__name__ = true;
EReg.prototype = {
	match: function(s) {
		if(this.r.global) this.r.lastIndex = 0;
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,__class__: EReg
};
var HxOverrides = function() { };
$hxClasses["HxOverrides"] = HxOverrides;
HxOverrides.__name__ = true;
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
};
HxOverrides.remove = function(a,obj) {
	var i = a.indexOf(obj);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
};
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
var Lambda = function() { };
$hxClasses["Lambda"] = Lambda;
Lambda.__name__ = true;
Lambda.array = function(it) {
	var a = new Array();
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var i = $it0.next();
		a.push(i);
	}
	return a;
};
Lambda.count = function(it,pred) {
	var n = 0;
	if(pred == null) {
		var $it0 = $iterator(it)();
		while( $it0.hasNext() ) {
			var _ = $it0.next();
			n++;
		}
	} else {
		var $it1 = $iterator(it)();
		while( $it1.hasNext() ) {
			var x = $it1.next();
			if(pred(x)) n++;
		}
	}
	return n;
};
var Main = function() { };
$hxClasses["Main"] = Main;
Main.__name__ = true;
Main.main = function() {
	flambe_System.init();
	var manifest = flambe_asset_Manifest.fromAssets("bootstrap");
	var loader = flambe_System._platform.loadAssetPack(manifest);
	loader.get(Main.onSuccess);
};
Main.onSuccess = function(pack) {
	var background = new flambe_display_FillSprite(16777215,flambe_System._platform.getStage().get_width(),flambe_System._platform.getStage().get_height());
	flambe_System.root.addChild(new flambe_Entity().add(background));
	Main.parser = new flambe_map_tmx_TmxParser(pack,"camera/map");
	Main.map = new flambe_Entity();
	flambe_System._platform.getPointer().down.connect(function(_) {
		Main.changeDemo();
	});
	Main.changeDemo();
};
Main.automaticCameraDemo = function() {
	Main.map.dispose();
	Main.map.add(Main.parser.newMap(flambe_System._platform.getStage().get_width() - 40,flambe_System._platform.getStage().get_height() - 40).setXY(20,20));
	var mapSprite = Main.map._compMap.Sprite_0;
	mapSprite.camera.x.set_behavior(new flambe_animation_Sine(0,1000,5));
	mapSprite.camera.y.set_behavior(new flambe_animation_Sine(0,900,7));
	flambe_System.root.addChild(Main.map);
};
Main.mouseFollowerDemo = function() {
};
Main.spriteFollowerDemo = function() {
};
Main.changeDemo = function() {
	var _g = Main.demoNum++;
	switch(_g) {
	case 0:
		Main.automaticCameraDemo();
		break;
	case 1:
		Main.mouseFollowerDemo();
		break;
	case 2:
		Main.spriteFollowerDemo();
		break;
	}
};
var IMap = function() { };
$hxClasses["IMap"] = IMap;
IMap.__name__ = true;
Math.__name__ = true;
var Reflect = function() { };
$hxClasses["Reflect"] = Reflect;
Reflect.__name__ = true;
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		return null;
	}
};
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
};
var Std = function() { };
$hxClasses["Std"] = Std;
Std.__name__ = true;
Std["is"] = function(v,t) {
	return js_Boot.__instanceof(v,t);
};
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
};
var StringTools = function() { };
$hxClasses["StringTools"] = StringTools;
StringTools.__name__ = true;
StringTools.startsWith = function(s,start) {
	return s.length >= start.length && HxOverrides.substr(s,0,start.length) == start;
};
var Type = function() { };
$hxClasses["Type"] = Type;
Type.__name__ = true;
Type.getClass = function(o) {
	if(o == null) return null;
	if((o instanceof Array) && o.__enum__ == null) return Array; else return o.__class__;
};
Type.resolveClass = function(name) {
	var cl = $hxClasses[name];
	if(cl == null || !cl.__name__) return null;
	return cl;
};
Type.resolveEnum = function(name) {
	var e = $hxClasses[name];
	if(e == null || !e.__ename__) return null;
	return e;
};
var flambe_util_Disposable = function() { };
$hxClasses["flambe.util.Disposable"] = flambe_util_Disposable;
flambe_util_Disposable.__name__ = true;
var flambe_Component = function() { };
$hxClasses["flambe.Component"] = flambe_Component;
flambe_Component.__name__ = true;
flambe_Component.__interfaces__ = [flambe_util_Disposable];
flambe_Component.prototype = {
	onAdded: function() {
	}
	,onRemoved: function() {
	}
	,onUpdate: function(dt) {
	}
	,dispose: function() {
		if(this.owner != null) this.owner.remove(this);
	}
	,get_name: function() {
		return null;
	}
	,init: function(owner,next) {
		this.owner = owner;
		this.next = next;
	}
	,__class__: flambe_Component
};
var flambe_Entity = function() {
	this.firstComponent = null;
	this.next = null;
	this.firstChild = null;
	this.parent = null;
	this._compMap = { };
};
$hxClasses["flambe.Entity"] = flambe_Entity;
flambe_Entity.__name__ = true;
flambe_Entity.__interfaces__ = [flambe_util_Disposable];
flambe_Entity.prototype = {
	add: function(component) {
		if(component.owner != null) component.owner.remove(component);
		var name = component.get_name();
		var prev = this._compMap[name];
		if(prev != null) this.remove(prev);
		this._compMap[name] = component;
		var tail = null;
		var p = this.firstComponent;
		while(p != null) {
			tail = p;
			p = p.next;
		}
		if(tail != null) tail.next = component; else this.firstComponent = component;
		component.init(this,null);
		component.onAdded();
		return this;
	}
	,remove: function(component) {
		var prev = null;
		var p = this.firstComponent;
		while(p != null) {
			var next = p.next;
			if(p == component) {
				if(prev == null) this.firstComponent = next; else prev.init(this,next);
				delete(this._compMap[p.get_name()]);
				p.onRemoved();
				p.init(null,null);
				return true;
			}
			prev = p;
			p = next;
		}
		return false;
	}
	,addChild: function(entity,append) {
		if(append == null) append = true;
		if(entity.parent != null) entity.parent.removeChild(entity);
		entity.parent = this;
		if(append) {
			var tail = null;
			var p = this.firstChild;
			while(p != null) {
				tail = p;
				p = p.next;
			}
			if(tail != null) tail.next = entity; else this.firstChild = entity;
		} else {
			entity.next = this.firstChild;
			this.firstChild = entity;
		}
		return this;
	}
	,removeChild: function(entity) {
		var prev = null;
		var p = this.firstChild;
		while(p != null) {
			var next = p.next;
			if(p == entity) {
				if(prev == null) this.firstChild = next; else prev.next = next;
				p.parent = null;
				p.next = null;
				return;
			}
			prev = p;
			p = next;
		}
	}
	,disposeChildren: function() {
		while(this.firstChild != null) this.firstChild.dispose();
	}
	,dispose: function() {
		if(this.parent != null) this.parent.removeChild(this);
		while(this.firstComponent != null) this.firstComponent.dispose();
		this.disposeChildren();
	}
	,__class__: flambe_Entity
};
var flambe_util_PackageLog = function() { };
$hxClasses["flambe.util.PackageLog"] = flambe_util_PackageLog;
flambe_util_PackageLog.__name__ = true;
var flambe_platform_Platform = function() { };
$hxClasses["flambe.platform.Platform"] = flambe_platform_Platform;
flambe_platform_Platform.__name__ = true;
flambe_platform_Platform.prototype = {
	__class__: flambe_platform_Platform
};
var flambe_platform_html_HtmlPlatform = function() {
};
$hxClasses["flambe.platform.html.HtmlPlatform"] = flambe_platform_html_HtmlPlatform;
flambe_platform_html_HtmlPlatform.__name__ = true;
flambe_platform_html_HtmlPlatform.__interfaces__ = [flambe_platform_Platform];
flambe_platform_html_HtmlPlatform.prototype = {
	init: function() {
		var _g = this;
		flambe_platform_html_HtmlUtil.fixAndroidMath();
		var canvas = null;
		try {
			canvas = window.flambe.canvas;
		} catch( error ) {
		}
		canvas.setAttribute("tabindex","0");
		canvas.style.outlineStyle = "none";
		canvas.style.webkitTapHighlightColor = "transparent";
		canvas.setAttribute("moz-opaque","true");
		this._stage = new flambe_platform_html_HtmlStage(canvas);
		this._pointer = new flambe_platform_BasicPointer();
		this._mouse = new flambe_platform_html_HtmlMouse(this._pointer,canvas);
		this._renderer = this.createRenderer(canvas);
		this.mainLoop = new flambe_platform_MainLoop();
		this.musicPlaying = false;
		this._canvas = canvas;
		this._container = canvas.parentElement;
		this._container.style.overflow = "hidden";
		this._container.style.position = "relative";
		this._container.style.msTouchAction = "none";
		var lastTouchTime = 0;
		var onMouse = function(event) {
			if(event.timeStamp - lastTouchTime < 1000) return;
			var bounds = canvas.getBoundingClientRect();
			var x = _g.getX(event,bounds);
			var y = _g.getY(event,bounds);
			var _g1 = event.type;
			switch(_g1) {
			case "mousedown":
				if(event.target == canvas) {
					event.preventDefault();
					_g._mouse.submitDown(x,y,event.button);
					canvas.focus();
				}
				break;
			case "mousemove":
				_g._mouse.submitMove(x,y);
				break;
			case "mouseup":
				_g._mouse.submitUp(x,y,event.button);
				break;
			case "mousewheel":case "DOMMouseScroll":
				var velocity;
				if(event.type == "mousewheel") velocity = event.wheelDelta / 40; else velocity = -event.detail;
				if(_g._mouse.submitScroll(x,y,velocity)) event.preventDefault();
				break;
			}
		};
		window.addEventListener("mousedown",onMouse,false);
		window.addEventListener("mousemove",onMouse,false);
		window.addEventListener("mouseup",onMouse,false);
		canvas.addEventListener("mousewheel",onMouse,false);
		canvas.addEventListener("DOMMouseScroll",onMouse,false);
		canvas.addEventListener("contextmenu",function(event1) {
			event1.preventDefault();
		},false);
		var standardTouch = typeof(window.ontouchstart) != "undefined";
		var msTouch = 'msMaxTouchPoints' in window.navigator && (window.navigator.msMaxTouchPoints > 1);
		if(standardTouch || msTouch) {
			var basicTouch = new flambe_platform_BasicTouch(this._pointer,standardTouch?4:window.navigator.msMaxTouchPoints);
			this._touch = basicTouch;
			var onTouch = function(event2) {
				var changedTouches;
				if(standardTouch) changedTouches = event2.changedTouches; else changedTouches = [event2];
				var bounds1 = event2.target.getBoundingClientRect();
				lastTouchTime = event2.timeStamp;
				var _g2 = event2.type;
				switch(_g2) {
				case "touchstart":case "MSPointerDown":case "pointerdown":
					event2.preventDefault();
					if(flambe_platform_html_HtmlUtil.SHOULD_HIDE_MOBILE_BROWSER) flambe_platform_html_HtmlUtil.hideMobileBrowser();
					var _g11 = 0;
					while(_g11 < changedTouches.length) {
						var touch = changedTouches[_g11];
						++_g11;
						var x1 = _g.getX(touch,bounds1);
						var y1 = _g.getY(touch,bounds1);
						var id;
						id = (standardTouch?touch.identifier:touch.pointerId) | 0;
						basicTouch.submitDown(id,x1,y1);
					}
					break;
				case "touchmove":case "MSPointerMove":case "pointermove":
					event2.preventDefault();
					var _g12 = 0;
					while(_g12 < changedTouches.length) {
						var touch1 = changedTouches[_g12];
						++_g12;
						var x2 = _g.getX(touch1,bounds1);
						var y2 = _g.getY(touch1,bounds1);
						var id1;
						id1 = (standardTouch?touch1.identifier:touch1.pointerId) | 0;
						basicTouch.submitMove(id1,x2,y2);
					}
					break;
				case "touchend":case "touchcancel":case "MSPointerUp":case "pointerup":
					var _g13 = 0;
					while(_g13 < changedTouches.length) {
						var touch2 = changedTouches[_g13];
						++_g13;
						var x3 = _g.getX(touch2,bounds1);
						var y3 = _g.getY(touch2,bounds1);
						var id2;
						id2 = (standardTouch?touch2.identifier:touch2.pointerId) | 0;
						basicTouch.submitUp(id2,x3,y3);
					}
					break;
				}
			};
			if(standardTouch) {
				canvas.addEventListener("touchstart",onTouch,false);
				canvas.addEventListener("touchmove",onTouch,false);
				canvas.addEventListener("touchend",onTouch,false);
				canvas.addEventListener("touchcancel",onTouch,false);
			} else {
				canvas.addEventListener("MSPointerDown",onTouch,false);
				canvas.addEventListener("MSPointerMove",onTouch,false);
				canvas.addEventListener("MSPointerUp",onTouch,false);
			}
		} else this._touch = new flambe_platform_DummyTouch();
		var oldErrorHandler = window.onerror;
		window.onerror = function(message,url,line) {
			flambe_System.uncaughtError.emit(message);
			if(oldErrorHandler != null) return oldErrorHandler(message,url,line); else return false;
		};
		var hiddenApi = flambe_platform_html_HtmlUtil.loadExtension("hidden",window.document);
		if(hiddenApi.value != null) {
			var onVisibilityChanged = function(_) {
				flambe_System.hidden.set__(Reflect.field(window.document,hiddenApi.field));
			};
			onVisibilityChanged(null);
			window.document.addEventListener(hiddenApi.prefix + "visibilitychange",onVisibilityChanged,false);
		} else {
			var onPageTransitionChange = function(event3) {
				flambe_System.hidden.set__(event3.type == "pagehide");
			};
			window.addEventListener("pageshow",onPageTransitionChange,false);
			window.addEventListener("pagehide",onPageTransitionChange,false);
		}
		flambe_System.hidden.get_changed().connect(function(hidden,_1) {
			if(!hidden) _g._skipFrame = true;
		});
		this._skipFrame = false;
		this._lastUpdate = Date.now();
		var requestAnimationFrame = flambe_platform_html_HtmlUtil.loadExtension("requestAnimationFrame").value;
		if(requestAnimationFrame != null) {
			var performance = window.performance;
			var hasPerfNow = performance != null && flambe_platform_html_HtmlUtil.polyfill("now",performance);
			if(hasPerfNow) this._lastUpdate = performance.now(); else null;
			var updateFrame = null;
			updateFrame = function(now) {
				_g.update(hasPerfNow?performance.now():now);
				requestAnimationFrame(updateFrame,canvas);
			};
			requestAnimationFrame(updateFrame,canvas);
		} else window.setInterval(function() {
			_g.update(Date.now());
		},16);
		flambe_Log.info("Initialized HTML platform",["renderer",this._renderer.get_type()]);
	}
	,loadAssetPack: function(manifest) {
		return new flambe_platform_html_HtmlAssetPackLoader(this,manifest).promise;
	}
	,getStage: function() {
		return this._stage;
	}
	,update: function(now) {
		var dt = (now - this._lastUpdate) / 1000;
		this._lastUpdate = now;
		if(flambe_System.hidden._value) return;
		if(this._skipFrame) {
			this._skipFrame = false;
			return;
		}
		this.mainLoop.update(dt);
		this.mainLoop.render(this._renderer);
	}
	,getPointer: function() {
		return this._pointer;
	}
	,getRenderer: function() {
		return this._renderer;
	}
	,getX: function(event,bounds) {
		return (event.clientX - bounds.left) * this._stage.get_width() / bounds.width;
	}
	,getY: function(event,bounds) {
		return (event.clientY - bounds.top) * this._stage.get_height() / bounds.height;
	}
	,createRenderer: function(canvas) {
		try {
			var gl = js_html__$CanvasElement_CanvasUtil.getContextWebGL(canvas,{ alpha : false, depth : false, failIfMajorPerformanceCaveat : true});
			if(gl != null) {
				if(flambe_platform_html_HtmlUtil.detectSlowDriver(gl)) null; else return new flambe_platform_html_WebGLRenderer(this._stage,gl);
			}
		} catch( _ ) {
		}
		return new flambe_platform_html_CanvasRenderer(canvas);
		return null;
	}
	,__class__: flambe_platform_html_HtmlPlatform
};
var flambe_util_Value = function(value,listener) {
	this._value = value;
	if(listener != null) this._changed = new flambe_util_Signal2(listener); else this._changed = null;
};
$hxClasses["flambe.util.Value"] = flambe_util_Value;
flambe_util_Value.__name__ = true;
flambe_util_Value.prototype = {
	watch: function(listener) {
		listener(this._value,this._value);
		return this.get_changed().connect(listener);
	}
	,set__: function(newValue) {
		var oldValue = this._value;
		if(newValue != oldValue) {
			this._value = newValue;
			if(this._changed != null) this._changed.emit(newValue,oldValue);
		}
		return newValue;
	}
	,get_changed: function() {
		if(this._changed == null) this._changed = new flambe_util_Signal2();
		return this._changed;
	}
	,__class__: flambe_util_Value
};
var flambe_util_SignalConnection = function(signal,listener) {
	this._next = null;
	this._signal = signal;
	this._listener = listener;
	this.stayInList = true;
};
$hxClasses["flambe.util.SignalConnection"] = flambe_util_SignalConnection;
flambe_util_SignalConnection.__name__ = true;
flambe_util_SignalConnection.__interfaces__ = [flambe_util_Disposable];
flambe_util_SignalConnection.prototype = {
	once: function() {
		this.stayInList = false;
		return this;
	}
	,dispose: function() {
		if(this._signal != null) {
			this._signal.disconnect(this);
			this._signal = null;
		}
	}
	,__class__: flambe_util_SignalConnection
};
var flambe_util_SignalBase = function(listener) {
	if(listener != null) this._head = new flambe_util_SignalConnection(this,listener); else this._head = null;
	this._deferredTasks = null;
};
$hxClasses["flambe.util.SignalBase"] = flambe_util_SignalBase;
flambe_util_SignalBase.__name__ = true;
flambe_util_SignalBase.prototype = {
	connectImpl: function(listener,prioritize) {
		var _g = this;
		var conn = new flambe_util_SignalConnection(this,listener);
		if(this._head == flambe_util_SignalBase.DISPATCHING_SENTINEL) this.defer(function() {
			_g.listAdd(conn,prioritize);
		}); else this.listAdd(conn,prioritize);
		return conn;
	}
	,disconnect: function(conn) {
		var _g = this;
		if(this._head == flambe_util_SignalBase.DISPATCHING_SENTINEL) this.defer(function() {
			_g.listRemove(conn);
		}); else this.listRemove(conn);
	}
	,defer: function(fn) {
		var tail = null;
		var p = this._deferredTasks;
		while(p != null) {
			tail = p;
			p = p.next;
		}
		var task = new flambe_util__$SignalBase_Task(fn);
		if(tail != null) tail.next = task; else this._deferredTasks = task;
	}
	,willEmit: function() {
		var snapshot = this._head;
		this._head = flambe_util_SignalBase.DISPATCHING_SENTINEL;
		return snapshot;
	}
	,didEmit: function(head) {
		this._head = head;
		var snapshot = this._deferredTasks;
		this._deferredTasks = null;
		while(snapshot != null) {
			snapshot.fn();
			snapshot = snapshot.next;
		}
	}
	,listAdd: function(conn,prioritize) {
		if(prioritize) {
			conn._next = this._head;
			this._head = conn;
		} else {
			var tail = null;
			var p = this._head;
			while(p != null) {
				tail = p;
				p = p._next;
			}
			if(tail != null) tail._next = conn; else this._head = conn;
		}
	}
	,listRemove: function(conn) {
		var prev = null;
		var p = this._head;
		while(p != null) {
			if(p == conn) {
				var next = p._next;
				if(prev == null) this._head = next; else prev._next = next;
				return;
			}
			prev = p;
			p = p._next;
		}
	}
	,__class__: flambe_util_SignalBase
};
var flambe_util_Signal2 = function(listener) {
	flambe_util_SignalBase.call(this,listener);
};
$hxClasses["flambe.util.Signal2"] = flambe_util_Signal2;
flambe_util_Signal2.__name__ = true;
flambe_util_Signal2.__super__ = flambe_util_SignalBase;
flambe_util_Signal2.prototype = $extend(flambe_util_SignalBase.prototype,{
	connect: function(listener,prioritize) {
		if(prioritize == null) prioritize = false;
		return this.connectImpl(listener,prioritize);
	}
	,emit: function(arg1,arg2) {
		var _g = this;
		if(this._head == flambe_util_SignalBase.DISPATCHING_SENTINEL) this.defer(function() {
			_g.emitImpl(arg1,arg2);
		}); else this.emitImpl(arg1,arg2);
	}
	,emitImpl: function(arg1,arg2) {
		var head = this.willEmit();
		var p = head;
		while(p != null) {
			p._listener(arg1,arg2);
			if(!p.stayInList) p.dispose();
			p = p._next;
		}
		this.didEmit(head);
	}
	,__class__: flambe_util_Signal2
});
var flambe_util_Signal1 = function(listener) {
	flambe_util_SignalBase.call(this,listener);
};
$hxClasses["flambe.util.Signal1"] = flambe_util_Signal1;
flambe_util_Signal1.__name__ = true;
flambe_util_Signal1.__super__ = flambe_util_SignalBase;
flambe_util_Signal1.prototype = $extend(flambe_util_SignalBase.prototype,{
	connect: function(listener,prioritize) {
		if(prioritize == null) prioritize = false;
		return this.connectImpl(listener,prioritize);
	}
	,emit: function(arg1) {
		var _g = this;
		if(this._head == flambe_util_SignalBase.DISPATCHING_SENTINEL) this.defer(function() {
			_g.emitImpl(arg1);
		}); else this.emitImpl(arg1);
	}
	,emitImpl: function(arg1) {
		var head = this.willEmit();
		var p = head;
		while(p != null) {
			p._listener(arg1);
			if(!p.stayInList) p.dispose();
			p = p._next;
		}
		this.didEmit(head);
	}
	,__class__: flambe_util_Signal1
});
var flambe_animation_AnimatedFloat = function(value,listener) {
	this._behavior = null;
	flambe_util_Value.call(this,value,listener);
};
$hxClasses["flambe.animation.AnimatedFloat"] = flambe_animation_AnimatedFloat;
flambe_animation_AnimatedFloat.__name__ = true;
flambe_animation_AnimatedFloat.__super__ = flambe_util_Value;
flambe_animation_AnimatedFloat.prototype = $extend(flambe_util_Value.prototype,{
	set__: function(value) {
		this._behavior = null;
		return flambe_util_Value.prototype.set__.call(this,value);
	}
	,update: function(dt) {
		if(this._behavior != null) {
			flambe_util_Value.prototype.set__.call(this,this._behavior.update(dt));
			if(this._behavior.isComplete()) this._behavior = null;
		}
	}
	,set_behavior: function(behavior) {
		this._behavior = behavior;
		this.update(0);
		return behavior;
	}
	,__class__: flambe_animation_AnimatedFloat
});
var flambe_System = function() { };
$hxClasses["flambe.System"] = flambe_System;
flambe_System.__name__ = true;
flambe_System.init = function() {
	if(!flambe_System._calledInit) {
		flambe_System._platform.init();
		flambe_System._calledInit = true;
	}
};
var flambe_Log = function() { };
$hxClasses["flambe.Log"] = flambe_Log;
flambe_Log.__name__ = true;
flambe_Log.info = function(text,args) {
	null;
};
flambe_Log.__super__ = flambe_util_PackageLog;
flambe_Log.prototype = $extend(flambe_util_PackageLog.prototype,{
	__class__: flambe_Log
});
var flambe_SpeedAdjuster = function() {
	this._realDt = 0;
};
$hxClasses["flambe.SpeedAdjuster"] = flambe_SpeedAdjuster;
flambe_SpeedAdjuster.__name__ = true;
flambe_SpeedAdjuster.__super__ = flambe_Component;
flambe_SpeedAdjuster.prototype = $extend(flambe_Component.prototype,{
	get_name: function() {
		return "SpeedAdjuster_2";
	}
	,onUpdate: function(dt) {
		if(this._realDt > 0) {
			dt = this._realDt;
			this._realDt = 0;
		}
		this.scale.update(dt);
	}
	,__class__: flambe_SpeedAdjuster
});
var flambe_animation_Behavior = function() { };
$hxClasses["flambe.animation.Behavior"] = flambe_animation_Behavior;
flambe_animation_Behavior.__name__ = true;
flambe_animation_Behavior.prototype = {
	__class__: flambe_animation_Behavior
};
var flambe_animation_Sine = function(start,end,speed,cycles,offset) {
	if(offset == null) offset = 0;
	if(cycles == null) cycles = 0;
	if(speed == null) speed = 1;
	this.start = start;
	this.end = end;
	this.cycles = cycles;
	this.speed = new flambe_animation_AnimatedFloat(speed);
	this._count = 1.57079632679489656 + offset * (3.141592653589793 / speed);
	this._distance = (start - end) * .5;
	this._center = end + this._distance;
};
$hxClasses["flambe.animation.Sine"] = flambe_animation_Sine;
flambe_animation_Sine.__name__ = true;
flambe_animation_Sine.__interfaces__ = [flambe_animation_Behavior];
flambe_animation_Sine.prototype = {
	update: function(dt) {
		this.speed.update(dt);
		this._count += dt * (3.141592653589793 / this.speed._value);
		return this._center + Math.sin(this._count) * this._distance;
	}
	,isComplete: function() {
		return this.cycles > 0 && (this._count - 1.57079632679489656) / 3.141592653589793 * .5 >= this.cycles;
	}
	,__class__: flambe_animation_Sine
};
var flambe_asset_Asset = function() { };
$hxClasses["flambe.asset.Asset"] = flambe_asset_Asset;
flambe_asset_Asset.__name__ = true;
flambe_asset_Asset.__interfaces__ = [flambe_util_Disposable];
flambe_asset_Asset.prototype = {
	__class__: flambe_asset_Asset
};
var flambe_asset_AssetFormat = $hxClasses["flambe.asset.AssetFormat"] = { __ename__ : true, __constructs__ : ["WEBP","JXR","PNG","JPG","GIF","DDS","PVR","PKM","MP3","M4A","OPUS","OGG","WAV","Data"] };
flambe_asset_AssetFormat.WEBP = ["WEBP",0];
flambe_asset_AssetFormat.WEBP.toString = $estr;
flambe_asset_AssetFormat.WEBP.__enum__ = flambe_asset_AssetFormat;
flambe_asset_AssetFormat.JXR = ["JXR",1];
flambe_asset_AssetFormat.JXR.toString = $estr;
flambe_asset_AssetFormat.JXR.__enum__ = flambe_asset_AssetFormat;
flambe_asset_AssetFormat.PNG = ["PNG",2];
flambe_asset_AssetFormat.PNG.toString = $estr;
flambe_asset_AssetFormat.PNG.__enum__ = flambe_asset_AssetFormat;
flambe_asset_AssetFormat.JPG = ["JPG",3];
flambe_asset_AssetFormat.JPG.toString = $estr;
flambe_asset_AssetFormat.JPG.__enum__ = flambe_asset_AssetFormat;
flambe_asset_AssetFormat.GIF = ["GIF",4];
flambe_asset_AssetFormat.GIF.toString = $estr;
flambe_asset_AssetFormat.GIF.__enum__ = flambe_asset_AssetFormat;
flambe_asset_AssetFormat.DDS = ["DDS",5];
flambe_asset_AssetFormat.DDS.toString = $estr;
flambe_asset_AssetFormat.DDS.__enum__ = flambe_asset_AssetFormat;
flambe_asset_AssetFormat.PVR = ["PVR",6];
flambe_asset_AssetFormat.PVR.toString = $estr;
flambe_asset_AssetFormat.PVR.__enum__ = flambe_asset_AssetFormat;
flambe_asset_AssetFormat.PKM = ["PKM",7];
flambe_asset_AssetFormat.PKM.toString = $estr;
flambe_asset_AssetFormat.PKM.__enum__ = flambe_asset_AssetFormat;
flambe_asset_AssetFormat.MP3 = ["MP3",8];
flambe_asset_AssetFormat.MP3.toString = $estr;
flambe_asset_AssetFormat.MP3.__enum__ = flambe_asset_AssetFormat;
flambe_asset_AssetFormat.M4A = ["M4A",9];
flambe_asset_AssetFormat.M4A.toString = $estr;
flambe_asset_AssetFormat.M4A.__enum__ = flambe_asset_AssetFormat;
flambe_asset_AssetFormat.OPUS = ["OPUS",10];
flambe_asset_AssetFormat.OPUS.toString = $estr;
flambe_asset_AssetFormat.OPUS.__enum__ = flambe_asset_AssetFormat;
flambe_asset_AssetFormat.OGG = ["OGG",11];
flambe_asset_AssetFormat.OGG.toString = $estr;
flambe_asset_AssetFormat.OGG.__enum__ = flambe_asset_AssetFormat;
flambe_asset_AssetFormat.WAV = ["WAV",12];
flambe_asset_AssetFormat.WAV.toString = $estr;
flambe_asset_AssetFormat.WAV.__enum__ = flambe_asset_AssetFormat;
flambe_asset_AssetFormat.Data = ["Data",13];
flambe_asset_AssetFormat.Data.toString = $estr;
flambe_asset_AssetFormat.Data.__enum__ = flambe_asset_AssetFormat;
var flambe_asset_AssetEntry = function(name,url,format,bytes) {
	this.name = name;
	this.url = url;
	this.format = format;
	this.bytes = bytes;
};
$hxClasses["flambe.asset.AssetEntry"] = flambe_asset_AssetEntry;
flambe_asset_AssetEntry.__name__ = true;
flambe_asset_AssetEntry.prototype = {
	__class__: flambe_asset_AssetEntry
};
var flambe_asset_AssetPack = function() { };
$hxClasses["flambe.asset.AssetPack"] = flambe_asset_AssetPack;
flambe_asset_AssetPack.__name__ = true;
flambe_asset_AssetPack.__interfaces__ = [flambe_util_Disposable];
flambe_asset_AssetPack.prototype = {
	__class__: flambe_asset_AssetPack
};
var flambe_asset_File = function() { };
$hxClasses["flambe.asset.File"] = flambe_asset_File;
flambe_asset_File.__name__ = true;
flambe_asset_File.__interfaces__ = [flambe_asset_Asset];
flambe_asset_File.prototype = {
	__class__: flambe_asset_File
};
var flambe_asset_Manifest = function() {
	this._remoteBase = null;
	this._localBase = null;
	this._entries = [];
};
$hxClasses["flambe.asset.Manifest"] = flambe_asset_Manifest;
flambe_asset_Manifest.__name__ = true;
flambe_asset_Manifest.fromAssets = function(packName,required) {
	if(required == null) required = true;
	var packData = Reflect.field(haxe_rtti_Meta.getType(flambe_asset_Manifest).assets[0],packName);
	if(packData == null) {
		if(required) throw flambe_util_Strings.withFields("Missing asset pack",["name",packName]);
		return null;
	}
	var manifest = new flambe_asset_Manifest();
	manifest.set_localBase("assets");
	var _g = 0;
	while(_g < packData.length) {
		var asset = packData[_g];
		++_g;
		var name = asset.name;
		var path = packName + "/" + name + "?v=" + Std.string(asset.md5);
		var format = flambe_asset_Manifest.inferFormat(name);
		if(format != flambe_asset_AssetFormat.Data) name = flambe_util_Strings.removeFileExtension(name);
		manifest.add(name,path,asset.bytes,format);
	}
	return manifest;
};
flambe_asset_Manifest.inferFormat = function(url) {
	var extension = flambe_util_Strings.getUrlExtension(url);
	if(extension != null) {
		var _g = extension.toLowerCase();
		switch(_g) {
		case "gif":
			return flambe_asset_AssetFormat.GIF;
		case "jpg":case "jpeg":
			return flambe_asset_AssetFormat.JPG;
		case "jxr":case "wdp":
			return flambe_asset_AssetFormat.JXR;
		case "png":
			return flambe_asset_AssetFormat.PNG;
		case "webp":
			return flambe_asset_AssetFormat.WEBP;
		case "dds":
			return flambe_asset_AssetFormat.DDS;
		case "pvr":
			return flambe_asset_AssetFormat.PVR;
		case "pkm":
			return flambe_asset_AssetFormat.PKM;
		case "m4a":
			return flambe_asset_AssetFormat.M4A;
		case "mp3":
			return flambe_asset_AssetFormat.MP3;
		case "ogg":
			return flambe_asset_AssetFormat.OGG;
		case "opus":
			return flambe_asset_AssetFormat.OPUS;
		case "wav":
			return flambe_asset_AssetFormat.WAV;
		}
	} else null;
	return flambe_asset_AssetFormat.Data;
};
flambe_asset_Manifest.prototype = {
	add: function(name,url,bytes,format) {
		if(bytes == null) bytes = 0;
		if(format == null) format = flambe_asset_Manifest.inferFormat(url);
		var entry = new flambe_asset_AssetEntry(name,url,format,bytes);
		this._entries.push(entry);
		return entry;
	}
	,iterator: function() {
		return HxOverrides.iter(this._entries);
	}
	,getFullURL: function(entry) {
		var basePath;
		if(this.get_remoteBase() != null && flambe_asset_Manifest._supportsCrossOrigin) basePath = this.get_remoteBase(); else basePath = this.get_localBase();
		if(basePath != null) return flambe_util_Strings.joinPath(basePath,entry.url); else return entry.url;
	}
	,get_localBase: function() {
		return this._localBase;
	}
	,set_localBase: function(localBase) {
		if(localBase != null) flambe_util_Assert.that(!StringTools.startsWith(localBase,"http://") && !StringTools.startsWith(localBase,"https://"),"localBase must be a path on the same domain, NOT starting with http(s)://",null);
		return this._localBase = localBase;
	}
	,get_remoteBase: function() {
		return this._remoteBase;
	}
	,__class__: flambe_asset_Manifest
};
var flambe_display_BlendMode = $hxClasses["flambe.display.BlendMode"] = { __ename__ : true, __constructs__ : ["Normal","Add","Mask","Copy"] };
flambe_display_BlendMode.Normal = ["Normal",0];
flambe_display_BlendMode.Normal.toString = $estr;
flambe_display_BlendMode.Normal.__enum__ = flambe_display_BlendMode;
flambe_display_BlendMode.Add = ["Add",1];
flambe_display_BlendMode.Add.toString = $estr;
flambe_display_BlendMode.Add.__enum__ = flambe_display_BlendMode;
flambe_display_BlendMode.Mask = ["Mask",2];
flambe_display_BlendMode.Mask.toString = $estr;
flambe_display_BlendMode.Mask.__enum__ = flambe_display_BlendMode;
flambe_display_BlendMode.Copy = ["Copy",3];
flambe_display_BlendMode.Copy.toString = $estr;
flambe_display_BlendMode.Copy.__enum__ = flambe_display_BlendMode;
var flambe_math_Point = function(x,y) {
	if(y == null) y = 0;
	if(x == null) x = 0;
	this.x = x;
	this.y = y;
};
$hxClasses["flambe.math.Point"] = flambe_math_Point;
flambe_math_Point.__name__ = true;
flambe_math_Point.prototype = {
	__class__: flambe_math_Point
};
var flambe_display_Sprite = function() {
	this.scissor = null;
	this.blendMode = null;
	var _g = this;
	this._flags = 139;
	this._localMatrix = new flambe_math_Matrix();
	var dirtyMatrix = function(_,_1) {
		_g._flags = _g._flags | 12;
	};
	this.x = new flambe_animation_AnimatedFloat(0,dirtyMatrix);
	this.y = new flambe_animation_AnimatedFloat(0,dirtyMatrix);
	this.rotation = new flambe_animation_AnimatedFloat(0,dirtyMatrix);
	this.scaleX = new flambe_animation_AnimatedFloat(1,dirtyMatrix);
	this.scaleY = new flambe_animation_AnimatedFloat(1,dirtyMatrix);
	this.anchorX = new flambe_animation_AnimatedFloat(0,dirtyMatrix);
	this.anchorY = new flambe_animation_AnimatedFloat(0,dirtyMatrix);
	this.alpha = new flambe_animation_AnimatedFloat(1);
};
$hxClasses["flambe.display.Sprite"] = flambe_display_Sprite;
flambe_display_Sprite.__name__ = true;
flambe_display_Sprite.hitTest = function(entity,x,y) {
	var sprite = entity._compMap.Sprite_0;
	if(sprite != null) {
		if(!((sprite._flags & 3) == 3)) return null;
		if(sprite.getLocalMatrix().inverseTransform(x,y,flambe_display_Sprite._scratchPoint)) {
			x = flambe_display_Sprite._scratchPoint.x;
			y = flambe_display_Sprite._scratchPoint.y;
		}
		var scissor = sprite.scissor;
		if(scissor != null && !scissor.contains(x,y)) return null;
	}
	var result = flambe_display_Sprite.hitTestBackwards(entity.firstChild,x,y);
	if(result != null) return result;
	if(sprite != null && sprite.containsLocal(x,y)) return sprite; else return null;
};
flambe_display_Sprite.render = function(entity,g) {
	var sprite = entity._compMap.Sprite_0;
	if(sprite != null) {
		var alpha = sprite.alpha._value;
		if(!((sprite._flags & 1) != 0) || alpha <= 0) return;
		g.save();
		if(alpha < 1) g.multiplyAlpha(alpha);
		if(sprite.blendMode != null) g.setBlendMode(sprite.blendMode);
		var matrix = sprite.getLocalMatrix();
		var m02 = matrix.m02;
		var m12 = matrix.m12;
		if((sprite._flags & 128) != 0) {
			m02 = Math.round(m02);
			m12 = Math.round(m12);
		}
		g.transform(matrix.m00,matrix.m10,matrix.m01,matrix.m11,m02,m12);
		var scissor = sprite.scissor;
		if(scissor != null) g.applyScissor(scissor.x,scissor.y,scissor.width,scissor.height);
		sprite.draw(g);
	}
	var director = entity._compMap.Director_1;
	if(director != null) {
		var scenes = director.occludedScenes;
		var _g = 0;
		while(_g < scenes.length) {
			var scene = scenes[_g];
			++_g;
			flambe_display_Sprite.render(scene,g);
		}
	}
	var p = entity.firstChild;
	while(p != null) {
		var next = p.next;
		flambe_display_Sprite.render(p,g);
		p = next;
	}
	if(sprite != null) g.restore();
};
flambe_display_Sprite.hitTestBackwards = function(entity,x,y) {
	if(entity != null) {
		var result = flambe_display_Sprite.hitTestBackwards(entity.next,x,y);
		if(result != null) return result; else return flambe_display_Sprite.hitTest(entity,x,y);
	}
	return null;
};
flambe_display_Sprite.__super__ = flambe_Component;
flambe_display_Sprite.prototype = $extend(flambe_Component.prototype,{
	get_name: function() {
		return "Sprite_0";
	}
	,getNaturalWidth: function() {
		return 0;
	}
	,getNaturalHeight: function() {
		return 0;
	}
	,containsLocal: function(localX,localY) {
		return localX >= 0 && localX < this.getNaturalWidth() && localY >= 0 && localY < this.getNaturalHeight();
	}
	,getLocalMatrix: function() {
		if((this._flags & 4) != 0) {
			this._flags = this._flags & -5;
			this._localMatrix.compose(this.x._value,this.y._value,this.scaleX._value,this.scaleY._value,this.rotation._value * 3.141592653589793 / 180);
			this._localMatrix.translate(-this.anchorX._value,-this.anchorY._value);
		}
		return this._localMatrix;
	}
	,setXY: function(x,y) {
		this.x.set__(x);
		this.y.set__(y);
		return this;
	}
	,onAdded: function() {
		if((this._flags & 256) != 0) this.connectHover();
	}
	,onRemoved: function() {
		if(this._hoverConnection != null) {
			this._hoverConnection.dispose();
			this._hoverConnection = null;
		}
	}
	,onUpdate: function(dt) {
		this.x.update(dt);
		this.y.update(dt);
		this.rotation.update(dt);
		this.scaleX.update(dt);
		this.scaleY.update(dt);
		this.alpha.update(dt);
		this.anchorX.update(dt);
		this.anchorY.update(dt);
	}
	,draw: function(g) {
	}
	,getParentSprite: function() {
		if(this.owner == null) return null;
		var entity = this.owner.parent;
		while(entity != null) {
			var sprite = entity._compMap.Sprite_0;
			if(sprite != null) return sprite;
			entity = entity.parent;
		}
		return null;
	}
	,connectHover: function() {
		var _g = this;
		if(this._hoverConnection != null) return;
		this._hoverConnection = flambe_System._platform.getPointer().move.connect(function(event) {
			var hit = event.hit;
			while(hit != null) {
				if(hit == _g) return;
				hit = hit.getParentSprite();
			}
			if(_g._pointerOut != null && (_g._flags & 256) != 0) _g._pointerOut.emit(event);
			_g._flags = _g._flags & -257;
			_g._hoverConnection.dispose();
			_g._hoverConnection = null;
		});
	}
	,set_visible: function(visible) {
		this._flags = flambe_util_BitSets.set(this._flags,1,visible);
		return visible;
	}
	,onPointerDown: function(event) {
		this.onHover(event);
		if(this._pointerDown != null) this._pointerDown.emit(event);
	}
	,onPointerMove: function(event) {
		this.onHover(event);
		if(this._pointerMove != null) this._pointerMove.emit(event);
	}
	,onHover: function(event) {
		if((this._flags & 256) != 0) return;
		this._flags = this._flags | 256;
		if(this._pointerIn != null || this._pointerOut != null) {
			if(this._pointerIn != null) this._pointerIn.emit(event);
			this.connectHover();
		}
	}
	,onPointerUp: function(event) {
		{
			var _g = event.source;
			switch(_g[1]) {
			case 1:
				var point = _g[2];
				if(this._pointerOut != null && (this._flags & 256) != 0) this._pointerOut.emit(event);
				this._flags = this._flags & -257;
				if(this._hoverConnection != null) {
					this._hoverConnection.dispose();
					this._hoverConnection = null;
				}
				break;
			default:
			}
		}
		if(this._pointerUp != null) this._pointerUp.emit(event);
	}
	,__class__: flambe_display_Sprite
});
var flambe_display_FillSprite = function(color,width,height) {
	flambe_display_Sprite.call(this);
	this.color = color;
	this.width = new flambe_animation_AnimatedFloat(width);
	this.height = new flambe_animation_AnimatedFloat(height);
};
$hxClasses["flambe.display.FillSprite"] = flambe_display_FillSprite;
flambe_display_FillSprite.__name__ = true;
flambe_display_FillSprite.__super__ = flambe_display_Sprite;
flambe_display_FillSprite.prototype = $extend(flambe_display_Sprite.prototype,{
	draw: function(g) {
		g.fillRect(this.color,0,0,this.width._value,this.height._value);
	}
	,getNaturalWidth: function() {
		return this.width._value;
	}
	,getNaturalHeight: function() {
		return this.height._value;
	}
	,onUpdate: function(dt) {
		flambe_display_Sprite.prototype.onUpdate.call(this,dt);
		this.width.update(dt);
		this.height.update(dt);
	}
	,__class__: flambe_display_FillSprite
});
var flambe_display_Graphics = function() { };
$hxClasses["flambe.display.Graphics"] = flambe_display_Graphics;
flambe_display_Graphics.__name__ = true;
flambe_display_Graphics.prototype = {
	__class__: flambe_display_Graphics
};
var flambe_display_Orientation = $hxClasses["flambe.display.Orientation"] = { __ename__ : true, __constructs__ : ["Portrait","Landscape"] };
flambe_display_Orientation.Portrait = ["Portrait",0];
flambe_display_Orientation.Portrait.toString = $estr;
flambe_display_Orientation.Portrait.__enum__ = flambe_display_Orientation;
flambe_display_Orientation.Landscape = ["Landscape",1];
flambe_display_Orientation.Landscape.toString = $estr;
flambe_display_Orientation.Landscape.__enum__ = flambe_display_Orientation;
var flambe_display_Texture = function() { };
$hxClasses["flambe.display.Texture"] = flambe_display_Texture;
flambe_display_Texture.__name__ = true;
flambe_display_Texture.__interfaces__ = [flambe_asset_Asset];
var flambe_display_SubTexture = function() { };
$hxClasses["flambe.display.SubTexture"] = flambe_display_SubTexture;
flambe_display_SubTexture.__name__ = true;
flambe_display_SubTexture.__interfaces__ = [flambe_display_Texture];
var flambe_input_MouseButton = $hxClasses["flambe.input.MouseButton"] = { __ename__ : true, __constructs__ : ["Left","Middle","Right","Unknown"] };
flambe_input_MouseButton.Left = ["Left",0];
flambe_input_MouseButton.Left.toString = $estr;
flambe_input_MouseButton.Left.__enum__ = flambe_input_MouseButton;
flambe_input_MouseButton.Middle = ["Middle",1];
flambe_input_MouseButton.Middle.toString = $estr;
flambe_input_MouseButton.Middle.__enum__ = flambe_input_MouseButton;
flambe_input_MouseButton.Right = ["Right",2];
flambe_input_MouseButton.Right.toString = $estr;
flambe_input_MouseButton.Right.__enum__ = flambe_input_MouseButton;
flambe_input_MouseButton.Unknown = function(buttonCode) { var $x = ["Unknown",3,buttonCode]; $x.__enum__ = flambe_input_MouseButton; $x.toString = $estr; return $x; };
var flambe_input_MouseCursor = $hxClasses["flambe.input.MouseCursor"] = { __ename__ : true, __constructs__ : ["Default","Button","None"] };
flambe_input_MouseCursor.Default = ["Default",0];
flambe_input_MouseCursor.Default.toString = $estr;
flambe_input_MouseCursor.Default.__enum__ = flambe_input_MouseCursor;
flambe_input_MouseCursor.Button = ["Button",1];
flambe_input_MouseCursor.Button.toString = $estr;
flambe_input_MouseCursor.Button.__enum__ = flambe_input_MouseCursor;
flambe_input_MouseCursor.None = ["None",2];
flambe_input_MouseCursor.None.toString = $estr;
flambe_input_MouseCursor.None.__enum__ = flambe_input_MouseCursor;
var flambe_input_MouseEvent = function() {
	this.init(0,0,0,null);
};
$hxClasses["flambe.input.MouseEvent"] = flambe_input_MouseEvent;
flambe_input_MouseEvent.__name__ = true;
flambe_input_MouseEvent.prototype = {
	init: function(id,viewX,viewY,button) {
		this.id = id;
		this.viewX = viewX;
		this.viewY = viewY;
		this.button = button;
	}
	,__class__: flambe_input_MouseEvent
};
var flambe_input_EventSource = $hxClasses["flambe.input.EventSource"] = { __ename__ : true, __constructs__ : ["Mouse","Touch"] };
flambe_input_EventSource.Mouse = function(event) { var $x = ["Mouse",0,event]; $x.__enum__ = flambe_input_EventSource; $x.toString = $estr; return $x; };
flambe_input_EventSource.Touch = function(point) { var $x = ["Touch",1,point]; $x.__enum__ = flambe_input_EventSource; $x.toString = $estr; return $x; };
var flambe_input_PointerEvent = function() {
	this.init(0,0,0,null,null);
};
$hxClasses["flambe.input.PointerEvent"] = flambe_input_PointerEvent;
flambe_input_PointerEvent.__name__ = true;
flambe_input_PointerEvent.prototype = {
	init: function(id,viewX,viewY,hit,source) {
		this.id = id;
		this.viewX = viewX;
		this.viewY = viewY;
		this.hit = hit;
		this.source = source;
		this._stopped = false;
	}
	,__class__: flambe_input_PointerEvent
};
var flambe_input_TouchPoint = function(id) {
	this.id = id;
	this._source = flambe_input_EventSource.Touch(this);
};
$hxClasses["flambe.input.TouchPoint"] = flambe_input_TouchPoint;
flambe_input_TouchPoint.__name__ = true;
flambe_input_TouchPoint.prototype = {
	init: function(viewX,viewY) {
		this.viewX = viewX;
		this.viewY = viewY;
	}
	,__class__: flambe_input_TouchPoint
};
var flambe_map_MapSprite = function(width,height,mapWidth,mapHeight) {
	if(mapHeight == null) mapHeight = 0;
	if(mapWidth == null) mapWidth = 0;
	this.mapHeight = 0;
	this.mapWidth = 0;
	var _g = this;
	flambe_display_Sprite.call(this);
	this._layers = [];
	this._names = new haxe_ds_StringMap();
	var onSizeChange = function(v,p) {
		if(mapWidth > 0 && _g.width._value > mapWidth) _g.width.set__(mapWidth);
		if(mapHeight > 0 && _g.height._value > mapHeight) _g.height.set__(mapHeight);
	};
	this.width = new flambe_animation_AnimatedFloat(width,onSizeChange);
	this.height = new flambe_animation_AnimatedFloat(height,onSizeChange);
	this.mapWidth = mapWidth;
	this.mapHeight = mapHeight;
	onSizeChange(0,0);
	this.camera = new flambe_map_camera_BasicCamera();
};
$hxClasses["flambe.map.MapSprite"] = flambe_map_MapSprite;
flambe_map_MapSprite.__name__ = true;
flambe_map_MapSprite.__super__ = flambe_display_Sprite;
flambe_map_MapSprite.prototype = $extend(flambe_display_Sprite.prototype,{
	draw: function(g) {
		g.applyScissor(0,0,this.width._value,this.height._value);
	}
	,getNaturalWidth: function() {
		return this.width._value;
	}
	,getNaturalHeight: function() {
		return this.height._value;
	}
	,addLayer: function(id,layer) {
		var s = layer._compMap.Sprite_0;
		if(s == null) layer.add(s = new flambe_display_Sprite());
		s.getLocalMatrix().set(1,0,0,1,-this.camera.region.x,-this.camera.region.y);
		if(Type.getClass(s) == flambe_map_TileSprite) {
			var ts = s;
			if(ts.region == null) ts.region = new flambe_math_Rectangle(-this.camera.x._value,-this.camera.y._value,this.width._value,this.height._value);
		}
		this._layers.push(layer);
		this._names.set(id,layer);
		if(this.owner != null) this.owner.addChild(layer);
	}
	,onUpdate: function(dt) {
		flambe_display_Sprite.prototype.onUpdate.call(this,dt);
		this.width.update(dt);
		this.height.update(dt);
		this.camera.onUpdate(dt,this);
		var ii = this._layers.length;
		while(ii-- > 0) {
			var layer = this._layers[ii]._compMap.Sprite_0;
			if(Type.getClass(layer) == flambe_map_TileSprite) (js_Boot.__cast(layer , flambe_map_TileSprite)).region.set(-this.camera.region.x,-this.camera.region.y,this.width._value,this.height._value);
			layer.getLocalMatrix().set(1,0,0,1,-this.camera.region.x,-this.camera.region.y);
		}
	}
	,onAdded: function() {
		var _g = 0;
		var _g1 = this._layers;
		while(_g < _g1.length) {
			var layer = _g1[_g];
			++_g;
			this.owner.addChild(layer);
		}
	}
	,onRemoved: function() {
		var _g = 0;
		var _g1 = this._layers;
		while(_g < _g1.length) {
			var layer = _g1[_g];
			++_g;
			this.owner.removeChild(layer);
		}
	}
	,dispose: function() {
		flambe_display_Sprite.prototype.dispose.call(this);
		var _g = 0;
		var _g1 = this._layers;
		while(_g < _g1.length) {
			var layer = _g1[_g];
			++_g;
			layer.dispose();
		}
		this._layers.length = 0;
	}
	,__class__: flambe_map_MapSprite
});
var flambe_map_TileSprite = function(symbols,tileWidth,tileHeight) {
	flambe_display_Sprite.call(this);
	this.symbols = symbols;
	this.tileWidth = tileWidth;
	this.tileHeight = tileHeight;
	this._tiles = [];
};
$hxClasses["flambe.map.TileSprite"] = flambe_map_TileSprite;
flambe_map_TileSprite.__name__ = true;
flambe_map_TileSprite.__super__ = flambe_display_Sprite;
flambe_map_TileSprite.prototype = $extend(flambe_display_Sprite.prototype,{
	fromArray: function(tiles,columns,rows) {
		this._tiles = tiles;
		this.columns = columns;
		this.rows = rows;
		return this;
	}
	,draw: function(g) {
		if(!((this._flags & 1) != 0) || this.alpha._value == 0) return;
		var columnLength = this.columns;
		var rowLength = this.rows;
		var sX = 0;
		var sY = 0;
		if(this.region != null) {
			sX = this.region.x;
			sY = this.region.y;
			columnLength = flambe_math_FMath.clamp(Math.ceil((this.region.width + this.tileWidth) / this.tileWidth),0,Math.ceil((this.columns * this.tileWidth + sX) / this.tileWidth));
			rowLength = flambe_math_FMath.clamp(Math.ceil((this.region.height + this.tileHeight) / this.tileHeight),0,Math.ceil((this.rows * this.tileHeight + sY) / this.tileHeight));
		}
		var _g = 0;
		while(_g < columnLength) {
			var x = _g++;
			var tileX = Math.floor(x - sX / this.tileWidth);
			var paintX = tileX * this.tileWidth;
			var _g1 = 0;
			while(_g1 < rowLength) {
				var y = _g1++;
				var tileY = Math.floor(y - sY / this.tileHeight);
				var paintY = tileY * this.tileHeight;
				var gid = this._tiles[tileX + tileY * this.columns];
				if(gid > 0) {
					var symbol = this.symbols[gid];
					g.drawSubTexture(symbol.atlas,paintX,paintY,symbol.x,symbol.y,symbol.width,symbol.height);
				}
			}
		}
	}
	,getNaturalWidth: function() {
		return this.columns * this.tileWidth;
	}
	,getNaturalHeight: function() {
		return this.rows * this.tileHeight;
	}
	,__class__: flambe_map_TileSprite
});
var flambe_map_TileSymbol = function(id,atlas,x,y,width,height) {
	this.id = id;
	this.atlas = atlas;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
};
$hxClasses["flambe.map.TileSymbol"] = flambe_map_TileSymbol;
flambe_map_TileSymbol.__name__ = true;
flambe_map_TileSymbol.prototype = {
	__class__: flambe_map_TileSymbol
};
var flambe_map_camera_Camera = function() { };
$hxClasses["flambe.map.camera.Camera"] = flambe_map_camera_Camera;
flambe_map_camera_Camera.__name__ = true;
flambe_map_camera_Camera.prototype = {
	__class__: flambe_map_camera_Camera
};
var flambe_map_camera_BasicCamera = function() {
	this.x = new flambe_animation_AnimatedFloat(0);
	this.y = new flambe_animation_AnimatedFloat(0);
	this.region = new flambe_math_Rectangle();
};
$hxClasses["flambe.map.camera.BasicCamera"] = flambe_map_camera_BasicCamera;
flambe_map_camera_BasicCamera.__name__ = true;
flambe_map_camera_BasicCamera.__interfaces__ = [flambe_map_camera_Camera];
flambe_map_camera_BasicCamera.prototype = {
	onUpdate: function(dt,mapSprite) {
		this.x.update(dt);
		this.y.update(dt);
		this.applyPosition(mapSprite,this.x._value,this.y._value);
	}
	,applyPosition: function(mapSprite,x,y) {
		var unusedWidth = mapSprite.mapWidth - mapSprite.width._value;
		var unusedHeight = mapSprite.mapHeight - mapSprite.height._value;
		if(mapSprite.mapWidth > 0) x = flambe_math_FMath.clamp(x,0,unusedWidth);
		if(mapSprite.mapHeight > 0) y = flambe_math_FMath.clamp(y,0,unusedHeight);
		this.region.set(x,y,unusedWidth,unusedHeight);
	}
	,__class__: flambe_map_camera_BasicCamera
};
var flambe_map_tmx_TmxParser = function(pack,tmxPath) {
	var aBase = tmxPath.split("/");
	aBase.pop();
	var basePath = aBase.join("/");
	this._file = pack.getFile(tmxPath + ".json");
	this.reloaded = new flambe_util_Signal0();
	if(basePath.length > 0) basePath = basePath + "/";
	this.symbols = [];
	this._binds = [this._file.get_reloadCount().get_changed().connect($bind(this,this.onTmxFileReload))];
	this.onTmxFileReload(0,0);
	var _g1 = 0;
	var _g = this.map.tilesets.length;
	while(_g1 < _g) {
		var i = _g1++;
		var tileset = this.map.tilesets[i];
		if(tileset.tileoffset == null) tileset.tileoffset = { x : 0, y : 0};
		var gid = tileset.firstgid;
		var offsetX = tileset.tileoffset.x;
		var offsetY = tileset.tileoffset.y;
		var nWidth = Math.floor((tileset.imagewidth - offsetX) / (tileset.tilewidth + tileset.spacing));
		var nHeight = Math.floor((tileset.imageheight - offsetY) / (tileset.tileheight + tileset.spacing));
		var nTiles = nWidth * nHeight;
		var atlas = pack.getTexture(basePath + flambe_util_Strings.removeFileExtension(tileset.image));
		var x = 0;
		var y = 0;
		var c = 0;
		while(c++ < nTiles) {
			x++;
			if(x > nWidth) {
				y++;
				x = 0;
			}
			var nPosY = Math.ceil(c / nWidth) - 1;
			var nPosX = c - nWidth * nPosY - 1;
			nPosY *= tileset.tileheight + tileset.spacing;
			nPosX *= tileset.tilewidth + tileset.spacing;
			this.symbols[gid] = new flambe_map_TileSymbol(gid,atlas,Math.round(offsetX) + nPosX,Math.round(offsetY) + nPosY,tileset.tilewidth,tileset.tileheight);
			gid++;
		}
		if(tileset.tileproperties != null) {
			var keys = Reflect.fields(tileset.tileproperties);
			var _g2 = 0;
			while(_g2 < keys.length) {
				var id = keys[_g2];
				++_g2;
				var props = Reflect.field(tileset.tileproperties,id);
				var gid1 = Std.parseInt(id) + tileset.firstgid;
				this.symbols[gid1].data = props;
			}
		}
	}
};
$hxClasses["flambe.map.tmx.TmxParser"] = flambe_map_tmx_TmxParser;
flambe_map_tmx_TmxParser.__name__ = true;
flambe_map_tmx_TmxParser.__interfaces__ = [flambe_util_Disposable];
flambe_map_tmx_TmxParser.prototype = {
	newMap: function(width,height,mapWidth,mapHeight) {
		if(mapHeight == null) mapHeight = 0;
		if(mapWidth == null) mapWidth = 0;
		if(mapWidth == 0) mapWidth = this.map.width * this.map.tilewidth; else mapWidth = mapWidth;
		if(mapHeight == 0) mapHeight = this.map.height * this.map.tileheight; else mapHeight = mapHeight;
		var mapSprite = new flambe_map_MapSprite(width,height,mapWidth,mapHeight);
		mapSprite.data = this.map;
		var _g1 = 0;
		var _g = this.map.layers.length;
		while(_g1 < _g) {
			var i = _g1++;
			var layer = this.map.layers[i];
			var container = new flambe_Entity().add(new flambe_display_Sprite());
			var _g2 = layer.type;
			switch(_g2) {
			case "tilelayer":
				container.add(new flambe_map_TileSprite(this.symbols,this.map.tilewidth,this.map.tileheight).fromArray(layer.data,layer.width,layer.height));
				break;
			case "object":
				var _g4 = 0;
				var _g3 = layer.objects.length;
				while(_g4 < _g3) {
					var c = _g4++;
					this.onObjectParsed(container,layer.objects[c]);
				}
				break;
			case "image":
				break;
			default:
			}
			container._compMap.Sprite_0.alpha.set__(layer.opacity);
			container._compMap.Sprite_0.set_visible(layer.visible);
			this.onLayerParsed(container,layer);
			mapSprite.addLayer(layer.name,container);
		}
		return mapSprite;
	}
	,onLayerParsed: function(layer,data) {
	}
	,onObjectParsed: function(layer,data) {
	}
	,onTmxFileReload: function(_,_1) {
		this.map = JSON.parse(this._file.toString());
		this.reloaded.emit();
	}
	,__class__: flambe_map_tmx_TmxParser
};
var flambe_math_FMath = function() { };
$hxClasses["flambe.math.FMath"] = flambe_math_FMath;
flambe_math_FMath.__name__ = true;
flambe_math_FMath.max = function(a,b) {
	if(a > b) return a; else return b;
};
flambe_math_FMath.min = function(a,b) {
	if(a < b) return a; else return b;
};
flambe_math_FMath.clamp = function(value,min,max) {
	if(value < min) return min; else if(value > max) return max; else return value;
};
var flambe_math_Matrix = function() {
	this.identity();
};
$hxClasses["flambe.math.Matrix"] = flambe_math_Matrix;
flambe_math_Matrix.__name__ = true;
flambe_math_Matrix.multiply = function(lhs,rhs,result) {
	if(result == null) result = new flambe_math_Matrix();
	var a = lhs.m00 * rhs.m00 + lhs.m01 * rhs.m10;
	var b = lhs.m00 * rhs.m01 + lhs.m01 * rhs.m11;
	var c = lhs.m00 * rhs.m02 + lhs.m01 * rhs.m12 + lhs.m02;
	result.m00 = a;
	result.m01 = b;
	result.m02 = c;
	a = lhs.m10 * rhs.m00 + lhs.m11 * rhs.m10;
	b = lhs.m10 * rhs.m01 + lhs.m11 * rhs.m11;
	c = lhs.m10 * rhs.m02 + lhs.m11 * rhs.m12 + lhs.m12;
	result.m10 = a;
	result.m11 = b;
	result.m12 = c;
	return result;
};
flambe_math_Matrix.prototype = {
	set: function(m00,m10,m01,m11,m02,m12) {
		this.m00 = m00;
		this.m01 = m01;
		this.m02 = m02;
		this.m10 = m10;
		this.m11 = m11;
		this.m12 = m12;
	}
	,identity: function() {
		this.set(1,0,0,1,0,0);
	}
	,compose: function(x,y,scaleX,scaleY,rotation) {
		var sin = Math.sin(rotation);
		var cos = Math.cos(rotation);
		this.set(cos * scaleX,sin * scaleX,-sin * scaleY,cos * scaleY,x,y);
	}
	,translate: function(x,y) {
		this.m02 += this.m00 * x + this.m01 * y;
		this.m12 += this.m11 * y + this.m10 * x;
	}
	,invert: function() {
		var det = this.determinant();
		if(det == 0) return false;
		this.set(this.m11 / det,-this.m01 / det,-this.m10 / det,this.m00 / det,(this.m01 * this.m12 - this.m11 * this.m02) / det,(this.m10 * this.m02 - this.m00 * this.m12) / det);
		return true;
	}
	,transformArray: function(points,length,result) {
		var ii = 0;
		while(ii < length) {
			var x = points[ii];
			var y = points[ii + 1];
			result[ii++] = x * this.m00 + y * this.m01 + this.m02;
			result[ii++] = x * this.m10 + y * this.m11 + this.m12;
		}
	}
	,determinant: function() {
		return this.m00 * this.m11 - this.m01 * this.m10;
	}
	,inverseTransform: function(x,y,result) {
		var det = this.determinant();
		if(det == 0) return false;
		x -= this.m02;
		y -= this.m12;
		result.x = (x * this.m11 - y * this.m01) / det;
		result.y = (y * this.m00 - x * this.m10) / det;
		return true;
	}
	,clone: function(result) {
		if(result == null) result = new flambe_math_Matrix();
		result.set(this.m00,this.m10,this.m01,this.m11,this.m02,this.m12);
		return result;
	}
	,__class__: flambe_math_Matrix
};
var flambe_math_Rectangle = function(x,y,width,height) {
	if(height == null) height = 0;
	if(width == null) width = 0;
	if(y == null) y = 0;
	if(x == null) x = 0;
	this.set(x,y,width,height);
};
$hxClasses["flambe.math.Rectangle"] = flambe_math_Rectangle;
flambe_math_Rectangle.__name__ = true;
flambe_math_Rectangle.prototype = {
	set: function(x,y,width,height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}
	,contains: function(x,y) {
		x -= this.x;
		if(this.width >= 0) {
			if(x < 0 || x > this.width) return false;
		} else if(x > 0 || x < this.width) return false;
		y -= this.y;
		if(this.height >= 0) {
			if(y < 0 || y > this.height) return false;
		} else if(y > 0 || y < this.height) return false;
		return true;
	}
	,clone: function(result) {
		if(result == null) result = new flambe_math_Rectangle();
		result.set(this.x,this.y,this.width,this.height);
		return result;
	}
	,equals: function(other) {
		return this.x == other.x && this.y == other.y && this.width == other.width && this.height == other.height;
	}
	,__class__: flambe_math_Rectangle
};
var flambe_platform_BasicAsset = function() {
	this._reloadCount = null;
};
$hxClasses["flambe.platform.BasicAsset"] = flambe_platform_BasicAsset;
flambe_platform_BasicAsset.__name__ = true;
flambe_platform_BasicAsset.__interfaces__ = [flambe_asset_Asset];
flambe_platform_BasicAsset.prototype = {
	get_reloadCount: function() {
		if(this._reloadCount == null) this._reloadCount = new flambe_util_Value(0);
		return this._reloadCount;
	}
	,__class__: flambe_platform_BasicAsset
};
var flambe_platform_BasicAssetPackLoader = function(platform,manifest) {
	var _g = this;
	this.manifest = manifest;
	this._platform = platform;
	this.promise = new flambe_util_Promise();
	this._bytesLoaded = new haxe_ds_StringMap();
	this._pack = new flambe_platform__$BasicAssetPackLoader_BasicAssetPack(manifest,this);
	var entries = Lambda.array(manifest);
	if(entries.length == 0) this.handleSuccess(); else {
		var groups = new haxe_ds_StringMap();
		var _g1 = 0;
		while(_g1 < entries.length) {
			var entry = entries[_g1];
			++_g1;
			var group = groups.get(entry.name);
			if(group == null) {
				group = [];
				groups.set(entry.name,group);
			}
			group.push(entry);
		}
		this._assetsRemaining = Lambda.count(groups);
		var $it0 = groups.iterator();
		while( $it0.hasNext() ) {
			var group1 = $it0.next();
			var group2 = [group1];
			this.pickBestEntry(group2[0],(function(group2) {
				return function(bestEntry) {
					if(bestEntry != null) {
						var url = manifest.getFullURL(bestEntry);
						try {
							_g.loadEntry(url,bestEntry);
						} catch( error ) {
							_g.handleError(bestEntry,"Unexpected error: " + Std.string(error));
						}
						var _g11 = _g.promise;
						_g11.set_total(_g11._total + bestEntry.bytes);
					} else {
						var badEntry = group2[0][0];
						if(flambe_platform_BasicAssetPackLoader.isAudio(badEntry.format)) _g.handleLoad(badEntry,flambe_platform_DummySound.getInstance()); else _g.handleError(badEntry,"Could not find a supported format to load");
					}
				};
			})(group2));
		}
	}
};
$hxClasses["flambe.platform.BasicAssetPackLoader"] = flambe_platform_BasicAssetPackLoader;
flambe_platform_BasicAssetPackLoader.__name__ = true;
flambe_platform_BasicAssetPackLoader.isAudio = function(format) {
	switch(format[1]) {
	case 8:case 9:case 10:case 11:case 12:
		return true;
	default:
		return false;
	}
};
flambe_platform_BasicAssetPackLoader.prototype = {
	pickBestEntry: function(entries,fn) {
		var onFormatsAvailable = function(formats) {
			var _g = 0;
			while(_g < formats.length) {
				var format = formats[_g];
				++_g;
				var _g1 = 0;
				while(_g1 < entries.length) {
					var entry = entries[_g1];
					++_g1;
					if(entry.format == format) {
						fn(entry);
						return;
					}
				}
			}
			fn(null);
		};
		this.getAssetFormats(onFormatsAvailable);
	}
	,loadEntry: function(url,entry) {
		null;
	}
	,getAssetFormats: function(fn) {
		null;
	}
	,handleLoad: function(entry,asset) {
		if(this._pack.disposed) return;
		this.handleProgress(entry,entry.bytes);
		var map;
		var _g = entry.format;
		switch(_g[1]) {
		case 0:case 1:case 2:case 3:case 4:case 5:case 6:case 7:
			map = this._pack.textures;
			break;
		case 8:case 9:case 10:case 11:case 12:
			map = this._pack.sounds;
			break;
		case 13:
			map = this._pack.files;
			break;
		}
		map.set(entry.name,asset);
		this._assetsRemaining -= 1;
		if(this._assetsRemaining == 0) this.handleSuccess();
	}
	,handleProgress: function(entry,bytesLoaded) {
		this._bytesLoaded.set(entry.name,bytesLoaded);
		var bytesTotal = 0;
		var $it0 = this._bytesLoaded.iterator();
		while( $it0.hasNext() ) {
			var bytes = $it0.next();
			bytesTotal += bytes;
		}
		this.promise.set_progress(bytesTotal);
	}
	,handleSuccess: function() {
		this.promise.set_result(this._pack);
	}
	,handleError: function(entry,message) {
		this.promise.error.emit(flambe_util_Strings.withFields(message,["url",entry.url]));
	}
	,handleTextureError: function(entry) {
		this.handleError(entry,"Failed to create texture. Is the GPU context unavailable?");
	}
	,__class__: flambe_platform_BasicAssetPackLoader
};
var flambe_platform__$BasicAssetPackLoader_BasicAssetPack = function(manifest,loader) {
	this.disposed = false;
	this._manifest = manifest;
	this.loader = loader;
	this.textures = new haxe_ds_StringMap();
	this.sounds = new haxe_ds_StringMap();
	this.files = new haxe_ds_StringMap();
};
$hxClasses["flambe.platform._BasicAssetPackLoader.BasicAssetPack"] = flambe_platform__$BasicAssetPackLoader_BasicAssetPack;
flambe_platform__$BasicAssetPackLoader_BasicAssetPack.__name__ = true;
flambe_platform__$BasicAssetPackLoader_BasicAssetPack.__interfaces__ = [flambe_asset_AssetPack];
flambe_platform__$BasicAssetPackLoader_BasicAssetPack.prototype = {
	getTexture: function(name,required) {
		if(required == null) required = true;
		var texture = this.textures.get(name);
		if(texture == null && required) throw flambe_util_Strings.withFields("Missing texture",["name",name]);
		return texture;
	}
	,getFile: function(name,required) {
		if(required == null) required = true;
		var file = this.files.get(name);
		if(file == null && required) throw flambe_util_Strings.withFields("Missing file",["name",name]);
		return file;
	}
	,__class__: flambe_platform__$BasicAssetPackLoader_BasicAssetPack
};
var flambe_platform_BasicFile = function(content) {
	flambe_platform_BasicAsset.call(this);
	this._content = content;
};
$hxClasses["flambe.platform.BasicFile"] = flambe_platform_BasicFile;
flambe_platform_BasicFile.__name__ = true;
flambe_platform_BasicFile.__interfaces__ = [flambe_asset_File];
flambe_platform_BasicFile.__super__ = flambe_platform_BasicAsset;
flambe_platform_BasicFile.prototype = $extend(flambe_platform_BasicAsset.prototype,{
	toString: function() {
		return this._content;
	}
	,__class__: flambe_platform_BasicFile
});
var flambe_subsystem_MouseSystem = function() { };
$hxClasses["flambe.subsystem.MouseSystem"] = flambe_subsystem_MouseSystem;
flambe_subsystem_MouseSystem.__name__ = true;
var flambe_platform_BasicMouse = function(pointer) {
	this._pointer = pointer;
	this._source = flambe_input_EventSource.Mouse(flambe_platform_BasicMouse._sharedEvent);
	this.down = new flambe_util_Signal1();
	this.move = new flambe_util_Signal1();
	this.up = new flambe_util_Signal1();
	this.scroll = new flambe_util_Signal1();
	this._x = 0;
	this._y = 0;
	this._cursor = flambe_input_MouseCursor.Default;
	this._buttonStates = new haxe_ds_IntMap();
};
$hxClasses["flambe.platform.BasicMouse"] = flambe_platform_BasicMouse;
flambe_platform_BasicMouse.__name__ = true;
flambe_platform_BasicMouse.__interfaces__ = [flambe_subsystem_MouseSystem];
flambe_platform_BasicMouse.prototype = {
	submitDown: function(viewX,viewY,buttonCode) {
		if(!this._buttonStates.exists(buttonCode)) {
			this._buttonStates.set(buttonCode,true);
			this.prepare(viewX,viewY,flambe_platform_MouseCodes.toButton(buttonCode));
			this._pointer.submitDown(viewX,viewY,this._source);
			this.down.emit(flambe_platform_BasicMouse._sharedEvent);
		}
	}
	,submitMove: function(viewX,viewY) {
		this.prepare(viewX,viewY,null);
		this._pointer.submitMove(viewX,viewY,this._source);
		this.move.emit(flambe_platform_BasicMouse._sharedEvent);
	}
	,submitUp: function(viewX,viewY,buttonCode) {
		if(this._buttonStates.exists(buttonCode)) {
			this._buttonStates.remove(buttonCode);
			this.prepare(viewX,viewY,flambe_platform_MouseCodes.toButton(buttonCode));
			this._pointer.submitUp(viewX,viewY,this._source);
			this.up.emit(flambe_platform_BasicMouse._sharedEvent);
		}
	}
	,submitScroll: function(viewX,viewY,velocity) {
		this._x = viewX;
		this._y = viewY;
		if(!(this.scroll._head != null)) return false;
		this.scroll.emit(velocity);
		return true;
	}
	,prepare: function(viewX,viewY,button) {
		this._x = viewX;
		this._y = viewY;
		flambe_platform_BasicMouse._sharedEvent.init(flambe_platform_BasicMouse._sharedEvent.id + 1,viewX,viewY,button);
	}
	,__class__: flambe_platform_BasicMouse
};
var flambe_subsystem_PointerSystem = function() { };
$hxClasses["flambe.subsystem.PointerSystem"] = flambe_subsystem_PointerSystem;
flambe_subsystem_PointerSystem.__name__ = true;
flambe_subsystem_PointerSystem.prototype = {
	__class__: flambe_subsystem_PointerSystem
};
var flambe_platform_BasicPointer = function(x,y,isDown) {
	if(isDown == null) isDown = false;
	if(y == null) y = 0;
	if(x == null) x = 0;
	this.down = new flambe_util_Signal1();
	this.move = new flambe_util_Signal1();
	this.up = new flambe_util_Signal1();
	this._x = x;
	this._y = y;
	this._isDown = isDown;
};
$hxClasses["flambe.platform.BasicPointer"] = flambe_platform_BasicPointer;
flambe_platform_BasicPointer.__name__ = true;
flambe_platform_BasicPointer.__interfaces__ = [flambe_subsystem_PointerSystem];
flambe_platform_BasicPointer.prototype = {
	submitDown: function(viewX,viewY,source) {
		if(this._isDown) return;
		this.submitMove(viewX,viewY,source);
		this._isDown = true;
		var chain = [];
		var hit = flambe_display_Sprite.hitTest(flambe_System.root,viewX,viewY);
		if(hit != null) {
			var entity = hit.owner;
			do {
				var sprite = entity._compMap.Sprite_0;
				if(sprite != null) chain.push(sprite);
				entity = entity.parent;
			} while(entity != null);
		}
		this.prepare(viewX,viewY,hit,source);
		var _g = 0;
		while(_g < chain.length) {
			var sprite1 = chain[_g];
			++_g;
			sprite1.onPointerDown(flambe_platform_BasicPointer._sharedEvent);
			if(flambe_platform_BasicPointer._sharedEvent._stopped) return;
		}
		this.down.emit(flambe_platform_BasicPointer._sharedEvent);
	}
	,submitMove: function(viewX,viewY,source) {
		if(viewX == this._x && viewY == this._y) return;
		var chain = [];
		var hit = flambe_display_Sprite.hitTest(flambe_System.root,viewX,viewY);
		if(hit != null) {
			var entity = hit.owner;
			do {
				var sprite = entity._compMap.Sprite_0;
				if(sprite != null) chain.push(sprite);
				entity = entity.parent;
			} while(entity != null);
		}
		this.prepare(viewX,viewY,hit,source);
		var _g = 0;
		while(_g < chain.length) {
			var sprite1 = chain[_g];
			++_g;
			sprite1.onPointerMove(flambe_platform_BasicPointer._sharedEvent);
			if(flambe_platform_BasicPointer._sharedEvent._stopped) return;
		}
		this.move.emit(flambe_platform_BasicPointer._sharedEvent);
	}
	,submitUp: function(viewX,viewY,source) {
		if(!this._isDown) return;
		this.submitMove(viewX,viewY,source);
		this._isDown = false;
		var chain = [];
		var hit = flambe_display_Sprite.hitTest(flambe_System.root,viewX,viewY);
		if(hit != null) {
			var entity = hit.owner;
			do {
				var sprite = entity._compMap.Sprite_0;
				if(sprite != null) chain.push(sprite);
				entity = entity.parent;
			} while(entity != null);
		}
		this.prepare(viewX,viewY,hit,source);
		var _g = 0;
		while(_g < chain.length) {
			var sprite1 = chain[_g];
			++_g;
			sprite1.onPointerUp(flambe_platform_BasicPointer._sharedEvent);
			if(flambe_platform_BasicPointer._sharedEvent._stopped) return;
		}
		this.up.emit(flambe_platform_BasicPointer._sharedEvent);
	}
	,prepare: function(viewX,viewY,hit,source) {
		this._x = viewX;
		this._y = viewY;
		flambe_platform_BasicPointer._sharedEvent.init(flambe_platform_BasicPointer._sharedEvent.id + 1,viewX,viewY,hit,source);
	}
	,__class__: flambe_platform_BasicPointer
};
var flambe_platform_BasicTexture = function(root,width,height) {
	this.rootY = 0;
	this.rootX = 0;
	flambe_platform_BasicAsset.call(this);
	this.root = root;
	this._width = width;
	this._height = height;
};
$hxClasses["flambe.platform.BasicTexture"] = flambe_platform_BasicTexture;
flambe_platform_BasicTexture.__name__ = true;
flambe_platform_BasicTexture.__interfaces__ = [flambe_display_SubTexture];
flambe_platform_BasicTexture.__super__ = flambe_platform_BasicAsset;
flambe_platform_BasicTexture.prototype = $extend(flambe_platform_BasicAsset.prototype,{
	get_reloadCount: function() {
		return this.root.get_reloadCount();
	}
	,__class__: flambe_platform_BasicTexture
});
var flambe_subsystem_TouchSystem = function() { };
$hxClasses["flambe.subsystem.TouchSystem"] = flambe_subsystem_TouchSystem;
flambe_subsystem_TouchSystem.__name__ = true;
var flambe_platform_BasicTouch = function(pointer,maxPoints) {
	if(maxPoints == null) maxPoints = 4;
	this._pointer = pointer;
	this._maxPoints = maxPoints;
	this._pointMap = new haxe_ds_IntMap();
	this._points = [];
	this.down = new flambe_util_Signal1();
	this.move = new flambe_util_Signal1();
	this.up = new flambe_util_Signal1();
};
$hxClasses["flambe.platform.BasicTouch"] = flambe_platform_BasicTouch;
flambe_platform_BasicTouch.__name__ = true;
flambe_platform_BasicTouch.__interfaces__ = [flambe_subsystem_TouchSystem];
flambe_platform_BasicTouch.prototype = {
	submitDown: function(id,viewX,viewY) {
		if(!this._pointMap.exists(id)) {
			var point = new flambe_input_TouchPoint(id);
			point.init(viewX,viewY);
			this._pointMap.set(id,point);
			this._points.push(point);
			if(this._pointerTouch == null) {
				this._pointerTouch = point;
				this._pointer.submitDown(viewX,viewY,point._source);
			}
			this.down.emit(point);
		}
	}
	,submitMove: function(id,viewX,viewY) {
		var point = this._pointMap.get(id);
		if(point != null) {
			point.init(viewX,viewY);
			if(this._pointerTouch == point) this._pointer.submitMove(viewX,viewY,point._source);
			this.move.emit(point);
		}
	}
	,submitUp: function(id,viewX,viewY) {
		var point = this._pointMap.get(id);
		if(point != null) {
			point.init(viewX,viewY);
			this._pointMap.remove(id);
			HxOverrides.remove(this._points,point);
			if(this._pointerTouch == point) {
				this._pointerTouch = null;
				this._pointer.submitUp(viewX,viewY,point._source);
			}
			this.up.emit(point);
		}
	}
	,__class__: flambe_platform_BasicTouch
};
var flambe_sound_Sound = function() { };
$hxClasses["flambe.sound.Sound"] = flambe_sound_Sound;
flambe_sound_Sound.__name__ = true;
flambe_sound_Sound.__interfaces__ = [flambe_asset_Asset];
var flambe_platform_DummySound = function() {
	flambe_platform_BasicAsset.call(this);
	this._playback = new flambe_platform_DummyPlayback(this);
};
$hxClasses["flambe.platform.DummySound"] = flambe_platform_DummySound;
flambe_platform_DummySound.__name__ = true;
flambe_platform_DummySound.__interfaces__ = [flambe_sound_Sound];
flambe_platform_DummySound.getInstance = function() {
	if(flambe_platform_DummySound._instance == null) flambe_platform_DummySound._instance = new flambe_platform_DummySound();
	return flambe_platform_DummySound._instance;
};
flambe_platform_DummySound.__super__ = flambe_platform_BasicAsset;
flambe_platform_DummySound.prototype = $extend(flambe_platform_BasicAsset.prototype,{
	__class__: flambe_platform_DummySound
});
var flambe_sound_Playback = function() { };
$hxClasses["flambe.sound.Playback"] = flambe_sound_Playback;
flambe_sound_Playback.__name__ = true;
flambe_sound_Playback.__interfaces__ = [flambe_util_Disposable];
var flambe_platform_DummyPlayback = function(sound) {
	this._sound = sound;
	this.volume = new flambe_animation_AnimatedFloat(0);
	this._complete = new flambe_util_Value(true);
};
$hxClasses["flambe.platform.DummyPlayback"] = flambe_platform_DummyPlayback;
flambe_platform_DummyPlayback.__name__ = true;
flambe_platform_DummyPlayback.__interfaces__ = [flambe_sound_Playback];
flambe_platform_DummyPlayback.prototype = {
	__class__: flambe_platform_DummyPlayback
};
var flambe_platform_DummyTouch = function() {
	this.down = new flambe_util_Signal1();
	this.move = new flambe_util_Signal1();
	this.up = new flambe_util_Signal1();
};
$hxClasses["flambe.platform.DummyTouch"] = flambe_platform_DummyTouch;
flambe_platform_DummyTouch.__name__ = true;
flambe_platform_DummyTouch.__interfaces__ = [flambe_subsystem_TouchSystem];
flambe_platform_DummyTouch.prototype = {
	__class__: flambe_platform_DummyTouch
};
var flambe_platform_EventGroup = function() {
	this._entries = [];
};
$hxClasses["flambe.platform.EventGroup"] = flambe_platform_EventGroup;
flambe_platform_EventGroup.__name__ = true;
flambe_platform_EventGroup.__interfaces__ = [flambe_util_Disposable];
flambe_platform_EventGroup.prototype = {
	addListener: function(dispatcher,type,listener) {
		dispatcher.addEventListener(type,listener,false);
		this._entries.push(new flambe_platform__$EventGroup_Entry(dispatcher,type,listener));
	}
	,addDisposingListener: function(dispatcher,type,listener) {
		var _g = this;
		this.addListener(dispatcher,type,function(event) {
			_g.dispose();
			listener(event);
		});
	}
	,dispose: function() {
		var _g = 0;
		var _g1 = this._entries;
		while(_g < _g1.length) {
			var entry = _g1[_g];
			++_g;
			entry.dispatcher.removeEventListener(entry.type,entry.listener,false);
		}
		this._entries = [];
	}
	,__class__: flambe_platform_EventGroup
};
var flambe_platform__$EventGroup_Entry = function(dispatcher,type,listener) {
	this.dispatcher = dispatcher;
	this.type = type;
	this.listener = listener;
};
$hxClasses["flambe.platform._EventGroup.Entry"] = flambe_platform__$EventGroup_Entry;
flambe_platform__$EventGroup_Entry.__name__ = true;
flambe_platform__$EventGroup_Entry.prototype = {
	__class__: flambe_platform__$EventGroup_Entry
};
var flambe_platform_InternalGraphics = function() { };
$hxClasses["flambe.platform.InternalGraphics"] = flambe_platform_InternalGraphics;
flambe_platform_InternalGraphics.__name__ = true;
flambe_platform_InternalGraphics.__interfaces__ = [flambe_display_Graphics];
flambe_platform_InternalGraphics.prototype = {
	__class__: flambe_platform_InternalGraphics
};
var flambe_subsystem_RendererSystem = function() { };
$hxClasses["flambe.subsystem.RendererSystem"] = flambe_subsystem_RendererSystem;
flambe_subsystem_RendererSystem.__name__ = true;
flambe_subsystem_RendererSystem.prototype = {
	__class__: flambe_subsystem_RendererSystem
};
var flambe_platform_InternalRenderer = function() { };
$hxClasses["flambe.platform.InternalRenderer"] = flambe_platform_InternalRenderer;
flambe_platform_InternalRenderer.__name__ = true;
flambe_platform_InternalRenderer.__interfaces__ = [flambe_subsystem_RendererSystem];
flambe_platform_InternalRenderer.prototype = {
	__class__: flambe_platform_InternalRenderer
};
var flambe_platform_MainLoop = function() {
	this._tickables = [];
};
$hxClasses["flambe.platform.MainLoop"] = flambe_platform_MainLoop;
flambe_platform_MainLoop.__name__ = true;
flambe_platform_MainLoop.updateEntity = function(entity,dt) {
	var speed = entity._compMap.SpeedAdjuster_2;
	if(speed != null) {
		speed._realDt = dt;
		dt *= speed.scale._value;
		if(dt <= 0) {
			speed.onUpdate(dt);
			return;
		}
	}
	var p = entity.firstComponent;
	while(p != null) {
		var next = p.next;
		p.onUpdate(dt);
		p = next;
	}
	var p1 = entity.firstChild;
	while(p1 != null) {
		var next1 = p1.next;
		flambe_platform_MainLoop.updateEntity(p1,dt);
		p1 = next1;
	}
};
flambe_platform_MainLoop.prototype = {
	update: function(dt) {
		if(dt <= 0) return;
		if(dt > 1) dt = 1;
		var ii = 0;
		while(ii < this._tickables.length) {
			var t = this._tickables[ii];
			if(t == null || t.update(dt)) this._tickables.splice(ii,1); else ++ii;
		}
		flambe_System.volume.update(dt);
		flambe_platform_MainLoop.updateEntity(flambe_System.root,dt);
	}
	,render: function(renderer) {
		var graphics = renderer.graphics;
		if(graphics != null) {
			renderer.willRender();
			flambe_display_Sprite.render(flambe_System.root,graphics);
			renderer.didRender();
		}
	}
	,__class__: flambe_platform_MainLoop
};
var flambe_platform_MathUtil = function() { };
$hxClasses["flambe.platform.MathUtil"] = flambe_platform_MathUtil;
flambe_platform_MathUtil.__name__ = true;
flambe_platform_MathUtil.nextPowerOfTwo = function(n) {
	var p = 1;
	while(p < n) p <<= 1;
	return p;
};
var flambe_platform_MouseCodes = function() { };
$hxClasses["flambe.platform.MouseCodes"] = flambe_platform_MouseCodes;
flambe_platform_MouseCodes.__name__ = true;
flambe_platform_MouseCodes.toButton = function(buttonCode) {
	switch(buttonCode) {
	case 0:
		return flambe_input_MouseButton.Left;
	case 1:
		return flambe_input_MouseButton.Middle;
	case 2:
		return flambe_input_MouseButton.Right;
	}
	return flambe_input_MouseButton.Unknown(buttonCode);
};
var flambe_platform_TextureRoot = function() { };
$hxClasses["flambe.platform.TextureRoot"] = flambe_platform_TextureRoot;
flambe_platform_TextureRoot.__name__ = true;
var flambe_platform_Tickable = function() { };
$hxClasses["flambe.platform.Tickable"] = flambe_platform_Tickable;
flambe_platform_Tickable.__name__ = true;
flambe_platform_Tickable.prototype = {
	__class__: flambe_platform_Tickable
};
var flambe_platform_html_CanvasGraphics = function(canvas,alpha) {
	this._firstDraw = false;
	this._canvasCtx = canvas.getContext("2d",{ alpha : alpha});
};
$hxClasses["flambe.platform.html.CanvasGraphics"] = flambe_platform_html_CanvasGraphics;
flambe_platform_html_CanvasGraphics.__name__ = true;
flambe_platform_html_CanvasGraphics.__interfaces__ = [flambe_platform_InternalGraphics];
flambe_platform_html_CanvasGraphics.prototype = {
	save: function() {
		this._canvasCtx.save();
	}
	,transform: function(m00,m10,m01,m11,m02,m12) {
		this._canvasCtx.transform(m00,m10,m01,m11,m02,m12);
	}
	,restore: function() {
		this._canvasCtx.restore();
	}
	,drawSubTexture: function(texture,destX,destY,sourceX,sourceY,sourceW,sourceH) {
		if(this._firstDraw) {
			this._firstDraw = false;
			this._canvasCtx.globalCompositeOperation = "copy";
			this.drawSubTexture(texture,destX,destY,sourceX,sourceY,sourceW,sourceH);
			this._canvasCtx.globalCompositeOperation = "source-over";
			return;
		}
		var texture1 = texture;
		var root = texture1.root;
		this._canvasCtx.drawImage(root.image,texture1.rootX + sourceX | 0,texture1.rootY + sourceY | 0,sourceW | 0,sourceH | 0,destX | 0,destY | 0,sourceW | 0,sourceH | 0);
	}
	,fillRect: function(color,x,y,width,height) {
		if(this._firstDraw) {
			this._firstDraw = false;
			this._canvasCtx.globalCompositeOperation = "copy";
			this.fillRect(color,x,y,width,height);
			this._canvasCtx.globalCompositeOperation = "source-over";
			return;
		}
		var hex = (16777215 & color).toString(16);
		while(hex.length < 6) hex = "0" + Std.string(hex);
		this._canvasCtx.fillStyle = "#" + Std.string(hex);
		this._canvasCtx.fillRect(x | 0,y | 0,width | 0,height | 0);
	}
	,multiplyAlpha: function(factor) {
		this._canvasCtx.globalAlpha *= factor;
	}
	,setBlendMode: function(blendMode) {
		var op;
		switch(blendMode[1]) {
		case 0:
			op = "source-over";
			break;
		case 1:
			op = "lighter";
			break;
		case 2:
			op = "destination-in";
			break;
		case 3:
			op = "copy";
			break;
		}
		this._canvasCtx.globalCompositeOperation = op;
	}
	,applyScissor: function(x,y,width,height) {
		this._canvasCtx.beginPath();
		this._canvasCtx.rect(x | 0,y | 0,width | 0,height | 0);
		this._canvasCtx.clip();
	}
	,willRender: function() {
		this._firstDraw = true;
	}
	,didRender: function() {
	}
	,onResize: function(width,height) {
	}
	,__class__: flambe_platform_html_CanvasGraphics
};
var flambe_platform_html_CanvasRenderer = function(canvas) {
	this.graphics = new flambe_platform_html_CanvasGraphics(canvas,false);
	this._hasGPU = new flambe_util_Value(true);
};
$hxClasses["flambe.platform.html.CanvasRenderer"] = flambe_platform_html_CanvasRenderer;
flambe_platform_html_CanvasRenderer.__name__ = true;
flambe_platform_html_CanvasRenderer.__interfaces__ = [flambe_platform_InternalRenderer];
flambe_platform_html_CanvasRenderer.prototype = {
	get_type: function() {
		return flambe_subsystem_RendererType.Canvas;
	}
	,createTextureFromImage: function(image) {
		var root = new flambe_platform_html_CanvasTextureRoot(flambe_platform_html_CanvasRenderer.CANVAS_TEXTURES?flambe_platform_html_HtmlUtil.createCanvas(image):image);
		return root.createTexture(root.width,root.height);
	}
	,getCompressedTextureFormats: function() {
		return [];
	}
	,createCompressedTexture: function(format,data) {
		return null;
	}
	,willRender: function() {
		this.graphics.willRender();
	}
	,didRender: function() {
		this.graphics.didRender();
	}
	,__class__: flambe_platform_html_CanvasRenderer
};
var flambe_platform_html_CanvasTexture = function(root,width,height) {
	flambe_platform_BasicTexture.call(this,root,width,height);
};
$hxClasses["flambe.platform.html.CanvasTexture"] = flambe_platform_html_CanvasTexture;
flambe_platform_html_CanvasTexture.__name__ = true;
flambe_platform_html_CanvasTexture.__super__ = flambe_platform_BasicTexture;
flambe_platform_html_CanvasTexture.prototype = $extend(flambe_platform_BasicTexture.prototype,{
	__class__: flambe_platform_html_CanvasTexture
});
var flambe_platform_html_CanvasTextureRoot = function(image) {
	flambe_platform_BasicAsset.call(this);
	this.image = image;
	this.width = image.width;
	this.height = image.height;
};
$hxClasses["flambe.platform.html.CanvasTextureRoot"] = flambe_platform_html_CanvasTextureRoot;
flambe_platform_html_CanvasTextureRoot.__name__ = true;
flambe_platform_html_CanvasTextureRoot.__interfaces__ = [flambe_platform_TextureRoot];
flambe_platform_html_CanvasTextureRoot.__super__ = flambe_platform_BasicAsset;
flambe_platform_html_CanvasTextureRoot.prototype = $extend(flambe_platform_BasicAsset.prototype,{
	createTexture: function(width,height) {
		return new flambe_platform_html_CanvasTexture(this,width,height);
	}
	,__class__: flambe_platform_html_CanvasTextureRoot
});
var flambe_platform_html_HtmlAssetPackLoader = function(platform,manifest) {
	flambe_platform_BasicAssetPackLoader.call(this,platform,manifest);
};
$hxClasses["flambe.platform.html.HtmlAssetPackLoader"] = flambe_platform_html_HtmlAssetPackLoader;
flambe_platform_html_HtmlAssetPackLoader.__name__ = true;
flambe_platform_html_HtmlAssetPackLoader.detectImageFormats = function(fn) {
	var formats = [flambe_asset_AssetFormat.PNG,flambe_asset_AssetFormat.JPG,flambe_asset_AssetFormat.GIF];
	var formatTests = 2;
	var checkRemaining = function() {
		--formatTests;
		if(formatTests == 0) fn(formats);
	};
	var webp;
	var _this = window.document;
	webp = _this.createElement("img");
	webp.onload = webp.onerror = function(_) {
		if(webp.width == 1) formats.unshift(flambe_asset_AssetFormat.WEBP);
		checkRemaining();
	};
	webp.src = "data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==";
	var jxr;
	var _this1 = window.document;
	jxr = _this1.createElement("img");
	jxr.onload = jxr.onerror = function(_1) {
		if(jxr.width == 1) formats.unshift(flambe_asset_AssetFormat.JXR);
		checkRemaining();
	};
	jxr.src = "data:image/vnd.ms-photo;base64,SUm8AQgAAAAFAAG8AQAQAAAASgAAAIC8BAABAAAAAQAAAIG8BAABAAAAAQAAAMC8BAABAAAAWgAAAMG8BAABAAAAHwAAAAAAAAAkw91vA07+S7GFPXd2jckNV01QSE9UTwAZAYBxAAAAABP/gAAEb/8AAQAAAQAAAA==";
};
flambe_platform_html_HtmlAssetPackLoader.detectAudioFormats = function() {
	var audio;
	var _this = window.document;
	audio = _this.createElement("audio");
	if(audio == null || $bind(audio,audio.canPlayType) == null) return [];
	var blacklist = new EReg("\\b(iPhone|iPod|iPad|Android|Windows Phone)\\b","");
	var userAgent = window.navigator.userAgent;
	if(!flambe_platform_html_WebAudioSound.get_supported() && blacklist.match(userAgent)) return [];
	var types = [{ format : flambe_asset_AssetFormat.M4A, mimeType : "audio/mp4; codecs=mp4a"},{ format : flambe_asset_AssetFormat.MP3, mimeType : "audio/mpeg"},{ format : flambe_asset_AssetFormat.OPUS, mimeType : "audio/ogg; codecs=opus"},{ format : flambe_asset_AssetFormat.OGG, mimeType : "audio/ogg; codecs=vorbis"},{ format : flambe_asset_AssetFormat.WAV, mimeType : "audio/wav"}];
	var result = [];
	var _g = 0;
	while(_g < types.length) {
		var type = types[_g];
		++_g;
		var canPlayType = "";
		try {
			canPlayType = audio.canPlayType(type.mimeType);
		} catch( _ ) {
		}
		if(canPlayType != "") result.push(type.format);
	}
	return result;
};
flambe_platform_html_HtmlAssetPackLoader.supportsBlob = function() {
	if(flambe_platform_html_HtmlAssetPackLoader._detectBlobSupport) {
		flambe_platform_html_HtmlAssetPackLoader._detectBlobSupport = false;
		if(new EReg("\\bSilk\\b","").match(window.navigator.userAgent)) return false;
		if(window.Blob == null) return false;
		var xhr = new XMLHttpRequest();
		xhr.open("GET",".",true);
		if(xhr.responseType != "") return false;
		xhr.responseType = "blob";
		if(xhr.responseType != "blob") return false;
		flambe_platform_html_HtmlAssetPackLoader._URL = flambe_platform_html_HtmlUtil.loadExtension("URL").value;
	}
	return flambe_platform_html_HtmlAssetPackLoader._URL != null && flambe_platform_html_HtmlAssetPackLoader._URL.createObjectURL != null;
};
flambe_platform_html_HtmlAssetPackLoader.__super__ = flambe_platform_BasicAssetPackLoader;
flambe_platform_html_HtmlAssetPackLoader.prototype = $extend(flambe_platform_BasicAssetPackLoader.prototype,{
	loadEntry: function(url,entry) {
		var _g1 = this;
		var _g = entry.format;
		switch(_g[1]) {
		case 0:case 1:case 2:case 3:case 4:
			var image;
			var _this = window.document;
			image = _this.createElement("img");
			var events = new flambe_platform_EventGroup();
			events.addDisposingListener(image,"load",function(_) {
				if(flambe_platform_html_HtmlAssetPackLoader.supportsBlob()) flambe_platform_html_HtmlAssetPackLoader._URL.revokeObjectURL(image.src);
				var texture = _g1._platform.getRenderer().createTextureFromImage(image);
				if(texture != null) _g1.handleLoad(entry,texture); else _g1.handleTextureError(entry);
			});
			events.addDisposingListener(image,"error",function(_1) {
				_g1.handleError(entry,"Failed to load image");
			});
			if(flambe_platform_html_HtmlAssetPackLoader.supportsBlob()) this.download(url,entry,"blob",function(blob) {
				image.src = flambe_platform_html_HtmlAssetPackLoader._URL.createObjectURL(blob);
			}); else image.src = url;
			break;
		case 5:case 6:case 7:
			this.download(url,entry,"arraybuffer",function(buffer) {
				var texture1 = _g1._platform.getRenderer().createCompressedTexture(entry.format,null);
				if(texture1 != null) _g1.handleLoad(entry,texture1); else _g1.handleTextureError(entry);
			});
			break;
		case 8:case 9:case 10:case 11:case 12:
			if(flambe_platform_html_WebAudioSound.get_supported()) this.download(url,entry,"arraybuffer",function(buffer1) {
				flambe_platform_html_WebAudioSound.ctx.decodeAudioData(buffer1,function(decoded) {
					_g1.handleLoad(entry,new flambe_platform_html_WebAudioSound(decoded));
				},function() {
					_g1.handleLoad(entry,flambe_platform_DummySound.getInstance());
				});
			}); else {
				var audio;
				var _this1 = window.document;
				audio = _this1.createElement("audio");
				audio.preload = "auto";
				var ref = ++flambe_platform_html_HtmlAssetPackLoader._mediaRefCount;
				if(flambe_platform_html_HtmlAssetPackLoader._mediaElements == null) flambe_platform_html_HtmlAssetPackLoader._mediaElements = new haxe_ds_IntMap();
				flambe_platform_html_HtmlAssetPackLoader._mediaElements.set(ref,audio);
				var events1 = new flambe_platform_EventGroup();
				events1.addDisposingListener(audio,"canplaythrough",function(_2) {
					flambe_platform_html_HtmlAssetPackLoader._mediaElements.remove(ref);
					_g1.handleLoad(entry,new flambe_platform_html_HtmlSound(audio));
				});
				events1.addDisposingListener(audio,"error",function(_3) {
					flambe_platform_html_HtmlAssetPackLoader._mediaElements.remove(ref);
					var code = audio.error.code;
					if(code == 3 || code == 4) _g1.handleLoad(entry,flambe_platform_DummySound.getInstance()); else _g1.handleError(entry,"Failed to load audio: " + audio.error.code);
				});
				events1.addListener(audio,"progress",function(_4) {
					if(audio.buffered.length > 0 && audio.duration > 0) {
						var progress = audio.buffered.end(0) / audio.duration;
						_g1.handleProgress(entry,progress * entry.bytes | 0);
					}
				});
				audio.src = url;
				audio.load();
			}
			break;
		case 13:
			this.download(url,entry,"text",function(text) {
				_g1.handleLoad(entry,new flambe_platform_BasicFile(text));
			});
			break;
		}
	}
	,getAssetFormats: function(fn) {
		var _g = this;
		if(flambe_platform_html_HtmlAssetPackLoader._supportedFormats == null) {
			flambe_platform_html_HtmlAssetPackLoader._supportedFormats = new flambe_util_Promise();
			flambe_platform_html_HtmlAssetPackLoader.detectImageFormats(function(imageFormats) {
				flambe_platform_html_HtmlAssetPackLoader._supportedFormats.set_result(_g._platform.getRenderer().getCompressedTextureFormats().concat(imageFormats).concat(flambe_platform_html_HtmlAssetPackLoader.detectAudioFormats()).concat([flambe_asset_AssetFormat.Data]));
			});
		}
		flambe_platform_html_HtmlAssetPackLoader._supportedFormats.get(fn);
	}
	,download: function(url,entry,responseType,onLoad) {
		var _g = this;
		var xhr = null;
		var start = null;
		var intervalId = 0;
		var hasInterval = false;
		var clearRetryInterval = function() {
			if(hasInterval) {
				hasInterval = false;
				window.clearInterval(intervalId);
			}
		};
		var retries = 3;
		var maybeRetry = function() {
			--retries;
			if(retries >= 0) {
				start();
				return true;
			}
			return false;
		};
		start = function() {
			clearRetryInterval();
			if(xhr != null) xhr.abort();
			xhr = new XMLHttpRequest();
			xhr.open("GET",url,true);
			xhr.responseType = responseType;
			var lastProgress = 0.0;
			xhr.onprogress = function(event) {
				if(!hasInterval) {
					hasInterval = true;
					intervalId = window.setInterval(function() {
						if(xhr.readyState != 4 && Date.now() - lastProgress > 5000) {
							if(!maybeRetry()) {
								clearRetryInterval();
								_g.handleError(entry,"Download stalled");
							}
						}
					},1000);
				}
				lastProgress = Date.now();
				_g.handleProgress(entry,event.loaded);
			};
			xhr.onerror = function(_) {
				if(xhr.status != 0 || !maybeRetry()) {
					clearRetryInterval();
					_g.handleError(entry,"HTTP error " + xhr.status);
				}
			};
			xhr.onload = function(_1) {
				var response = xhr.response;
				if(response == null) response = xhr.responseText;
				clearRetryInterval();
				onLoad(response);
			};
			xhr.send();
		};
		start();
	}
	,__class__: flambe_platform_html_HtmlAssetPackLoader
});
var flambe_platform_html_HtmlMouse = function(pointer,canvas) {
	flambe_platform_BasicMouse.call(this,pointer);
	this._canvas = canvas;
};
$hxClasses["flambe.platform.html.HtmlMouse"] = flambe_platform_html_HtmlMouse;
flambe_platform_html_HtmlMouse.__name__ = true;
flambe_platform_html_HtmlMouse.__super__ = flambe_platform_BasicMouse;
flambe_platform_html_HtmlMouse.prototype = $extend(flambe_platform_BasicMouse.prototype,{
	__class__: flambe_platform_html_HtmlMouse
});
var flambe_platform_html_HtmlSound = function(audioElement) {
	flambe_platform_BasicAsset.call(this);
	this.audioElement = audioElement;
};
$hxClasses["flambe.platform.html.HtmlSound"] = flambe_platform_html_HtmlSound;
flambe_platform_html_HtmlSound.__name__ = true;
flambe_platform_html_HtmlSound.__interfaces__ = [flambe_sound_Sound];
flambe_platform_html_HtmlSound.__super__ = flambe_platform_BasicAsset;
flambe_platform_html_HtmlSound.prototype = $extend(flambe_platform_BasicAsset.prototype,{
	__class__: flambe_platform_html_HtmlSound
});
var flambe_subsystem_StageSystem = function() { };
$hxClasses["flambe.subsystem.StageSystem"] = flambe_subsystem_StageSystem;
flambe_subsystem_StageSystem.__name__ = true;
flambe_subsystem_StageSystem.prototype = {
	__class__: flambe_subsystem_StageSystem
};
var flambe_platform_html_HtmlStage = function(canvas) {
	var _g = this;
	this._canvas = canvas;
	this.resize = new flambe_util_Signal0();
	this.scaleFactor = flambe_platform_html_HtmlStage.computeScaleFactor();
	if(this.scaleFactor != 1) {
		flambe_platform_html_HtmlUtil.setVendorStyle(this._canvas,"transform-origin","top left");
		flambe_platform_html_HtmlUtil.setVendorStyle(this._canvas,"transform","scale(" + 1 / this.scaleFactor + ")");
	}
	if(flambe_platform_html_HtmlUtil.SHOULD_HIDE_MOBILE_BROWSER) {
		window.addEventListener("orientationchange",function(_) {
			flambe_platform_html_HtmlUtil.callLater($bind(_g,_g.hideMobileBrowser),200);
		},false);
		this.hideMobileBrowser();
	}
	window.addEventListener("resize",$bind(this,this.onWindowResize),false);
	this.onWindowResize(null);
	this.orientation = new flambe_util_Value(null);
	if(window.orientation != null) {
		window.addEventListener("orientationchange",$bind(this,this.onOrientationChange),false);
		this.onOrientationChange(null);
	}
	this.fullscreen = new flambe_util_Value(false);
	flambe_platform_html_HtmlUtil.addVendorListener(window.document,"fullscreenchange",function(_1) {
		_g.updateFullscreen();
	},false);
	this.updateFullscreen();
};
$hxClasses["flambe.platform.html.HtmlStage"] = flambe_platform_html_HtmlStage;
flambe_platform_html_HtmlStage.__name__ = true;
flambe_platform_html_HtmlStage.__interfaces__ = [flambe_subsystem_StageSystem];
flambe_platform_html_HtmlStage.computeScaleFactor = function() {
	var devicePixelRatio = window.devicePixelRatio;
	if(devicePixelRatio == null) devicePixelRatio = 1;
	var canvas;
	var _this = window.document;
	canvas = _this.createElement("canvas");
	var ctx = canvas.getContext("2d");
	var backingStorePixelRatio = flambe_platform_html_HtmlUtil.loadExtension("backingStorePixelRatio",ctx).value;
	if(backingStorePixelRatio == null) backingStorePixelRatio = 1;
	var scale = devicePixelRatio / backingStorePixelRatio;
	var screenWidth = window.screen.width;
	var screenHeight = window.screen.height;
	if(scale * screenWidth > 1136 || scale * screenHeight > 1136) return 1;
	return scale;
};
flambe_platform_html_HtmlStage.prototype = {
	get_width: function() {
		return this._canvas.width;
	}
	,get_height: function() {
		return this._canvas.height;
	}
	,onWindowResize: function(_) {
		var container = this._canvas.parentElement;
		var rect = container.getBoundingClientRect();
		this.resizeCanvas(rect.width,rect.height);
	}
	,resizeCanvas: function(width,height) {
		var scaledWidth = this.scaleFactor * width;
		var scaledHeight = this.scaleFactor * height;
		if(this._canvas.width == scaledWidth && this._canvas.height == scaledHeight) return false;
		this._canvas.width = scaledWidth | 0;
		this._canvas.height = scaledHeight | 0;
		this.resize.emit();
		return true;
	}
	,hideMobileBrowser: function() {
		var _g = this;
		var mobileAddressBar = 100;
		var htmlStyle = window.document.documentElement.style;
		htmlStyle.height = window.innerHeight + mobileAddressBar + "px";
		htmlStyle.width = window.innerWidth + "px";
		htmlStyle.overflow = "visible";
		flambe_platform_html_HtmlUtil.callLater(function() {
			flambe_platform_html_HtmlUtil.hideMobileBrowser();
			flambe_platform_html_HtmlUtil.callLater(function() {
				htmlStyle.height = window.innerHeight + "px";
				_g.onWindowResize(null);
			},100);
		});
	}
	,onOrientationChange: function(_) {
		var value = flambe_platform_html_HtmlUtil.orientation(window.orientation);
		this.orientation.set__(value);
	}
	,updateFullscreen: function() {
		var state = flambe_platform_html_HtmlUtil.loadFirstExtension(["fullscreen","fullScreen","isFullScreen"],window.document).value;
		this.fullscreen.set__(state == true);
	}
	,__class__: flambe_platform_html_HtmlStage
};
var flambe_platform_html_HtmlUtil = function() { };
$hxClasses["flambe.platform.html.HtmlUtil"] = flambe_platform_html_HtmlUtil;
flambe_platform_html_HtmlUtil.__name__ = true;
flambe_platform_html_HtmlUtil.callLater = function(func,delay) {
	if(delay == null) delay = 0;
	window.setTimeout(func,delay);
};
flambe_platform_html_HtmlUtil.hideMobileBrowser = function() {
	window.scrollTo(1,0);
};
flambe_platform_html_HtmlUtil.loadExtension = function(name,obj) {
	if(obj == null) obj = window;
	var extension = Reflect.field(obj,name);
	if(extension != null) return { prefix : "", field : name, value : extension};
	var capitalized = name.charAt(0).toUpperCase() + HxOverrides.substr(name,1,null);
	var _g = 0;
	var _g1 = flambe_platform_html_HtmlUtil.VENDOR_PREFIXES;
	while(_g < _g1.length) {
		var prefix = _g1[_g];
		++_g;
		var field = prefix + capitalized;
		var extension1 = Reflect.field(obj,field);
		if(extension1 != null) return { prefix : prefix, field : field, value : extension1};
	}
	return { prefix : null, field : null, value : null};
};
flambe_platform_html_HtmlUtil.loadFirstExtension = function(names,obj) {
	var _g = 0;
	while(_g < names.length) {
		var name = names[_g];
		++_g;
		var extension = flambe_platform_html_HtmlUtil.loadExtension(name,obj);
		if(extension.field != null) return extension;
	}
	return { prefix : null, field : null, value : null};
};
flambe_platform_html_HtmlUtil.polyfill = function(name,obj) {
	if(obj == null) obj = window;
	var value = flambe_platform_html_HtmlUtil.loadExtension(name,obj).value;
	if(value == null) return false;
	obj[name] = value;
	return true;
};
flambe_platform_html_HtmlUtil.setVendorStyle = function(element,name,value) {
	var style = element.style;
	var _g = 0;
	var _g1 = flambe_platform_html_HtmlUtil.VENDOR_PREFIXES;
	while(_g < _g1.length) {
		var prefix = _g1[_g];
		++_g;
		style.setProperty("-" + prefix + "-" + name,value);
	}
	style.setProperty(name,value);
};
flambe_platform_html_HtmlUtil.addVendorListener = function(dispatcher,type,listener,useCapture) {
	var _g = 0;
	var _g1 = flambe_platform_html_HtmlUtil.VENDOR_PREFIXES;
	while(_g < _g1.length) {
		var prefix = _g1[_g];
		++_g;
		dispatcher.addEventListener(prefix + type,listener,useCapture);
	}
	dispatcher.addEventListener(type,listener,useCapture);
};
flambe_platform_html_HtmlUtil.orientation = function(angle) {
	switch(angle) {
	case -90:case 90:
		return flambe_display_Orientation.Landscape;
	default:
		return flambe_display_Orientation.Portrait;
	}
};
flambe_platform_html_HtmlUtil.createEmptyCanvas = function(width,height) {
	var canvas;
	var _this = window.document;
	canvas = _this.createElement("canvas");
	canvas.width = width;
	canvas.height = height;
	return canvas;
};
flambe_platform_html_HtmlUtil.createCanvas = function(source) {
	var canvas = flambe_platform_html_HtmlUtil.createEmptyCanvas(source.width,source.height);
	var ctx = canvas.getContext("2d");
	ctx.save();
	ctx.globalCompositeOperation = "copy";
	ctx.drawImage(source,0,0);
	ctx.restore();
	return canvas;
};
flambe_platform_html_HtmlUtil.detectSlowDriver = function(gl) {
	var windows = window.navigator.platform.indexOf("Win") >= 0;
	if(windows) {
		var chrome = window.chrome != null;
		if(chrome) {
			var _g = 0;
			var _g1 = gl.getSupportedExtensions();
			while(_g < _g1.length) {
				var ext = _g1[_g];
				++_g;
				if(ext.indexOf("WEBGL_compressed_texture") >= 0) return false;
			}
			return true;
		}
	}
	return false;
};
flambe_platform_html_HtmlUtil.fixAndroidMath = function() {
	if(window.navigator.userAgent.indexOf("Linux; U; Android 4") >= 0) {
		var sin = Math.sin;
		var cos = Math.cos;
		Math.sin = function(x) {
			if(x == 0) return 0; else return sin(x);
		};
		Math.cos = function(x1) {
			if(x1 == 0) return 1; else return cos(x1);
		};
	}
};
var flambe_platform_html_WebAudioSound = function(buffer) {
	flambe_platform_BasicAsset.call(this);
	this.buffer = buffer;
};
$hxClasses["flambe.platform.html.WebAudioSound"] = flambe_platform_html_WebAudioSound;
flambe_platform_html_WebAudioSound.__name__ = true;
flambe_platform_html_WebAudioSound.__interfaces__ = [flambe_sound_Sound];
flambe_platform_html_WebAudioSound.get_supported = function() {
	if(flambe_platform_html_WebAudioSound._detectSupport) {
		flambe_platform_html_WebAudioSound._detectSupport = false;
		var AudioContext = flambe_platform_html_HtmlUtil.loadExtension("AudioContext").value;
		if(AudioContext != null) {
			flambe_platform_html_WebAudioSound.ctx = new AudioContext();
			flambe_platform_html_WebAudioSound.gain = flambe_platform_html_WebAudioSound.createGain();
			flambe_platform_html_WebAudioSound.gain.connect(flambe_platform_html_WebAudioSound.ctx.destination);
			flambe_System.volume.watch(function(volume,_) {
				flambe_platform_html_WebAudioSound.gain.gain.value = volume;
			});
		}
	}
	return flambe_platform_html_WebAudioSound.ctx != null;
};
flambe_platform_html_WebAudioSound.createGain = function() {
	if(flambe_platform_html_WebAudioSound.ctx.createGain != null) return flambe_platform_html_WebAudioSound.ctx.createGain(); else return flambe_platform_html_WebAudioSound.ctx.createGainNode();
};
flambe_platform_html_WebAudioSound.__super__ = flambe_platform_BasicAsset;
flambe_platform_html_WebAudioSound.prototype = $extend(flambe_platform_BasicAsset.prototype,{
	__class__: flambe_platform_html_WebAudioSound
});
var flambe_platform_html_WebGLBatcher = function(gl) {
	this._backbufferHeight = 0;
	this._backbufferWidth = 0;
	this._dataOffset = 0;
	this._maxQuads = 0;
	this._quads = 0;
	this._pendingSetScissor = false;
	this._currentRenderTarget = null;
	this._currentTexture = null;
	this._currentShader = null;
	this._currentBlendMode = null;
	this._lastScissor = null;
	this._lastTexture = null;
	this._lastShader = null;
	this._lastRenderTarget = null;
	this._lastBlendMode = null;
	this._gl = gl;
	gl.clearColor(0,0,0,0);
	gl.enable(3042);
	gl.pixelStorei(37441,1);
	this._vertexBuffer = gl.createBuffer();
	gl.bindBuffer(34962,this._vertexBuffer);
	this._quadIndexBuffer = gl.createBuffer();
	gl.bindBuffer(34963,this._quadIndexBuffer);
	this._drawTextureShader = new flambe_platform_shader_DrawTextureGL(gl);
	this._drawPatternShader = new flambe_platform_shader_DrawPatternGL(gl);
	this._fillRectShader = new flambe_platform_shader_FillRectGL(gl);
	this.resize(16);
};
$hxClasses["flambe.platform.html.WebGLBatcher"] = flambe_platform_html_WebGLBatcher;
flambe_platform_html_WebGLBatcher.__name__ = true;
flambe_platform_html_WebGLBatcher.prototype = {
	resizeBackbuffer: function(width,height) {
		this._gl.viewport(0,0,width,height);
		this._backbufferWidth = width;
		this._backbufferHeight = height;
	}
	,willRender: function() {
	}
	,didRender: function() {
		this.flush();
	}
	,bindTexture: function(texture) {
		this.flush();
		this._lastTexture = null;
		this._currentTexture = null;
		this._gl.bindTexture(3553,texture);
	}
	,prepareDrawTexture: function(renderTarget,blendMode,scissor,texture) {
		if(texture != this._lastTexture) {
			this.flush();
			this._lastTexture = texture;
		}
		return this.prepareQuad(5,renderTarget,blendMode,scissor,this._drawTextureShader);
	}
	,prepareFillRect: function(renderTarget,blendMode,scissor) {
		return this.prepareQuad(6,renderTarget,blendMode,scissor,this._fillRectShader);
	}
	,prepareQuad: function(elementsPerVertex,renderTarget,blendMode,scissor,shader) {
		if(renderTarget != this._lastRenderTarget) {
			this.flush();
			this._lastRenderTarget = renderTarget;
		}
		if(blendMode != this._lastBlendMode) {
			this.flush();
			this._lastBlendMode = blendMode;
		}
		if(shader != this._lastShader) {
			this.flush();
			this._lastShader = shader;
		}
		if(scissor != null || this._lastScissor != null) {
			if(scissor == null || this._lastScissor == null || !this._lastScissor.equals(scissor)) {
				this.flush();
				if(scissor != null) this._lastScissor = scissor.clone(this._lastScissor); else this._lastScissor = null;
				this._pendingSetScissor = true;
			}
		}
		if(this._quads >= this._maxQuads) this.resize(2 * this._maxQuads);
		++this._quads;
		var offset = this._dataOffset;
		this._dataOffset += 4 * elementsPerVertex;
		return offset;
	}
	,flush: function() {
		if(this._quads < 1) return;
		if(this._lastRenderTarget != this._currentRenderTarget) this.bindRenderTarget(this._lastRenderTarget);
		if(this._lastBlendMode != this._currentBlendMode) {
			var _g = this._lastBlendMode;
			switch(_g[1]) {
			case 0:
				this._gl.blendFunc(1,771);
				break;
			case 1:
				this._gl.blendFunc(1,1);
				break;
			case 2:
				this._gl.blendFunc(0,770);
				break;
			case 3:
				this._gl.blendFunc(1,0);
				break;
			}
			this._currentBlendMode = this._lastBlendMode;
		}
		if(this._pendingSetScissor) {
			if(this._lastScissor != null) {
				this._gl.enable(3089);
				this._gl.scissor(this._lastScissor.x | 0,this._lastScissor.y | 0,this._lastScissor.width | 0,this._lastScissor.height | 0);
			} else this._gl.disable(3089);
			this._pendingSetScissor = false;
		}
		if(this._lastTexture != this._currentTexture) {
			this._gl.bindTexture(3553,this._lastTexture.root.nativeTexture);
			this._currentTexture = this._lastTexture;
		}
		if(this._lastShader != this._currentShader) {
			this._lastShader.useProgram();
			this._lastShader.prepare();
			this._currentShader = this._lastShader;
		}
		if(this._lastShader == this._drawPatternShader) {
			var texture = this._lastTexture;
			var root = texture.root;
			this._drawPatternShader.setRegion(texture.rootX / root.width,texture.rootY / root.height,texture._width / root.width,texture._height / root.height);
		}
		this._gl.bufferData(34962,this.data.subarray(0,this._dataOffset),35040);
		this._gl.drawElements(4,6 * this._quads,5123,0);
		this._quads = 0;
		this._dataOffset = 0;
	}
	,resize: function(maxQuads) {
		this.flush();
		if(maxQuads > 1024) return;
		this._maxQuads = maxQuads;
		this.data = new Float32Array(maxQuads * 4 * 6);
		this._gl.bufferData(34962,this.data.length * 4,35040);
		var indices = new Uint16Array(6 * maxQuads);
		var _g = 0;
		while(_g < maxQuads) {
			var ii = _g++;
			indices[ii * 6] = ii * 4;
			indices[ii * 6 + 1] = ii * 4 + 1;
			indices[ii * 6 + 2] = ii * 4 + 2;
			indices[ii * 6 + 3] = ii * 4 + 2;
			indices[ii * 6 + 4] = ii * 4 + 3;
			indices[ii * 6 + 5] = ii * 4;
		}
		this._gl.bufferData(34963,indices,35044);
	}
	,bindRenderTarget: function(texture) {
		if(texture != null) {
			this._gl.bindFramebuffer(36160,texture.framebuffer);
			this._gl.viewport(0,0,texture.width,texture.height);
		} else {
			this._gl.bindFramebuffer(36160,null);
			this._gl.viewport(0,0,this._backbufferWidth,this._backbufferHeight);
		}
		this._currentRenderTarget = texture;
		this._lastRenderTarget = texture;
	}
	,__class__: flambe_platform_html_WebGLBatcher
};
var flambe_platform_html_WebGLGraphics = function(batcher,renderTarget) {
	this._stateList = null;
	this._inverseProjection = null;
	if(flambe_platform_html_WebGLGraphics._scratchQuadArray == null) flambe_platform_html_WebGLGraphics._scratchQuadArray = new Float32Array(8);
	this._batcher = batcher;
	this._renderTarget = renderTarget;
};
$hxClasses["flambe.platform.html.WebGLGraphics"] = flambe_platform_html_WebGLGraphics;
flambe_platform_html_WebGLGraphics.__name__ = true;
flambe_platform_html_WebGLGraphics.__interfaces__ = [flambe_platform_InternalGraphics];
flambe_platform_html_WebGLGraphics.prototype = {
	save: function() {
		var current = this._stateList;
		var state = this._stateList.next;
		if(state == null) {
			state = new flambe_platform_html__$WebGLGraphics_DrawingState();
			state.prev = current;
			current.next = state;
		}
		current.matrix.clone(state.matrix);
		state.alpha = current.alpha;
		state.blendMode = current.blendMode;
		if(current.scissor != null) state.scissor = current.scissor.clone(state.scissor); else state.scissor = null;
		this._stateList = state;
	}
	,transform: function(m00,m10,m01,m11,m02,m12) {
		var state = this._stateList;
		flambe_platform_html_WebGLGraphics._scratchMatrix.set(m00,m10,m01,m11,m02,m12);
		flambe_math_Matrix.multiply(state.matrix,flambe_platform_html_WebGLGraphics._scratchMatrix,state.matrix);
	}
	,restore: function() {
		this._stateList = this._stateList.prev;
	}
	,drawSubTexture: function(texture,destX,destY,sourceX,sourceY,sourceW,sourceH) {
		var state = this._stateList;
		var texture1 = texture;
		var root = texture1.root;
		var pos = this.transformQuad(destX,destY,sourceW,sourceH);
		var rootWidth = root.width;
		var rootHeight = root.height;
		var u1 = (texture1.rootX + sourceX) / rootWidth;
		var v1 = (texture1.rootY + sourceY) / rootHeight;
		var u2 = u1 + sourceW / rootWidth;
		var v2 = v1 + sourceH / rootHeight;
		var alpha = state.alpha;
		var offset = this._batcher.prepareDrawTexture(this._renderTarget,state.blendMode,state.scissor,texture1);
		var data = this._batcher.data;
		data[offset] = pos[0];
		data[++offset] = pos[1];
		data[++offset] = u1;
		data[++offset] = v1;
		data[++offset] = alpha;
		data[++offset] = pos[2];
		data[++offset] = pos[3];
		data[++offset] = u2;
		data[++offset] = v1;
		data[++offset] = alpha;
		data[++offset] = pos[4];
		data[++offset] = pos[5];
		data[++offset] = u2;
		data[++offset] = v2;
		data[++offset] = alpha;
		data[++offset] = pos[6];
		data[++offset] = pos[7];
		data[++offset] = u1;
		data[++offset] = v2;
		data[++offset] = alpha;
	}
	,fillRect: function(color,x,y,width,height) {
		var state = this._stateList;
		var pos = this.transformQuad(x,y,width,height);
		var r = (color & 16711680) / 16711680;
		var g = (color & 65280) / 65280;
		var b = (color & 255) / 255;
		var a = state.alpha;
		var offset = this._batcher.prepareFillRect(this._renderTarget,state.blendMode,state.scissor);
		var data = this._batcher.data;
		data[offset] = pos[0];
		data[++offset] = pos[1];
		data[++offset] = r;
		data[++offset] = g;
		data[++offset] = b;
		data[++offset] = a;
		data[++offset] = pos[2];
		data[++offset] = pos[3];
		data[++offset] = r;
		data[++offset] = g;
		data[++offset] = b;
		data[++offset] = a;
		data[++offset] = pos[4];
		data[++offset] = pos[5];
		data[++offset] = r;
		data[++offset] = g;
		data[++offset] = b;
		data[++offset] = a;
		data[++offset] = pos[6];
		data[++offset] = pos[7];
		data[++offset] = r;
		data[++offset] = g;
		data[++offset] = b;
		data[++offset] = a;
	}
	,multiplyAlpha: function(factor) {
		this._stateList.alpha *= factor;
	}
	,setBlendMode: function(blendMode) {
		this._stateList.blendMode = blendMode;
	}
	,applyScissor: function(x,y,width,height) {
		var state = this._stateList;
		var rect = flambe_platform_html_WebGLGraphics._scratchQuadArray;
		rect[0] = x;
		rect[1] = y;
		rect[2] = x + width;
		rect[3] = y + height;
		state.matrix.transformArray(rect,4,rect);
		this._inverseProjection.transformArray(rect,4,rect);
		x = rect[0];
		y = rect[1];
		width = rect[2] - x;
		height = rect[3] - y;
		if(width < 0) {
			x += width;
			width = -width;
		}
		if(height < 0) {
			y += height;
			height = -height;
		}
		state.applyScissor(x,y,width,height);
	}
	,willRender: function() {
		this._batcher.willRender();
	}
	,didRender: function() {
		this._batcher.didRender();
	}
	,onResize: function(width,height) {
		this._stateList = new flambe_platform_html__$WebGLGraphics_DrawingState();
		var flip;
		if(this._renderTarget != null) flip = -1; else flip = 1;
		this._stateList.matrix.set(2 / width,0,0,flip * -2 / height,-1,flip);
		this._inverseProjection = new flambe_math_Matrix();
		this._inverseProjection.set(2 / width,0,0,2 / height,-1,-1);
		this._inverseProjection.invert();
	}
	,transformQuad: function(x,y,width,height) {
		var x2 = x + width;
		var y2 = y + height;
		var pos = flambe_platform_html_WebGLGraphics._scratchQuadArray;
		pos[0] = x;
		pos[1] = y;
		pos[2] = x2;
		pos[3] = y;
		pos[4] = x2;
		pos[5] = y2;
		pos[6] = x;
		pos[7] = y2;
		this._stateList.matrix.transformArray(pos,8,pos);
		return pos;
	}
	,__class__: flambe_platform_html_WebGLGraphics
};
var flambe_platform_html__$WebGLGraphics_DrawingState = function() {
	this.next = null;
	this.prev = null;
	this.scissor = null;
	this.matrix = new flambe_math_Matrix();
	this.alpha = 1;
	this.blendMode = flambe_display_BlendMode.Normal;
};
$hxClasses["flambe.platform.html._WebGLGraphics.DrawingState"] = flambe_platform_html__$WebGLGraphics_DrawingState;
flambe_platform_html__$WebGLGraphics_DrawingState.__name__ = true;
flambe_platform_html__$WebGLGraphics_DrawingState.prototype = {
	applyScissor: function(x,y,width,height) {
		if(this.scissor != null) {
			var x1 = flambe_math_FMath.max(this.scissor.x,x);
			var y1 = flambe_math_FMath.max(this.scissor.y,y);
			var x2 = flambe_math_FMath.min(this.scissor.x + this.scissor.width,x + width);
			var y2 = flambe_math_FMath.min(this.scissor.y + this.scissor.height,y + height);
			x = x1;
			y = y1;
			width = x2 - x1;
			height = y2 - y1;
		} else this.scissor = new flambe_math_Rectangle();
		this.scissor.set(Math.round(x),Math.round(y),Math.round(width),Math.round(height));
	}
	,__class__: flambe_platform_html__$WebGLGraphics_DrawingState
};
var flambe_platform_html_WebGLRenderer = function(stage,gl) {
	var _g = this;
	this._hasGPU = new flambe_util_Value(true);
	this.gl = gl;
	gl.canvas.addEventListener("webglcontextlost",function(event) {
		event.preventDefault();
		_g._hasGPU.set__(false);
	},false);
	gl.canvas.addEventListener("webglcontextrestore",function(event1) {
		_g.init();
		_g._hasGPU.set__(true);
	},false);
	stage.resize.connect($bind(this,this.onResize));
	this.init();
};
$hxClasses["flambe.platform.html.WebGLRenderer"] = flambe_platform_html_WebGLRenderer;
flambe_platform_html_WebGLRenderer.__name__ = true;
flambe_platform_html_WebGLRenderer.__interfaces__ = [flambe_platform_InternalRenderer];
flambe_platform_html_WebGLRenderer.prototype = {
	get_type: function() {
		return flambe_subsystem_RendererType.WebGL;
	}
	,createTextureFromImage: function(image) {
		if(this.gl.isContextLost()) return null;
		var root = new flambe_platform_html_WebGLTextureRoot(this,image.width,image.height);
		root.uploadImageData(image);
		return root.createTexture(image.width,image.height);
	}
	,getCompressedTextureFormats: function() {
		return [];
	}
	,createCompressedTexture: function(format,data) {
		if(this.gl.isContextLost()) return null;
		return null;
	}
	,willRender: function() {
		this.graphics.willRender();
	}
	,didRender: function() {
		this.graphics.didRender();
	}
	,onResize: function() {
		var width = this.gl.canvas.width;
		var height = this.gl.canvas.height;
		this.batcher.resizeBackbuffer(width,height);
		this.graphics.onResize(width,height);
	}
	,init: function() {
		this.batcher = new flambe_platform_html_WebGLBatcher(this.gl);
		this.graphics = new flambe_platform_html_WebGLGraphics(this.batcher,null);
		this.onResize();
	}
	,__class__: flambe_platform_html_WebGLRenderer
};
var flambe_platform_html_WebGLTexture = function(root,width,height) {
	flambe_platform_BasicTexture.call(this,root,width,height);
};
$hxClasses["flambe.platform.html.WebGLTexture"] = flambe_platform_html_WebGLTexture;
flambe_platform_html_WebGLTexture.__name__ = true;
flambe_platform_html_WebGLTexture.__super__ = flambe_platform_BasicTexture;
flambe_platform_html_WebGLTexture.prototype = $extend(flambe_platform_BasicTexture.prototype,{
	__class__: flambe_platform_html_WebGLTexture
});
var flambe_platform_html_WebGLTextureRoot = function(renderer,width,height) {
	this.framebuffer = null;
	flambe_platform_BasicAsset.call(this);
	this._renderer = renderer;
	this.width = flambe_math_FMath.max(2,flambe_platform_MathUtil.nextPowerOfTwo(width));
	this.height = flambe_math_FMath.max(2,flambe_platform_MathUtil.nextPowerOfTwo(height));
	var gl = renderer.gl;
	this.nativeTexture = gl.createTexture();
	renderer.batcher.bindTexture(this.nativeTexture);
	gl.texParameteri(3553,10242,33071);
	gl.texParameteri(3553,10243,33071);
	gl.texParameteri(3553,10240,9729);
	gl.texParameteri(3553,10241,9728);
};
$hxClasses["flambe.platform.html.WebGLTextureRoot"] = flambe_platform_html_WebGLTextureRoot;
flambe_platform_html_WebGLTextureRoot.__name__ = true;
flambe_platform_html_WebGLTextureRoot.__interfaces__ = [flambe_platform_TextureRoot];
flambe_platform_html_WebGLTextureRoot.drawBorder = function(canvas,width,height) {
	var ctx = canvas.getContext("2d");
	ctx.drawImage(canvas,width - 1,0,1,height,width,0,1,height);
	ctx.drawImage(canvas,0,height - 1,width,1,0,height,width,1);
};
flambe_platform_html_WebGLTextureRoot.__super__ = flambe_platform_BasicAsset;
flambe_platform_html_WebGLTextureRoot.prototype = $extend(flambe_platform_BasicAsset.prototype,{
	createTexture: function(width,height) {
		return new flambe_platform_html_WebGLTexture(this,width,height);
	}
	,uploadImageData: function(image) {
		if(this.width != image.width || this.height != image.height) {
			var resized = flambe_platform_html_HtmlUtil.createEmptyCanvas(this.width,this.height);
			resized.getContext("2d").drawImage(image,0,0);
			flambe_platform_html_WebGLTextureRoot.drawBorder(resized,image.width,image.height);
			image = resized;
		}
		this._renderer.batcher.bindTexture(this.nativeTexture);
		var gl = this._renderer.gl;
		gl.texImage2D(3553,0,6408,6408,5121,image);
	}
	,__class__: flambe_platform_html_WebGLTextureRoot
});
var flambe_platform_shader_ShaderGL = function(gl,vertSource,fragSource) {
	fragSource = ["#ifdef GL_ES","precision mediump float;","#endif"].join("\n") + "\n" + fragSource;
	this._gl = gl;
	this._program = gl.createProgram();
	gl.attachShader(this._program,flambe_platform_shader_ShaderGL.createShader(gl,35633,vertSource));
	gl.attachShader(this._program,flambe_platform_shader_ShaderGL.createShader(gl,35632,fragSource));
	gl.linkProgram(this._program);
	gl.useProgram(this._program);
};
$hxClasses["flambe.platform.shader.ShaderGL"] = flambe_platform_shader_ShaderGL;
flambe_platform_shader_ShaderGL.__name__ = true;
flambe_platform_shader_ShaderGL.createShader = function(gl,type,source) {
	var shader = gl.createShader(type);
	gl.shaderSource(shader,source);
	gl.compileShader(shader);
	return shader;
};
flambe_platform_shader_ShaderGL.prototype = {
	useProgram: function() {
		this._gl.useProgram(this._program);
	}
	,prepare: function() {
		null;
	}
	,getAttribLocation: function(name) {
		var loc = this._gl.getAttribLocation(this._program,name);
		return loc;
	}
	,getUniformLocation: function(name) {
		var loc = this._gl.getUniformLocation(this._program,name);
		return loc;
	}
	,__class__: flambe_platform_shader_ShaderGL
};
var flambe_platform_shader_DrawPatternGL = function(gl) {
	flambe_platform_shader_ShaderGL.call(this,gl,["attribute highp vec2 a_pos;","attribute mediump vec2 a_uv;","attribute lowp float a_alpha;","varying mediump vec2 v_uv;","varying lowp float v_alpha;","void main (void) {","v_uv = a_uv;","v_alpha = a_alpha;","gl_Position = vec4(a_pos, 0, 1);","}"].join("\n"),["varying mediump vec2 v_uv;","varying lowp float v_alpha;","uniform lowp sampler2D u_texture;","uniform mediump vec4 u_region;","void main (void) {","gl_FragColor = texture2D(u_texture, u_region.xy + mod(v_uv, u_region.zw)) * v_alpha;","}"].join("\n"));
	this.a_pos = this.getAttribLocation("a_pos");
	this.a_uv = this.getAttribLocation("a_uv");
	this.a_alpha = this.getAttribLocation("a_alpha");
	this.u_texture = this.getUniformLocation("u_texture");
	this.u_region = this.getUniformLocation("u_region");
	this.setTexture(0);
};
$hxClasses["flambe.platform.shader.DrawPatternGL"] = flambe_platform_shader_DrawPatternGL;
flambe_platform_shader_DrawPatternGL.__name__ = true;
flambe_platform_shader_DrawPatternGL.__super__ = flambe_platform_shader_ShaderGL;
flambe_platform_shader_DrawPatternGL.prototype = $extend(flambe_platform_shader_ShaderGL.prototype,{
	setTexture: function(unit) {
		this._gl.uniform1i(this.u_texture,unit);
	}
	,setRegion: function(x,y,width,height) {
		this._gl.uniform4f(this.u_region,x,y,width,height);
	}
	,prepare: function() {
		this._gl.enableVertexAttribArray(this.a_pos);
		this._gl.enableVertexAttribArray(this.a_uv);
		this._gl.enableVertexAttribArray(this.a_alpha);
		var bytesPerFloat = 4;
		var stride = 5 * bytesPerFloat;
		this._gl.vertexAttribPointer(this.a_pos,2,5126,false,stride,0 * bytesPerFloat);
		this._gl.vertexAttribPointer(this.a_uv,2,5126,false,stride,2 * bytesPerFloat);
		this._gl.vertexAttribPointer(this.a_alpha,1,5126,false,stride,4 * bytesPerFloat);
	}
	,__class__: flambe_platform_shader_DrawPatternGL
});
var flambe_platform_shader_DrawTextureGL = function(gl) {
	flambe_platform_shader_ShaderGL.call(this,gl,["attribute highp vec2 a_pos;","attribute mediump vec2 a_uv;","attribute lowp float a_alpha;","varying mediump vec2 v_uv;","varying lowp float v_alpha;","void main (void) {","v_uv = a_uv;","v_alpha = a_alpha;","gl_Position = vec4(a_pos, 0, 1);","}"].join("\n"),["varying mediump vec2 v_uv;","varying lowp float v_alpha;","uniform lowp sampler2D u_texture;","void main (void) {","gl_FragColor = texture2D(u_texture, v_uv) * v_alpha;","}"].join("\n"));
	this.a_pos = this.getAttribLocation("a_pos");
	this.a_uv = this.getAttribLocation("a_uv");
	this.a_alpha = this.getAttribLocation("a_alpha");
	this.u_texture = this.getUniformLocation("u_texture");
	this.setTexture(0);
};
$hxClasses["flambe.platform.shader.DrawTextureGL"] = flambe_platform_shader_DrawTextureGL;
flambe_platform_shader_DrawTextureGL.__name__ = true;
flambe_platform_shader_DrawTextureGL.__super__ = flambe_platform_shader_ShaderGL;
flambe_platform_shader_DrawTextureGL.prototype = $extend(flambe_platform_shader_ShaderGL.prototype,{
	setTexture: function(unit) {
		this._gl.uniform1i(this.u_texture,unit);
	}
	,prepare: function() {
		this._gl.enableVertexAttribArray(this.a_pos);
		this._gl.enableVertexAttribArray(this.a_uv);
		this._gl.enableVertexAttribArray(this.a_alpha);
		var bytesPerFloat = 4;
		var stride = 5 * bytesPerFloat;
		this._gl.vertexAttribPointer(this.a_pos,2,5126,false,stride,0 * bytesPerFloat);
		this._gl.vertexAttribPointer(this.a_uv,2,5126,false,stride,2 * bytesPerFloat);
		this._gl.vertexAttribPointer(this.a_alpha,1,5126,false,stride,4 * bytesPerFloat);
	}
	,__class__: flambe_platform_shader_DrawTextureGL
});
var flambe_platform_shader_FillRectGL = function(gl) {
	flambe_platform_shader_ShaderGL.call(this,gl,["attribute highp vec2 a_pos;","attribute lowp vec3 a_rgb;","attribute lowp float a_alpha;","varying lowp vec4 v_color;","void main (void) {","v_color = vec4(a_rgb*a_alpha, a_alpha);","gl_Position = vec4(a_pos, 0, 1);","}"].join("\n"),["varying lowp vec4 v_color;","void main (void) {","gl_FragColor = v_color;","}"].join("\n"));
	this.a_pos = this.getAttribLocation("a_pos");
	this.a_rgb = this.getAttribLocation("a_rgb");
	this.a_alpha = this.getAttribLocation("a_alpha");
};
$hxClasses["flambe.platform.shader.FillRectGL"] = flambe_platform_shader_FillRectGL;
flambe_platform_shader_FillRectGL.__name__ = true;
flambe_platform_shader_FillRectGL.__super__ = flambe_platform_shader_ShaderGL;
flambe_platform_shader_FillRectGL.prototype = $extend(flambe_platform_shader_ShaderGL.prototype,{
	prepare: function() {
		this._gl.enableVertexAttribArray(this.a_pos);
		this._gl.enableVertexAttribArray(this.a_rgb);
		this._gl.enableVertexAttribArray(this.a_alpha);
		var bytesPerFloat = 4;
		var stride = 6 * bytesPerFloat;
		this._gl.vertexAttribPointer(this.a_pos,2,5126,false,stride,0 * bytesPerFloat);
		this._gl.vertexAttribPointer(this.a_rgb,3,5126,false,stride,2 * bytesPerFloat);
		this._gl.vertexAttribPointer(this.a_alpha,1,5126,false,stride,5 * bytesPerFloat);
	}
	,__class__: flambe_platform_shader_FillRectGL
});
var flambe_scene_Director = function() {
	this._transitor = null;
};
$hxClasses["flambe.scene.Director"] = flambe_scene_Director;
flambe_scene_Director.__name__ = true;
flambe_scene_Director.__super__ = flambe_Component;
flambe_scene_Director.prototype = $extend(flambe_Component.prototype,{
	get_name: function() {
		return "Director_1";
	}
	,onAdded: function() {
		this.owner.addChild(this._root);
	}
	,onRemoved: function() {
		this.completeTransition();
		var _g = 0;
		var _g1 = this.scenes;
		while(_g < _g1.length) {
			var scene = _g1[_g];
			++_g;
			scene.dispose();
		}
		this.scenes = [];
		this.occludedScenes = [];
		this._root.dispose();
	}
	,onUpdate: function(dt) {
		if(this._transitor != null && this._transitor.update(dt)) this.completeTransition();
	}
	,get_topScene: function() {
		var ll = this.scenes.length;
		if(ll > 0) return this.scenes[ll - 1]; else return null;
	}
	,show: function(scene) {
		var events = scene._compMap.Scene_3;
		if(events != null) events.shown.emit();
	}
	,invalidateVisibility: function() {
		var ii = this.scenes.length;
		while(ii > 0) {
			var scene = this.scenes[--ii];
			var comp = scene._compMap.Scene_3;
			if(comp == null || comp.opaque) break;
		}
		if(this.scenes.length > 0) this.occludedScenes = this.scenes.slice(ii,this.scenes.length - 1); else this.occludedScenes = [];
		var scene1 = this.get_topScene();
		if(scene1 != null) this.show(scene1);
	}
	,completeTransition: function() {
		if(this._transitor != null) {
			this._transitor.complete();
			this._transitor = null;
			this.invalidateVisibility();
		}
	}
	,__class__: flambe_scene_Director
});
var flambe_scene__$Director_Transitor = function() { };
$hxClasses["flambe.scene._Director.Transitor"] = flambe_scene__$Director_Transitor;
flambe_scene__$Director_Transitor.__name__ = true;
flambe_scene__$Director_Transitor.prototype = {
	update: function(dt) {
		return this._transition.update(dt);
	}
	,complete: function() {
		this._transition.complete();
		this._onComplete();
	}
	,__class__: flambe_scene__$Director_Transitor
};
var flambe_scene_Scene = function() { };
$hxClasses["flambe.scene.Scene"] = flambe_scene_Scene;
flambe_scene_Scene.__name__ = true;
flambe_scene_Scene.__super__ = flambe_Component;
flambe_scene_Scene.prototype = $extend(flambe_Component.prototype,{
	get_name: function() {
		return "Scene_3";
	}
	,__class__: flambe_scene_Scene
});
var flambe_scene_Transition = function() { };
$hxClasses["flambe.scene.Transition"] = flambe_scene_Transition;
flambe_scene_Transition.__name__ = true;
flambe_scene_Transition.prototype = {
	update: function(dt) {
		return true;
	}
	,complete: function() {
	}
	,__class__: flambe_scene_Transition
};
var flambe_subsystem_RendererType = $hxClasses["flambe.subsystem.RendererType"] = { __ename__ : true, __constructs__ : ["Stage3D","WebGL","Canvas"] };
flambe_subsystem_RendererType.Stage3D = ["Stage3D",0];
flambe_subsystem_RendererType.Stage3D.toString = $estr;
flambe_subsystem_RendererType.Stage3D.__enum__ = flambe_subsystem_RendererType;
flambe_subsystem_RendererType.WebGL = ["WebGL",1];
flambe_subsystem_RendererType.WebGL.toString = $estr;
flambe_subsystem_RendererType.WebGL.__enum__ = flambe_subsystem_RendererType;
flambe_subsystem_RendererType.Canvas = ["Canvas",2];
flambe_subsystem_RendererType.Canvas.toString = $estr;
flambe_subsystem_RendererType.Canvas.__enum__ = flambe_subsystem_RendererType;
var flambe_util_Assert = function() { };
$hxClasses["flambe.util.Assert"] = flambe_util_Assert;
flambe_util_Assert.__name__ = true;
flambe_util_Assert.that = function(condition,message,fields) {
};
var flambe_util_BitSets = function() { };
$hxClasses["flambe.util.BitSets"] = flambe_util_BitSets;
flambe_util_BitSets.__name__ = true;
flambe_util_BitSets.set = function(bits,mask,enabled) {
	if(enabled) return bits | mask; else return bits & ~mask;
};
var flambe_util_Promise = function() {
	this.success = new flambe_util_Signal1();
	this.error = new flambe_util_Signal1();
	this.progressChanged = new flambe_util_Signal0();
	this.hasResult = false;
	this._progress = 0;
	this._total = 0;
};
$hxClasses["flambe.util.Promise"] = flambe_util_Promise;
flambe_util_Promise.__name__ = true;
flambe_util_Promise.prototype = {
	set_result: function(result) {
		if(this.hasResult) throw "Promise result already assigned";
		this._result = result;
		this.hasResult = true;
		this.success.emit(result);
		return result;
	}
	,get: function(fn) {
		if(this.hasResult) {
			fn(this._result);
			return null;
		}
		return this.success.connect(fn).once();
	}
	,set_progress: function(progress) {
		if(this._progress != progress) {
			this._progress = progress;
			this.progressChanged.emit();
		}
		return progress;
	}
	,set_total: function(total) {
		if(this._total != total) {
			this._total = total;
			this.progressChanged.emit();
		}
		return total;
	}
	,__class__: flambe_util_Promise
};
var flambe_util_Signal0 = function(listener) {
	flambe_util_SignalBase.call(this,listener);
};
$hxClasses["flambe.util.Signal0"] = flambe_util_Signal0;
flambe_util_Signal0.__name__ = true;
flambe_util_Signal0.__super__ = flambe_util_SignalBase;
flambe_util_Signal0.prototype = $extend(flambe_util_SignalBase.prototype,{
	connect: function(listener,prioritize) {
		if(prioritize == null) prioritize = false;
		return this.connectImpl(listener,prioritize);
	}
	,emit: function() {
		var _g = this;
		if(this._head == flambe_util_SignalBase.DISPATCHING_SENTINEL) this.defer(function() {
			_g.emitImpl();
		}); else this.emitImpl();
	}
	,emitImpl: function() {
		var head = this.willEmit();
		var p = head;
		while(p != null) {
			p._listener();
			if(!p.stayInList) p.dispose();
			p = p._next;
		}
		this.didEmit(head);
	}
	,__class__: flambe_util_Signal0
});
var flambe_util__$SignalBase_Task = function(fn) {
	this.next = null;
	this.fn = fn;
};
$hxClasses["flambe.util._SignalBase.Task"] = flambe_util__$SignalBase_Task;
flambe_util__$SignalBase_Task.__name__ = true;
flambe_util__$SignalBase_Task.prototype = {
	__class__: flambe_util__$SignalBase_Task
};
var flambe_util_Strings = function() { };
$hxClasses["flambe.util.Strings"] = flambe_util_Strings;
flambe_util_Strings.__name__ = true;
flambe_util_Strings.getFileExtension = function(fileName) {
	var dot = fileName.lastIndexOf(".");
	if(dot > 0) return HxOverrides.substr(fileName,dot + 1,null); else return null;
};
flambe_util_Strings.removeFileExtension = function(fileName) {
	var dot = fileName.lastIndexOf(".");
	if(dot > 0) return HxOverrides.substr(fileName,0,dot); else return fileName;
};
flambe_util_Strings.getUrlExtension = function(url) {
	var question = url.lastIndexOf("?");
	if(question >= 0) url = HxOverrides.substr(url,0,question);
	var slash = url.lastIndexOf("/");
	if(slash >= 0) url = HxOverrides.substr(url,slash + 1,null);
	return flambe_util_Strings.getFileExtension(url);
};
flambe_util_Strings.joinPath = function(base,relative) {
	if(base.length > 0 && base.charCodeAt(base.length - 1) != 47) base += "/";
	return base + relative;
};
flambe_util_Strings.withFields = function(message,fields) {
	var ll = fields.length;
	if(ll > 0) {
		if(message.length > 0) message += " ["; else message += "[";
		var ii = 0;
		while(ii < ll) {
			if(ii > 0) message += ", ";
			var name = fields[ii];
			var value = fields[ii + 1];
			if(Std["is"](value,Error)) {
				var stack = value.stack;
				if(stack != null) value = stack;
			}
			message += name + "=" + Std.string(value);
			ii += 2;
		}
		message += "]";
	}
	return message;
};
var haxe_ds_IntMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.IntMap"] = haxe_ds_IntMap;
haxe_ds_IntMap.__name__ = true;
haxe_ds_IntMap.__interfaces__ = [IMap];
haxe_ds_IntMap.prototype = {
	set: function(key,value) {
		this.h[key] = value;
	}
	,get: function(key) {
		return this.h[key];
	}
	,exists: function(key) {
		return this.h.hasOwnProperty(key);
	}
	,remove: function(key) {
		if(!this.h.hasOwnProperty(key)) return false;
		delete(this.h[key]);
		return true;
	}
	,__class__: haxe_ds_IntMap
};
var haxe_ds_StringMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.StringMap"] = haxe_ds_StringMap;
haxe_ds_StringMap.__name__ = true;
haxe_ds_StringMap.__interfaces__ = [IMap];
haxe_ds_StringMap.prototype = {
	set: function(key,value) {
		this.h["$" + key] = value;
	}
	,get: function(key) {
		return this.h["$" + key];
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key.substr(1));
		}
		return HxOverrides.iter(a);
	}
	,iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref["$" + i];
		}};
	}
	,__class__: haxe_ds_StringMap
};
var haxe_io_Bytes = function() { };
$hxClasses["haxe.io.Bytes"] = haxe_io_Bytes;
haxe_io_Bytes.__name__ = true;
var haxe_io_Eof = function() { };
$hxClasses["haxe.io.Eof"] = haxe_io_Eof;
haxe_io_Eof.__name__ = true;
haxe_io_Eof.prototype = {
	toString: function() {
		return "Eof";
	}
	,__class__: haxe_io_Eof
};
var haxe_rtti_Meta = function() { };
$hxClasses["haxe.rtti.Meta"] = haxe_rtti_Meta;
haxe_rtti_Meta.__name__ = true;
haxe_rtti_Meta.getType = function(t) {
	var meta = t.__meta__;
	if(meta == null || meta.obj == null) return { }; else return meta.obj;
};
var js_Boot = function() { };
$hxClasses["js.Boot"] = js_Boot;
js_Boot.__name__ = true;
js_Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else return o.__class__;
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js_Boot.__string_rec(o[i],s); else str += js_Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i1;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js_Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str2 = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str2.length != 2) str2 += ", \n";
		str2 += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str2 += "\n" + s + "}";
		return str2;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js_Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js_Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js_Boot.__interfLoop(cc.__super__,cl);
};
js_Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Array:
		return (o instanceof Array) && o.__enum__ == null;
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) return true;
				if(js_Boot.__interfLoop(js_Boot.getClass(o),cl)) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js_Boot.__cast = function(o,t) {
	if(js_Boot.__instanceof(o,t)) return o; else throw "Cannot cast " + Std.string(o) + " to " + Std.string(t);
};
var js_html__$CanvasElement_CanvasUtil = function() { };
$hxClasses["js.html._CanvasElement.CanvasUtil"] = js_html__$CanvasElement_CanvasUtil;
js_html__$CanvasElement_CanvasUtil.__name__ = true;
js_html__$CanvasElement_CanvasUtil.getContextWebGL = function(canvas,attribs) {
	var _g = 0;
	var _g1 = ["webgl","experimental-webgl"];
	while(_g < _g1.length) {
		var name = _g1[_g];
		++_g;
		var ctx = canvas.getContext(name,attribs);
		if(ctx != null) return ctx;
	}
	return null;
};
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; }
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
$hxClasses.Math = Math;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i1) {
	return isNaN(i1);
};
String.prototype.__class__ = $hxClasses.String = String;
String.__name__ = true;
$hxClasses.Array = Array;
Array.__name__ = true;
Date.prototype.__class__ = $hxClasses.Date = Date;
Date.__name__ = ["Date"];
var Int = $hxClasses.Int = { __name__ : ["Int"]};
var Dynamic = $hxClasses.Dynamic = { __name__ : ["Dynamic"]};
var Float = $hxClasses.Float = Number;
Float.__name__ = ["Float"];
var Bool = $hxClasses.Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = $hxClasses.Class = { __name__ : ["Class"]};
var Enum = { };
Main.demoNum = 0;
flambe_platform_html_HtmlPlatform.instance = new flambe_platform_html_HtmlPlatform();
flambe_util_SignalBase.DISPATCHING_SENTINEL = new flambe_util_SignalConnection(null,null);
flambe_System.root = new flambe_Entity();
flambe_System.uncaughtError = new flambe_util_Signal1();
flambe_System.hidden = new flambe_util_Value(false);
flambe_System.volume = new flambe_animation_AnimatedFloat(1);
flambe_System._platform = flambe_platform_html_HtmlPlatform.instance;
flambe_System._calledInit = false;
flambe_asset_Manifest.__meta__ = { obj : { assets : [{ bootstrap : [{ bytes : 29404, md5 : "c125532d986f42efa0bf387912735640", name : "camera/grass-tiles-2-small.png"},{ bytes : 1285, md5 : "0f7f669896db87bf68f521e9c48fcd26", name : "camera/littleshrooms_0.png"},{ bytes : 14884, md5 : "6944f4f5d02468f5a767a8597c1f042a", name : "camera/map.json"},{ bytes : 1544, md5 : "452db9c347ac36596de545fdb0984fc4", name : "camera/meta.png"},{ bytes : 3778, md5 : "7b0d45a8467a81d176b00b09a7174639", name : "camera/qubodup-bush_berries_0.png"},{ bytes : 26910, md5 : "82aa9442686da74203db44cb28b534a5", name : "camera/tree2-final.png"}]}]}};
flambe_asset_Manifest._supportsCrossOrigin = (function() {
	var detected = (function() {
		if(window.navigator.userAgent.indexOf("Linux; U; Android") >= 0) return false;
		var xhr = new XMLHttpRequest();
		return xhr.withCredentials != null;
	})();
	if(!detected) null;
	return detected;
})();
flambe_display_Sprite._scratchPoint = new flambe_math_Point();
flambe_platform_BasicMouse._sharedEvent = new flambe_input_MouseEvent();
flambe_platform_BasicPointer._sharedEvent = new flambe_input_PointerEvent();
flambe_platform_html_CanvasRenderer.CANVAS_TEXTURES = (function() {
	var pattern = new EReg("(iPhone|iPod|iPad)","");
	return pattern.match(window.navigator.userAgent);
})();
flambe_platform_html_HtmlAssetPackLoader._mediaRefCount = 0;
flambe_platform_html_HtmlAssetPackLoader._detectBlobSupport = true;
flambe_platform_html_HtmlUtil.VENDOR_PREFIXES = ["webkit","moz","ms","o","khtml"];
flambe_platform_html_HtmlUtil.SHOULD_HIDE_MOBILE_BROWSER = window.top == window && new EReg("Mobile(/.*)? Safari","").match(window.navigator.userAgent);
flambe_platform_html_WebAudioSound._detectSupport = true;
flambe_platform_html_WebGLGraphics._scratchMatrix = new flambe_math_Matrix();
Main.main();
})();
