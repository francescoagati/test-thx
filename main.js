(function (console) { "use strict";
var $hxClasses = {};
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var Api = function() {
	this.enviroment = "d";
};
$hxClasses["Api"] = Api;
Api.__name__ = ["Api"];
Api.prototype = {
	doDefault: function() {
		console.log(this.enviroment);
	}
	,doUser: function() {
		console.log(1);
		console.log(this.enviroment);
	}
	,__class__: Api
};
var HxOverrides = function() { };
$hxClasses["HxOverrides"] = HxOverrides;
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.dateStr = function(date) {
	var m = date.getMonth() + 1;
	var d = date.getDate();
	var h = date.getHours();
	var mi = date.getMinutes();
	var s = date.getSeconds();
	return date.getFullYear() + "-" + (m < 10?"0" + m:"" + m) + "-" + (d < 10?"0" + d:"" + d) + " " + (h < 10?"0" + h:"" + h) + ":" + (mi < 10?"0" + mi:"" + mi) + ":" + (s < 10?"0" + s:"" + s);
};
HxOverrides.strDate = function(s) {
	var _g = s.length;
	switch(_g) {
	case 8:
		var k = s.split(":");
		var d = new Date();
		d.setTime(0);
		d.setUTCHours(k[0]);
		d.setUTCMinutes(k[1]);
		d.setUTCSeconds(k[2]);
		return d;
	case 10:
		var k1 = s.split("-");
		return new Date(k1[0],k1[1] - 1,k1[2],0,0,0);
	case 19:
		var k2 = s.split(" ");
		var y = k2[0].split("-");
		var t = k2[1].split(":");
		return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
	default:
		throw new js__$Boot_HaxeError("Invalid date format : " + s);
	}
};
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
HxOverrides.indexOf = function(a,obj,i) {
	var len = a.length;
	if(i < 0) {
		i += len;
		if(i < 0) i = 0;
	}
	while(i < len) {
		if(a[i] === obj) return i;
		i++;
	}
	return -1;
};
HxOverrides.remove = function(a,obj) {
	var i = HxOverrides.indexOf(a,obj,0);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
};
var List = function() {
	this.length = 0;
};
$hxClasses["List"] = List;
List.__name__ = ["List"];
List.prototype = {
	add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
	,__class__: List
};
var Main = function() {
	this._signal = [];
	this.signal = tink_core__$Signal_SignalTrigger_$Impl_$.asSignal(this._signal);
	var handlers;
	this.signal = tink_core__$Signal_SignalTrigger_$Impl_$.asSignal(handlers = tink_core__$Signal_Signal_$Impl_$.trigger());
	var this1 = tink_core__$Signal_Signal_$Impl_$.gather(this.get_signal());
	this1(function(v) {
		var injector = new minject_Injector();
		injector.mapType("String","enviroment",null).toValue("fff");
		if(v == "/pippa.html") v = "";
		var api = injector._instantiate(Api);
		new haxe_web_Dispatch(v,new haxe_ds_StringMap()).runtimeDispatch(haxe_web_Dispatch.extractConfig(api));
	});
	pushstate_PushState.addEventListener(null,null,function(url) {
		console.log(url);
		tink_core__$Callback_CallbackList_$Impl_$.invoke(handlers,url);
	});
};
$hxClasses["Main"] = Main;
Main.__name__ = ["Main"];
Main.main = function() {
	pushstate_PushState.init();
	new Main();
};
Main.prototype = {
	get_signal: function() {
		return this.signal;
	}
	,__class__: Main
	,__properties__: {get_signal:"get_signal"}
};
Math.__name__ = ["Math"];
var Reflect = function() { };
$hxClasses["Reflect"] = Reflect;
Reflect.__name__ = ["Reflect"];
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		if (e instanceof js__$Boot_HaxeError) e = e.val;
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
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(f.__name__ || f.__ename__);
};
var Std = function() { };
$hxClasses["Std"] = Std;
Std.__name__ = ["Std"];
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
};
var Type = function() { };
$hxClasses["Type"] = Type;
Type.__name__ = ["Type"];
Type.getSuperClass = function(c) {
	return c.__super__;
};
Type.getClassName = function(c) {
	var a = c.__name__;
	if(a == null) return null;
	return a.join(".");
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
Type.createInstance = function(cl,args) {
	var _g = args.length;
	switch(_g) {
	case 0:
		return new cl();
	case 1:
		return new cl(args[0]);
	case 2:
		return new cl(args[0],args[1]);
	case 3:
		return new cl(args[0],args[1],args[2]);
	case 4:
		return new cl(args[0],args[1],args[2],args[3]);
	case 5:
		return new cl(args[0],args[1],args[2],args[3],args[4]);
	case 6:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5]);
	case 7:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6]);
	case 8:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
	default:
		throw new js__$Boot_HaxeError("Too many arguments");
	}
	return null;
};
Type.createEmptyInstance = function(cl) {
	function empty() {}; empty.prototype = cl.prototype;
	return new empty();
};
Type.createEnum = function(e,constr,params) {
	var f = Reflect.field(e,constr);
	if(f == null) throw new js__$Boot_HaxeError("No such constructor " + constr);
	if(Reflect.isFunction(f)) {
		if(params == null) throw new js__$Boot_HaxeError("Constructor " + constr + " need parameters");
		var tmp;
		var func = f;
		tmp = func.apply(e,params);
		return tmp;
	}
	if(params != null && params.length != 0) throw new js__$Boot_HaxeError("Constructor " + constr + " does not need parameters");
	return f;
};
Type.createEnumIndex = function(e,index,params) {
	var c = e.__constructs__[index];
	if(c == null) throw new js__$Boot_HaxeError(index + " is not a valid enum constructor index");
	return Type.createEnum(e,c,params);
};
Type.getEnumConstructs = function(e) {
	var a = e.__constructs__;
	return a.slice();
};
var haxe_IMap = function() { };
$hxClasses["haxe.IMap"] = haxe_IMap;
haxe_IMap.__name__ = ["haxe","IMap"];
var haxe__$Int64__$_$_$Int64 = function(high,low) {
	this.high = high;
	this.low = low;
};
$hxClasses["haxe._Int64.___Int64"] = haxe__$Int64__$_$_$Int64;
haxe__$Int64__$_$_$Int64.__name__ = ["haxe","_Int64","___Int64"];
haxe__$Int64__$_$_$Int64.prototype = {
	__class__: haxe__$Int64__$_$_$Int64
};
var haxe_Unserializer = function(buf) {
	this.buf = buf;
	this.length = buf.length;
	this.pos = 0;
	this.scache = [];
	this.cache = [];
	var r = haxe_Unserializer.DEFAULT_RESOLVER;
	if(r == null) {
		r = Type;
		haxe_Unserializer.DEFAULT_RESOLVER = r;
	}
	this.setResolver(r);
};
$hxClasses["haxe.Unserializer"] = haxe_Unserializer;
haxe_Unserializer.__name__ = ["haxe","Unserializer"];
haxe_Unserializer.initCodes = function() {
	var codes = [];
	var _g1 = 0;
	var _g = haxe_Unserializer.BASE64.length;
	while(_g1 < _g) {
		var i = _g1++;
		codes[haxe_Unserializer.BASE64.charCodeAt(i)] = i;
	}
	return codes;
};
haxe_Unserializer.run = function(v) {
	return new haxe_Unserializer(v).unserialize();
};
haxe_Unserializer.prototype = {
	setResolver: function(r) {
		if(r == null) this.resolver = { resolveClass : function(_) {
			return null;
		}, resolveEnum : function(_1) {
			return null;
		}}; else this.resolver = r;
	}
	,readDigits: function() {
		var k = 0;
		var s = false;
		var fpos = this.pos;
		while(true) {
			var c = this.buf.charCodeAt(this.pos);
			if(c != c) break;
			if(c == 45) {
				if(this.pos != fpos) break;
				s = true;
				this.pos++;
				continue;
			}
			if(c < 48 || c > 57) break;
			k = k * 10 + (c - 48);
			this.pos++;
		}
		if(s) k *= -1;
		return k;
	}
	,readFloat: function() {
		var p1 = this.pos;
		while(true) {
			var c = this.buf.charCodeAt(this.pos);
			if(c >= 43 && c < 58 || c == 101 || c == 69) this.pos++; else break;
		}
		var tmp;
		var x = HxOverrides.substr(this.buf,p1,this.pos - p1);
		tmp = parseFloat(x);
		return tmp;
	}
	,unserializeObject: function(o) {
		while(true) {
			if(this.pos >= this.length) throw new js__$Boot_HaxeError("Invalid object");
			if(this.buf.charCodeAt(this.pos) == 103) break;
			var k = this.unserialize();
			if(!(typeof(k) == "string")) throw new js__$Boot_HaxeError("Invalid object key");
			var v = this.unserialize();
			o[k] = v;
		}
		this.pos++;
	}
	,unserializeEnum: function(edecl,tag) {
		var tmp;
		var p = this.pos++;
		tmp = this.buf.charCodeAt(p);
		if(tmp != 58) throw new js__$Boot_HaxeError("Invalid enum format");
		var nargs = this.readDigits();
		if(nargs == 0) return Type.createEnum(edecl,tag);
		var args = [];
		while(nargs-- > 0) args.push(this.unserialize());
		return Type.createEnum(edecl,tag,args);
	}
	,unserialize: function() {
		var tmp;
		var p = this.pos++;
		tmp = this.buf.charCodeAt(p);
		var _g = tmp;
		switch(_g) {
		case 110:
			return null;
		case 116:
			return true;
		case 102:
			return false;
		case 122:
			return 0;
		case 105:
			return this.readDigits();
		case 100:
			return this.readFloat();
		case 121:
			var len = this.readDigits();
			var tmp1;
			var p1 = this.pos++;
			tmp1 = this.buf.charCodeAt(p1);
			if(tmp1 != 58 || this.length - this.pos < len) throw new js__$Boot_HaxeError("Invalid string length");
			var s = HxOverrides.substr(this.buf,this.pos,len);
			this.pos += len;
			s = decodeURIComponent(s.split("+").join(" "));
			this.scache.push(s);
			return s;
		case 107:
			return NaN;
		case 109:
			return -Infinity;
		case 112:
			return Infinity;
		case 97:
			var buf = this.buf;
			var a = [];
			this.cache.push(a);
			while(true) {
				var c = this.buf.charCodeAt(this.pos);
				if(c == 104) {
					this.pos++;
					break;
				}
				if(c == 117) {
					this.pos++;
					var n = this.readDigits();
					a[a.length + n - 1] = null;
				} else a.push(this.unserialize());
			}
			return a;
		case 111:
			var o = { };
			this.cache.push(o);
			this.unserializeObject(o);
			return o;
		case 114:
			var n1 = this.readDigits();
			if(n1 < 0 || n1 >= this.cache.length) throw new js__$Boot_HaxeError("Invalid reference");
			return this.cache[n1];
		case 82:
			var n2 = this.readDigits();
			if(n2 < 0 || n2 >= this.scache.length) throw new js__$Boot_HaxeError("Invalid string reference");
			return this.scache[n2];
		case 120:
			throw new js__$Boot_HaxeError(this.unserialize());
			break;
		case 99:
			var name = this.unserialize();
			var cl = this.resolver.resolveClass(name);
			if(cl == null) throw new js__$Boot_HaxeError("Class not found " + name);
			var o1 = Type.createEmptyInstance(cl);
			this.cache.push(o1);
			this.unserializeObject(o1);
			return o1;
		case 119:
			var name1 = this.unserialize();
			var edecl = this.resolver.resolveEnum(name1);
			if(edecl == null) throw new js__$Boot_HaxeError("Enum not found " + name1);
			var e = this.unserializeEnum(edecl,this.unserialize());
			this.cache.push(e);
			return e;
		case 106:
			var name2 = this.unserialize();
			var edecl1 = this.resolver.resolveEnum(name2);
			if(edecl1 == null) throw new js__$Boot_HaxeError("Enum not found " + name2);
			this.pos++;
			var index = this.readDigits();
			var tag = Type.getEnumConstructs(edecl1)[index];
			if(tag == null) throw new js__$Boot_HaxeError("Unknown enum index " + name2 + "@" + index);
			var e1 = this.unserializeEnum(edecl1,tag);
			this.cache.push(e1);
			return e1;
		case 108:
			var l = new List();
			this.cache.push(l);
			var buf1 = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) l.add(this.unserialize());
			this.pos++;
			return l;
		case 98:
			var h = new haxe_ds_StringMap();
			this.cache.push(h);
			var buf2 = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) {
				var s1 = this.unserialize();
				var value = this.unserialize();
				if(__map_reserved[s1] != null) h.setReserved(s1,value); else h.h[s1] = value;
			}
			this.pos++;
			return h;
		case 113:
			var h1 = new haxe_ds_IntMap();
			this.cache.push(h1);
			var buf3 = this.buf;
			var tmp2;
			var p2 = this.pos++;
			tmp2 = this.buf.charCodeAt(p2);
			var c1 = tmp2;
			while(c1 == 58) {
				var i = this.readDigits();
				var value1 = this.unserialize();
				h1.h[i] = value1;
				var tmp3;
				var p3 = this.pos++;
				tmp3 = this.buf.charCodeAt(p3);
				c1 = tmp3;
			}
			if(c1 != 104) throw new js__$Boot_HaxeError("Invalid IntMap format");
			return h1;
		case 77:
			var h2 = new haxe_ds_ObjectMap();
			this.cache.push(h2);
			var buf4 = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) {
				var s2 = this.unserialize();
				h2.set(s2,this.unserialize());
			}
			this.pos++;
			return h2;
		case 118:
			var d;
			if(this.buf.charCodeAt(this.pos) >= 48 && this.buf.charCodeAt(this.pos) <= 57 && this.buf.charCodeAt(this.pos + 1) >= 48 && this.buf.charCodeAt(this.pos + 1) <= 57 && this.buf.charCodeAt(this.pos + 2) >= 48 && this.buf.charCodeAt(this.pos + 2) <= 57 && this.buf.charCodeAt(this.pos + 3) >= 48 && this.buf.charCodeAt(this.pos + 3) <= 57 && this.buf.charCodeAt(this.pos + 4) == 45) {
				var tmp4;
				var s3 = HxOverrides.substr(this.buf,this.pos,19);
				tmp4 = HxOverrides.strDate(s3);
				d = tmp4;
				this.pos += 19;
			} else {
				var tmp5;
				var t = this.readFloat();
				var d1 = new Date();
				d1.setTime(t);
				tmp5 = d1;
				d = tmp5;
			}
			this.cache.push(d);
			return d;
		case 115:
			var len1 = this.readDigits();
			var buf5 = this.buf;
			var tmp6;
			var p4 = this.pos++;
			tmp6 = this.buf.charCodeAt(p4);
			if(tmp6 != 58 || this.length - this.pos < len1) throw new js__$Boot_HaxeError("Invalid bytes length");
			var codes = haxe_Unserializer.CODES;
			if(codes == null) {
				codes = haxe_Unserializer.initCodes();
				haxe_Unserializer.CODES = codes;
			}
			var i1 = this.pos;
			var rest = len1 & 3;
			var size = (len1 >> 2) * 3 + (rest >= 2?rest - 1:0);
			var max = i1 + (len1 - rest);
			var bytes = haxe_io_Bytes.alloc(size);
			var bpos = 0;
			while(i1 < max) {
				var tmp7;
				var index1 = i1++;
				tmp7 = buf5.charCodeAt(index1);
				var c11 = codes[tmp7];
				var tmp8;
				var index2 = i1++;
				tmp8 = buf5.charCodeAt(index2);
				var c2 = codes[tmp8];
				var pos = bpos++;
				bytes.b[pos] = (c11 << 2 | c2 >> 4) & 255;
				var tmp9;
				var index3 = i1++;
				tmp9 = buf5.charCodeAt(index3);
				var c3 = codes[tmp9];
				var pos1 = bpos++;
				bytes.b[pos1] = (c2 << 4 | c3 >> 2) & 255;
				var tmp10;
				var index4 = i1++;
				tmp10 = buf5.charCodeAt(index4);
				var c4 = codes[tmp10];
				var pos2 = bpos++;
				bytes.b[pos2] = (c3 << 6 | c4) & 255;
			}
			if(rest >= 2) {
				var tmp11;
				var index5 = i1++;
				tmp11 = buf5.charCodeAt(index5);
				var c12 = codes[tmp11];
				var tmp12;
				var index6 = i1++;
				tmp12 = buf5.charCodeAt(index6);
				var c21 = codes[tmp12];
				var pos3 = bpos++;
				bytes.b[pos3] = (c12 << 2 | c21 >> 4) & 255;
				if(rest == 3) {
					var tmp13;
					var index7 = i1++;
					tmp13 = buf5.charCodeAt(index7);
					var c31 = codes[tmp13];
					var pos4 = bpos++;
					bytes.b[pos4] = (c21 << 4 | c31 >> 2) & 255;
				}
			}
			this.pos += len1;
			this.cache.push(bytes);
			return bytes;
		case 67:
			var name3 = this.unserialize();
			var cl1 = this.resolver.resolveClass(name3);
			if(cl1 == null) throw new js__$Boot_HaxeError("Class not found " + name3);
			var o2 = Type.createEmptyInstance(cl1);
			this.cache.push(o2);
			o2.hxUnserialize(this);
			var tmp14;
			var p5 = this.pos++;
			tmp14 = this.buf.charCodeAt(p5);
			if(tmp14 != 103) throw new js__$Boot_HaxeError("Invalid custom data");
			return o2;
		case 65:
			var name4 = this.unserialize();
			var cl2 = this.resolver.resolveClass(name4);
			if(cl2 == null) throw new js__$Boot_HaxeError("Class not found " + name4);
			return cl2;
		case 66:
			var name5 = this.unserialize();
			var e2 = this.resolver.resolveEnum(name5);
			if(e2 == null) throw new js__$Boot_HaxeError("Enum not found " + name5);
			return e2;
		default:
		}
		this.pos--;
		throw new js__$Boot_HaxeError("Invalid char " + this.buf.charAt(this.pos) + " at position " + this.pos);
	}
	,__class__: haxe_Unserializer
};
var haxe_ds_ArraySort = function() { };
$hxClasses["haxe.ds.ArraySort"] = haxe_ds_ArraySort;
haxe_ds_ArraySort.__name__ = ["haxe","ds","ArraySort"];
haxe_ds_ArraySort.sort = function(a,cmp) {
	haxe_ds_ArraySort.rec(a,cmp,0,a.length);
};
haxe_ds_ArraySort.rec = function(a,cmp,from,to) {
	var middle = from + to >> 1;
	if(to - from < 12) {
		if(to <= from) return;
		var _g = from + 1;
		while(_g < to) {
			var i = _g++;
			var j = i;
			while(j > from) {
				if(cmp(a[j],a[j - 1]) < 0) haxe_ds_ArraySort.swap(a,j - 1,j); else break;
				j--;
			}
		}
		return;
	}
	haxe_ds_ArraySort.rec(a,cmp,from,middle);
	haxe_ds_ArraySort.rec(a,cmp,middle,to);
	haxe_ds_ArraySort.doMerge(a,cmp,from,middle,to,middle - from,to - middle);
};
haxe_ds_ArraySort.doMerge = function(a,cmp,from,pivot,to,len1,len2) {
	var first_cut;
	var second_cut;
	var len11;
	var len22;
	var new_mid;
	if(len1 == 0 || len2 == 0) return;
	if(len1 + len2 == 2) {
		if(cmp(a[pivot],a[from]) < 0) haxe_ds_ArraySort.swap(a,pivot,from);
		return;
	}
	if(len1 > len2) {
		len11 = len1 >> 1;
		first_cut = from + len11;
		second_cut = haxe_ds_ArraySort.lower(a,cmp,pivot,to,first_cut);
		len22 = second_cut - pivot;
	} else {
		len22 = len2 >> 1;
		second_cut = pivot + len22;
		first_cut = haxe_ds_ArraySort.upper(a,cmp,from,pivot,second_cut);
		len11 = first_cut - from;
	}
	haxe_ds_ArraySort.rotate(a,cmp,first_cut,pivot,second_cut);
	new_mid = first_cut + len22;
	haxe_ds_ArraySort.doMerge(a,cmp,from,first_cut,new_mid,len11,len22);
	haxe_ds_ArraySort.doMerge(a,cmp,new_mid,second_cut,to,len1 - len11,len2 - len22);
};
haxe_ds_ArraySort.rotate = function(a,cmp,from,mid,to) {
	var n;
	if(from == mid || mid == to) return;
	n = haxe_ds_ArraySort.gcd(to - from,mid - from);
	while(n-- != 0) {
		var val = a[from + n];
		var shift = mid - from;
		var p1 = from + n;
		var p2 = from + n + shift;
		while(p2 != from + n) {
			a[p1] = a[p2];
			p1 = p2;
			if(to - p2 > shift) p2 += shift; else p2 = from + (shift - (to - p2));
		}
		a[p1] = val;
	}
};
haxe_ds_ArraySort.gcd = function(m,n) {
	while(n != 0) {
		var t = m % n;
		m = n;
		n = t;
	}
	return m;
};
haxe_ds_ArraySort.upper = function(a,cmp,from,to,val) {
	var len = to - from;
	var half;
	var mid;
	while(len > 0) {
		half = len >> 1;
		mid = from + half;
		if(cmp(a[val],a[mid]) < 0) len = half; else {
			from = mid + 1;
			len = len - half - 1;
		}
	}
	return from;
};
haxe_ds_ArraySort.lower = function(a,cmp,from,to,val) {
	var len = to - from;
	var half;
	var mid;
	while(len > 0) {
		half = len >> 1;
		mid = from + half;
		if(cmp(a[mid],a[val]) < 0) {
			from = mid + 1;
			len = len - half - 1;
		} else len = half;
	}
	return from;
};
haxe_ds_ArraySort.swap = function(a,i,j) {
	var tmp = a[i];
	a[i] = a[j];
	a[j] = tmp;
};
var haxe_ds_IntMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.IntMap"] = haxe_ds_IntMap;
haxe_ds_IntMap.__name__ = ["haxe","ds","IntMap"];
haxe_ds_IntMap.__interfaces__ = [haxe_IMap];
haxe_ds_IntMap.prototype = {
	__class__: haxe_ds_IntMap
};
var haxe_ds_ObjectMap = function() {
	this.h = { };
	this.h.__keys__ = { };
};
$hxClasses["haxe.ds.ObjectMap"] = haxe_ds_ObjectMap;
haxe_ds_ObjectMap.__name__ = ["haxe","ds","ObjectMap"];
haxe_ds_ObjectMap.__interfaces__ = [haxe_IMap];
haxe_ds_ObjectMap.prototype = {
	set: function(key,value) {
		var id = key.__id__ || (key.__id__ = ++haxe_ds_ObjectMap.count);
		this.h[id] = value;
		this.h.__keys__[id] = key;
	}
	,__class__: haxe_ds_ObjectMap
};
var haxe_ds_StringMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.StringMap"] = haxe_ds_StringMap;
haxe_ds_StringMap.__name__ = ["haxe","ds","StringMap"];
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
haxe_ds_StringMap.prototype = {
	setReserved: function(key,value) {
		if(this.rh == null) this.rh = { };
		this.rh["$" + key] = value;
	}
	,getReserved: function(key) {
		return this.rh == null?null:this.rh["$" + key];
	}
	,existsReserved: function(key) {
		if(this.rh == null) return false;
		return this.rh.hasOwnProperty("$" + key);
	}
	,__class__: haxe_ds_StringMap
};
var haxe_io_Bytes = function(data) {
	this.length = data.byteLength;
	this.b = new Uint8Array(data);
	this.b.bufferValue = data;
	data.hxBytes = this;
	data.bytes = this.b;
};
$hxClasses["haxe.io.Bytes"] = haxe_io_Bytes;
haxe_io_Bytes.__name__ = ["haxe","io","Bytes"];
haxe_io_Bytes.alloc = function(length) {
	return new haxe_io_Bytes(new ArrayBuffer(length));
};
haxe_io_Bytes.prototype = {
	__class__: haxe_io_Bytes
};
var haxe_io_Error = $hxClasses["haxe.io.Error"] = { __ename__ : true, __constructs__ : ["Blocked","Overflow","OutsideBounds","Custom"] };
haxe_io_Error.Blocked = ["Blocked",0];
haxe_io_Error.Blocked.__enum__ = haxe_io_Error;
haxe_io_Error.Overflow = ["Overflow",1];
haxe_io_Error.Overflow.__enum__ = haxe_io_Error;
haxe_io_Error.OutsideBounds = ["OutsideBounds",2];
haxe_io_Error.OutsideBounds.__enum__ = haxe_io_Error;
haxe_io_Error.Custom = function(e) { var $x = ["Custom",3,e]; $x.__enum__ = haxe_io_Error; return $x; };
var haxe_io_FPHelper = function() { };
$hxClasses["haxe.io.FPHelper"] = haxe_io_FPHelper;
haxe_io_FPHelper.__name__ = ["haxe","io","FPHelper"];
haxe_io_FPHelper.i32ToFloat = function(i) {
	var sign = 1 - (i >>> 31 << 1);
	var exp = i >>> 23 & 255;
	var sig = i & 8388607;
	if(sig == 0 && exp == 0) return 0.0;
	return sign * (1 + Math.pow(2,-23) * sig) * Math.pow(2,exp - 127);
};
haxe_io_FPHelper.floatToI32 = function(f) {
	if(f == 0) return 0;
	var af = f < 0?-f:f;
	var exp = Math.floor(Math.log(af) / 0.6931471805599453);
	if(exp < -127) exp = -127; else if(exp > 128) exp = 128;
	var sig = Math.round((af / Math.pow(2,exp) - 1) * 8388608) & 8388607;
	return (f < 0?-2147483648:0) | exp + 127 << 23 | sig;
};
haxe_io_FPHelper.i64ToDouble = function(low,high) {
	var sign = 1 - (high >>> 31 << 1);
	var exp = (high >> 20 & 2047) - 1023;
	var sig = (high & 1048575) * 4294967296. + (low >>> 31) * 2147483648. + (low & 2147483647);
	if(sig == 0 && exp == -1023) return 0.0;
	return sign * (1.0 + Math.pow(2,-52) * sig) * Math.pow(2,exp);
};
haxe_io_FPHelper.doubleToI64 = function(v) {
	var i64 = haxe_io_FPHelper.i64tmp;
	if(v == 0) {
		i64.low = 0;
		i64.high = 0;
	} else {
		var av = v < 0?-v:v;
		var exp = Math.floor(Math.log(av) / 0.6931471805599453);
		var tmp;
		var v1 = (av / Math.pow(2,exp) - 1) * 4503599627370496.;
		tmp = Math.round(v1);
		var sig = tmp;
		var sig_l = sig | 0;
		var sig_h = sig / 4294967296.0 | 0;
		i64.low = sig_l;
		i64.high = (v < 0?-2147483648:0) | exp + 1023 << 20 | sig_h;
	}
	return i64;
};
var haxe_rtti_Meta = function() { };
$hxClasses["haxe.rtti.Meta"] = haxe_rtti_Meta;
haxe_rtti_Meta.__name__ = ["haxe","rtti","Meta"];
haxe_rtti_Meta.getType = function(t) {
	var meta = haxe_rtti_Meta.getMeta(t);
	return meta == null || meta.obj == null?{ }:meta.obj;
};
haxe_rtti_Meta.getMeta = function(t) {
	return t.__meta__;
};
haxe_rtti_Meta.getFields = function(t) {
	var meta = haxe_rtti_Meta.getMeta(t);
	return meta == null || meta.fields == null?{ }:meta.fields;
};
var haxe_web_MatchRule = $hxClasses["haxe.web.MatchRule"] = { __ename__ : true, __constructs__ : ["MRInt","MRBool","MRFloat","MRString","MRDate","MREnum","MRDispatch","MRSpod","MROpt"] };
haxe_web_MatchRule.MRInt = ["MRInt",0];
haxe_web_MatchRule.MRInt.__enum__ = haxe_web_MatchRule;
haxe_web_MatchRule.MRBool = ["MRBool",1];
haxe_web_MatchRule.MRBool.__enum__ = haxe_web_MatchRule;
haxe_web_MatchRule.MRFloat = ["MRFloat",2];
haxe_web_MatchRule.MRFloat.__enum__ = haxe_web_MatchRule;
haxe_web_MatchRule.MRString = ["MRString",3];
haxe_web_MatchRule.MRString.__enum__ = haxe_web_MatchRule;
haxe_web_MatchRule.MRDate = ["MRDate",4];
haxe_web_MatchRule.MRDate.__enum__ = haxe_web_MatchRule;
haxe_web_MatchRule.MREnum = function(e) { var $x = ["MREnum",5,e]; $x.__enum__ = haxe_web_MatchRule; return $x; };
haxe_web_MatchRule.MRDispatch = ["MRDispatch",6];
haxe_web_MatchRule.MRDispatch.__enum__ = haxe_web_MatchRule;
haxe_web_MatchRule.MRSpod = function(c,lock) { var $x = ["MRSpod",7,c,lock]; $x.__enum__ = haxe_web_MatchRule; return $x; };
haxe_web_MatchRule.MROpt = function(r) { var $x = ["MROpt",8,r]; $x.__enum__ = haxe_web_MatchRule; return $x; };
var haxe_web_DispatchRule = $hxClasses["haxe.web.DispatchRule"] = { __ename__ : true, __constructs__ : ["DRMatch","DRMult","DRArgs","DRMeta"] };
haxe_web_DispatchRule.DRMatch = function(r) { var $x = ["DRMatch",0,r]; $x.__enum__ = haxe_web_DispatchRule; return $x; };
haxe_web_DispatchRule.DRMult = function(r) { var $x = ["DRMult",1,r]; $x.__enum__ = haxe_web_DispatchRule; return $x; };
haxe_web_DispatchRule.DRArgs = function(r,args,opt) { var $x = ["DRArgs",2,r,args,opt]; $x.__enum__ = haxe_web_DispatchRule; return $x; };
haxe_web_DispatchRule.DRMeta = function(r) { var $x = ["DRMeta",3,r]; $x.__enum__ = haxe_web_DispatchRule; return $x; };
var haxe_web_DispatchError = $hxClasses["haxe.web.DispatchError"] = { __ename__ : true, __constructs__ : ["DENotFound","DEInvalidValue","DEMissing","DEMissingParam","DETooManyValues"] };
haxe_web_DispatchError.DENotFound = function(part) { var $x = ["DENotFound",0,part]; $x.__enum__ = haxe_web_DispatchError; return $x; };
haxe_web_DispatchError.DEInvalidValue = ["DEInvalidValue",1];
haxe_web_DispatchError.DEInvalidValue.__enum__ = haxe_web_DispatchError;
haxe_web_DispatchError.DEMissing = ["DEMissing",2];
haxe_web_DispatchError.DEMissing.__enum__ = haxe_web_DispatchError;
haxe_web_DispatchError.DEMissingParam = function(p) { var $x = ["DEMissingParam",3,p]; $x.__enum__ = haxe_web_DispatchError; return $x; };
haxe_web_DispatchError.DETooManyValues = ["DETooManyValues",4];
haxe_web_DispatchError.DETooManyValues.__enum__ = haxe_web_DispatchError;
var haxe_web_Redirect = function() { };
$hxClasses["haxe.web.Redirect"] = haxe_web_Redirect;
haxe_web_Redirect.__name__ = ["haxe","web","Redirect"];
var haxe_web_Dispatch = function(url,params) {
	this.parts = url.split("/");
	if(this.parts[0] == "") this.parts.shift();
	this.params = params;
};
$hxClasses["haxe.web.Dispatch"] = haxe_web_Dispatch;
haxe_web_Dispatch.__name__ = ["haxe","web","Dispatch"];
haxe_web_Dispatch.extractConfig = function(obj) {
	var tmp;
	var o = obj;
	if(o == null) tmp = null; else tmp = js_Boot.getClass(o);
	var c = tmp;
	var dc = haxe_rtti_Meta.getType(c);
	var m = dc.dispatchConfig[0];
	if(typeof(m) == "string") {
		m = haxe_Unserializer.run(m);
		dc.dispatchConfig[0] = m;
	}
	return { obj : obj, rules : m};
};
haxe_web_Dispatch.prototype = {
	onMeta: function(v,args) {
	}
	,resolveName: function(name) {
		return name;
	}
	,runtimeDispatch: function(cfg) {
		this.name = this.parts.shift();
		if(this.name == null) this.name = "default";
		this.name = this.resolveName(this.name);
		this.cfg = cfg;
		var r = Reflect.field(cfg.rules,this.name);
		if(r == null) {
			r = Reflect.field(cfg.rules,"default");
			if(r == null) throw new js__$Boot_HaxeError(haxe_web_DispatchError.DENotFound(this.name));
			this.parts.unshift(this.name);
			this.name = "default";
		}
		this.name = "do" + this.name.charAt(0).toUpperCase() + HxOverrides.substr(this.name,1,null);
		var args = [];
		this.subDispatch = false;
		this.loop(args,r);
		if(this.parts.length > 0 && !this.subDispatch) {
			if(this.parts.length == 1 && this.parts[this.parts.length - 1] == "") this.parts.pop(); else throw new js__$Boot_HaxeError(haxe_web_DispatchError.DETooManyValues);
		}
		try {
			var func = Reflect.field(cfg.obj,this.name);
			func.apply(cfg.obj,args);
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			if( js_Boot.__instanceof(e,haxe_web_Redirect) ) {
				this.runtimeDispatch(cfg);
			} else throw(e);
		}
	}
	,match: function(v,r,opt) {
		switch(r[1]) {
		case 0:
			if(v == null) throw new js__$Boot_HaxeError(haxe_web_DispatchError.DEMissing);
			if(opt && v == "") return null;
			var v1 = Std.parseInt(v);
			if(v1 == null) throw new js__$Boot_HaxeError(haxe_web_DispatchError.DEInvalidValue);
			return v1;
		case 2:
			if(v == null) throw new js__$Boot_HaxeError(haxe_web_DispatchError.DEMissing);
			if(opt && v == "") return null;
			var v2 = parseFloat(v);
			if(isNaN(v2)) throw new js__$Boot_HaxeError(haxe_web_DispatchError.DEInvalidValue);
			return v2;
		case 3:
			if(v == null) throw new js__$Boot_HaxeError(haxe_web_DispatchError.DEMissing);
			return v;
		case 1:
			return v != null && v != "0" && v != "false" && v != "null";
		case 4:
			if(v == null) throw new js__$Boot_HaxeError(haxe_web_DispatchError.DEMissing);
			try {
				return HxOverrides.strDate(v);
			} catch( e ) {
				if (e instanceof js__$Boot_HaxeError) e = e.val;
				throw new js__$Boot_HaxeError(haxe_web_DispatchError.DEInvalidValue);
			}
			break;
		case 5:
			var e1 = r[2];
			if(v == null) throw new js__$Boot_HaxeError(haxe_web_DispatchError.DEMissing);
			if(opt && v == "") return null;
			if(v == "") throw new js__$Boot_HaxeError(haxe_web_DispatchError.DEMissing);
			var en = Type.resolveEnum(e1);
			if(en == null) throw new js__$Boot_HaxeError("assert");
			var ev;
			if(HxOverrides.cca(v,0) >= 48 && HxOverrides.cca(v,0) <= 57) ev = Type.createEnumIndex(en,Std.parseInt(v)); else ev = Type.createEnum(en,v);
			return ev;
		case 6:
			if(v != null) this.parts.unshift(v);
			this.subDispatch = true;
			return this;
		case 7:
			var lock = r[3];
			var c = r[2];
			if(v == null) throw new js__$Boot_HaxeError(haxe_web_DispatchError.DEMissing);
			var v3 = Std.parseInt(v);
			if(v3 == null) throw new js__$Boot_HaxeError(haxe_web_DispatchError.DEInvalidValue);
			var cl = Type.resolveClass(c);
			if(cl == null) throw new js__$Boot_HaxeError("assert");
			var o;
			o = cl.manager.unsafeGet(v3,lock);
			if(o == null) throw new js__$Boot_HaxeError(haxe_web_DispatchError.DEInvalidValue);
			return o;
		case 8:
			var r1 = r[2];
			if(v == null) return null;
			return this.match(v,r1,true);
		}
	}
	,checkParams: function(params,opt) {
		var po = { };
		var _g = 0;
		while(_g < params.length) {
			var p = params[_g];
			++_g;
			var tmp;
			var _this = this.params;
			var key = p.name;
			if(__map_reserved[key] != null) tmp = _this.getReserved(key); else tmp = _this.h[key];
			var v = tmp;
			if(v == null) {
				if(p.opt) continue;
				if(opt) return null;
				throw new js__$Boot_HaxeError(haxe_web_DispatchError.DEMissingParam(p.name));
			}
			var value = this.match(v,p.rule,p.opt);
			po[p.name] = value;
		}
		return po;
	}
	,loop: function(args,r) {
		switch(r[1]) {
		case 2:
			this.loop(args,r[2]);
			args.push(this.checkParams(r[3],r[4]));
			break;
		case 0:
			args.push(this.match(this.parts.shift(),r[2],false));
			break;
		case 1:
			var rl = r[2];
			var _g = 0;
			while(_g < rl.length) {
				var r1 = rl[_g];
				++_g;
				args.push(this.match(this.parts.shift(),r1,false));
			}
			break;
		case 3:
			this.loop(args,r[2]);
			var tmp;
			var o = this.cfg.obj;
			if(o == null) tmp = null; else tmp = js_Boot.getClass(o);
			var c = tmp;
			var m;
			while(true) {
				if(c == null) throw new js__$Boot_HaxeError("assert");
				m = Reflect.field(haxe_rtti_Meta.getFields(c),this.name);
				c = Type.getSuperClass(c);
				if(!(m == null)) break;
			}
			var _g1 = 0;
			var _g11 = Reflect.fields(m);
			while(_g1 < _g11.length) {
				var mv = _g11[_g1];
				++_g1;
				this.onMeta(mv,Reflect.field(m,mv));
			}
			break;
		}
	}
	,__class__: haxe_web_Dispatch
};
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	this.message = String(val);
	if(Error.captureStackTrace) Error.captureStackTrace(this,js__$Boot_HaxeError);
};
$hxClasses["js._Boot.HaxeError"] = js__$Boot_HaxeError;
js__$Boot_HaxeError.__name__ = ["js","_Boot","HaxeError"];
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
	__class__: js__$Boot_HaxeError
});
var js_Boot = function() { };
$hxClasses["js.Boot"] = js_Boot;
js_Boot.__name__ = ["js","Boot"];
js_Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else {
		var cl = o.__class__;
		if(cl != null) return cl;
		var name = js_Boot.__nativeClassName(o);
		if(name != null) return js_Boot.__resolveNativeClass(name);
		return null;
	}
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
				var str2 = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i1 = _g1++;
					if(i1 != 2) str2 += "," + js_Boot.__string_rec(o[i1],s); else str2 += js_Boot.__string_rec(o[i1],s);
				}
				return str2 + ")";
			}
			var l = o.length;
			var i;
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
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
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
			} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
				if(o instanceof cl) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") return null;
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	return (Function("return typeof " + name + " != \"undefined\" ? " + name + " : null"))();
};
var js_html_compat_ArrayBuffer = function(a) {
	if((a instanceof Array) && a.__enum__ == null) {
		this.a = a;
		this.byteLength = a.length;
	} else {
		var len = a;
		this.a = [];
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			this.a[i] = 0;
		}
		this.byteLength = len;
	}
};
$hxClasses["js.html.compat.ArrayBuffer"] = js_html_compat_ArrayBuffer;
js_html_compat_ArrayBuffer.__name__ = ["js","html","compat","ArrayBuffer"];
js_html_compat_ArrayBuffer.sliceImpl = function(begin,end) {
	var u = new Uint8Array(this,begin,end == null?null:end - begin);
	var result = new ArrayBuffer(u.byteLength);
	var resultArray = new Uint8Array(result);
	resultArray.set(u);
	return result;
};
js_html_compat_ArrayBuffer.prototype = {
	slice: function(begin,end) {
		return new js_html_compat_ArrayBuffer(this.a.slice(begin,end));
	}
	,__class__: js_html_compat_ArrayBuffer
};
var js_html_compat_DataView = function(buffer,byteOffset,byteLength) {
	this.buf = buffer;
	this.offset = byteOffset == null?0:byteOffset;
	this.length = byteLength == null?buffer.byteLength - this.offset:byteLength;
	if(this.offset < 0 || this.length < 0 || this.offset + this.length > buffer.byteLength) throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
};
$hxClasses["js.html.compat.DataView"] = js_html_compat_DataView;
js_html_compat_DataView.__name__ = ["js","html","compat","DataView"];
js_html_compat_DataView.prototype = {
	getInt8: function(byteOffset) {
		var v = this.buf.a[this.offset + byteOffset];
		return v >= 128?v - 256:v;
	}
	,getUint8: function(byteOffset) {
		return this.buf.a[this.offset + byteOffset];
	}
	,getInt16: function(byteOffset,littleEndian) {
		var v = this.getUint16(byteOffset,littleEndian);
		return v >= 32768?v - 65536:v;
	}
	,getUint16: function(byteOffset,littleEndian) {
		return littleEndian?this.buf.a[this.offset + byteOffset] | this.buf.a[this.offset + byteOffset + 1] << 8:this.buf.a[this.offset + byteOffset] << 8 | this.buf.a[this.offset + byteOffset + 1];
	}
	,getInt32: function(byteOffset,littleEndian) {
		var p = this.offset + byteOffset;
		var a = this.buf.a[p++];
		var b = this.buf.a[p++];
		var c = this.buf.a[p++];
		var d = this.buf.a[p++];
		return littleEndian?a | b << 8 | c << 16 | d << 24:d | c << 8 | b << 16 | a << 24;
	}
	,getUint32: function(byteOffset,littleEndian) {
		var v = this.getInt32(byteOffset,littleEndian);
		return v < 0?v + 4294967296.:v;
	}
	,getFloat32: function(byteOffset,littleEndian) {
		return haxe_io_FPHelper.i32ToFloat(this.getInt32(byteOffset,littleEndian));
	}
	,getFloat64: function(byteOffset,littleEndian) {
		var a = this.getInt32(byteOffset,littleEndian);
		var b = this.getInt32(byteOffset + 4,littleEndian);
		return haxe_io_FPHelper.i64ToDouble(littleEndian?a:b,littleEndian?b:a);
	}
	,setInt8: function(byteOffset,value) {
		this.buf.a[byteOffset + this.offset] = value < 0?value + 128 & 255:value & 255;
	}
	,setUint8: function(byteOffset,value) {
		this.buf.a[byteOffset + this.offset] = value & 255;
	}
	,setInt16: function(byteOffset,value,littleEndian) {
		this.setUint16(byteOffset,value < 0?value + 65536:value,littleEndian);
	}
	,setUint16: function(byteOffset,value,littleEndian) {
		var p = byteOffset + this.offset;
		if(littleEndian) {
			this.buf.a[p] = value & 255;
			this.buf.a[p++] = value >> 8 & 255;
		} else {
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p] = value & 255;
		}
	}
	,setInt32: function(byteOffset,value,littleEndian) {
		this.setUint32(byteOffset,value,littleEndian);
	}
	,setUint32: function(byteOffset,value,littleEndian) {
		var p = byteOffset + this.offset;
		if(littleEndian) {
			this.buf.a[p++] = value & 255;
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p++] = value >> 16 & 255;
			this.buf.a[p++] = value >>> 24;
		} else {
			this.buf.a[p++] = value >>> 24;
			this.buf.a[p++] = value >> 16 & 255;
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p++] = value & 255;
		}
	}
	,setFloat32: function(byteOffset,value,littleEndian) {
		this.setUint32(byteOffset,haxe_io_FPHelper.floatToI32(value),littleEndian);
	}
	,setFloat64: function(byteOffset,value,littleEndian) {
		var i64 = haxe_io_FPHelper.doubleToI64(value);
		if(littleEndian) {
			this.setUint32(byteOffset,i64.low);
			this.setUint32(byteOffset,i64.high);
		} else {
			this.setUint32(byteOffset,i64.high);
			this.setUint32(byteOffset,i64.low);
		}
	}
	,__class__: js_html_compat_DataView
};
var js_html_compat_Uint8Array = function() { };
$hxClasses["js.html.compat.Uint8Array"] = js_html_compat_Uint8Array;
js_html_compat_Uint8Array.__name__ = ["js","html","compat","Uint8Array"];
js_html_compat_Uint8Array._new = function(arg1,offset,length) {
	var arr;
	if(typeof(arg1) == "number") {
		arr = [];
		var _g = 0;
		while(_g < arg1) {
			var i = _g++;
			arr[i] = 0;
		}
		arr.byteLength = arr.length;
		arr.byteOffset = 0;
		arr.buffer = new js_html_compat_ArrayBuffer(arr);
	} else if(js_Boot.__instanceof(arg1,js_html_compat_ArrayBuffer)) {
		var buffer = arg1;
		if(offset == null) offset = 0;
		if(length == null) length = buffer.byteLength - offset;
		if(offset == 0) arr = buffer.a; else arr = buffer.a.slice(offset,offset + length);
		arr.byteLength = arr.length;
		arr.byteOffset = offset;
		arr.buffer = buffer;
	} else if((arg1 instanceof Array) && arg1.__enum__ == null) {
		arr = arg1.slice();
		arr.byteLength = arr.length;
		arr.byteOffset = 0;
		arr.buffer = new js_html_compat_ArrayBuffer(arr);
	} else throw new js__$Boot_HaxeError("TODO " + Std.string(arg1));
	arr.subarray = js_html_compat_Uint8Array._subarray;
	arr.set = js_html_compat_Uint8Array._set;
	return arr;
};
js_html_compat_Uint8Array._set = function(arg,offset) {
	var t = this;
	if(js_Boot.__instanceof(arg.buffer,js_html_compat_ArrayBuffer)) {
		var a = arg;
		if(arg.byteLength + offset > t.byteLength) throw new js__$Boot_HaxeError("set() outside of range");
		var _g1 = 0;
		var _g = arg.byteLength;
		while(_g1 < _g) {
			var i = _g1++;
			t[i + offset] = a[i];
		}
	} else if((arg instanceof Array) && arg.__enum__ == null) {
		var a1 = arg;
		if(a1.length + offset > t.byteLength) throw new js__$Boot_HaxeError("set() outside of range");
		var _g11 = 0;
		var _g2 = a1.length;
		while(_g11 < _g2) {
			var i1 = _g11++;
			t[i1 + offset] = a1[i1];
		}
	} else throw new js__$Boot_HaxeError("TODO");
};
js_html_compat_Uint8Array._subarray = function(start,end) {
	var t = this;
	var a = js_html_compat_Uint8Array._new(t.slice(start,end));
	a.byteOffset = start;
	return a;
};
var minject_Injector = function(parent) {
	this.infos = new haxe_ds_StringMap();
	this.mappings = new haxe_ds_StringMap();
	this.parent = parent;
};
$hxClasses["minject.Injector"] = minject_Injector;
minject_Injector.__name__ = ["minject","Injector"];
minject_Injector.prototype = {
	mapType: function(type,name,value) {
		var key = this.getMappingKey(type,name);
		var tmp;
		var _this = this.mappings;
		if(__map_reserved[key] != null) tmp = _this.existsReserved(key); else tmp = _this.h.hasOwnProperty(key);
		if(tmp) {
			var tmp1;
			var _this1 = this.mappings;
			if(__map_reserved[key] != null) tmp1 = _this1.getReserved(key); else tmp1 = _this1.h[key];
			return tmp1;
		}
		var mapping = new minject_InjectorMapping(type,name);
		var _this2 = this.mappings;
		if(__map_reserved[key] != null) _this2.setReserved(key,mapping); else _this2.h[key] = mapping;
		return mapping;
	}
	,findMappingForType: function(type,name) {
		var tmp;
		var key = this.getMappingKey(type,name);
		var _this = this.mappings;
		if(__map_reserved[key] != null) tmp = _this.getReserved(key); else tmp = _this.h[key];
		var mapping = tmp;
		if(mapping != null && mapping.provider != null) return mapping;
		if(this.parent != null) return this.parent.findMappingForType(type,name);
		return null;
	}
	,getValueForType: function(type,name) {
		var mapping = this.findMappingForType(type,name);
		if(mapping != null) return mapping.getValue(this);
		var index = type.indexOf("<");
		if(index > -1) mapping = this.findMappingForType(HxOverrides.substr(type,0,index),name);
		if(mapping != null) return mapping.getValue(this);
		return null;
	}
	,injectInto: function(target) {
		var tmp;
		if(target == null) tmp = null; else tmp = js_Boot.getClass(target);
		var info = this.getInfo(tmp);
		if(info == null) return;
		var _g = 0;
		var _g1 = info.fields;
		while(_g < _g1.length) {
			var field = _g1[_g];
			++_g;
			field.applyInjection(target,this);
		}
	}
	,_construct: function(type) {
		var info = this.getInfo(type);
		return info.ctor.createInstance(type,this);
	}
	,_instantiate: function(type) {
		var instance = this._construct(type);
		this.injectInto(instance);
		return instance;
	}
	,getInfo: function(forClass) {
		var type = Type.getClassName(forClass);
		var tmp;
		var _this = this.infos;
		if(__map_reserved[type] != null) tmp = _this.existsReserved(type); else tmp = _this.h.hasOwnProperty(type);
		if(tmp) {
			var tmp1;
			var _this1 = this.infos;
			if(__map_reserved[type] != null) tmp1 = _this1.getReserved(type); else tmp1 = _this1.h[type];
			return tmp1;
		}
		var info = this.createInfo(forClass);
		var _this2 = this.infos;
		if(__map_reserved[type] != null) _this2.setReserved(type,info); else _this2.h[type] = info;
		return info;
	}
	,createInfo: function(forClass) {
		var info = new minject_InjectorInfo(null,[]);
		this.addClassToInfo(forClass,info,[]);
		haxe_ds_ArraySort.sort(info.fields,function(p1,p2) {
			var post1 = (p1 instanceof minject_point_PostInjectionPoint)?p1:null;
			var post2 = (p2 instanceof minject_point_PostInjectionPoint)?p2:null;
			var tmp;
			if(post1 == null) {
				if(post2 == null) tmp = 0; else switch(post2) {
				default:
					tmp = -1;
				}
			} else switch(post1) {
			default:
				if(post2 == null) tmp = 1; else switch(post2) {
				default:
					tmp = post1.order - post2.order;
				}
			}
			return tmp;
		});
		if(info.ctor == null) info.ctor = new minject_point_ConstructorInjectionPoint([]);
		return info;
	}
	,addClassToInfo: function(forClass,info,injected) {
		var meta = haxe_rtti_Meta.getType(forClass);
		var fields = meta.rtti;
		if(fields != null) {
			var _g = 0;
			while(_g < fields.length) {
				var field = fields[_g];
				++_g;
				var name = field[0];
				if(HxOverrides.indexOf(injected,name,0) > -1) continue;
				injected.push(name);
				if(field.length == 3) info.fields.push(new minject_point_PropertyInjectionPoint(name,field[1],field[2])); else if(name == "new") info.ctor = new minject_point_ConstructorInjectionPoint(field.slice(2)); else {
					var orderStr = field[1];
					if(orderStr == "") info.fields.push(new minject_point_MethodInjectionPoint(name,field.slice(2))); else {
						var order = Std.parseInt(orderStr);
						info.fields.push(new minject_point_PostInjectionPoint(name,field.slice(2),order));
					}
				}
			}
		}
		var superClass = Type.getSuperClass(forClass);
		if(superClass != null) this.addClassToInfo(superClass,info,injected);
	}
	,getMappingKey: function(type,name) {
		if(name == null) name = "";
		return "" + type + "#" + name;
	}
	,__class__: minject_Injector
};
var minject_InjectorInfo = function(ctor,fields) {
	this.ctor = ctor;
	this.fields = fields;
};
$hxClasses["minject.InjectorInfo"] = minject_InjectorInfo;
minject_InjectorInfo.__name__ = ["minject","InjectorInfo"];
minject_InjectorInfo.prototype = {
	__class__: minject_InjectorInfo
};
var minject_InjectorMapping = function(type,name) {
	this.type = type;
	this.name = name;
};
$hxClasses["minject.InjectorMapping"] = minject_InjectorMapping;
minject_InjectorMapping.__name__ = ["minject","InjectorMapping"];
minject_InjectorMapping.prototype = {
	getValue: function(injector) {
		if(this.injector != null) injector = this.injector;
		if(this.provider != null) return this.provider.getValue(injector);
		var parent = injector.findMappingForType(this.type,this.name);
		if(parent != null) return parent.getValue(injector);
		return null;
	}
	,toValue: function(value) {
		return this.toProvider(new minject_provider_ValueProvider(value));
	}
	,toProvider: function(provider) {
		this.provider = provider;
		return this;
	}
	,__class__: minject_InjectorMapping
};
var minject_point_InjectionPoint = function() { };
$hxClasses["minject.point.InjectionPoint"] = minject_point_InjectionPoint;
minject_point_InjectionPoint.__name__ = ["minject","point","InjectionPoint"];
minject_point_InjectionPoint.prototype = {
	__class__: minject_point_InjectionPoint
};
var minject_point_MethodInjectionPoint = function(field,args) {
	this.field = field;
	this.args = args;
};
$hxClasses["minject.point.MethodInjectionPoint"] = minject_point_MethodInjectionPoint;
minject_point_MethodInjectionPoint.__name__ = ["minject","point","MethodInjectionPoint"];
minject_point_MethodInjectionPoint.__interfaces__ = [minject_point_InjectionPoint];
minject_point_MethodInjectionPoint.prototype = {
	applyInjection: function(target,injector) {
		var func = Reflect.field(target,this.field);
		var args = this.gatherArgs(target,injector);
		func.apply(target,args);
		return target;
	}
	,gatherArgs: function(target,injector) {
		var values = [];
		var index = 0;
		while(index < this.args.length) {
			var type = this.args[index++];
			var argName = this.args[index++];
			this.args[index++] == "o";
			var response = injector.getValueForType(type,argName);
			values.push(response);
		}
		return values;
	}
	,__class__: minject_point_MethodInjectionPoint
};
var minject_point_ConstructorInjectionPoint = function(args) {
	minject_point_MethodInjectionPoint.call(this,"new",args);
};
$hxClasses["minject.point.ConstructorInjectionPoint"] = minject_point_ConstructorInjectionPoint;
minject_point_ConstructorInjectionPoint.__name__ = ["minject","point","ConstructorInjectionPoint"];
minject_point_ConstructorInjectionPoint.__super__ = minject_point_MethodInjectionPoint;
minject_point_ConstructorInjectionPoint.prototype = $extend(minject_point_MethodInjectionPoint.prototype,{
	createInstance: function(type,injector) {
		return Type.createInstance(type,this.gatherArgs(type,injector));
	}
	,__class__: minject_point_ConstructorInjectionPoint
});
var minject_point_PostInjectionPoint = function(field,args,order) {
	minject_point_MethodInjectionPoint.call(this,field,args);
	this.order = order;
};
$hxClasses["minject.point.PostInjectionPoint"] = minject_point_PostInjectionPoint;
minject_point_PostInjectionPoint.__name__ = ["minject","point","PostInjectionPoint"];
minject_point_PostInjectionPoint.__super__ = minject_point_MethodInjectionPoint;
minject_point_PostInjectionPoint.prototype = $extend(minject_point_MethodInjectionPoint.prototype,{
	__class__: minject_point_PostInjectionPoint
});
var minject_point_PropertyInjectionPoint = function(field,type,name) {
	this.field = field;
	this.type = type;
	this.name = name;
};
$hxClasses["minject.point.PropertyInjectionPoint"] = minject_point_PropertyInjectionPoint;
minject_point_PropertyInjectionPoint.__name__ = ["minject","point","PropertyInjectionPoint"];
minject_point_PropertyInjectionPoint.__interfaces__ = [minject_point_InjectionPoint];
minject_point_PropertyInjectionPoint.prototype = {
	applyInjection: function(target,injector) {
		var response = injector.getValueForType(this.type,this.name);
		var field = this.field;
		var tmp;
		if(target.__properties__ && (tmp = target.__properties__["set_" + field])) target[tmp](response); else target[field] = response;
		return target;
	}
	,__class__: minject_point_PropertyInjectionPoint
};
var minject_provider_DependencyProvider = function() { };
$hxClasses["minject.provider.DependencyProvider"] = minject_provider_DependencyProvider;
minject_provider_DependencyProvider.__name__ = ["minject","provider","DependencyProvider"];
minject_provider_DependencyProvider.prototype = {
	__class__: minject_provider_DependencyProvider
};
var minject_provider_ValueProvider = function(value) {
	this.value = value;
};
$hxClasses["minject.provider.ValueProvider"] = minject_provider_ValueProvider;
minject_provider_ValueProvider.__name__ = ["minject","provider","ValueProvider"];
minject_provider_ValueProvider.__interfaces__ = [minject_provider_DependencyProvider];
minject_provider_ValueProvider.prototype = {
	getValue: function(injector) {
		return this.value;
	}
	,__class__: minject_provider_ValueProvider
};
var pushstate_PushState = function() { };
$hxClasses["pushstate.PushState"] = pushstate_PushState;
pushstate_PushState.__name__ = ["pushstate","PushState"];
pushstate_PushState.init = function(basePath,triggerFirst,ignoreAnchors) {
	if(ignoreAnchors == null) ignoreAnchors = true;
	if(triggerFirst == null) triggerFirst = true;
	if(basePath == null) basePath = "";
	pushstate_PushState.listeners = [];
	pushstate_PushState.preventers = [];
	pushstate_PushState.uploadCache = new haxe_ds_StringMap();
	pushstate_PushState.basePath = basePath;
	pushstate_PushState.ignoreAnchors = ignoreAnchors;
	window.document.addEventListener("DOMContentLoaded",function(event) {
		window.document.addEventListener("click",function(e) {
			if(e.button == 0 && !e.metaKey && !e.ctrlKey) {
				var link = null;
				var tmp;
				var value = e.target;
				if((value instanceof Node)) tmp = value; else tmp = null;
				var node = tmp;
				while(link == null && node != null) {
					link = (node instanceof HTMLAnchorElement)?node:null;
					node = node.parentNode;
				}
				if(link != null && (link.rel == "pushstate" || link.classList.contains("pushstate"))) {
					pushstate_PushState.push(link.pathname + link.search + link.hash);
					e.preventDefault();
				}
			}
		});
		window.document.addEventListener("submit",function(e1) {
			var tmp1;
			var value1 = e1.target;
			if((value1 instanceof HTMLFormElement)) tmp1 = value1; else tmp1 = null;
			var form = tmp1;
			if(form.classList.contains("pushstate")) {
				e1.preventDefault();
				pushstate_PushState.interceptFormSubmit(form);
			}
		});
		window.onpopstate = pushstate_PushState.handleOnPopState;
		if(triggerFirst) pushstate_PushState.handleOnPopState(null); else {
			pushstate_PushState.currentPath = pushstate_PushState.stripURL(window.document.location.pathname + window.document.location.search + window.document.location.hash);
			pushstate_PushState.currentState = null;
			pushstate_PushState.currentUploads = null;
		}
	});
};
pushstate_PushState.interceptFormSubmit = function(form) {
	var params = [];
	var uploads = null;
	var addParam = function(name,val) {
		if(name == null || name == "") return;
		params.push({ name : name, val : val});
	};
	var addUpload = function(name1,files) {
		var _g1 = 0;
		var _g = files.length;
		while(_g1 < _g) {
			var i = _g1++;
			addParam(name1,files[i].name);
		}
		if(uploads == null) uploads = { };
		uploads[name1] = files;
	};
	var _g11 = 0;
	var _g2 = form.elements.length;
	while(_g11 < _g2) {
		var i1 = _g11++;
		var elm = form.elements.item(i1);
		var _g21 = elm.nodeName.toUpperCase();
		switch(_g21) {
		case "INPUT":
			var input = (elm instanceof HTMLInputElement)?elm:null;
			var _g3 = input.type;
			switch(_g3) {
			case "text":case "hidden":case "password":case "search":case "email":case "url":case "tel":case "number":case "range":case "date":case "month":case "week":case "time":case "datetime":case "datetime-local":case "color":
				addParam(input.name,input.value);
				break;
			case "checkbox":
				if(input.checked) addParam(input.name,input.value);
				break;
			case "radio":
				if(input.checked) addParam(input.name,input.value);
				break;
			case "file":
				if(input.files != null && input.files.length > 0) addUpload(input.name,input.files);
				break;
			}
			break;
		case "TEXTAREA":
			var ta = (elm instanceof HTMLTextAreaElement)?elm:null;
			addParam(ta.name,ta.value);
			break;
		case "SELECT":
			var select = (elm instanceof HTMLSelectElement)?elm:null;
			var _g31 = select.type;
			switch(_g31) {
			case "select-one":
				addParam(select.name,select.value);
				break;
			case "select-multiple":
				var _g5 = 0;
				var _g4 = select.options.length;
				while(_g5 < _g4) {
					var j = _g5++;
					var option = select.options[j];
					if(option.selected) addParam(select.name,option.value);
				}
				break;
			}
			break;
		}
	}
	var tmp;
	var value = window.document.activeElement;
	if((value instanceof HTMLInputElement)) tmp = value; else tmp = null;
	var activeInput = tmp;
	var tmp1;
	var value1 = window.document.activeElement;
	if((value1 instanceof HTMLButtonElement)) tmp1 = value1; else tmp1 = null;
	var activeBtn = tmp1;
	if(activeInput != null && activeInput.type == "submit") addParam(activeInput.name,activeInput.value); else if(activeBtn != null && activeBtn.type == "submit") addParam(activeBtn.name,activeBtn.value); else {
		var defaultSubmit = form.querySelector("input[type=submit], button[type=submit]");
		var defaultInput = (defaultSubmit instanceof HTMLInputElement)?defaultSubmit:null;
		var defaultBtn = (defaultSubmit instanceof HTMLButtonElement)?defaultSubmit:null;
		if(defaultInput != null) addParam(defaultInput.name,defaultInput.value); else if(defaultBtn != null) addParam(defaultBtn.name,defaultBtn.value);
	}
	var paramString = params.map(function(p) {
		return "" + p.name + "=" + encodeURIComponent(p.val);
	}).join("&");
	if(form.method.toUpperCase() == "POST") {
		var paramsObj = { };
		var _g6 = 0;
		while(_g6 < params.length) {
			var p1 = params[_g6];
			++_g6;
			if(Object.prototype.hasOwnProperty.call(paramsObj,p1.name)) Reflect.field(paramsObj,p1.name).push(p1.val); else paramsObj[p1.name] = [p1.val];
		}
		paramsObj.__postData = paramString;
		if(uploads != null) pushstate_PushState.setUploadsForState(form.action,paramsObj,uploads);
		pushstate_PushState.push(form.action,paramsObj,uploads);
	} else pushstate_PushState.push(form.action + "?" + paramString,null);
};
pushstate_PushState.setUploadsForState = function(url,state,uploads) {
	var tmp;
	var _this = new Date();
	tmp = HxOverrides.dateStr(_this);
	var timestamp = tmp;
	var random = Math.random();
	var uploadCacheID = "" + url + "-" + timestamp + "-" + random;
	var tmp1;
	var _this1 = pushstate_PushState.uploadCache;
	if(__map_reserved[uploadCacheID] != null) _this1.setReserved(uploadCacheID,uploads); else _this1.h[uploadCacheID] = uploads;
	tmp1 = uploads;
	tmp1;
	state.__postFilesCacheID = uploadCacheID;
};
pushstate_PushState.getUploadsForState = function(state) {
	if(state == null || Object.prototype.hasOwnProperty.call(state,"__postFilesCacheID") == false) return null;
	var uploadCacheID = state.__postFilesCacheID;
	var tmp;
	var _this = pushstate_PushState.uploadCache;
	if(__map_reserved[uploadCacheID] != null) tmp = _this.existsReserved(uploadCacheID); else tmp = _this.h.hasOwnProperty(uploadCacheID);
	if(tmp == false) {
		console.log("Upload files with cache ID " + uploadCacheID + " is not available anymore");
		return null;
	} else {
		var tmp1;
		var _this1 = pushstate_PushState.uploadCache;
		if(__map_reserved[uploadCacheID] != null) tmp1 = _this1.getReserved(uploadCacheID); else tmp1 = _this1.h[uploadCacheID];
		return tmp1;
	}
};
pushstate_PushState.handleOnPopState = function(e) {
	var path = pushstate_PushState.stripURL(window.document.location.pathname + window.document.location.search + window.document.location.hash);
	var state = e != null?e.state:null;
	var tmp;
	if(state != null && state.__postFilesCacheID != null) {
		var tmp1;
		var _this = pushstate_PushState.uploadCache;
		var key = state.__postFilesCacheID;
		if(__map_reserved[key] != null) tmp1 = _this.getReserved(key); else tmp1 = _this.h[key];
		tmp = tmp1;
	} else tmp = null;
	var uploads = tmp;
	if(pushstate_PushState.ignoreAnchors && path == pushstate_PushState.currentPath) return;
	if(e != null) {
		var _g = 0;
		var _g1 = pushstate_PushState.preventers;
		while(_g < _g1.length) {
			var p = _g1[_g];
			++_g;
			if(!p(path,state,uploads)) {
				e.preventDefault();
				window.history.replaceState(pushstate_PushState.currentState,"",pushstate_PushState.currentPath);
				return;
			}
		}
	}
	pushstate_PushState.currentPath = path;
	pushstate_PushState.currentState = state;
	pushstate_PushState.currentUploads = pushstate_PushState.getUploadsForState(state);
	pushstate_PushState.dispatch(pushstate_PushState.currentPath,pushstate_PushState.currentState,pushstate_PushState.currentUploads);
	return;
};
pushstate_PushState.stripURL = function(path) {
	if(HxOverrides.substr(path,0,pushstate_PushState.basePath.length) == pushstate_PushState.basePath) path = HxOverrides.substr(path,pushstate_PushState.basePath.length,null);
	if(pushstate_PushState.ignoreAnchors && path.indexOf("#") > -1) {
		var tmp;
		var len = path.indexOf("#");
		tmp = HxOverrides.substr(path,0,len);
		path = tmp;
	}
	return path;
};
pushstate_PushState.addEventListener = function(l1,l2,l3) {
	var tmp;
	if(l1 != null) tmp = l1; else if(l2 != null) tmp = function(url,state,_) {
		l2(url,state);
	}; else if(l3 != null) tmp = function(url1,_1,_2) {
		l3(url1);
	}; else throw new js__$Boot_HaxeError("No listener provided");
	var l = tmp;
	pushstate_PushState.listeners.push(l);
	return l;
};
pushstate_PushState.dispatch = function(url,state,uploads) {
	var _g = 0;
	var _g1 = pushstate_PushState.listeners;
	while(_g < _g1.length) {
		var l = _g1[_g];
		++_g;
		l(url,state,uploads);
	}
};
pushstate_PushState.push = function(url,state,uploads) {
	var strippedURL = pushstate_PushState.stripURL(url);
	if(state == null) state = { };
	var _g = 0;
	var _g1 = pushstate_PushState.preventers;
	while(_g < _g1.length) {
		var p = _g1[_g];
		++_g;
		if(!p(strippedURL,state,uploads)) return false;
	}
	pushstate_PushState.setUploadsForState(strippedURL,state,uploads);
	window.history.pushState(state,"",url);
	pushstate_PushState.currentPath = strippedURL;
	pushstate_PushState.currentState = state;
	pushstate_PushState.currentUploads = uploads;
	pushstate_PushState.dispatch(strippedURL,state,uploads);
	return true;
};
var tink_core__$Callback_CallbackList_$Impl_$ = {};
$hxClasses["tink.core._Callback.CallbackList_Impl_"] = tink_core__$Callback_CallbackList_$Impl_$;
tink_core__$Callback_CallbackList_$Impl_$.__name__ = ["tink","core","_Callback","CallbackList_Impl_"];
tink_core__$Callback_CallbackList_$Impl_$.add = function(this1,cb) {
	var tmp;
	var tmp1;
	var this2;
	this2 = new Array(1);
	tmp1 = this2;
	var ret = tmp1;
	ret[0] = cb;
	tmp = ret;
	var cell = tmp;
	this1.push(cell);
	return function() {
		if(HxOverrides.remove(this1,cell)) cell[0] = null;
		cell = null;
	};
};
tink_core__$Callback_CallbackList_$Impl_$.invoke = function(this1,data) {
	var _g = 0;
	var _g1 = this1.slice();
	while(_g < _g1.length) {
		var cell = _g1[_g];
		++_g;
		if(cell[0] != null) cell[0](data);
	}
};
var tink_core_TypedError = function() { };
$hxClasses["tink.core.TypedError"] = tink_core_TypedError;
tink_core_TypedError.__name__ = ["tink","core","TypedError"];
tink_core_TypedError.prototype = {
	printPos: function() {
		return this.pos.className + "." + this.pos.methodName + ":" + this.pos.lineNumber;
	}
	,toString: function() {
		var ret = "Error: " + this.message;
		if(this.pos != null) ret += " " + this.printPos();
		return ret;
	}
	,throwSelf: function() {
		throw new js__$Boot_HaxeError(this);
	}
	,__class__: tink_core_TypedError
};
var tink_core__$Signal_Signal_$Impl_$ = {};
$hxClasses["tink.core._Signal.Signal_Impl_"] = tink_core__$Signal_Signal_$Impl_$;
tink_core__$Signal_Signal_$Impl_$.__name__ = ["tink","core","_Signal","Signal_Impl_"];
tink_core__$Signal_Signal_$Impl_$.gather = function(this1) {
	var ret = tink_core__$Signal_Signal_$Impl_$.trigger();
	this1(function(x) {
		tink_core__$Callback_CallbackList_$Impl_$.invoke(ret,x);
	});
	return tink_core__$Signal_SignalTrigger_$Impl_$.asSignal(ret);
};
tink_core__$Signal_Signal_$Impl_$.trigger = function() {
	return [];
};
var tink_core__$Signal_SignalTrigger_$Impl_$ = {};
$hxClasses["tink.core._Signal.SignalTrigger_Impl_"] = tink_core__$Signal_SignalTrigger_$Impl_$;
tink_core__$Signal_SignalTrigger_$Impl_$.__name__ = ["tink","core","_Signal","SignalTrigger_Impl_"];
tink_core__$Signal_SignalTrigger_$Impl_$.asSignal = function(this1) {
	var tmp;
	var _e = this1;
	tmp = function(cb) {
		return tink_core__$Callback_CallbackList_$Impl_$.add(_e,cb);
	};
	return tmp;
};
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
$hxClasses.Math = Math;
String.prototype.__class__ = $hxClasses.String = String;
String.__name__ = ["String"];
$hxClasses.Array = Array;
Array.__name__ = ["Array"];
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
if(Array.prototype.map == null) Array.prototype.map = function(f) {
	var a = [];
	var _g1 = 0;
	var _g = this.length;
	while(_g1 < _g) {
		var i = _g1++;
		a[i] = f(this[i]);
	}
	return a;
};
var __map_reserved = {}
var ArrayBuffer = (Function("return typeof ArrayBuffer != 'undefined' ? ArrayBuffer : null"))() || js_html_compat_ArrayBuffer;
if(ArrayBuffer.prototype.slice == null) ArrayBuffer.prototype.slice = js_html_compat_ArrayBuffer.sliceImpl;
var DataView = (Function("return typeof DataView != 'undefined' ? DataView : null"))() || js_html_compat_DataView;
var Uint8Array = (Function("return typeof Uint8Array != 'undefined' ? Uint8Array : null"))() || js_html_compat_Uint8Array._new;
Api.__meta__ = { obj : { dispatchConfig : ["oy4:userjy21:haxe.web.DispatchRule:1:1ahy7:defaultjR1:1:1ahg"]}, fields : { enviroment : { inject : ["enviroment"]}}};
haxe_IMap.__meta__ = { obj : { 'interface' : null}};
haxe_Unserializer.DEFAULT_RESOLVER = Type;
haxe_Unserializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
haxe_ds_ObjectMap.count = 0;
haxe_io_FPHelper.i64tmp = (function($this) {
	var $r;
	var x = new haxe__$Int64__$_$_$Int64(0,0);
	$r = x;
	return $r;
}(this));
js_Boot.__toStr = {}.toString;
js_html_compat_Uint8Array.BYTES_PER_ELEMENT = 1;
minject_point_InjectionPoint.__meta__ = { obj : { 'interface' : null}};
minject_provider_DependencyProvider.__meta__ = { obj : { 'interface' : null}};
pushstate_PushState.ignoreAnchors = true;
Main.main();
})(typeof console != "undefined" ? console : {log:function(){}});
