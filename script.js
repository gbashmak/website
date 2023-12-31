var at = document.getElementById.bind(document);

// Получаем ссылку на элемент видео
var videoElement = document.getElementById('video');

// Устанавливаем громкость на половину (0.5)
videoElement.volume = 0.15;

window.addEventListener("DOMContentLoaded", () => {
	at("status_text").innerHTML = "loading";
});

window.addEventListener("load", () => {
	setTimeout(() => {
		if (!window.video.paused) { at("status_text").innerHTML = ""; return; }
		at("status_text").innerHTML = "click to play";
		at("status_text").classList.add("begin");
	}, 100);
});

function unfade(element) {
    var op = 0.1;  // initial opacity
    element.style.display = 'block';
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 10);
}

function start_text() {
	setTimeout(() => {
		unfade(window.data);
		unfade(window.shoutout_marquee);
	}, 2000);
}

(function(target, name) {
	// maximum randval for .random([max/min [, max]])
	var RMAX = 0x7FFFFFFF;
	
	var floor = Math.floor,
		abs = Math.abs;
	 
	// 32-bits rotate
	var rot = function(x, k) {
	  return (((x << k) & 0xffffffff) | (x >>> (32 - k)))>>>0;
	};
	
	// constructor for the context
	var SmallPRNG = function(seed) {
	  this.a = 0xf1ea5eed;
	  this.b = seed;
	  this.c = seed;
	  this.d = seed;
	  this.s = 0;
	};
	
	// reseed the context
	SmallPRNG.prototype.seed = function(seed) {
	  this.a = 0xf1ea5eed;
	  this.b = seed;
	  this.c = seed;
	  this.d = seed;
	  this.s = 0;
	};
	
	// reseed the context b, c and d fields
	SmallPRNG.prototype.seedAll = function(b, c, d) {
	  this.a = 0xf1ea5eed;
	  this.b = b;
	  this.c = c;
	  this.d = d;
	  this.s = 0;
	};
	
	// get the next randval in the ctx
	SmallPRNG.prototype.randval = function() {
	  // notice the >>>0, which is to get an unsigned integer.
	  var e  = ((this.a - rot(this.b, 27)) & 0xffffffff)>>>0;
	  this.a = ((this.b ^ rot(this.c, 17)) & 0xffffffff)>>>0;
	  this.b = ((this.c + this.d) & 0xffffffff)>>>0;
	  this.c = ((this.d + e) & 0xffffffff)>>>0;
	  this.d = ((e + this.a) & 0xffffffff)>>>0;
	  this.s++;
	  return this.d;
	};
	
	// step `times' times in the CTX
	SmallPRNG.prototype.step = function(times) {
	  times = (typeof(times) === "number" ? times : 1);
	  if(times === 0) {
		times = 1;
	  }
	  
	  for(var i = 0; i < times; i++) {
		var e  = ((this.a - rot(this.b, 27)) & 0xffffffff)>>>0;
		this.a = ((this.b ^ rot(this.c, 17)) & 0xffffffff)>>>0;
		this.b = ((this.c + this.d) & 0xffffffff)>>>0;
		this.c = ((this.d + e) & 0xffffffff)>>>0;
		this.d = ((e + this.a) & 0xffffffff)>>>0;
		this.s++;
	  }
	};
	
	SmallPRNG.prototype.random = function() {
	  var r = ((this.randval() % RMAX) / RMAX);
	  switch(arguments.length) {
		// zero arguments, return the 0-1 random factor
		case 0: {
		  return r;
		} break;
		  
		// 1 argument (max val), return random between 1 and max
		case 1: {
		  var u = arguments[0];
		  if(u < 1) {
			console.log("upper limit invalid");
			return null;
		  }
		  
		  return (floor(r * u) + 1);
		  
		} break;
		  
		// 2 arguments (min, max val), return random between min and max
		case 2: {
		  var l = arguments[0];
		  var u = arguments[1];
		  
		  if(l >= u) {
			console.log("upper limit invalid");
			return null;
		  }
		  
		  return (floor(r * (u - l + 1)) + l);
		} break;
		  
		default: {
		  console.log("invalid amount of arguments");
		} break;
	  }
	  
	  return null;
	};
	
	target[name] = SmallPRNG;
  }(window, "SmallPRNG"));

this.Element&&Element.prototype.attachEvent&&!Element.prototype.addEventListener&&function(){function t(t,n){Window.prototype[t]=HTMLDocument.prototype[t]=Element.prototype[t]=n}function n(){n.interval&&document.body&&(n.interval=clearInterval(n.interval),document.dispatchEvent(new CustomEvent("DOMContentLoaded")))}t("addEventListener",function(t,n){var e=this,r=e.addEventListener.listeners=e.addEventListener.listeners||{},a=r[t]=r[t]||[];a.length||e.attachEvent("on"+t,a.event=function(t){var n=e.document&&e.document.documentElement||e.documentElement||{scrollLeft:0,scrollTop:0};t.currentTarget=e,t.pageX=t.clientX+n.scrollLeft,t.pageY=t.clientY+n.scrollTop,t.preventDefault=function(){t.returnValue=!1},t.relatedTarget=t.fromElement||null,t.stopImmediatePropagation=function(){u=!1,t.cancelBubble=!0},t.stopPropagation=function(){t.cancelBubble=!0},t.target=t.srcElement||e,t.timeStamp=+new Date;for(var r,o=0,i=[].concat(a),u=!0;u&&(r=i[o]);++o)for(var c,s=0;c=a[s];++s)if(c==r){c.call(e,t);break}}),a.push(n)}),t("removeEventListener",function(t,n){for(var e,r=this,a=r.addEventListener.listeners=r.addEventListener.listeners||{},o=a[t]=a[t]||[],i=o.length-1;e=o[i];--i)if(e==n){o.splice(i,1);break}!o.length&&o.event&&r.detachEvent("on"+t,o.event)}),t("dispatchEvent",function(t){var n=this,e=t.type,r=n.addEventListener.listeners=n.addEventListener.listeners||{},a=r[e]=r[e]||[];try{return n.fireEvent("on"+e,t)}catch(o){return void(a.event&&a.event(t))}}),Object.defineProperty(Window.prototype,"CustomEvent",{get:function(){var t=this;return function(n,e){var r,a=t.document.createEventObject();a.type=n;for(r in e)"cancelable"==r?a.returnValue=!e.cancelable:"bubbles"==r?a.cancelBubble=!e.bubbles:"detail"==r&&(a.detail=e.detail);return a}}}),n.interval=setInterval(n,1),window.addEventListener("load",n)}(),!this.CustomEvent&&function(){window.CustomEvent=function(t,n){var e;n=n||{bubbles:!1,cancelable:!1,detail:void 0};try{e=document.createEvent("CustomEvent"),e.initCustomEvent(t,n.bubbles,n.cancelable,n.detail)}catch(r){e=document.createEvent("Event"),e.initEvent(t,n.bubbles,n.cancelable),e.detail=n.detail}return e}}(),function(){"use strict";window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)}}(),"create"in Object&&"function"==typeof Object.create||(Object.create=function(){var t=function(){};return function(n){if(arguments.length>1)throw Error("Second argument not supported");if("object"!=typeof n)throw TypeError("Argument must be an object");t.prototype=n;var e=new t;return t.prototype=null,e}}())}(),function(){"use strict";function t(t,n){return n.prototype=Object.create(t.prototype),n.parent=t,n.prototype.constructor=n,n}"extend"in Function.prototype&&"function"==typeof Function.prototype.extend||(Function.prototype.extend=function(n){return t(this,n)})}(),function(t){"use strict";t.Easing={linear:function(t){return t},easeInQuad:function(t){return t*t},easeOutQuad:function(t){return t*(2-t)},easeInOutQuad:function(t){return.5>t?2*t*t:-1+(4-2*t)*t},easeInCubic:function(t){return t*t*t},easeOutCubic:function(t){return--t*t*t+1},easeInOutCubic:function(t){return.5>t?4*t*t*t:(t-1)*(2*t-2)*(2*t-2)+1},easeInQuart:function(t){return t*t*t*t},easeOutQuart:function(t){return 1- --t*t*t*t},easeInOutQuart:function(t){return.5>t?8*t*t*t*t:1-8*--t*t*t*t},easeInQuint:function(t){return t*t*t*t*t},easeOutQuint:function(t){return 1+--t*t*t*t*t},easeInOutQuint:function(t){return.5>t?16*t*t*t*t*t:1+16*--t*t*t*t*t}}}(window),function(t){"use strict";"Math"in t||(t.Math={}),"Util"in t||(t.Util={});var n=t.Math,e=t.Util;n.Tau=2*n.PI,n.map=function(t,n,e,r,a){return(t-n)*(a-r)/(e-n)+r},n.dist=function(t,n,e,r){var a=t-e,o=n-r;return Math.sqrt(a*a+o*o)},n.lineIntersect=function(t,n,e,r,a,o,i,u){if(!(that instanceof PointLine))return null;var c,s,l,d,f,m;return c=e-t,s=r-n,l=i-a,d=u-o,f=(-s*(t-a)+c*(n-o))/(-l*s+c*d),m=(l*(n-o)-d*(t-a))/(-l*s+c*d),f>=0&&1>=f&&m>=0&&1>=m?{x:Math.floor(t+m*c),y:Math.floor(n+m*s)}:null},n.rad=function(t){return t*(Math.PI/180)},n.deg=function(t){return t*(180/Math.PI)},n.pointOnCircle=function(t,e,r,a){var o=t+r*Math.cos(n.rad(a)),i=e+r*Math.sin(n.rad(a));return{x:o,y:i}},n.lineProgress=function(t,n,e,r,a){return{x:t+(e-t)*a,y:n+(r-n)*a}},n.randInt=function(t,n){return Math.floor(Math.random()*(n-t+1))+t},n.mrandInt=function(t){return Math.floor(Math.random()*t)},n.randFloat=function(t,n){return Math.random()*(n-t+1)+t},n.mrandFloat=function(t){return Math.random()*t},n.randSign=function(){return Math.random()>.5?-1:1},n.scale=function(t,n,e,r){var a,o,i;return t>e&&(a=e/t,o=e,i=a*n),n>r&&(a=r/n,o=a*t,i=r),{w:Math.floor(o),h:Math.floor(i)}},e.easer=function(t,n,e){var r=Date.now()-n,a=r/e,o=t(a);return r>=e&&(o=1),o}}(window),function(t){"use strict";var n=function(t){return 2!==t.length?t+t:t},e=/\#([0-9a-f]{1,2})([0-9a-f]{1,2})([0-9a-f]{1,2})/i,r=function(t,n,e,r){r=r||1,this.r=t,this.g=n,this.b=e,this.a=r};r.prototype.toString=function(){return"rgba("+this.r+", "+this.g+", "+this.b+", "+this.a+")"},r.fromHex=function(t){if("string"!=typeof t)throw new TypeError("hexadecimal color must be a string");if(4!==t.length&&7!==t.length)throw new TypeError("invalid hexadecimal format");var a=new r,o=t.match(e);if(!o)throw new TypeError("invalid hexadecimal format");return a.r=parseInt(n(o[1]),16),a.g=parseInt(n(o[2]),16),a.b=parseInt(n(o[3]),16),a.a=1,a},r.random=function(t,n){return new r(Math.randInt(t,n),Math.randInt(t,n),Math.randInt(t,n),1)},r.randomEx=function(t){return new r(Math.randInt(t.rmin,t.rmax),Math.randInt(t.gmin,t.gmax),Math.randInt(t.bmin,t.bmax),1)};var a=function(t,n,e){this.r=t,this.g=n,this.b=e};a.prototype.toString=function(){return"rgb("+this.r+", "+this.g+", "+this.b+")"},a.fromHex=function(t){if("string"!=typeof t)throw new TypeError("hexadecimal color must be a string");if(4!==t.length&&7!==t.length)throw new TypeError("invalid hexadecimal format");var r=new a,o=t.match(e);if(!o)throw new TypeError("invalid hexadecimal format");return r.r=parseInt(n(o[1]),16),r.g=parseInt(n(o[2]),16),r.b=parseInt(n(o[3]),16),r},a.random=function(t,n){return new a(Math.randInt(t,n),Math.randInt(t,n),Math.randInt(t,n))},a.randomEx=function(t){return new a(Math.randInt(t.rmin,t.rmax),Math.randInt(t.gmin,t.gmax),Math.randInt(t.bmin,t.bmax))},t.RGBA=r,t.RGB=a}(window);

+(function(root) {
	'use strict';
	var Vector3D = function Vector3D(x, y, z) {
	  this.set(x, y, z);
	}, v3dp = Vector3D.prototype;
  
	v3dp.dot2d = function(x, y) {
	  return ((this.x * x) + (this.y * y));
	};
  
	v3dp.dot3d = function(x, y, z) {
	  return ((this.x * x) + (this.y * y) + (this.z * z));
	};
  
	v3dp.set = function(x, y, z) {
	  this.x = x;
	  this.y = y;
	  this.z = z;
	  
	  return this;
	};
  
	v3dp.add = function(other) {
	  if(typeof other === "number") {
		this.x += other, this.y += other, this.z += other;
		return this;
	  }
	  this.x += other.x, this.y += other.y, this.z += other.z;
	  return this;
	};
  
	v3dp.sub = function(other) {
	  if(typeof other === "number") {
		this.x -= other, this.y -= other, this.z -= other;
		return this;
	  }
	  this.x -= other.x, this.y -= other.y, this.z -= other.z;
	  return this;
	};
  
	v3dp.mul = function(other) {
	  if(typeof other === "number") {
		this.x *= other, this.y *= other, this.z *= other;
		return this;
	  }
	  this.x *= other.x, this.y *= other.y, this.z *= other.z;
	  return this;
	};
  
	v3dp.div = function(other) {
	  if(typeof other === "number") {
		this.x /= other, this.y /= other, this.z /= other;
		return this;
	  }
	  this.x /= other.x, this.y /= other.y, this.z /= other.z;
	  return this;
	};
  
	v3dp.move = function(dest) {
	  if(dest instanceof Vector3D) {
		dest.x = this.x, dest.y = this.y, dest.z = this.z;
	  }
	  return this;
	};
  
	v3dp.within2d = function(bounds) {
	  return (this.x >= 0 && this.x < bounds.x && this.y >= 0 && this.y < bounds.y);
	};
  
	v3dp.wrap2d = function(bounds) {
	  if(this.x > bounds.x) {
		this.x = 0;
		return true;
	  }
  
	  if(this.x < 0) {
		this.x = bounds.x;
		return true;
	  }
  
	  if(this.y > bounds.y) {
		this.y = 0;
		return true;
	  }
  
	  if(this.y < 0) {
		this.y = bounds.y;
		return true;
	  }
	};
  
	v3dp.eq = function(other) {
	  return (other instanceof Vector3D) && this.x === other.x && this.y === other.y && this.z === other.z;
	};
	
	v3dp.distance = function(other) {
	  var dx = (this.x - other.x),
		  dy = (this.y - other.y);
	  
	  return Math.sqrt(dx * dx + dy * dy);
	};
	
	v3dp.clone = function() {
	  return new Vector3D(this.x, this.y, this.z);
	};
  
	root.Vector3D = Vector3D;
  }(window));
  
  +(function(root) {
	'use strict';
	// a simple non-optimized Perlin Simplex Noise. I wrote this
	// to understand Simplex Noise a bit more.
  
	// fully self-contained state, so you can influence the outcome
	// of each simplex noise state
	var Perlin = function Perlin() {
	  this.grad3 = [
		new Vector3D(1,1,0), new Vector3D(-1,1,0), new Vector3D(1,-1,0), new Vector3D(-1,-1,0),
		new Vector3D(1,0,1), new Vector3D(-1,0,1), new Vector3D(1,0,-1), new Vector3D(-1,0,-1),
		new Vector3D(0,1,1), new Vector3D(0,-1,1), new Vector3D(0,1,-1), new Vector3D(0,-1,-1)
	  ];
  
	  this.p = [
		0x97, 0xa0, 0x89, 0x5b, 0x5a, 0x0f, 0x83, 0x0d, 0xc9, 0x5f, 0x60, 0x35, 0xc2, 0xe9, 0x07, 0xe1, 
		0x8c, 0x24, 0x67, 0x1e, 0x45, 0x8e, 0x08, 0x63, 0x25, 0xf0, 0x15, 0x0a, 0x17, 0xbe, 0x06, 0x94, 
		0xf7, 0x78, 0xea, 0x4b, 0x00, 0x1a, 0xc5, 0x3e, 0x5e, 0xfc, 0xdb, 0xcb, 0x75, 0x23, 0x0b, 0x20, 
		0x39, 0xb1, 0x21, 0x58, 0xed, 0x95, 0x38, 0x57, 0xae, 0x14, 0x7d, 0x88, 0xab, 0xa8, 0x44, 0xaf, 
		0x4a, 0xa5, 0x47, 0x86, 0x8b, 0x30, 0x1b, 0xa6, 0x4d, 0x92, 0x9e, 0xe7, 0x53, 0x6f, 0xe5, 0x7a, 
		0x3c, 0xd3, 0x85, 0xe6, 0xdc, 0x69, 0x5c, 0x29, 0x37, 0x2e, 0xf5, 0x28, 0xf4, 0x66, 0x8f, 0x36, 
		0x41, 0x19, 0x3f, 0xa1, 0x01, 0xd8, 0x50, 0x49, 0xd1, 0x4c, 0x84, 0xbb, 0xd0, 0x59, 0x12, 0xa9, 
		0xc8, 0xc4, 0x87, 0x82, 0x74, 0xbc, 0x9f, 0x56, 0xa4, 0x64, 0x6d, 0xc6, 0xad, 0xba, 0x03, 0x40, 
		0x34, 0xd9, 0xe2, 0xfa, 0x7c, 0x7b, 0x05, 0xca, 0x26, 0x93, 0x76, 0x7e, 0xff, 0x52, 0x55, 0xd4, 
		0xcf, 0xce, 0x3b, 0xe3, 0x2f, 0x10, 0x3a, 0x11, 0xb6, 0xbd, 0x1c, 0x2a, 0xdf, 0xb7, 0xaa, 0xd5, 
		0x77, 0xf8, 0x98, 0x02, 0x2c, 0x9a, 0xa3, 0x46, 0xdd, 0x99, 0x65, 0x9b, 0xa7, 0x2b, 0xac, 0x09, 
		0x81, 0x16, 0x27, 0xfd, 0x13, 0x62, 0x6c, 0x6e, 0x4f, 0x71, 0xe0, 0xe8, 0xb2, 0xb9, 0x70, 0x68, 
		0xda, 0xf6, 0x61, 0xe4, 0xfb, 0x22, 0xf2, 0xc1, 0xee, 0xd2, 0x90, 0x0c, 0xbf, 0xb3, 0xa2, 0xf1, 
		0x51, 0x33, 0x91, 0xeb, 0xf9, 0x0e, 0xef, 0x6b, 0x31, 0xc0, 0xd6, 0x1f, 0xb5, 0xc7, 0x6a, 0x9d, 
		0xb8, 0x54, 0xcc, 0xb0, 0x73, 0x79, 0x32, 0x2d, 0x7f, 0x04, 0x96, 0xfe, 0x8a, 0xec, 0xcd, 0x5d, 
		0xde, 0x72, 0x43, 0x1d, 0x18, 0x48, 0xf3, 0x8d, 0x80, 0xc3, 0x4e, 0x42, 0xd7, 0x3d, 0x9c, 0xb4
	  ];
  
	  this.permutation = new Array(512);
	  this.gradP       = new Array(512);
  
	  // skew and unskew factors for 2D or 3D, can be modified per state!
	  this.F2 = (0.5 * (Math.sqrt(3) - 1));
	  this.G2 = ((3 - Math.sqrt(3)) / 6);
	  this.F3 = (1 / 3);
	  this.G3 = (1 / 6);
	}, pp = Perlin.prototype;
  
	pp.init = function(prng) {
	  if(typeof prng !== "function") {
		throw new TypeError("prng needs to be a function returning an int between 0 and 255");
	  }
  
	  for(var i = 0; i < 256; i += 1) {
		var randval = (this.p[i] ^ prng());
		this.permutation[i] = this.permutation[i + 256] = randval;
		this.gradP[i] = this.gradP[i + 256] = this.grad3[randval % this.grad3.length];
	  }
	};
  
	// I removed the pp.simplex2d function, because I don't need it in this project
	// pp.simplex2d = function(x, y) {};
  
	pp.simplex3d = function(x, y, z) {
	  var n0, n1, n2, n3, i1, j1, k1, i2, j2, k2,
		  x1, y1, z1, x2, y2, z2, x3, y3, z3,
		  gi0, gi1, gi2, gi3, t0, t1, t2, t3,
		  s = ((x + y + z) * this.F3),
		  i = Math.floor(x + s), j = Math.floor(y + s), k = Math.floor(z + s),
		  t = ((i + j + k) * this.G3),
		  x0 = (x - i + t), y0 = (y - j + t), z0 = (z - k + t);
  
	  if(x0 >= y0) {
		if(y0 >= z0)      { 
		  i1=1; j1=0; k1=0; i2=1; j2=1; k2=0; 
		} else if(x0 >= z0) { 
		  i1=1; j1=0; k1=0; i2=1; j2=0; k2=1; 
		} else { 
		  i1=0; j1=0; k1=1; i2=1; j2=0; k2=1; 
		}
	  } else {
		if(y0 < z0) { 
		  i1=0; j1=0; k1=1; i2=0; j2=1; k2=1; 
		} else if(x0 < z0) { 
		  i1=0; j1=1; k1=0; i2=0; j2=1; k2=1; 
		} else { 
		  i1=0; j1=1; k1=0; i2=1; j2=1; k2=0; 
		}
	  }
  
	  x1 = (x0 - i1 + this.G3), y1 = (y0 - j1 + this.G3), z1 = (z0 - k1 + this.G3);
	  x2 = (x0 - i2 + 2 * this.G3), y2 = (y0 - j2 + 2 * this.G3), z2 = (z0 - k2 + 2 * this.G3);
	  x3 = (x0 - 1 + 3 * this.G3), y3 = (y0 - 1 + 3 * this.G3), z3 = (z0 - 1 + 3 * this.G3);
  
	  i &= 255, j &= 255, k &= 255;
  
	  gi0 = this.gradP[i + this.permutation[j + this.permutation[k]]];
	  gi1 = this.gradP[i + i1 + this.permutation[j + j1 + this.permutation[k + k1]]];
	  gi2 = this.gradP[i + i2 + this.permutation[j + j2 + this.permutation[k + k2]]];
	  gi3 = this.gradP[i + 1 + this.permutation[j + 1 + this.permutation[k + 1]]];
  
	  t0 = (0.6 - x0 * x0 - y0 * y0 - z0 * z0);
	  t1 = (0.6 - x1 * x1 - y1 * y1 - z1 * z1);
	  t2 = (0.6 - x2 * x2 - y2 * y2 - z2 * z2);
	  t3 = (0.6 - x3 * x3 - y3 * y3 - z3 * z3);
	  n0 = (t0 < 0 ? 0 : (t0 *= t0, t0 * t0 * gi0.dot3d(x0, y0, z0)));
	  n1 = (t1 < 0 ? 0 : (t1 *= t1, t1 * t1 * gi1.dot3d(x1, y1, z1)));
	  n2 = (t2 < 0 ? 0 : (t2 *= t2, t2 * t2 * gi2.dot3d(x2, y2, z2)));
	  n3 = (t3 < 0 ? 0 : (t3 *= t3, t3 * t3 * gi3.dot3d(x3, y3, z3)));
  
	  return (32 * (n0 + n1 + n2 + n3));
	};
  
	root.Perlin = Perlin;
  }(window));
  
  ;(function(root) {
	'use strict';
  
	var MouseMonitor = function(element) {
	  this.position = new Vector3D(0, 0, 0);
	  this.state    = {left: false, middle: false, right: false};
	  this.element  = element;
	  
	  var that = this;
	  element.addEventListener('mousemove', function(event) {
		var dot, eventDoc, doc, body, pageX, pageY;
		event = event || window.event;
		if (event.pageX == null && event.clientX != null) {
		  eventDoc = (event.target && event.target.ownerDocument) || document;
		  doc = eventDoc.documentElement;
		  body = eventDoc.body;
		  event.pageX = event.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
		  event.pageY = event.clientY + (doc && doc.scrollTop  || body && body.scrollTop  || 0) - (doc && doc.clientTop  || body && body.clientTop  || 0 );
		}
  
		that.position.x = event.pageX;
		that.position.y = event.pageY;
	  });
  
	  element.addEventListener('contextmenu', function(event) {
		return event.preventDefault();
	  });
	  
	  element.addEventListener('mousedown', function(event) {
		if(event.which === 1) that.state.left = true;
		if(event.which === 2) that.state.middle = true;
		if(event.which === 3) that.state.right = true;
		
		return event.preventDefault();
	  });
  
	  element.addEventListener('mouseup', function(event) {
		that.state.left = that.state.middle = that.state.right = false;
		
		return event.preventDefault();
	  });
	};
	
	root.MouseMonitor = MouseMonitor;
  }(window));
  
  +(function(root) {
	'use strict';
	
	var Particle = function Particle(generator, bounds, rctx, mon) {
	  this.p = new Vector3D(50, 50, 50); // position
	  this.t = new Vector3D(50, 50, 50); // trail to
	  this.v = new Vector3D(); // velocity
	  this.g = generator; // simplex noise generator
	  this.b = bounds;    // window bounds for wrapping
	  this.r = rctx;      // random context
	  this.m = mon;       // mouse position monitor
	  
	  this.reset();
	}, pp = Particle.prototype;
  
	pp.reset = function() {
	  // new random position
	  this.p.x = this.t.x = Math.floor(this.r.random() * this.b.x);
	  this.p.y = this.t.y = Math.floor(this.r.random() * this.b.y);
	  
	  // reset velocity
	  this.v.set(1, 1, 0);
	  
	  // iteration and life
	  this.i = 0; 
	  this.l = this.r.random(1000, 10000); // life time before particle respawns
	};
  
	pp.step = function() {
	  if(this.i++ > this.l) {
		this.reset();
	  }
	  
	  var xx = (this.p.x / 200),
		  yy = (this.p.y / 200),
		  zz = (Date.now() / 5000),
		  a  = (this.r.random() * Math.Tau),
		  rnd= (this.r.random()  / 4);
  
	  // calculate the new velocity based on the noise
	  // random velocity in a random direction
	  this.v.x += (rnd * Math.sin(a) + this.g.simplex3d(xx, yy, -zz)); // sin or cos, no matter
	  this.v.y += (rnd * Math.cos(a) + this.g.simplex3d(xx, yy, zz));  // opposite zz's matters
	  
	  if(this.m.state.left) {
		// add a difference between mouse pos and particle pos (a fraction of it) to the velocity.
		this.v.add(this.m.position.clone().sub(this.p).mul(.00085));
	  }
	  
	  // repulse the particles if the right mouse button is down and the distance between
	  // the mouse and particle is below an arbitrary value between 200 and 250.
	  if(this.m.state.right && this.p.distance(this.m.position) < this.r.random(200, 250)) {
		this.v.add(this.p.clone().sub(this.m.position).mul(.02));
	  }
	  
	  // time dilation field, stuff moves at 10% here, depending on distance
	  if(this.m.state.middle) {
		var d = this.p.distance(this.m.position),
			l = this.r.random(200, 250);
		
		if(d < l) {
		  this.v.mul(d / l);
		}
	  }
	  
	  // keep a copy of the current position, for a nice line between then and now and add velocity
	  this.p.move(this.t).add(this.v.mul(.94)); // slow down the velocity slightly
  
	  // wrap around the edges
	  if(this.p.wrap2d(this.b)) {
		this.p.move(this.t);
	  }
	};
  
	// plot the line, but do not stroke yet.
	pp.render = function(context) {
	  context.moveTo(this.t.x, this.t.y);
	  context.lineTo(this.p.x, this.p.y);
	};
  
	root.Particle = Particle;
  }(window));


  var render = 0;
  
  window.addEventListener('load', function() {
	var rctx = new SmallPRNG(+new Date()), // random generator, see ref
		p = new Perlin(), // simplex noise generator
		canvas = document.getElementById("swarm"),
		context = canvas.getContext("2d"),
		monitor = new MouseMonitor(canvas),
		hue = 0, particles = [], resize,
		width, height, bounds = new Vector3D(0, 0, 0),
		settings = {
		  particleNum: 20000,
		  fadeOverlay: true,
		  rotateColor: true,
		  staticColorString: 'rgba(255, 255, 255, 1)'
		};
	
	// seed perlin with random bytes from SmallPRNG
	p.init(function() {
	  // called for each permutation (256 times)
	  return rctx.random(0, 255);
	});
  
	resize = function() {
	  // resize the canvas
	  canvas.width  = width  = bounds.x = window.innerWidth;
	  canvas.height = height = bounds.y = window.innerHeight;
	}; resize();
  
	window.addEventListener('resize', resize); 
  
	// generate a few particles
	for(var i = 0; i < settings.particleNum; i += 1) {
	  particles.push(new Particle(p, bounds, rctx, monitor));
	}
	
	render = function() {
		requestAnimationFrame(render);
  
		context.beginPath();
			// render each particle and trail
			for(var i = 0; i < particles.length; i += 1) {
				particles[i].step(), particles[i].render(context);
			}

			context.globalCompositeOperation = 'source-over';
			if(settings.fadeOverlay) {
			context.fillStyle = 'rgba(0, 0, 0, .085)';
			} else {
			context.fillStyle = 'rgba(0, 0, 0, 1)';
			}
			context.fillRect(0, 0, width, height);

			context.globalCompositeOperation = 'lighter';
			if(settings.rotateColor) {
			context.strokeStyle = 'hsla(' + hue + ', 75%, 50%, .55)';
			} else {
			context.strokeStyle = settings.staticColorString;
			}
			context.stroke();
		context.closePath();
	  
	  hue = ((hue + .5) % 360);
	};
  });