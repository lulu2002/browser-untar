!function(e,r){"object"==typeof exports&&"object"==typeof module?module.exports=r():"function"==typeof define&&define.amd?define("browser-untar",[],r):"object"==typeof exports?exports["browser-untar"]=r():e["browser-untar"]=r()}(this,function(){return function(t){var o={};function n(e){if(o[e])return o[e].exports;var r=o[e]={i:e,l:!1,exports:{}};return t[e].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=t,n.c=o,n.d=function(e,r,t){n.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:t})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(r,e){if(1&e&&(r=n(r)),8&e)return r;if(4&e&&"object"==typeof r&&r&&r.__esModule)return r;var t=Object.create(null);if(n.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:r}),2&e&&"string"!=typeof r)for(var o in r)n.d(t,o,function(e){return r[e]}.bind(null,o));return t},n.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(r,"a",r),r},n.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},n.p="",n(n.s=0)}([function(e,r,t){e.exports=t(1)},function(e,r,t){"use strict";function s(e){return(s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function n(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}function i(e,r){for(var t=0;t<r.length;t++){var o=r[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function u(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}t.r(r);var c=function(){var e,r,t;function o(){var t=this;n(this,o),u(this,"trimWorkerPool",function(){for(;t._workerPool.length>o._desiredWorkerPoolLength;){var e=t._workerPool.pop();void 0!==e&&e.terminate()}}),u(this,"initializeWorkerPool",function(){for(var e=0;e<o._desiredWorkerPoolLength;++e){var r=new Worker(t._workerCode);t._workerPool.push(r)}}),u(this,"requestWorker",function(){var e;return void 0===(e=t._workerPool.shift())&&(e=new Worker(t._workerCode)),e}),u(this,"returnWorker",function(e){t._workerPool.push(e)}),u(this,"untar",function(e){if(!(e instanceof ArrayBuffer))throw new TypeError("arrayBuffer is not an instance of ArrayBuffer.");var n=t.requestWorker(),i=[],r=new Promise(function(t,o){n.onerror=function(e){return o(e)},n.onmessage=function(e){var r=e.data;switch(r.type){case"l":console[r.level]("Worker: ".concat(r.message));break;case"e":i.push(new a(r.data));break;case"c":t(i);break;default:console.error("Unknown worker message!"),n.terminate(),void 0!==r.message?o(new Error(r.message)):o(new Error("Unknown worker message: ".concat(r.type)))}}}).finally(function(){i=void 0,n.onerror=void 0,n.onmessage=void 0,t.returnWorker(n),n=void 0});return n.postMessage({type:"e",buffer:e},[e]),r}),this._workerCode=window.URL.createObjectURL(new Blob(['!function(e,r){"object"==typeof exports&&"object"==typeof module?module.exports=r():"function"==typeof define&&define.amd?define("browser-untar",[],r):"object"==typeof exports?exports["browser-untar"]=r():e["browser-untar"]=r()}(this,function(){return function(t){var n={};function i(e){if(n[e])return n[e].exports;var r=n[e]={i:e,l:!1,exports:{}};return t[e].call(r.exports,r,r.exports,i),r.l=!0,r.exports}return i.m=t,i.c=n,i.d=function(e,r,t){i.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:t})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(r,e){if(1&e&&(r=i(r)),8&e)return r;if(4&e&&"object"==typeof r&&r&&r.__esModule)return r;var t=Object.create(null);if(i.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:r}),2&e&&"string"!=typeof r)for(var n in r)i.d(t,n,function(e){return r[e]}.bind(null,n));return t},i.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(r,"a",r),r},i.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},i.p="",i(i.s=2)}([,,function(e,r,t){e.exports=t(3)},function(e,r){function a(e){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function i(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}function n(e,r){for(var t=0;t<r.length;t++){var n=r[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function t(e,r,t){return r&&n(e.prototype,r),t&&n(e,t),e}function f(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}var s=function(){function n(){i(this,n)}return t(n,null,[{key:"onmessage",value:function(e){var r=e.data;try{if("e"!==r.type)throw new Error("Unknown message type: "+r.type);n.untarBuffer(r.buffer)}catch(e){n.postError(e)}}},{key:"postError",value:function(e){n.postMessage({type:"err",message:e.message})}},{key:"postMessage",value:function(e,r){self.postMessage(e,r)}},{key:"untarBuffer",value:function(e){try{for(var r=new c(e);r.hasNext();){var t=r._readNextFile();t.isLongLink||n.postMessage({type:"e",data:t},[t.buffer])}n.postMessage({type:"c"}),r.destroy()}catch(e){n.postError(e)}}}]),n}();function u(e){if(void 0!==("undefined"==typeof TextDecoder?"undefined":a(TextDecoder))&&(s.utf8Decoder=new TextDecoder("utf-8")),s.utf8Decoder)return s.utf8Decoder.decode(e);for(var r="",t=0,n=e.length,i=String.fromCharCode;t<n;){var o=e[t++];if(127<o){if(191<o&&o<224&&t<n)o=(31&o)<<6|63&e[t];else if(o<240&&t+1<n)o=(15&o)<<12|(63&e[t])<<6|63&e[++t];else{if(!(o<248&&t+2<n))throw"UTF-8 decoding failed.";o=(7&o)<<18|(63&e[t])<<12|(63&e[++t])<<6|63&e[++t]}++t}if(o<=65535)r+=i(o);else{if(!(o<=1114111))throw"UTF-8 decodeing failed.";r+=i((o-=65536)>>10|55296),r+=i(1023&o|56320)}}return r}f(s,"utf8Decoder",void 0);var d=function e(r){var t=this;i(this,e),f(this,"applyHeader",function(n){t._fields.forEach(function(e){var r=e.name,t=e.value;"path"===r?(r="name",void 0!==n.prefix&&delete n.prefix):"linkpath"===r&&(r="linkname"),null===t?delete n[r]:n[r]=t})}),this._fields=r};f(d,"parse",function(e){for(var r=new Uint8Array(e),t=[];0<r.length;){var n=parseInt(u(r.subarray(0,r.indexOf(32)))),i=u(r.subarray(0,n)).match(/^\\d+ ([^=]+)=(.*)\\n$/);if(null===i)throw new Error("Invalid PAX header data format.");var o=i[1],a=i[2];0===a.length?a=null:null!==a.match(/^\\d+$/)&&(a=parseInt(a));var f={name:o,value:a};t.push(f),r=r.subarray(n)}return new d(t)});var o=function(){function r(e){var o=this;i(this,r),f(this,"readString",function(e){for(var r=1*e,t=[],n=0;n<e;++n){var i=o._bufferView.getUint8(o.position()+1*n,!0);if(0===i)break;t.push(i)}return o.seek(r),String.fromCharCode.apply(null,t)}),f(this,"readBuffer",function(e){var r;if("function"==typeof ArrayBuffer.prototype.slice)r=o._bufferView.buffer.slice(o.position(),o.position()+e);else{r=new ArrayBuffer(e);var t=new Uint8Array(r),n=new Uint8Array(o._bufferView.buffer,o.position(),e);t.set(n)}return o.seek(e),r}),f(this,"seek",function(e){o._position+=e}),f(this,"peekUint32",function(){return o._bufferView.getUint32(o.position(),!0)}),f(this,"position",function(e){if(void 0===e)return o._position;o._position=e}),f(this,"size",function(){return o._bufferView.byteLength}),this._bufferView=new DataView(e),this._position=0}return t(r,[{key:"destroy",value:function(){this._bufferView=void 0}}]),r}(),l=null,c=function(){function r(e){var a=this;i(this,r),f(this,"hasNext",function(){return a._stream.position()+4<a._stream.size()&&0!==a._stream.peekUint32()}),f(this,"_readNextFile",function(){var e=a._stream,r={},t=!1,n=void 0,i=e.position()+512;switch(r.name=e.readString(100),r.mode=e.readString(8),r.uid=parseInt(e.readString(8)),r.gid=parseInt(e.readString(8)),r.size=parseInt(e.readString(12),8),r.mtime=parseInt(e.readString(12),8),r.checksum=parseInt(e.readString(8)),r.type=e.readString(1),r.linkname=e.readString(100),r.ustarFormat=e.readString(6),r.isLongLink=!1,-1<r.ustarFormat.indexOf("ustar")&&(r.version=e.readString(2),r.uname=e.readString(32),r.gname=e.readString(32),r.devmajor=parseInt(e.readString(8)),r.devminor=parseInt(e.readString(8)),r.namePrefix=e.readString(155),0<r.namePrefix.length&&(r.name=r.namePrefix+"/"+r.name)),e.position(i),r.type){case"L":l=e.readString(r.size),r.isLongLink=!0;break;case"0":case"":r.buffer=e.readBuffer(r.size);break;case"1":case"2":case"3":case"4":case"5":case"6":case"7":break;case"g":t=!0,a._globalPaxHeader=d.parse(e.readBuffer(r.size));break;case"x":t=!0,n=d.parse(e.readBuffer(r.size))}void 0===r.buffer&&(r.buffer=new ArrayBuffer(0));var o=i+r.size;return r.size%512!=0&&(o+=512-r.size%512),e.position(o),t&&(r=a._readNextFile()),void 0!==a._globalPaxHeader&&a._globalPaxHeader.applyHeader(r),void 0!==n&&n.applyHeader(r),null===l||r.isLongLink||(r.name=l,l=null),r}),this._buffer=e,this._stream=new o(e),this._globalPaxHeader=void 0}return t(r,[{key:"destroy",value:function(){this._stream.destroy(),this._stream=void 0,this._globalPaxHeader=void 0}}]),r}();"undefined"!=typeof self&&(self.onmessage=s.onmessage)}])});'])),this._workerPool=[],this.initializeWorkerPool(),this._workerTrimInterval=setInterval(this.trimWorkerPool,o._workerTrimInterval)}return e=o,t=[{key:"instance",value:function(){if(void 0===o._instance){if(!window.Worker)throw new Error("No Worker implementation found.");o._instance=new o}return o._instance}}],(r=null)&&i(e.prototype,r),t&&i(e,t),o}();u(c,"_instance",void 0),u(c,"_desiredWorkerPoolLength",0),u(c,"_workerTrimInterval",2e3),u(c,"CHUNK_SIZE",1024);var a=function e(r){var f=this;n(this,e),u(this,"readAsString",function(){if(void 0!==("undefined"==typeof TextDecoder?"undefined":s(TextDecoder)))return new TextDecoder("utf-8").decode(f.buffer);for(var e=f.buffer,r=e.byteLength,t=new DataView(e),o=new Array(r),n=0;n<r;++n)o[n]=t.getUint8(n,!0);for(var i="";0<o.length;){var u=o.splice(0,c.CHUNK_SIZE),a=String.fromCharCode.apply(null,u);i=i.concat(a)}return i}),u(this,"readAsJson",function(){return JSON.parse(f.readAsString())}),u(this,"blob",function(){return new Blob([f.buffer])}),this.buffer=r.buffer,this.name=r.name,this.checksum=r.checksum,this.gid=r.gid,this.linkname=r.linkname,this.mode=r.mode,this.mtime=r.mtime,this.size=r.size,this.type=r.type,this.uid=r.uid,this.ustarFormat=r.ustarFormat};r.default=c}])});