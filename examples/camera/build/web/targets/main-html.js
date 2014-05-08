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
	var loader = flambe_System.loadAssetPack(manifest);
	loader.get(Main.onSuccess);
};
Main.onSuccess = function(pack) {
	var background = new flambe_display_FillSprite(16777215,flambe_System.get_stage().get_width(),flambe_System.get_stage().get_height());
	flambe_System.root.addChild(new flambe_Entity().add(background));
	Main.parser = new flambe_map_tmx_TmxParser(pack,"camera/map");
	Main.map = new flambe_Entity();
	flambe_System.get_pointer().down.connect(function(_) {
		Main.changeDemo();
	});
	Main.changeDemo();
};
Main.automaticCameraDemo = function() {
	Main.map.dispose();
	Main.map.add(Main.parser.newMap(flambe_System.get_stage().get_width(),flambe_System.get_stage().get_height()));
	var mapSprite = Main.map.getComponent("Sprite_0");
	mapSprite.disablePointer();
	mapSprite.camera.x.set_behavior(new flambe_animation_Sine(0,1000,5));
	mapSprite.camera.y.set_behavior(new flambe_animation_Sine(0,900,7));
	(js_Boot.__cast(mapSprite.camera.x.get_behavior() , flambe_animation_Sine)).speed.set_behavior(new flambe_animation_Sine(5,2,10));
	(js_Boot.__cast(mapSprite.camera.y.get_behavior() , flambe_animation_Sine)).speed.set_behavior(new flambe_animation_Sine(7,3,7));
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
Reflect.hasField = function(o,field) {
	return Object.prototype.hasOwnProperty.call(o,field);
};
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		return null;
	}
};
Reflect.setField = function(o,field,value) {
	o[field] = value;
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
Std["int"] = function(x) {
	return x | 0;
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
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
};
StringTools.fastCodeAt = function(s,index) {
	return s.charCodeAt(index);
};
var Type = function() { };
$hxClasses["Type"] = Type;
Type.__name__ = true;
Type.getClass = function(o) {
	if(o == null) return null;
	return js_Boot.getClass(o);
};
Type.resolveClass = function(name) {
	var cl = $hxClasses[name];
	if(cl == null || !js_Boot.isClass(cl)) return null;
	return cl;
};
Type.resolveEnum = function(name) {
	var e = $hxClasses[name];
	if(e == null || !js_Boot.isEnum(e)) return null;
	return e;
};
Type.enumIndex = function(e) {
	return e[1];
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
	,setNext: function(next) {
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
		var prev = this.getComponent(name);
		if(prev != null) this.remove(prev);
		this._compMap[name] = component;
		var tail = null;
		var p = this.firstComponent;
		while(p != null) {
			tail = p;
			p = p.next;
		}
		if(tail != null) tail.setNext(component); else this.firstComponent = component;
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
	,getComponent: function(name) {
		return this._compMap[name];
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
	,toString: function() {
		return this.toStringImpl("");
	}
	,toStringImpl: function(indent) {
		var output = "";
		var p = this.firstComponent;
		while(p != null) {
			output += p.get_name();
			if(p.next != null) output += ", ";
			p = p.next;
		}
		output += "\n";
		var u2514 = String.fromCharCode(9492);
		var u241c = String.fromCharCode(9500);
		var u2500 = String.fromCharCode(9472);
		var u2502 = String.fromCharCode(9474);
		var p1 = this.firstChild;
		while(p1 != null) {
			var last = p1.next == null;
			output += indent + (last?u2514:u241c) + u2500 + u2500 + " ";
			output += p1.toStringImpl(indent + (last?" ":u2502) + "   ");
			p1 = p1.next;
		}
		return output;
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
			canvas = js_Browser.get_window().flambe.canvas;
		} catch( error ) {
		}
		flambe_util_Assert.that(canvas != null,"Could not find a Flambe canvas! Are you embedding with flambe.js?");
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
		js_Browser.get_window().addEventListener("mousedown",onMouse,false);
		js_Browser.get_window().addEventListener("mousemove",onMouse,false);
		js_Browser.get_window().addEventListener("mouseup",onMouse,false);
		canvas.addEventListener("mousewheel",onMouse,false);
		canvas.addEventListener("DOMMouseScroll",onMouse,false);
		canvas.addEventListener("contextmenu",function(event1) {
			event1.preventDefault();
		},false);
		var standardTouch = typeof(js_Browser.get_window().ontouchstart) != "undefined";
		var msTouch = 'msMaxTouchPoints' in window.navigator && (window.navigator.msMaxTouchPoints > 1);
		if(standardTouch || msTouch) {
			var basicTouch = new flambe_platform_BasicTouch(this._pointer,standardTouch?4:js_Browser.get_navigator().msMaxTouchPoints);
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
						var id = Std["int"](standardTouch?touch.identifier:touch.pointerId);
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
						var id1 = Std["int"](standardTouch?touch1.identifier:touch1.pointerId);
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
						var id2 = Std["int"](standardTouch?touch2.identifier:touch2.pointerId);
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
		var oldErrorHandler = js_Browser.get_window().onerror;
		js_Browser.get_window().onerror = function(message,url,line) {
			flambe_System.uncaughtError.emit(message);
			if(oldErrorHandler != null) return oldErrorHandler(message,url,line); else return false;
		};
		var hiddenApi = flambe_platform_html_HtmlUtil.loadExtension("hidden",js_Browser.get_document());
		if(hiddenApi.value != null) {
			var onVisibilityChanged = function(_) {
				flambe_System.hidden.set__(Reflect.field(js_Browser.get_document(),hiddenApi.field));
			};
			onVisibilityChanged(null);
			js_Browser.get_document().addEventListener(hiddenApi.prefix + "visibilitychange",onVisibilityChanged,false);
		} else {
			var onPageTransitionChange = function(event3) {
				flambe_System.hidden.set__(event3.type == "pagehide");
			};
			js_Browser.get_window().addEventListener("pageshow",onPageTransitionChange,false);
			js_Browser.get_window().addEventListener("pagehide",onPageTransitionChange,false);
		}
		flambe_System.hidden.get_changed().connect(function(hidden,_1) {
			if(!hidden) _g._skipFrame = true;
		});
		this._skipFrame = false;
		this._lastUpdate = flambe_platform_html_HtmlUtil.now();
		var requestAnimationFrame = flambe_platform_html_HtmlUtil.loadExtension("requestAnimationFrame").value;
		if(requestAnimationFrame != null) {
			var performance = js_Browser.get_window().performance;
			var hasPerfNow = performance != null && flambe_platform_html_HtmlUtil.polyfill("now",performance);
			if(hasPerfNow) this._lastUpdate = performance.now(); else flambe_Log.warn("No monotonic timer support, falling back to the system date");
			var updateFrame = null;
			updateFrame = function(now) {
				_g.update(hasPerfNow?performance.now():now);
				requestAnimationFrame(updateFrame,canvas);
			};
			requestAnimationFrame(updateFrame,canvas);
		} else {
			flambe_Log.warn("No requestAnimationFrame support, falling back to setInterval");
			js_Browser.get_window().setInterval(function() {
				_g.update(flambe_platform_html_HtmlUtil.now());
			},16);
		}
		new flambe_platform_DebugLogic(this);
		if(flambe_platform_html_HtmlCatapultClient.canUse()) this._catapult = new flambe_platform_html_HtmlCatapultClient(); else this._catapult = null;
		flambe_Log.info("Initialized HTML platform",["renderer",this._renderer.get_type()]);
	}
	,loadAssetPack: function(manifest) {
		return new flambe_platform_html_HtmlAssetPackLoader(this,manifest).promise;
	}
	,getStage: function() {
		return this._stage;
	}
	,createLogHandler: function(tag) {
		if(flambe_platform_html_HtmlLogHandler.isSupported()) return new flambe_platform_html_HtmlLogHandler(tag);
		return null;
	}
	,getCatapultClient: function() {
		return this._catapult;
	}
	,update: function(now) {
		var dt = (now - this._lastUpdate) / 1000;
		this._lastUpdate = now;
		if(flambe_System.hidden.get__()) return;
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
	,getKeyboard: function() {
		var _g1 = this;
		if(this._keyboard == null) {
			this._keyboard = new flambe_platform_BasicKeyboard();
			var onKey = function(event) {
				var _g = event.type;
				switch(_g) {
				case "keydown":
					if(_g1._keyboard.submitDown(event.keyCode)) event.preventDefault();
					break;
				case "keyup":
					_g1._keyboard.submitUp(event.keyCode);
					break;
				}
			};
			this._canvas.addEventListener("keydown",onKey,false);
			this._canvas.addEventListener("keyup",onKey,false);
		}
		return this._keyboard;
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
				if(flambe_platform_html_HtmlUtil.detectSlowDriver(gl)) flambe_Log.warn("Detected a slow WebGL driver, falling back to canvas"); else return new flambe_platform_html_WebGLRenderer(this._stage,gl);
			}
		} catch( _ ) {
		}
		return new flambe_platform_html_CanvasRenderer(canvas);
		flambe_Log.error("No renderer available!");
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
	,get__: function() {
		return this._value;
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
	,toString: function() {
		return "" + Std.string(this._value);
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
	hasListeners: function() {
		return this._head != null;
	}
	,connectImpl: function(listener,prioritize) {
		var _g = this;
		var conn = new flambe_util_SignalConnection(this,listener);
		if(this.dispatching()) this.defer(function() {
			_g.listAdd(conn,prioritize);
		}); else this.listAdd(conn,prioritize);
		return conn;
	}
	,disconnect: function(conn) {
		var _g = this;
		if(this.dispatching()) this.defer(function() {
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
		flambe_util_Assert.that(!this.dispatching());
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
	,dispatching: function() {
		return this._head == flambe_util_SignalBase.DISPATCHING_SENTINEL;
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
		if(this.dispatching()) this.defer(function() {
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
		if(this.dispatching()) this.defer(function() {
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
	,get_behavior: function() {
		return this._behavior;
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
flambe_System.loadAssetPack = function(manifest) {
	flambe_System.assertCalledInit();
	return flambe_System._platform.loadAssetPack(manifest);
};
flambe_System.createLogger = function(tag) {
	return new flambe_util_Logger(flambe_System._platform.createLogHandler(tag));
};
flambe_System.get_stage = function() {
	flambe_System.assertCalledInit();
	return flambe_System._platform.getStage();
};
flambe_System.get_pointer = function() {
	flambe_System.assertCalledInit();
	return flambe_System._platform.getPointer();
};
flambe_System.get_renderer = function() {
	flambe_System.assertCalledInit();
	return flambe_System._platform.getRenderer();
};
flambe_System.assertCalledInit = function() {
	flambe_util_Assert.that(flambe_System._calledInit,"You must call System.init() first");
};
var flambe_util_Logger = function(handler) {
	this._handler = handler;
};
$hxClasses["flambe.util.Logger"] = flambe_util_Logger;
flambe_util_Logger.__name__ = true;
flambe_util_Logger.prototype = {
	info: function(text,fields) {
		this.log(flambe_util_LogLevel.Info,text,fields);
	}
	,warn: function(text,fields) {
		this.log(flambe_util_LogLevel.Warn,text,fields);
	}
	,error: function(text,fields) {
		this.log(flambe_util_LogLevel.Error,text,fields);
	}
	,log: function(level,text,fields) {
		if(this._handler == null) return;
		if(text == null) text = "";
		if(fields != null) text = flambe_util_Strings.withFields(text,fields);
		this._handler.log(level,text);
	}
	,__class__: flambe_util_Logger
};
var flambe_Log = function() { };
$hxClasses["flambe.Log"] = flambe_Log;
flambe_Log.__name__ = true;
flambe_Log.info = function(text,args) {
	flambe_Log.logger.info(text,args);
};
flambe_Log.warn = function(text,args) {
	flambe_Log.logger.warn(text,args);
};
flambe_Log.error = function(text,args) {
	flambe_Log.logger.error(text,args);
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
		this._count += dt * (3.141592653589793 / this.speed.get__());
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
var js_Browser = function() { };
$hxClasses["js.Browser"] = js_Browser;
js_Browser.__name__ = true;
js_Browser.get_window = function() {
	return window;
};
js_Browser.get_document = function() {
	return window.document;
};
js_Browser.get_location = function() {
	return window.location;
};
js_Browser.get_navigator = function() {
	return window.navigator;
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
	} else flambe_Log.warn("No file extension for asset, it will be loaded as data",["url",url]);
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
		if(localBase != null) flambe_util_Assert.that(!StringTools.startsWith(localBase,"http://") && !StringTools.startsWith(localBase,"https://"),"localBase must be a path on the same domain, NOT starting with http(s)://");
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
	toString: function() {
		return "(" + this.x + "," + this.y + ")";
	}
	,__class__: flambe_math_Point
};
var flambe_display_Sprite = function() {
	this.scissor = null;
	this.blendMode = null;
	var _g = this;
	this._flags = 1 | 2 | 8 | 128;
	this._localMatrix = new flambe_math_Matrix();
	var dirtyMatrix = function(_,_1) {
		_g._flags = flambe_util_BitSets.add(_g._flags,4 | 8);
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
	var sprite = entity.getComponent("Sprite_0");
	if(sprite != null) {
		if(!flambe_util_BitSets.containsAll(sprite._flags,1 | 2)) return null;
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
	var sprite = entity.getComponent("Sprite_0");
	if(sprite != null) {
		var alpha = sprite.alpha.get__();
		if(!sprite.get_visible() || alpha <= 0) return;
		g.save();
		if(alpha < 1) g.multiplyAlpha(alpha);
		if(sprite.blendMode != null) g.setBlendMode(sprite.blendMode);
		var matrix = sprite.getLocalMatrix();
		var m02 = matrix.m02;
		var m12 = matrix.m12;
		if(sprite.get_pixelSnapping()) {
			m02 = Math.round(m02);
			m12 = Math.round(m12);
		}
		g.transform(matrix.m00,matrix.m10,matrix.m01,matrix.m11,m02,m12);
		var scissor = sprite.scissor;
		if(scissor != null) g.applyScissor(scissor.x,scissor.y,scissor.width,scissor.height);
		sprite.draw(g);
	}
	var director = entity.getComponent("Director_1");
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
		if(flambe_util_BitSets.contains(this._flags,4)) {
			this._flags = flambe_util_BitSets.remove(this._flags,4);
			this._localMatrix.compose(this.x.get__(),this.y.get__(),this.scaleX.get__(),this.scaleY.get__(),flambe_math_FMath.toRadians(this.rotation.get__()));
			this._localMatrix.translate(-this.anchorX.get__(),-this.anchorY.get__());
		}
		return this._localMatrix;
	}
	,disablePointer: function() {
		this.set_pointerEnabled(false);
		return this;
	}
	,onAdded: function() {
		if(flambe_util_BitSets.contains(this._flags,256)) this.connectHover();
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
			var sprite = entity.getComponent("Sprite_0");
			if(sprite != null) return sprite;
			entity = entity.parent;
		}
		return null;
	}
	,connectHover: function() {
		var _g = this;
		if(this._hoverConnection != null) return;
		this._hoverConnection = flambe_System.get_pointer().move.connect(function(event) {
			var hit = event.hit;
			while(hit != null) {
				if(hit == _g) return;
				hit = hit.getParentSprite();
			}
			if(_g._pointerOut != null && flambe_util_BitSets.contains(_g._flags,256)) _g._pointerOut.emit(event);
			_g._flags = flambe_util_BitSets.remove(_g._flags,256);
			_g._hoverConnection.dispose();
			_g._hoverConnection = null;
		});
	}
	,get_visible: function() {
		return flambe_util_BitSets.contains(this._flags,1);
	}
	,set_visible: function(visible) {
		this._flags = flambe_util_BitSets.set(this._flags,1,visible);
		return visible;
	}
	,set_pointerEnabled: function(pointerEnabled) {
		this._flags = flambe_util_BitSets.set(this._flags,2,pointerEnabled);
		return pointerEnabled;
	}
	,get_pixelSnapping: function() {
		return flambe_util_BitSets.contains(this._flags,128);
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
		if(flambe_util_BitSets.contains(this._flags,256)) return;
		this._flags = flambe_util_BitSets.add(this._flags,256);
		if(this._pointerIn != null || this._pointerOut != null) {
			if(this._pointerIn != null) this._pointerIn.emit(event);
			this.connectHover();
		}
	}
	,onPointerUp: function(event) {
		{
			var _g = event.source;
			switch(Type.enumIndex(_g)) {
			case 1:
				var point = _g[2];
				if(this._pointerOut != null && flambe_util_BitSets.contains(this._flags,256)) this._pointerOut.emit(event);
				this._flags = flambe_util_BitSets.remove(this._flags,256);
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
		g.fillRect(this.color,0,0,this.width.get__(),this.height.get__());
	}
	,getNaturalWidth: function() {
		return this.width.get__();
	}
	,getNaturalHeight: function() {
		return this.height.get__();
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
flambe_display_Texture.prototype = {
	__class__: flambe_display_Texture
};
var flambe_display_SubTexture = function() { };
$hxClasses["flambe.display.SubTexture"] = flambe_display_SubTexture;
flambe_display_SubTexture.__name__ = true;
flambe_display_SubTexture.__interfaces__ = [flambe_display_Texture];
var flambe_input_Key = $hxClasses["flambe.input.Key"] = { __ename__ : true, __constructs__ : ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","Number0","Number1","Number2","Number3","Number4","Number5","Number6","Number7","Number8","Number9","Numpad0","Numpad1","Numpad2","Numpad3","Numpad4","Numpad5","Numpad6","Numpad7","Numpad8","Numpad9","NumpadAdd","NumpadDecimal","NumpadDivide","NumpadEnter","NumpadMultiply","NumpadSubtract","F1","F2","F3","F4","F5","F6","F7","F8","F9","F10","F11","F12","F13","F14","F15","Left","Up","Right","Down","Alt","Backquote","Backslash","Backspace","CapsLock","Comma","Command","Control","Delete","End","Enter","Equals","Escape","Home","Insert","LeftBracket","Minus","PageDown","PageUp","Period","Quote","RightBracket","Semicolon","Shift","Slash","Space","Tab","Menu","Search","Unknown"] };
flambe_input_Key.A = ["A",0];
flambe_input_Key.A.toString = $estr;
flambe_input_Key.A.__enum__ = flambe_input_Key;
flambe_input_Key.B = ["B",1];
flambe_input_Key.B.toString = $estr;
flambe_input_Key.B.__enum__ = flambe_input_Key;
flambe_input_Key.C = ["C",2];
flambe_input_Key.C.toString = $estr;
flambe_input_Key.C.__enum__ = flambe_input_Key;
flambe_input_Key.D = ["D",3];
flambe_input_Key.D.toString = $estr;
flambe_input_Key.D.__enum__ = flambe_input_Key;
flambe_input_Key.E = ["E",4];
flambe_input_Key.E.toString = $estr;
flambe_input_Key.E.__enum__ = flambe_input_Key;
flambe_input_Key.F = ["F",5];
flambe_input_Key.F.toString = $estr;
flambe_input_Key.F.__enum__ = flambe_input_Key;
flambe_input_Key.G = ["G",6];
flambe_input_Key.G.toString = $estr;
flambe_input_Key.G.__enum__ = flambe_input_Key;
flambe_input_Key.H = ["H",7];
flambe_input_Key.H.toString = $estr;
flambe_input_Key.H.__enum__ = flambe_input_Key;
flambe_input_Key.I = ["I",8];
flambe_input_Key.I.toString = $estr;
flambe_input_Key.I.__enum__ = flambe_input_Key;
flambe_input_Key.J = ["J",9];
flambe_input_Key.J.toString = $estr;
flambe_input_Key.J.__enum__ = flambe_input_Key;
flambe_input_Key.K = ["K",10];
flambe_input_Key.K.toString = $estr;
flambe_input_Key.K.__enum__ = flambe_input_Key;
flambe_input_Key.L = ["L",11];
flambe_input_Key.L.toString = $estr;
flambe_input_Key.L.__enum__ = flambe_input_Key;
flambe_input_Key.M = ["M",12];
flambe_input_Key.M.toString = $estr;
flambe_input_Key.M.__enum__ = flambe_input_Key;
flambe_input_Key.N = ["N",13];
flambe_input_Key.N.toString = $estr;
flambe_input_Key.N.__enum__ = flambe_input_Key;
flambe_input_Key.O = ["O",14];
flambe_input_Key.O.toString = $estr;
flambe_input_Key.O.__enum__ = flambe_input_Key;
flambe_input_Key.P = ["P",15];
flambe_input_Key.P.toString = $estr;
flambe_input_Key.P.__enum__ = flambe_input_Key;
flambe_input_Key.Q = ["Q",16];
flambe_input_Key.Q.toString = $estr;
flambe_input_Key.Q.__enum__ = flambe_input_Key;
flambe_input_Key.R = ["R",17];
flambe_input_Key.R.toString = $estr;
flambe_input_Key.R.__enum__ = flambe_input_Key;
flambe_input_Key.S = ["S",18];
flambe_input_Key.S.toString = $estr;
flambe_input_Key.S.__enum__ = flambe_input_Key;
flambe_input_Key.T = ["T",19];
flambe_input_Key.T.toString = $estr;
flambe_input_Key.T.__enum__ = flambe_input_Key;
flambe_input_Key.U = ["U",20];
flambe_input_Key.U.toString = $estr;
flambe_input_Key.U.__enum__ = flambe_input_Key;
flambe_input_Key.V = ["V",21];
flambe_input_Key.V.toString = $estr;
flambe_input_Key.V.__enum__ = flambe_input_Key;
flambe_input_Key.W = ["W",22];
flambe_input_Key.W.toString = $estr;
flambe_input_Key.W.__enum__ = flambe_input_Key;
flambe_input_Key.X = ["X",23];
flambe_input_Key.X.toString = $estr;
flambe_input_Key.X.__enum__ = flambe_input_Key;
flambe_input_Key.Y = ["Y",24];
flambe_input_Key.Y.toString = $estr;
flambe_input_Key.Y.__enum__ = flambe_input_Key;
flambe_input_Key.Z = ["Z",25];
flambe_input_Key.Z.toString = $estr;
flambe_input_Key.Z.__enum__ = flambe_input_Key;
flambe_input_Key.Number0 = ["Number0",26];
flambe_input_Key.Number0.toString = $estr;
flambe_input_Key.Number0.__enum__ = flambe_input_Key;
flambe_input_Key.Number1 = ["Number1",27];
flambe_input_Key.Number1.toString = $estr;
flambe_input_Key.Number1.__enum__ = flambe_input_Key;
flambe_input_Key.Number2 = ["Number2",28];
flambe_input_Key.Number2.toString = $estr;
flambe_input_Key.Number2.__enum__ = flambe_input_Key;
flambe_input_Key.Number3 = ["Number3",29];
flambe_input_Key.Number3.toString = $estr;
flambe_input_Key.Number3.__enum__ = flambe_input_Key;
flambe_input_Key.Number4 = ["Number4",30];
flambe_input_Key.Number4.toString = $estr;
flambe_input_Key.Number4.__enum__ = flambe_input_Key;
flambe_input_Key.Number5 = ["Number5",31];
flambe_input_Key.Number5.toString = $estr;
flambe_input_Key.Number5.__enum__ = flambe_input_Key;
flambe_input_Key.Number6 = ["Number6",32];
flambe_input_Key.Number6.toString = $estr;
flambe_input_Key.Number6.__enum__ = flambe_input_Key;
flambe_input_Key.Number7 = ["Number7",33];
flambe_input_Key.Number7.toString = $estr;
flambe_input_Key.Number7.__enum__ = flambe_input_Key;
flambe_input_Key.Number8 = ["Number8",34];
flambe_input_Key.Number8.toString = $estr;
flambe_input_Key.Number8.__enum__ = flambe_input_Key;
flambe_input_Key.Number9 = ["Number9",35];
flambe_input_Key.Number9.toString = $estr;
flambe_input_Key.Number9.__enum__ = flambe_input_Key;
flambe_input_Key.Numpad0 = ["Numpad0",36];
flambe_input_Key.Numpad0.toString = $estr;
flambe_input_Key.Numpad0.__enum__ = flambe_input_Key;
flambe_input_Key.Numpad1 = ["Numpad1",37];
flambe_input_Key.Numpad1.toString = $estr;
flambe_input_Key.Numpad1.__enum__ = flambe_input_Key;
flambe_input_Key.Numpad2 = ["Numpad2",38];
flambe_input_Key.Numpad2.toString = $estr;
flambe_input_Key.Numpad2.__enum__ = flambe_input_Key;
flambe_input_Key.Numpad3 = ["Numpad3",39];
flambe_input_Key.Numpad3.toString = $estr;
flambe_input_Key.Numpad3.__enum__ = flambe_input_Key;
flambe_input_Key.Numpad4 = ["Numpad4",40];
flambe_input_Key.Numpad4.toString = $estr;
flambe_input_Key.Numpad4.__enum__ = flambe_input_Key;
flambe_input_Key.Numpad5 = ["Numpad5",41];
flambe_input_Key.Numpad5.toString = $estr;
flambe_input_Key.Numpad5.__enum__ = flambe_input_Key;
flambe_input_Key.Numpad6 = ["Numpad6",42];
flambe_input_Key.Numpad6.toString = $estr;
flambe_input_Key.Numpad6.__enum__ = flambe_input_Key;
flambe_input_Key.Numpad7 = ["Numpad7",43];
flambe_input_Key.Numpad7.toString = $estr;
flambe_input_Key.Numpad7.__enum__ = flambe_input_Key;
flambe_input_Key.Numpad8 = ["Numpad8",44];
flambe_input_Key.Numpad8.toString = $estr;
flambe_input_Key.Numpad8.__enum__ = flambe_input_Key;
flambe_input_Key.Numpad9 = ["Numpad9",45];
flambe_input_Key.Numpad9.toString = $estr;
flambe_input_Key.Numpad9.__enum__ = flambe_input_Key;
flambe_input_Key.NumpadAdd = ["NumpadAdd",46];
flambe_input_Key.NumpadAdd.toString = $estr;
flambe_input_Key.NumpadAdd.__enum__ = flambe_input_Key;
flambe_input_Key.NumpadDecimal = ["NumpadDecimal",47];
flambe_input_Key.NumpadDecimal.toString = $estr;
flambe_input_Key.NumpadDecimal.__enum__ = flambe_input_Key;
flambe_input_Key.NumpadDivide = ["NumpadDivide",48];
flambe_input_Key.NumpadDivide.toString = $estr;
flambe_input_Key.NumpadDivide.__enum__ = flambe_input_Key;
flambe_input_Key.NumpadEnter = ["NumpadEnter",49];
flambe_input_Key.NumpadEnter.toString = $estr;
flambe_input_Key.NumpadEnter.__enum__ = flambe_input_Key;
flambe_input_Key.NumpadMultiply = ["NumpadMultiply",50];
flambe_input_Key.NumpadMultiply.toString = $estr;
flambe_input_Key.NumpadMultiply.__enum__ = flambe_input_Key;
flambe_input_Key.NumpadSubtract = ["NumpadSubtract",51];
flambe_input_Key.NumpadSubtract.toString = $estr;
flambe_input_Key.NumpadSubtract.__enum__ = flambe_input_Key;
flambe_input_Key.F1 = ["F1",52];
flambe_input_Key.F1.toString = $estr;
flambe_input_Key.F1.__enum__ = flambe_input_Key;
flambe_input_Key.F2 = ["F2",53];
flambe_input_Key.F2.toString = $estr;
flambe_input_Key.F2.__enum__ = flambe_input_Key;
flambe_input_Key.F3 = ["F3",54];
flambe_input_Key.F3.toString = $estr;
flambe_input_Key.F3.__enum__ = flambe_input_Key;
flambe_input_Key.F4 = ["F4",55];
flambe_input_Key.F4.toString = $estr;
flambe_input_Key.F4.__enum__ = flambe_input_Key;
flambe_input_Key.F5 = ["F5",56];
flambe_input_Key.F5.toString = $estr;
flambe_input_Key.F5.__enum__ = flambe_input_Key;
flambe_input_Key.F6 = ["F6",57];
flambe_input_Key.F6.toString = $estr;
flambe_input_Key.F6.__enum__ = flambe_input_Key;
flambe_input_Key.F7 = ["F7",58];
flambe_input_Key.F7.toString = $estr;
flambe_input_Key.F7.__enum__ = flambe_input_Key;
flambe_input_Key.F8 = ["F8",59];
flambe_input_Key.F8.toString = $estr;
flambe_input_Key.F8.__enum__ = flambe_input_Key;
flambe_input_Key.F9 = ["F9",60];
flambe_input_Key.F9.toString = $estr;
flambe_input_Key.F9.__enum__ = flambe_input_Key;
flambe_input_Key.F10 = ["F10",61];
flambe_input_Key.F10.toString = $estr;
flambe_input_Key.F10.__enum__ = flambe_input_Key;
flambe_input_Key.F11 = ["F11",62];
flambe_input_Key.F11.toString = $estr;
flambe_input_Key.F11.__enum__ = flambe_input_Key;
flambe_input_Key.F12 = ["F12",63];
flambe_input_Key.F12.toString = $estr;
flambe_input_Key.F12.__enum__ = flambe_input_Key;
flambe_input_Key.F13 = ["F13",64];
flambe_input_Key.F13.toString = $estr;
flambe_input_Key.F13.__enum__ = flambe_input_Key;
flambe_input_Key.F14 = ["F14",65];
flambe_input_Key.F14.toString = $estr;
flambe_input_Key.F14.__enum__ = flambe_input_Key;
flambe_input_Key.F15 = ["F15",66];
flambe_input_Key.F15.toString = $estr;
flambe_input_Key.F15.__enum__ = flambe_input_Key;
flambe_input_Key.Left = ["Left",67];
flambe_input_Key.Left.toString = $estr;
flambe_input_Key.Left.__enum__ = flambe_input_Key;
flambe_input_Key.Up = ["Up",68];
flambe_input_Key.Up.toString = $estr;
flambe_input_Key.Up.__enum__ = flambe_input_Key;
flambe_input_Key.Right = ["Right",69];
flambe_input_Key.Right.toString = $estr;
flambe_input_Key.Right.__enum__ = flambe_input_Key;
flambe_input_Key.Down = ["Down",70];
flambe_input_Key.Down.toString = $estr;
flambe_input_Key.Down.__enum__ = flambe_input_Key;
flambe_input_Key.Alt = ["Alt",71];
flambe_input_Key.Alt.toString = $estr;
flambe_input_Key.Alt.__enum__ = flambe_input_Key;
flambe_input_Key.Backquote = ["Backquote",72];
flambe_input_Key.Backquote.toString = $estr;
flambe_input_Key.Backquote.__enum__ = flambe_input_Key;
flambe_input_Key.Backslash = ["Backslash",73];
flambe_input_Key.Backslash.toString = $estr;
flambe_input_Key.Backslash.__enum__ = flambe_input_Key;
flambe_input_Key.Backspace = ["Backspace",74];
flambe_input_Key.Backspace.toString = $estr;
flambe_input_Key.Backspace.__enum__ = flambe_input_Key;
flambe_input_Key.CapsLock = ["CapsLock",75];
flambe_input_Key.CapsLock.toString = $estr;
flambe_input_Key.CapsLock.__enum__ = flambe_input_Key;
flambe_input_Key.Comma = ["Comma",76];
flambe_input_Key.Comma.toString = $estr;
flambe_input_Key.Comma.__enum__ = flambe_input_Key;
flambe_input_Key.Command = ["Command",77];
flambe_input_Key.Command.toString = $estr;
flambe_input_Key.Command.__enum__ = flambe_input_Key;
flambe_input_Key.Control = ["Control",78];
flambe_input_Key.Control.toString = $estr;
flambe_input_Key.Control.__enum__ = flambe_input_Key;
flambe_input_Key.Delete = ["Delete",79];
flambe_input_Key.Delete.toString = $estr;
flambe_input_Key.Delete.__enum__ = flambe_input_Key;
flambe_input_Key.End = ["End",80];
flambe_input_Key.End.toString = $estr;
flambe_input_Key.End.__enum__ = flambe_input_Key;
flambe_input_Key.Enter = ["Enter",81];
flambe_input_Key.Enter.toString = $estr;
flambe_input_Key.Enter.__enum__ = flambe_input_Key;
flambe_input_Key.Equals = ["Equals",82];
flambe_input_Key.Equals.toString = $estr;
flambe_input_Key.Equals.__enum__ = flambe_input_Key;
flambe_input_Key.Escape = ["Escape",83];
flambe_input_Key.Escape.toString = $estr;
flambe_input_Key.Escape.__enum__ = flambe_input_Key;
flambe_input_Key.Home = ["Home",84];
flambe_input_Key.Home.toString = $estr;
flambe_input_Key.Home.__enum__ = flambe_input_Key;
flambe_input_Key.Insert = ["Insert",85];
flambe_input_Key.Insert.toString = $estr;
flambe_input_Key.Insert.__enum__ = flambe_input_Key;
flambe_input_Key.LeftBracket = ["LeftBracket",86];
flambe_input_Key.LeftBracket.toString = $estr;
flambe_input_Key.LeftBracket.__enum__ = flambe_input_Key;
flambe_input_Key.Minus = ["Minus",87];
flambe_input_Key.Minus.toString = $estr;
flambe_input_Key.Minus.__enum__ = flambe_input_Key;
flambe_input_Key.PageDown = ["PageDown",88];
flambe_input_Key.PageDown.toString = $estr;
flambe_input_Key.PageDown.__enum__ = flambe_input_Key;
flambe_input_Key.PageUp = ["PageUp",89];
flambe_input_Key.PageUp.toString = $estr;
flambe_input_Key.PageUp.__enum__ = flambe_input_Key;
flambe_input_Key.Period = ["Period",90];
flambe_input_Key.Period.toString = $estr;
flambe_input_Key.Period.__enum__ = flambe_input_Key;
flambe_input_Key.Quote = ["Quote",91];
flambe_input_Key.Quote.toString = $estr;
flambe_input_Key.Quote.__enum__ = flambe_input_Key;
flambe_input_Key.RightBracket = ["RightBracket",92];
flambe_input_Key.RightBracket.toString = $estr;
flambe_input_Key.RightBracket.__enum__ = flambe_input_Key;
flambe_input_Key.Semicolon = ["Semicolon",93];
flambe_input_Key.Semicolon.toString = $estr;
flambe_input_Key.Semicolon.__enum__ = flambe_input_Key;
flambe_input_Key.Shift = ["Shift",94];
flambe_input_Key.Shift.toString = $estr;
flambe_input_Key.Shift.__enum__ = flambe_input_Key;
flambe_input_Key.Slash = ["Slash",95];
flambe_input_Key.Slash.toString = $estr;
flambe_input_Key.Slash.__enum__ = flambe_input_Key;
flambe_input_Key.Space = ["Space",96];
flambe_input_Key.Space.toString = $estr;
flambe_input_Key.Space.__enum__ = flambe_input_Key;
flambe_input_Key.Tab = ["Tab",97];
flambe_input_Key.Tab.toString = $estr;
flambe_input_Key.Tab.__enum__ = flambe_input_Key;
flambe_input_Key.Menu = ["Menu",98];
flambe_input_Key.Menu.toString = $estr;
flambe_input_Key.Menu.__enum__ = flambe_input_Key;
flambe_input_Key.Search = ["Search",99];
flambe_input_Key.Search.toString = $estr;
flambe_input_Key.Search.__enum__ = flambe_input_Key;
flambe_input_Key.Unknown = function(keyCode) { var $x = ["Unknown",100,keyCode]; $x.__enum__ = flambe_input_Key; $x.toString = $estr; return $x; };
var flambe_input_KeyboardEvent = function() {
	this.init(0,null);
};
$hxClasses["flambe.input.KeyboardEvent"] = flambe_input_KeyboardEvent;
flambe_input_KeyboardEvent.__name__ = true;
flambe_input_KeyboardEvent.prototype = {
	init: function(id,key) {
		this.id = id;
		this.key = key;
	}
	,__class__: flambe_input_KeyboardEvent
};
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
		if(mapWidth > 0 && _g.width.get__() > mapWidth) _g.width.set__(mapWidth);
		if(mapHeight > 0 && _g.height.get__() > mapHeight) _g.height.set__(mapHeight);
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
		g.applyScissor(0,0,this.width.get__(),this.height.get__());
	}
	,getNaturalWidth: function() {
		return this.width.get__();
	}
	,getNaturalHeight: function() {
		return this.height.get__();
	}
	,addLayer: function(id,layer) {
		flambe_util_Assert.that(!this._names.exists(id),"You may not have duplicate layer names in a map.",[id]);
		var s = layer.getComponent("Sprite_0");
		if(s == null) layer.add(s = new flambe_display_Sprite());
		s.getLocalMatrix().set(1,0,0,1,-this.camera.region.x,-this.camera.region.y);
		if(Type.getClass(s) == flambe_map_TileSprite) {
			var ts = s;
			if(ts.region == null) ts.region = new flambe_math_Rectangle(-this.camera.x.get__(),-this.camera.y.get__(),this.width.get__(),this.height.get__());
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
			var layer = this._layers[ii].getComponent("Sprite_0");
			if(Type.getClass(layer) == flambe_map_TileSprite) (js_Boot.__cast(layer , flambe_map_TileSprite)).region.set(-this.camera.region.x,-this.camera.region.y,this.width.get__(),this.height.get__());
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
		flambe_util_Arrays.resize(this._layers,0);
	}
	,__class__: flambe_map_MapSprite
});
var flambe_map_TileSprite = function(symbols,tileWidth,tileHeight) {
	flambe_display_Sprite.call(this);
	this.symbols = symbols;
	this.tileWidth = tileWidth;
	this.tileHeight = tileHeight;
	this._tiles = new Uint32Array(0);
};
$hxClasses["flambe.map.TileSprite"] = flambe_map_TileSprite;
flambe_map_TileSprite.__name__ = true;
flambe_map_TileSprite.__super__ = flambe_display_Sprite;
flambe_map_TileSprite.prototype = $extend(flambe_display_Sprite.prototype,{
	fromArray: function(tiles,columns,rows) {
		flambe_util_Assert.that(columns * rows == tiles.length,"The number of tiles must match with the columns and rows information.",[columns,rows]);
		this._tiles = new Uint32Array(tiles);
		this.columns = columns;
		this.rows = rows;
		this.drawToBuffer();
		return this;
	}
	,drawToBuffer: function() {
		var totalWidth = this.columns * this.tileWidth;
		var totalHeight = this.rows * this.tileHeight;
		if(this._buffer == null || this._buffer.get_width() != totalWidth || this._buffer.get_width() != totalHeight) {
			if(this._buffer != null) this._buffer.dispose();
			this._buffer = flambe_System.get_renderer().createTexture(totalWidth,totalHeight);
		}
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
		var right = sX / this.tileWidth >> 0;
		var bottom = sY / this.tileHeight >> 0;
		var _g = 0;
		while(_g < columnLength) {
			var x = _g++;
			var tileX = x - right;
			var paintX = tileX * this.tileWidth;
			var _g1 = 0;
			while(_g1 < rowLength) {
				var y = _g1++;
				var tileY = y - bottom;
				var gid = this._tiles[tileX + tileY * this.columns];
				if(gid > 0) {
					var symbol = this.symbols[gid];
					var paintY = tileY * this.tileHeight;
					this._buffer.get_graphics().drawSubTexture(symbol.atlas,paintX,paintY,symbol.x,symbol.y,symbol.width,symbol.height);
				}
			}
		}
	}
	,draw: function(g) {
		if(!this.get_visible() || this._buffer == null) return;
		g.drawTexture(this._buffer,0,0);
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
		this.applyPosition(mapSprite,this.x.get__(),this.y.get__());
	}
	,applyPosition: function(mapSprite,x,y) {
		var unusedWidth = mapSprite.mapWidth - mapSprite.width.get__();
		var unusedHeight = mapSprite.mapHeight - mapSprite.height.get__();
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
			container.getComponent("Sprite_0").alpha.set__(layer.opacity);
			container.getComponent("Sprite_0").set_visible(layer.visible);
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
flambe_math_FMath.toRadians = function(degrees) {
	return degrees * 3.141592653589793 / 180;
};
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
	,toString: function() {
		return this.m00 + " " + this.m01 + " " + this.m02 + " \\ " + this.m10 + " " + this.m11 + " " + this.m12;
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
	,toString: function() {
		return "(" + this.x + "," + this.y + " " + this.width + "x" + this.height + ")";
	}
	,__class__: flambe_math_Rectangle
};
var flambe_platform_BasicAsset = function() {
	this._reloadCount = null;
	this._disposed = false;
};
$hxClasses["flambe.platform.BasicAsset"] = flambe_platform_BasicAsset;
flambe_platform_BasicAsset.__name__ = true;
flambe_platform_BasicAsset.__interfaces__ = [flambe_asset_Asset];
flambe_platform_BasicAsset.prototype = {
	assertNotDisposed: function() {
		flambe_util_Assert.that(!this._disposed,"Asset cannot be used after being disposed");
	}
	,reload: function(asset) {
		this.copyFrom(asset);
		var _g = this.get_reloadCount();
		_g.set__(_g.get__() + 1);
	}
	,dispose: function() {
		if(!this._disposed) {
			this._disposed = true;
			this.onDisposed();
		}
	}
	,copyFrom: function(asset) {
		flambe_util_Assert.fail();
	}
	,onDisposed: function() {
		flambe_util_Assert.fail();
	}
	,get_reloadCount: function() {
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
						_g11.set_total(_g11.get_total() + bestEntry.bytes);
					} else {
						var badEntry = group2[0][0];
						if(flambe_platform_BasicAssetPackLoader.isAudio(badEntry.format)) {
							flambe_Log.warn("Could not find a supported audio format to load",["name",badEntry.name]);
							_g.handleLoad(badEntry,flambe_platform_DummySound.getInstance());
						} else _g.handleError(badEntry,"Could not find a supported format to load");
					}
				};
			})(group2));
		}
	}
	var catapult = this._platform.getCatapultClient();
	if(catapult != null) catapult.add(this);
};
$hxClasses["flambe.platform.BasicAssetPackLoader"] = flambe_platform_BasicAssetPackLoader;
flambe_platform_BasicAssetPackLoader.__name__ = true;
flambe_platform_BasicAssetPackLoader.removeUrlParams = function(url) {
	var query = url.indexOf("?");
	if(query > 0) return HxOverrides.substr(url,0,query); else return url;
};
flambe_platform_BasicAssetPackLoader.isAudio = function(format) {
	switch(Type.enumIndex(format)) {
	case 8:case 9:case 10:case 11:case 12:
		return true;
	default:
		return false;
	}
};
flambe_platform_BasicAssetPackLoader.prototype = {
	reload: function(url) {
		var _g = this;
		var baseUrl = flambe_platform_BasicAssetPackLoader.removeUrlParams(url);
		var foundEntry = null;
		var $it0 = this.manifest.iterator();
		while( $it0.hasNext() ) {
			var entry = $it0.next();
			if(baseUrl == flambe_platform_BasicAssetPackLoader.removeUrlParams(entry.url)) {
				foundEntry = entry;
				break;
			}
		}
		if(foundEntry != null) this.getAssetFormats(function(formats) {
			if(formats.indexOf(foundEntry.format) >= 0) {
				var entry1 = new flambe_asset_AssetEntry(foundEntry.name,url,foundEntry.format,0);
				_g.loadEntry(_g.manifest.getFullURL(entry1),entry1);
			}
		});
	}
	,pickBestEntry: function(entries,fn) {
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
		flambe_util_Assert.fail();
	}
	,getAssetFormats: function(fn) {
		flambe_util_Assert.fail();
	}
	,handleLoad: function(entry,asset) {
		if(this._pack.disposed) return;
		this.handleProgress(entry,entry.bytes);
		var map;
		var _g = entry.format;
		switch(Type.enumIndex(_g)) {
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
		var oldAsset = map.get(entry.name);
		if(oldAsset != null) {
			flambe_Log.info("Reloaded asset",["url",entry.url]);
			oldAsset.reload(asset);
		} else {
			map.set(entry.name,asset);
			this._assetsRemaining -= 1;
			if(this._assetsRemaining == 0) this.handleSuccess();
		}
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
		flambe_Log.warn("Error loading asset pack",["error",message,"url",entry.url]);
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
flambe_platform__$BasicAssetPackLoader_BasicAssetPack.warnOnExtension = function(path) {
	var ext = flambe_util_Strings.getFileExtension(path);
	if(ext != null && ext.length == 3) flambe_Log.warn("Requested asset \"" + path + "\" should not have a file extension," + " did you mean \"" + flambe_util_Strings.removeFileExtension(path) + "\"?");
};
flambe_platform__$BasicAssetPackLoader_BasicAssetPack.prototype = {
	getTexture: function(name,required) {
		if(required == null) required = true;
		this.assertNotDisposed();
		flambe_platform__$BasicAssetPackLoader_BasicAssetPack.warnOnExtension(name);
		var texture = this.textures.get(name);
		if(texture == null && required) throw flambe_util_Strings.withFields("Missing texture",["name",name]);
		return texture;
	}
	,getFile: function(name,required) {
		if(required == null) required = true;
		this.assertNotDisposed();
		var file = this.files.get(name);
		if(file == null && required) throw flambe_util_Strings.withFields("Missing file",["name",name]);
		return file;
	}
	,assertNotDisposed: function() {
		flambe_util_Assert.that(!this.disposed,"AssetPack cannot be used after being disposed");
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
		this.assertNotDisposed();
		return this._content;
	}
	,copyFrom: function(that) {
		this._content = that._content;
	}
	,onDisposed: function() {
		this._content = null;
	}
	,__class__: flambe_platform_BasicFile
});
var flambe_subsystem_KeyboardSystem = function() { };
$hxClasses["flambe.subsystem.KeyboardSystem"] = flambe_subsystem_KeyboardSystem;
flambe_subsystem_KeyboardSystem.__name__ = true;
flambe_subsystem_KeyboardSystem.prototype = {
	__class__: flambe_subsystem_KeyboardSystem
};
var flambe_platform_BasicKeyboard = function() {
	this.down = new flambe_util_Signal1();
	this.up = new flambe_util_Signal1();
	this.backButton = new flambe_util_Signal0();
	this._keyStates = new haxe_ds_IntMap();
};
$hxClasses["flambe.platform.BasicKeyboard"] = flambe_platform_BasicKeyboard;
flambe_platform_BasicKeyboard.__name__ = true;
flambe_platform_BasicKeyboard.__interfaces__ = [flambe_subsystem_KeyboardSystem];
flambe_platform_BasicKeyboard.prototype = {
	isDown: function(key) {
		return this.isCodeDown(flambe_platform_KeyCodes.toKeyCode(key));
	}
	,isCodeDown: function(keyCode) {
		return this._keyStates.exists(keyCode);
	}
	,submitDown: function(keyCode) {
		if(keyCode == 16777238) {
			if(this.backButton.hasListeners()) {
				this.backButton.emit();
				return true;
			}
			return false;
		}
		if(!this.isCodeDown(keyCode)) {
			this._keyStates.set(keyCode,true);
			flambe_platform_BasicKeyboard._sharedEvent.init(flambe_platform_BasicKeyboard._sharedEvent.id + 1,flambe_platform_KeyCodes.toKey(keyCode));
			this.down.emit(flambe_platform_BasicKeyboard._sharedEvent);
		}
		return true;
	}
	,submitUp: function(keyCode) {
		if(this.isCodeDown(keyCode)) {
			this._keyStates.remove(keyCode);
			flambe_platform_BasicKeyboard._sharedEvent.init(flambe_platform_BasicKeyboard._sharedEvent.id + 1,flambe_platform_KeyCodes.toKey(keyCode));
			this.up.emit(flambe_platform_BasicKeyboard._sharedEvent);
		}
	}
	,__class__: flambe_platform_BasicKeyboard
};
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
		if(!this.isCodeDown(buttonCode)) {
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
		if(this.isCodeDown(buttonCode)) {
			this._buttonStates.remove(buttonCode);
			this.prepare(viewX,viewY,flambe_platform_MouseCodes.toButton(buttonCode));
			this._pointer.submitUp(viewX,viewY,this._source);
			this.up.emit(flambe_platform_BasicMouse._sharedEvent);
		}
	}
	,submitScroll: function(viewX,viewY,velocity) {
		this._x = viewX;
		this._y = viewY;
		if(!this.scroll.hasListeners()) return false;
		this.scroll.emit(velocity);
		return true;
	}
	,isCodeDown: function(buttonCode) {
		return this._buttonStates.exists(buttonCode);
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
				var sprite = entity.getComponent("Sprite_0");
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
				var sprite = entity.getComponent("Sprite_0");
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
				var sprite = entity.getComponent("Sprite_0");
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
	this._y = 0;
	this._x = 0;
	this._parent = null;
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
	get_graphics: function() {
		return this.root.getGraphics();
	}
	,copyFrom: function(that) {
		this.root.copyFrom(that.root);
		this._width = that._width;
		this._height = that._height;
		flambe_util_Assert.that(this.rootX == that.rootX && this.rootY == that.rootY && this._x == that._x && this._y == that._y);
	}
	,onDisposed: function() {
		if(this._parent == null) this.root.dispose();
	}
	,get_reloadCount: function() {
		return this.root.get_reloadCount();
	}
	,get_width: function() {
		return this._width;
	}
	,get_height: function() {
		return this._height;
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
var flambe_platform_CatapultClient = function() {
	this._loaders = [];
};
$hxClasses["flambe.platform.CatapultClient"] = flambe_platform_CatapultClient;
flambe_platform_CatapultClient.__name__ = true;
flambe_platform_CatapultClient.prototype = {
	add: function(loader) {
		if(loader.manifest.get_localBase() == "assets") this._loaders.push(loader);
	}
	,onError: function(cause) {
		flambe_Log.warn("Unable to connect to Catapult",["cause",cause]);
	}
	,onMessage: function(message) {
		var message1 = JSON.parse(message);
		var _g = message1.type;
		switch(_g) {
		case "file_changed":
			var url = message1.name + "?v=" + message1.md5;
			url = StringTools.replace(url,"\\","/");
			var _g1 = 0;
			var _g2 = this._loaders;
			while(_g1 < _g2.length) {
				var loader = _g2[_g1];
				++_g1;
				loader.reload(url);
			}
			break;
		case "restart":
			this.onRestart();
			break;
		}
	}
	,onRestart: function() {
		flambe_util_Assert.fail();
	}
	,__class__: flambe_platform_CatapultClient
};
var flambe_platform_DebugLogic = function(platform) {
	var _g = this;
	this._platform = platform;
	platform.getKeyboard().down.connect(function(event) {
		if(event.key == flambe_input_Key.O && platform.getKeyboard().isDown(flambe_input_Key.Control)) {
			if(_g.toggleOverdrawGraphics()) flambe_Log.info("Enabled overdraw visualizer, press Ctrl-O again to disable");
		}
	});
};
$hxClasses["flambe.platform.DebugLogic"] = flambe_platform_DebugLogic;
flambe_platform_DebugLogic.__name__ = true;
flambe_platform_DebugLogic.prototype = {
	toggleOverdrawGraphics: function() {
		var renderer = this._platform.getRenderer();
		if(this._savedGraphics != null) {
			renderer.graphics = this._savedGraphics;
			this._savedGraphics = null;
		} else if(renderer.graphics != null) {
			this._savedGraphics = renderer.graphics;
			renderer.graphics = new flambe_platform_OverdrawGraphics(this._savedGraphics);
			return true;
		}
		return false;
	}
	,__class__: flambe_platform_DebugLogic
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
	copyFrom: function(asset) {
	}
	,onDisposed: function() {
	}
	,__class__: flambe_platform_DummySound
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
var flambe_platform_KeyCodes = function() { };
$hxClasses["flambe.platform.KeyCodes"] = flambe_platform_KeyCodes;
flambe_platform_KeyCodes.__name__ = true;
flambe_platform_KeyCodes.toKey = function(keyCode) {
	switch(keyCode) {
	case 65:
		return flambe_input_Key.A;
	case 66:
		return flambe_input_Key.B;
	case 67:
		return flambe_input_Key.C;
	case 68:
		return flambe_input_Key.D;
	case 69:
		return flambe_input_Key.E;
	case 70:
		return flambe_input_Key.F;
	case 71:
		return flambe_input_Key.G;
	case 72:
		return flambe_input_Key.H;
	case 73:
		return flambe_input_Key.I;
	case 74:
		return flambe_input_Key.J;
	case 75:
		return flambe_input_Key.K;
	case 76:
		return flambe_input_Key.L;
	case 77:
		return flambe_input_Key.M;
	case 78:
		return flambe_input_Key.N;
	case 79:
		return flambe_input_Key.O;
	case 80:
		return flambe_input_Key.P;
	case 81:
		return flambe_input_Key.Q;
	case 82:
		return flambe_input_Key.R;
	case 83:
		return flambe_input_Key.S;
	case 84:
		return flambe_input_Key.T;
	case 85:
		return flambe_input_Key.U;
	case 86:
		return flambe_input_Key.V;
	case 87:
		return flambe_input_Key.W;
	case 88:
		return flambe_input_Key.X;
	case 89:
		return flambe_input_Key.Y;
	case 90:
		return flambe_input_Key.Z;
	case 48:
		return flambe_input_Key.Number0;
	case 49:
		return flambe_input_Key.Number1;
	case 50:
		return flambe_input_Key.Number2;
	case 51:
		return flambe_input_Key.Number3;
	case 52:
		return flambe_input_Key.Number4;
	case 53:
		return flambe_input_Key.Number5;
	case 54:
		return flambe_input_Key.Number6;
	case 55:
		return flambe_input_Key.Number7;
	case 56:
		return flambe_input_Key.Number8;
	case 57:
		return flambe_input_Key.Number9;
	case 96:
		return flambe_input_Key.Numpad0;
	case 97:
		return flambe_input_Key.Numpad1;
	case 98:
		return flambe_input_Key.Numpad2;
	case 99:
		return flambe_input_Key.Numpad3;
	case 100:
		return flambe_input_Key.Numpad4;
	case 101:
		return flambe_input_Key.Numpad5;
	case 102:
		return flambe_input_Key.Numpad6;
	case 103:
		return flambe_input_Key.Numpad7;
	case 104:
		return flambe_input_Key.Numpad8;
	case 105:
		return flambe_input_Key.Numpad9;
	case 107:
		return flambe_input_Key.NumpadAdd;
	case 110:
		return flambe_input_Key.NumpadDecimal;
	case 111:
		return flambe_input_Key.NumpadDivide;
	case 108:
		return flambe_input_Key.NumpadEnter;
	case 106:
		return flambe_input_Key.NumpadMultiply;
	case 109:
		return flambe_input_Key.NumpadSubtract;
	case 112:
		return flambe_input_Key.F1;
	case 113:
		return flambe_input_Key.F2;
	case 114:
		return flambe_input_Key.F3;
	case 115:
		return flambe_input_Key.F4;
	case 116:
		return flambe_input_Key.F5;
	case 117:
		return flambe_input_Key.F6;
	case 118:
		return flambe_input_Key.F7;
	case 119:
		return flambe_input_Key.F8;
	case 120:
		return flambe_input_Key.F9;
	case 121:
		return flambe_input_Key.F10;
	case 122:
		return flambe_input_Key.F11;
	case 123:
		return flambe_input_Key.F12;
	case 37:
		return flambe_input_Key.Left;
	case 38:
		return flambe_input_Key.Up;
	case 39:
		return flambe_input_Key.Right;
	case 40:
		return flambe_input_Key.Down;
	case 18:
		return flambe_input_Key.Alt;
	case 192:
		return flambe_input_Key.Backquote;
	case 220:
		return flambe_input_Key.Backslash;
	case 8:
		return flambe_input_Key.Backspace;
	case 20:
		return flambe_input_Key.CapsLock;
	case 188:
		return flambe_input_Key.Comma;
	case 15:
		return flambe_input_Key.Command;
	case 17:
		return flambe_input_Key.Control;
	case 46:
		return flambe_input_Key.Delete;
	case 35:
		return flambe_input_Key.End;
	case 13:
		return flambe_input_Key.Enter;
	case 187:
		return flambe_input_Key.Equals;
	case 27:
		return flambe_input_Key.Escape;
	case 36:
		return flambe_input_Key.Home;
	case 45:
		return flambe_input_Key.Insert;
	case 219:
		return flambe_input_Key.LeftBracket;
	case 189:
		return flambe_input_Key.Minus;
	case 34:
		return flambe_input_Key.PageDown;
	case 33:
		return flambe_input_Key.PageUp;
	case 190:
		return flambe_input_Key.Period;
	case 222:
		return flambe_input_Key.Quote;
	case 221:
		return flambe_input_Key.RightBracket;
	case 186:
		return flambe_input_Key.Semicolon;
	case 16:
		return flambe_input_Key.Shift;
	case 191:
		return flambe_input_Key.Slash;
	case 32:
		return flambe_input_Key.Space;
	case 9:
		return flambe_input_Key.Tab;
	case 16777234:
		return flambe_input_Key.Menu;
	case 16777247:
		return flambe_input_Key.Search;
	}
	return flambe_input_Key.Unknown(keyCode);
};
flambe_platform_KeyCodes.toKeyCode = function(key) {
	switch(Type.enumIndex(key)) {
	case 0:
		return 65;
	case 1:
		return 66;
	case 2:
		return 67;
	case 3:
		return 68;
	case 4:
		return 69;
	case 5:
		return 70;
	case 6:
		return 71;
	case 7:
		return 72;
	case 8:
		return 73;
	case 9:
		return 74;
	case 10:
		return 75;
	case 11:
		return 76;
	case 12:
		return 77;
	case 13:
		return 78;
	case 14:
		return 79;
	case 15:
		return 80;
	case 16:
		return 81;
	case 17:
		return 82;
	case 18:
		return 83;
	case 19:
		return 84;
	case 20:
		return 85;
	case 21:
		return 86;
	case 22:
		return 87;
	case 23:
		return 88;
	case 24:
		return 89;
	case 25:
		return 90;
	case 26:
		return 48;
	case 27:
		return 49;
	case 28:
		return 50;
	case 29:
		return 51;
	case 30:
		return 52;
	case 31:
		return 53;
	case 32:
		return 54;
	case 33:
		return 55;
	case 34:
		return 56;
	case 35:
		return 57;
	case 36:
		return 96;
	case 37:
		return 97;
	case 38:
		return 98;
	case 39:
		return 99;
	case 40:
		return 100;
	case 41:
		return 101;
	case 42:
		return 102;
	case 43:
		return 103;
	case 44:
		return 104;
	case 45:
		return 105;
	case 46:
		return 107;
	case 47:
		return 110;
	case 48:
		return 111;
	case 49:
		return 108;
	case 50:
		return 106;
	case 51:
		return 109;
	case 52:
		return 112;
	case 53:
		return 113;
	case 54:
		return 114;
	case 55:
		return 115;
	case 56:
		return 116;
	case 57:
		return 117;
	case 58:
		return 118;
	case 59:
		return 119;
	case 60:
		return 120;
	case 61:
		return 121;
	case 62:
		return 122;
	case 63:
		return 123;
	case 64:
		return 124;
	case 65:
		return 125;
	case 66:
		return 126;
	case 67:
		return 37;
	case 68:
		return 38;
	case 69:
		return 39;
	case 70:
		return 40;
	case 71:
		return 18;
	case 72:
		return 192;
	case 73:
		return 220;
	case 74:
		return 8;
	case 75:
		return 20;
	case 76:
		return 188;
	case 77:
		return 15;
	case 78:
		return 17;
	case 79:
		return 46;
	case 80:
		return 35;
	case 81:
		return 13;
	case 82:
		return 187;
	case 83:
		return 27;
	case 84:
		return 36;
	case 85:
		return 45;
	case 86:
		return 219;
	case 87:
		return 189;
	case 88:
		return 34;
	case 89:
		return 33;
	case 90:
		return 190;
	case 91:
		return 222;
	case 92:
		return 221;
	case 93:
		return 186;
	case 94:
		return 16;
	case 95:
		return 191;
	case 96:
		return 32;
	case 97:
		return 9;
	case 98:
		return 16777234;
	case 99:
		return 16777247;
	case 100:
		var keyCode = key[2];
		return keyCode;
	}
};
var flambe_platform_MainLoop = function() {
	this._tickables = [];
};
$hxClasses["flambe.platform.MainLoop"] = flambe_platform_MainLoop;
flambe_platform_MainLoop.__name__ = true;
flambe_platform_MainLoop.updateEntity = function(entity,dt) {
	var speed = entity.getComponent("SpeedAdjuster_2");
	if(speed != null) {
		speed._realDt = dt;
		dt *= speed.scale.get__();
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
		if(dt <= 0) {
			flambe_Log.warn("Zero or negative time elapsed since the last frame!",["dt",dt]);
			return;
		}
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
var flambe_platform_OverdrawGraphics = function(impl) {
	this._impl = impl;
};
$hxClasses["flambe.platform.OverdrawGraphics"] = flambe_platform_OverdrawGraphics;
flambe_platform_OverdrawGraphics.__name__ = true;
flambe_platform_OverdrawGraphics.__interfaces__ = [flambe_platform_InternalGraphics];
flambe_platform_OverdrawGraphics.prototype = {
	save: function() {
		this._impl.save();
	}
	,transform: function(m00,m10,m01,m11,m02,m12) {
		this._impl.transform(m00,m10,m01,m11,m02,m12);
	}
	,multiplyAlpha: function(factor) {
	}
	,setBlendMode: function(blendMode) {
	}
	,applyScissor: function(x,y,width,height) {
		this._impl.applyScissor(x,y,width,height);
	}
	,restore: function() {
		this._impl.restore();
	}
	,drawTexture: function(texture,destX,destY) {
		this.drawRegion(destX,destY,texture.get_width(),texture.get_height());
	}
	,drawSubTexture: function(texture,destX,destY,sourceX,sourceY,sourceW,sourceH) {
		this.drawRegion(destX,destY,sourceW,sourceH);
	}
	,fillRect: function(color,x,y,width,height) {
		this.drawRegion(x,y,width,height);
	}
	,willRender: function() {
		this._impl.willRender();
		this._impl.save();
		this._impl.setBlendMode(flambe_display_BlendMode.Add);
	}
	,didRender: function() {
		this._impl.restore();
		this._impl.didRender();
	}
	,onResize: function(width,height) {
		this._impl.onResize(width,height);
	}
	,drawRegion: function(x,y,width,height) {
		this._impl.fillRect(1052680,x,y,width,height);
	}
	,__class__: flambe_platform_OverdrawGraphics
};
var flambe_platform_TextureRoot = function() { };
$hxClasses["flambe.platform.TextureRoot"] = flambe_platform_TextureRoot;
flambe_platform_TextureRoot.__name__ = true;
flambe_platform_TextureRoot.prototype = {
	__class__: flambe_platform_TextureRoot
};
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
	,drawTexture: function(texture,destX,destY) {
		this.drawSubTexture(texture,destX,destY,0,0,texture.get_width(),texture.get_height());
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
		root.assertNotDisposed();
		this._canvasCtx.drawImage(root.image,Std["int"](texture1.rootX + sourceX),Std["int"](texture1.rootY + sourceY),Std["int"](sourceW),Std["int"](sourceH),Std["int"](destX),Std["int"](destY),Std["int"](sourceW),Std["int"](sourceH));
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
		this._canvasCtx.fillRect(Std["int"](x),Std["int"](y),Std["int"](width),Std["int"](height));
	}
	,multiplyAlpha: function(factor) {
		this._canvasCtx.globalAlpha *= factor;
	}
	,setBlendMode: function(blendMode) {
		var op;
		switch(Type.enumIndex(blendMode)) {
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
		this._canvasCtx.rect(Std["int"](x),Std["int"](y),Std["int"](width),Std["int"](height));
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
	,createTexture: function(width,height) {
		var root = new flambe_platform_html_CanvasTextureRoot(flambe_platform_html_HtmlUtil.createEmptyCanvas(width,height));
		return root.createTexture(width,height);
	}
	,getCompressedTextureFormats: function() {
		return [];
	}
	,createCompressedTexture: function(format,data) {
		flambe_util_Assert.fail();
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
	this._graphics = null;
	this.updateCount = 0;
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
	,dirtyContents: function() {
		++this.updateCount;
	}
	,getGraphics: function() {
		this.assertNotDisposed();
		if(this._graphics == null) {
			this.getContext2d();
			this._graphics = new flambe_platform_html__$CanvasTextureRoot_InternalGraphics(this);
		}
		return this._graphics;
	}
	,getContext2d: function() {
		if(!Std["is"](this.image,HTMLCanvasElement)) this.image = flambe_platform_html_HtmlUtil.createCanvas(this.image);
		var canvas = this.image;
		return canvas.getContext("2d");
	}
	,copyFrom: function(that) {
		this.image = that.image;
		this._graphics = that._graphics;
		this.dirtyContents();
	}
	,onDisposed: function() {
		this.image = null;
		this._graphics = null;
	}
	,__class__: flambe_platform_html_CanvasTextureRoot
});
var flambe_platform_html__$CanvasTextureRoot_InternalGraphics = function(renderTarget) {
	flambe_platform_html_CanvasGraphics.call(this,renderTarget.image,true);
	this._renderTarget = renderTarget;
};
$hxClasses["flambe.platform.html._CanvasTextureRoot.InternalGraphics"] = flambe_platform_html__$CanvasTextureRoot_InternalGraphics;
flambe_platform_html__$CanvasTextureRoot_InternalGraphics.__name__ = true;
flambe_platform_html__$CanvasTextureRoot_InternalGraphics.__super__ = flambe_platform_html_CanvasGraphics;
flambe_platform_html__$CanvasTextureRoot_InternalGraphics.prototype = $extend(flambe_platform_html_CanvasGraphics.prototype,{
	drawTexture: function(texture,x,y) {
		flambe_platform_html_CanvasGraphics.prototype.drawTexture.call(this,texture,x,y);
		this._renderTarget.dirtyContents();
	}
	,drawSubTexture: function(texture,destX,destY,sourceX,sourceY,sourceW,sourceH) {
		flambe_platform_html_CanvasGraphics.prototype.drawSubTexture.call(this,texture,destX,destY,sourceX,sourceY,sourceW,sourceH);
		this._renderTarget.dirtyContents();
	}
	,fillRect: function(color,x,y,width,height) {
		flambe_platform_html_CanvasGraphics.prototype.fillRect.call(this,color,x,y,width,height);
		this._renderTarget.dirtyContents();
	}
	,__class__: flambe_platform_html__$CanvasTextureRoot_InternalGraphics
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
	var _this = js_Browser.get_document();
	webp = _this.createElement("img");
	webp.onload = webp.onerror = function(_) {
		if(webp.width == 1) formats.unshift(flambe_asset_AssetFormat.WEBP);
		checkRemaining();
	};
	webp.src = "data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==";
	var jxr;
	var _this1 = js_Browser.get_document();
	jxr = _this1.createElement("img");
	jxr.onload = jxr.onerror = function(_1) {
		if(jxr.width == 1) formats.unshift(flambe_asset_AssetFormat.JXR);
		checkRemaining();
	};
	jxr.src = "data:image/vnd.ms-photo;base64,SUm8AQgAAAAFAAG8AQAQAAAASgAAAIC8BAABAAAAAQAAAIG8BAABAAAAAQAAAMC8BAABAAAAWgAAAMG8BAABAAAAHwAAAAAAAAAkw91vA07+S7GFPXd2jckNV01QSE9UTwAZAYBxAAAAABP/gAAEb/8AAQAAAQAAAA==";
};
flambe_platform_html_HtmlAssetPackLoader.detectAudioFormats = function() {
	var audio;
	var _this = js_Browser.get_document();
	audio = _this.createElement("audio");
	if(audio == null || $bind(audio,audio.canPlayType) == null) {
		flambe_Log.warn("Audio is not supported at all in this browser!");
		return [];
	}
	var blacklist = new EReg("\\b(iPhone|iPod|iPad|Android|Windows Phone)\\b","");
	var userAgent = js_Browser.get_navigator().userAgent;
	if(!flambe_platform_html_WebAudioSound.get_supported() && blacklist.match(userAgent)) {
		flambe_Log.warn("HTML5 audio is blacklisted for this browser",["userAgent",userAgent]);
		return [];
	}
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
		if(new EReg("\\bSilk\\b","").match(js_Browser.get_navigator().userAgent)) return false;
		if(js_Browser.get_window().Blob == null) return false;
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
		switch(Type.enumIndex(_g)) {
		case 0:case 1:case 2:case 3:case 4:
			var image;
			var _this = js_Browser.get_document();
			image = _this.createElement("img");
			var events = new flambe_platform_EventGroup();
			events.addDisposingListener(image,"load",function(_) {
				if(image.width > 1024 || image.height > 1024) flambe_Log.warn("Images larger than 1024px on a side will prevent GPU acceleration" + " on some platforms (iOS)",["url",url,"width",image.width,"height",image.height]);
				if(flambe_platform_html_HtmlAssetPackLoader.supportsBlob()) flambe_platform_html_HtmlAssetPackLoader._URL.revokeObjectURL(image.src);
				var texture = _g1._platform.getRenderer().createTextureFromImage(image);
				if(texture != null) _g1.handleLoad(entry,texture); else _g1.handleTextureError(entry);
			});
			events.addDisposingListener(image,"error",function(_1) {
				_g1.handleError(entry,"Failed to load image");
			});
			if(flambe_platform_html_HtmlAssetPackLoader.supportsBlob()) this.downloadBlob(url,entry,function(blob) {
				image.src = flambe_platform_html_HtmlAssetPackLoader._URL.createObjectURL(blob);
			}); else image.src = url;
			break;
		case 5:case 6:case 7:
			this.downloadArrayBuffer(url,entry,function(buffer) {
				var texture1 = _g1._platform.getRenderer().createCompressedTexture(entry.format,null);
				if(texture1 != null) _g1.handleLoad(entry,texture1); else _g1.handleTextureError(entry);
			});
			break;
		case 8:case 9:case 10:case 11:case 12:
			if(flambe_platform_html_WebAudioSound.get_supported()) this.downloadArrayBuffer(url,entry,function(buffer1) {
				flambe_platform_html_WebAudioSound.ctx.decodeAudioData(buffer1,function(decoded) {
					_g1.handleLoad(entry,new flambe_platform_html_WebAudioSound(decoded));
				},function() {
					flambe_Log.warn("Couldn't decode Web Audio, ignoring this asset",["url",url]);
					_g1.handleLoad(entry,flambe_platform_DummySound.getInstance());
				});
			}); else {
				var audio;
				var _this1 = js_Browser.get_document();
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
					if(code == 3 || code == 4) {
						flambe_Log.warn("Couldn't decode HTML5 audio, ignoring this asset",["url",url,"code",code]);
						_g1.handleLoad(entry,flambe_platform_DummySound.getInstance());
					} else _g1.handleError(entry,"Failed to load audio: " + audio.error.code);
				});
				events1.addListener(audio,"progress",function(_4) {
					if(audio.buffered.length > 0 && audio.duration > 0) {
						var progress = audio.buffered.end(0) / audio.duration;
						_g1.handleProgress(entry,Std["int"](progress * entry.bytes));
					}
				});
				audio.src = url;
				audio.load();
			}
			break;
		case 13:
			this.downloadText(url,entry,function(text) {
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
	,downloadArrayBuffer: function(url,entry,onLoad) {
		this.download(url,entry,"arraybuffer",onLoad);
	}
	,downloadBlob: function(url,entry,onLoad) {
		this.download(url,entry,"blob",onLoad);
	}
	,downloadText: function(url,entry,onLoad) {
		this.download(url,entry,"text",onLoad);
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
				js_Browser.get_window().clearInterval(intervalId);
			}
		};
		var retries = 3;
		var maybeRetry = function() {
			--retries;
			if(retries >= 0) {
				flambe_Log.warn("Retrying asset download",["url",entry.url]);
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
					intervalId = js_Browser.get_window().setInterval(function() {
						if(xhr.readyState != 4 && flambe_platform_html_HtmlUtil.now() - lastProgress > 5000) {
							if(!maybeRetry()) {
								clearRetryInterval();
								_g.handleError(entry,"Download stalled");
							}
						}
					},1000);
				}
				lastProgress = flambe_platform_html_HtmlUtil.now();
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
var flambe_platform_html_HtmlCatapultClient = function() {
	var _g = this;
	flambe_platform_CatapultClient.call(this);
	this._socket = new WebSocket("ws://" + js_Browser.get_location().host);
	this._socket.onerror = function(event) {
		_g.onError("unknown");
	};
	this._socket.onopen = function(event1) {
		flambe_Log.info("Catapult connected");
	};
	this._socket.onmessage = function(event2) {
		_g.onMessage(event2.data);
	};
};
$hxClasses["flambe.platform.html.HtmlCatapultClient"] = flambe_platform_html_HtmlCatapultClient;
flambe_platform_html_HtmlCatapultClient.__name__ = true;
flambe_platform_html_HtmlCatapultClient.canUse = function() {
	return Reflect.hasField(js_Browser.get_window(),"WebSocket");
};
flambe_platform_html_HtmlCatapultClient.__super__ = flambe_platform_CatapultClient;
flambe_platform_html_HtmlCatapultClient.prototype = $extend(flambe_platform_CatapultClient.prototype,{
	onRestart: function() {
		js_Browser.get_window().top.location.reload();
	}
	,__class__: flambe_platform_html_HtmlCatapultClient
});
var flambe_util_LogHandler = function() { };
$hxClasses["flambe.util.LogHandler"] = flambe_util_LogHandler;
flambe_util_LogHandler.__name__ = true;
flambe_util_LogHandler.prototype = {
	__class__: flambe_util_LogHandler
};
var flambe_platform_html_HtmlLogHandler = function(tag) {
	this._tagPrefix = tag + ": ";
};
$hxClasses["flambe.platform.html.HtmlLogHandler"] = flambe_platform_html_HtmlLogHandler;
flambe_platform_html_HtmlLogHandler.__name__ = true;
flambe_platform_html_HtmlLogHandler.__interfaces__ = [flambe_util_LogHandler];
flambe_platform_html_HtmlLogHandler.isSupported = function() {
	return typeof console == "object" && console.info != null;
};
flambe_platform_html_HtmlLogHandler.prototype = {
	log: function(level,message) {
		message = this._tagPrefix + message;
		switch(Type.enumIndex(level)) {
		case 0:
			console.info(message);
			break;
		case 1:
			console.warn(message);
			break;
		case 2:
			console.error(message);
			break;
		}
	}
	,__class__: flambe_platform_html_HtmlLogHandler
};
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
	copyFrom: function(that) {
		this.audioElement = that.audioElement;
	}
	,onDisposed: function() {
		this.audioElement = null;
	}
	,__class__: flambe_platform_html_HtmlSound
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
		flambe_Log.info("Reversing device DPI scaling",["scaleFactor",this.scaleFactor]);
		flambe_platform_html_HtmlUtil.setVendorStyle(this._canvas,"transform-origin","top left");
		flambe_platform_html_HtmlUtil.setVendorStyle(this._canvas,"transform","scale(" + 1 / this.scaleFactor + ")");
	}
	if(flambe_platform_html_HtmlUtil.SHOULD_HIDE_MOBILE_BROWSER) {
		js_Browser.get_window().addEventListener("orientationchange",function(_) {
			flambe_platform_html_HtmlUtil.callLater($bind(_g,_g.hideMobileBrowser),200);
		},false);
		this.hideMobileBrowser();
	}
	js_Browser.get_window().addEventListener("resize",$bind(this,this.onWindowResize),false);
	this.onWindowResize(null);
	this.orientation = new flambe_util_Value(null);
	if(js_Browser.get_window().orientation != null) {
		js_Browser.get_window().addEventListener("orientationchange",$bind(this,this.onOrientationChange),false);
		this.onOrientationChange(null);
	}
	this.fullscreen = new flambe_util_Value(false);
	flambe_platform_html_HtmlUtil.addVendorListener(js_Browser.get_document(),"fullscreenchange",function(_1) {
		_g.updateFullscreen();
	},false);
	flambe_platform_html_HtmlUtil.addVendorListener(js_Browser.get_document(),"fullscreenerror",function(_2) {
		flambe_Log.warn("Error when requesting fullscreen");
	},false);
	this.updateFullscreen();
};
$hxClasses["flambe.platform.html.HtmlStage"] = flambe_platform_html_HtmlStage;
flambe_platform_html_HtmlStage.__name__ = true;
flambe_platform_html_HtmlStage.__interfaces__ = [flambe_subsystem_StageSystem];
flambe_platform_html_HtmlStage.computeScaleFactor = function() {
	var devicePixelRatio = js_Browser.get_window().devicePixelRatio;
	if(devicePixelRatio == null) devicePixelRatio = 1;
	var canvas;
	var _this = js_Browser.get_document();
	canvas = _this.createElement("canvas");
	var ctx = canvas.getContext("2d");
	var backingStorePixelRatio = flambe_platform_html_HtmlUtil.loadExtension("backingStorePixelRatio",ctx).value;
	if(backingStorePixelRatio == null) backingStorePixelRatio = 1;
	var scale = devicePixelRatio / backingStorePixelRatio;
	var screenWidth = js_Browser.get_window().screen.width;
	var screenHeight = js_Browser.get_window().screen.height;
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
		this._canvas.width = Std["int"](scaledWidth);
		this._canvas.height = Std["int"](scaledHeight);
		this.resize.emit();
		return true;
	}
	,hideMobileBrowser: function() {
		var _g = this;
		var mobileAddressBar = 100;
		var htmlStyle = js_Browser.get_document().documentElement.style;
		htmlStyle.height = js_Browser.get_window().innerHeight + mobileAddressBar + "px";
		htmlStyle.width = js_Browser.get_window().innerWidth + "px";
		htmlStyle.overflow = "visible";
		flambe_platform_html_HtmlUtil.callLater(function() {
			flambe_platform_html_HtmlUtil.hideMobileBrowser();
			flambe_platform_html_HtmlUtil.callLater(function() {
				htmlStyle.height = js_Browser.get_window().innerHeight + "px";
				_g.onWindowResize(null);
			},100);
		});
	}
	,onOrientationChange: function(_) {
		var value = flambe_platform_html_HtmlUtil.orientation(js_Browser.get_window().orientation);
		this.orientation.set__(value);
	}
	,updateFullscreen: function() {
		var state = flambe_platform_html_HtmlUtil.loadFirstExtension(["fullscreen","fullScreen","isFullScreen"],js_Browser.get_document()).value;
		this.fullscreen.set__(state == true);
	}
	,__class__: flambe_platform_html_HtmlStage
};
var flambe_platform_html_HtmlUtil = function() { };
$hxClasses["flambe.platform.html.HtmlUtil"] = flambe_platform_html_HtmlUtil;
flambe_platform_html_HtmlUtil.__name__ = true;
flambe_platform_html_HtmlUtil.callLater = function(func,delay) {
	if(delay == null) delay = 0;
	js_Browser.get_window().setTimeout(func,delay);
};
flambe_platform_html_HtmlUtil.hideMobileBrowser = function() {
	js_Browser.get_window().scrollTo(1,0);
};
flambe_platform_html_HtmlUtil.loadExtension = function(name,obj) {
	if(obj == null) obj = js_Browser.get_window();
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
	if(obj == null) obj = js_Browser.get_window();
	var value = flambe_platform_html_HtmlUtil.loadExtension(name,obj).value;
	if(value == null) return false;
	Reflect.setField(obj,name,value);
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
flambe_platform_html_HtmlUtil.now = function() {
	return Date.now();
};
flambe_platform_html_HtmlUtil.createEmptyCanvas = function(width,height) {
	var canvas;
	var _this = js_Browser.get_document();
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
	var windows = js_Browser.get_navigator().platform.indexOf("Win") >= 0;
	if(windows) {
		var chrome = js_Browser.get_window().chrome != null;
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
	if(js_Browser.get_navigator().userAgent.indexOf("Linux; U; Android 4") >= 0) {
		flambe_Log.warn("Monkey patching around Android sin/cos bug");
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
	copyFrom: function(that) {
		this.buffer = that.buffer;
	}
	,onDisposed: function() {
		this.buffer = null;
	}
	,__class__: flambe_platform_html_WebAudioSound
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
	,deleteTexture: function(texture) {
		if(this._lastTexture != null && this._lastTexture.root == texture) {
			this.flush();
			this._lastTexture = null;
			this._currentTexture = null;
		}
		this._gl.deleteTexture(texture.nativeTexture);
	}
	,bindFramebuffer: function(texture) {
		if(texture != this._lastRenderTarget) {
			this.flush();
			this.bindRenderTarget(texture);
		}
	}
	,deleteFramebuffer: function(texture) {
		if(texture == this._lastRenderTarget) {
			this.flush();
			this._lastRenderTarget = null;
			this._currentRenderTarget = null;
		}
		this._gl.deleteFramebuffer(texture.framebuffer);
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
			switch(Type.enumIndex(_g)) {
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
				this._gl.scissor(Std["int"](this._lastScissor.x),Std["int"](this._lastScissor.y),Std["int"](this._lastScissor.width),Std["int"](this._lastScissor.height));
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
			this._drawPatternShader.setRegion(texture.rootX / root.width,texture.rootY / root.height,texture.get_width() / root.width,texture.get_height() / root.height);
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
			indices[ii * 6 + 0] = ii * 4 + 0;
			indices[ii * 6 + 1] = ii * 4 + 1;
			indices[ii * 6 + 2] = ii * 4 + 2;
			indices[ii * 6 + 3] = ii * 4 + 2;
			indices[ii * 6 + 4] = ii * 4 + 3;
			indices[ii * 6 + 5] = ii * 4 + 0;
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
		var state = this.getTopState();
		flambe_platform_html_WebGLGraphics._scratchMatrix.set(m00,m10,m01,m11,m02,m12);
		flambe_math_Matrix.multiply(state.matrix,flambe_platform_html_WebGLGraphics._scratchMatrix,state.matrix);
	}
	,restore: function() {
		flambe_util_Assert.that(this._stateList.prev != null,"Can't restore without a previous save");
		this._stateList = this._stateList.prev;
	}
	,drawTexture: function(texture,x,y) {
		this.drawSubTexture(texture,x,y,0,0,texture.get_width(),texture.get_height());
	}
	,drawSubTexture: function(texture,destX,destY,sourceX,sourceY,sourceW,sourceH) {
		var state = this.getTopState();
		var texture1 = texture;
		var root = texture1.root;
		root.assertNotDisposed();
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
		var state = this.getTopState();
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
		this.getTopState().alpha *= factor;
	}
	,setBlendMode: function(blendMode) {
		this.getTopState().blendMode = blendMode;
	}
	,applyScissor: function(x,y,width,height) {
		var state = this.getTopState();
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
	,getTopState: function() {
		return this._stateList;
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
		this.getTopState().matrix.transformArray(pos,8,pos);
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
		flambe_Log.warn("WebGL context lost");
		_g._hasGPU.set__(false);
	},false);
	gl.canvas.addEventListener("webglcontextrestore",function(event1) {
		flambe_Log.warn("WebGL context restored");
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
	,createTexture: function(width,height) {
		if(this.gl.isContextLost()) return null;
		var root = new flambe_platform_html_WebGLTextureRoot(this,width,height);
		root.clear();
		return root.createTexture(width,height);
	}
	,getCompressedTextureFormats: function() {
		return [];
	}
	,createCompressedTexture: function(format,data) {
		if(this.gl.isContextLost()) return null;
		flambe_util_Assert.fail();
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
	this._graphics = null;
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
		this.assertNotDisposed();
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
	,clear: function() {
		this.assertNotDisposed();
		this._renderer.batcher.bindTexture(this.nativeTexture);
		var gl = this._renderer.gl;
		gl.texImage2D(3553,0,6408,this.width,this.height,0,6408,5121,null);
	}
	,getGraphics: function() {
		this.assertNotDisposed();
		if(this._graphics == null) {
			this._graphics = new flambe_platform_html_WebGLGraphics(this._renderer.batcher,this);
			this._graphics.onResize(this.width,this.height);
			var gl = this._renderer.gl;
			this.framebuffer = gl.createFramebuffer();
			this._renderer.batcher.bindFramebuffer(this);
			gl.framebufferTexture2D(36160,36064,3553,this.nativeTexture,0);
		}
		return this._graphics;
	}
	,copyFrom: function(that) {
		this.nativeTexture = that.nativeTexture;
		this.framebuffer = that.framebuffer;
		this.width = that.width;
		this.height = that.height;
		this._graphics = that._graphics;
	}
	,onDisposed: function() {
		var batcher = this._renderer.batcher;
		batcher.deleteTexture(this);
		if(this.framebuffer != null) batcher.deleteFramebuffer(this);
		this.nativeTexture = null;
		this.framebuffer = null;
		this._graphics = null;
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
	if(!gl.getProgramParameter(this._program,35714)) flambe_Log.error("Error linking shader program",["log",gl.getProgramInfoLog(this._program)]);
};
$hxClasses["flambe.platform.shader.ShaderGL"] = flambe_platform_shader_ShaderGL;
flambe_platform_shader_ShaderGL.__name__ = true;
flambe_platform_shader_ShaderGL.createShader = function(gl,type,source) {
	var shader = gl.createShader(type);
	gl.shaderSource(shader,source);
	gl.compileShader(shader);
	if(!gl.getShaderParameter(shader,35713)) {
		var typeName;
		if(type == 35633) typeName = "vertex"; else typeName = "fragment";
		flambe_Log.error("Error compiling " + typeName + " shader",["log",gl.getShaderInfoLog(shader)]);
	}
	return shader;
};
flambe_platform_shader_ShaderGL.prototype = {
	useProgram: function() {
		this._gl.useProgram(this._program);
	}
	,prepare: function() {
		flambe_util_Assert.fail("abstract");
	}
	,getAttribLocation: function(name) {
		var loc = this._gl.getAttribLocation(this._program,name);
		flambe_util_Assert.that(loc >= 0,"Missing attribute",["name",name]);
		return loc;
	}
	,getUniformLocation: function(name) {
		var loc = this._gl.getUniformLocation(this._program,name);
		flambe_util_Assert.that(loc != null,"Missing uniform",["name",name]);
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
		var events = scene.getComponent("Scene_3");
		if(events != null) events.shown.emit();
	}
	,invalidateVisibility: function() {
		var ii = this.scenes.length;
		while(ii > 0) {
			var scene = this.scenes[--ii];
			var comp = scene.getComponent("Scene_3");
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
var flambe_util_Arrays = function() { };
$hxClasses["flambe.util.Arrays"] = flambe_util_Arrays;
flambe_util_Arrays.__name__ = true;
flambe_util_Arrays.resize = function(arr,length) {
	arr.length = length;
};
var flambe_util_Assert = function() { };
$hxClasses["flambe.util.Assert"] = flambe_util_Assert;
flambe_util_Assert.__name__ = true;
flambe_util_Assert.that = function(condition,message,fields) {
	if(!condition) flambe_util_Assert.fail(message,fields);
};
flambe_util_Assert.fail = function(message,fields) {
	var error = "Assertion failed!";
	if(message != null) error += " " + message;
	if(fields != null) error = flambe_util_Strings.withFields(error,fields);
	throw error;
};
var flambe_util_BitSets = function() { };
$hxClasses["flambe.util.BitSets"] = flambe_util_BitSets;
flambe_util_BitSets.__name__ = true;
flambe_util_BitSets.add = function(bits,mask) {
	return bits | mask;
};
flambe_util_BitSets.remove = function(bits,mask) {
	return bits & ~mask;
};
flambe_util_BitSets.contains = function(bits,mask) {
	return (bits & mask) != 0;
};
flambe_util_BitSets.containsAll = function(bits,mask) {
	return (bits & mask) == mask;
};
flambe_util_BitSets.set = function(bits,mask,enabled) {
	if(enabled) return flambe_util_BitSets.add(bits,mask); else return flambe_util_BitSets.remove(bits,mask);
};
var flambe_util_LogLevel = $hxClasses["flambe.util.LogLevel"] = { __ename__ : true, __constructs__ : ["Info","Warn","Error"] };
flambe_util_LogLevel.Info = ["Info",0];
flambe_util_LogLevel.Info.toString = $estr;
flambe_util_LogLevel.Info.__enum__ = flambe_util_LogLevel;
flambe_util_LogLevel.Warn = ["Warn",1];
flambe_util_LogLevel.Warn.toString = $estr;
flambe_util_LogLevel.Warn.__enum__ = flambe_util_LogLevel;
flambe_util_LogLevel.Error = ["Error",2];
flambe_util_LogLevel.Error.toString = $estr;
flambe_util_LogLevel.Error.__enum__ = flambe_util_LogLevel;
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
	,get_total: function() {
		return this._total;
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
		if(this.dispatching()) this.defer(function() {
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
	if(base.length > 0 && StringTools.fastCodeAt(base,base.length - 1) != 47) base += "/";
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
	,exists: function(key) {
		return this.h.hasOwnProperty("$" + key);
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
js_Boot.isClass = function(o) {
	return o.__name__;
};
js_Boot.isEnum = function(e) {
	return e.__ename__;
};
js_Boot.getClass = function(o) {
	if(Std["is"](o,Array)) return Array; else return o.__class__;
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (js_Boot.isClass(o) || js_Boot.isEnum(o))) t = "object";
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
flambe_Log.logger = flambe_System.createLogger("flambe");
flambe_asset_Manifest.__meta__ = { obj : { assets : [{ bootstrap : [{ bytes : 29404, md5 : "c125532d986f42efa0bf387912735640", name : "camera/grass-tiles-2-small.png"},{ bytes : 1285, md5 : "0f7f669896db87bf68f521e9c48fcd26", name : "camera/littleshrooms_0.png"},{ bytes : 14884, md5 : "6944f4f5d02468f5a767a8597c1f042a", name : "camera/map.json"},{ bytes : 1544, md5 : "452db9c347ac36596de545fdb0984fc4", name : "camera/meta.png"},{ bytes : 3778, md5 : "7b0d45a8467a81d176b00b09a7174639", name : "camera/qubodup-bush_berries_0.png"},{ bytes : 26910, md5 : "82aa9442686da74203db44cb28b534a5", name : "camera/tree2-final.png"}]}]}};
flambe_asset_Manifest._supportsCrossOrigin = (function() {
	var detected = (function() {
		if(js_Browser.get_navigator().userAgent.indexOf("Linux; U; Android") >= 0) return false;
		var xhr = new XMLHttpRequest();
		return xhr.withCredentials != null;
	})();
	if(!detected) flambe_Log.warn("This browser does not support cross-domain asset loading, any Manifest.remoteBase setting will be ignored.");
	return detected;
})();
flambe_display_Sprite._scratchPoint = new flambe_math_Point();
flambe_platform_BasicKeyboard._sharedEvent = new flambe_input_KeyboardEvent();
flambe_platform_BasicMouse._sharedEvent = new flambe_input_MouseEvent();
flambe_platform_BasicPointer._sharedEvent = new flambe_input_PointerEvent();
flambe_platform_html_CanvasRenderer.CANVAS_TEXTURES = (function() {
	var pattern = new EReg("(iPhone|iPod|iPad)","");
	return pattern.match(js_Browser.get_window().navigator.userAgent);
})();
flambe_platform_html_HtmlAssetPackLoader._mediaRefCount = 0;
flambe_platform_html_HtmlAssetPackLoader._detectBlobSupport = true;
flambe_platform_html_HtmlUtil.VENDOR_PREFIXES = ["webkit","moz","ms","o","khtml"];
flambe_platform_html_HtmlUtil.SHOULD_HIDE_MOBILE_BROWSER = js_Browser.get_window().top == js_Browser.get_window() && new EReg("Mobile(/.*)? Safari","").match(js_Browser.get_navigator().userAgent);
flambe_platform_html_WebAudioSound._detectSupport = true;
flambe_platform_html_WebGLGraphics._scratchMatrix = new flambe_math_Matrix();
Main.main();
})();

//# sourceMappingURL=main-html.js.map