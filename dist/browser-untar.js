!function(e,r){"object"==typeof exports&&"object"==typeof module?module.exports=r():"function"==typeof define&&define.amd?define("browser-untar",[],r):"object"==typeof exports?exports["browser-untar"]=r():e["browser-untar"]=r()}(this,function(){return function(t){var n={};function o(e){if(n[e])return n[e].exports;var r=n[e]={i:e,l:!1,exports:{}};return t[e].call(r.exports,r,r.exports,o),r.l=!0,r.exports}return o.m=t,o.c=n,o.d=function(e,r,t){o.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:t})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(r,e){if(1&e&&(r=o(r)),8&e)return r;if(4&e&&"object"==typeof r&&r&&r.__esModule)return r;var t=Object.create(null);if(o.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:r}),2&e&&"string"!=typeof r)for(var n in r)o.d(t,n,function(e){return r[e]}.bind(null,n));return t},o.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(r,"a",r),r},o.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},o.p="",o(o.s=0)}([function(e,r,t){e.exports=t(1)},function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var o=function(){function n(e,r){for(var t=0;t<r.length;t++){var n=r[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,r,t){return r&&n(e.prototype,r),t&&n(e,t),e}}();function i(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}var f=function(){function n(){var t=this;i(this,n),this.trimWorkerPool=function(){for(;t._workerPool.length>n._desiredWorkerPoolLength;){var e=t._workerPool.pop();void 0!==e&&e.terminate()}},this.initializeWorkerPool=function(){for(var e=0;e<n._desiredWorkerPoolLength;++e){var r=new Worker(t._workerCode);t._workerPool.push(r)}},this.requestWorker=function(){var e=void 0;return void 0===(e=t._workerPool.shift())&&(e=new Worker(t._workerCode)),e},this.returnWorker=function(e){t._workerPool.push(e)},this.untar=function(e){if(!(e instanceof ArrayBuffer))throw new TypeError("arrayBuffer is not an instance of ArrayBuffer.");var i=t.requestWorker();return new Promise(function(t,n){var o=[];i.onerror=function(e){n(e)},i.onmessage=function(e){var r=e.data;switch(r.type){case"l":console[r.level]("Worker: "+r.message);break;case"e":o.push(new a(r.data));break;case"c":t(o);break;default:console.error("Unknown worker message!"),i.terminate(),void 0!==r.message?n(new Error(r.message)):n(new Error("Unknown worker message: "+r.type))}},i.postMessage({type:"e",buffer:e},[e])}).finally(function(){i.onerror=void 0,i.onmessage=void 0,t.returnWorker(i)})},this._workerCode=window.URL.createObjectURL(new Blob(['!function(e,r){"object"==typeof exports&&"object"==typeof module?module.exports=r():"function"==typeof define&&define.amd?define("browser-untar",[],r):"object"==typeof exports?exports["browser-untar"]=r():e["browser-untar"]=r()}(this,function(){return function(t){var n={};function i(e){if(n[e])return n[e].exports;var r=n[e]={i:e,l:!1,exports:{}};return t[e].call(r.exports,r,r.exports,i),r.l=!0,r.exports}return i.m=t,i.c=n,i.d=function(e,r,t){i.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:t})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(r,e){if(1&e&&(r=i(r)),8&e)return r;if(4&e&&"object"==typeof r&&r&&r.__esModule)return r;var t=Object.create(null);if(i.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:r}),2&e&&"string"!=typeof r)for(var n in r)i.d(t,n,function(e){return r[e]}.bind(null,n));return t},i.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(r,"a",r),r},i.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},i.p="",i(i.s=2)}([,,function(e,r,t){e.exports=t(3)},function(e,r,t){"use strict";var i=function(){function n(e,r){for(var t=0;t<r.length;t++){var n=r[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,r,t){return r&&n(e.prototype,r),t&&n(e,t),e}}();function s(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}var n=function(){function n(){s(this,n)}return i(n,null,[{key:"onmessage",value:function(e){var r=e.data;try{if("e"!==r.type)throw new Error("Unknown message type: "+r.type);n.untarBuffer(r.buffer)}catch(e){n.postError(e)}}},{key:"postError",value:function(e){n.postMessage({type:"err",message:e.message})}},{key:"postMessage",value:function(e,r){self.postMessage(e,r)}},{key:"untarBuffer",value:function(e){try{for(var r=new o(e);r.hasNext();){var t=r.next();n.postMessage({type:"e",data:t},[t.buffer])}n.postMessage({type:"c"})}catch(e){n.postError(e)}}}]),n}();function f(e){for(var r="",t=0;t<e.length;){var n=e[t++];if(127<n){if(191<n&&n<224){if(t>=e.length)throw"UTF-8 decode: incomplete 2-byte sequence";n=(31&n)<<6|63&e[t]}else if(223<n&&n<240){if(t+1>=e.length)throw"UTF-8 decode: incomplete 3-byte sequence";n=(15&n)<<12|(63&e[t])<<6|63&e[++t]}else{if(!(239<n&&n<248))throw"UTF-8 decode: unknown multibyte start 0x"+n.toString(16)+" at index "+(t-1);if(t+2>=e.length)throw"UTF-8 decode: incomplete 4-byte sequence";n=(7&n)<<18|(63&e[t])<<12|(63&e[++t])<<6|63&e[++t]}if(++t,n<=65535)r+=String.fromCharCode(n);else{if(!(n<=1114111))throw"UTF-8 decode: code point 0x"+n.toString(16)+" exceeds UTF-16 reach";n-=65536,r+=String.fromCharCode(n>>10|55296),r+=String.fromCharCode(1023&n|56320)}}return r}}var u=function e(r){s(this,e),a.call(this),this._fields=r};u.parse=function(e){for(var r=new Uint8Array(e),t=[];0<r.length;){var n=parseInt(f(r.subarray(0,r.indexOf(32)))),i=f(r.subarray(0,n)).match(/^\\d+ ([^=]+)=(.*)\\n$/);if(null===i)throw new Error("Invalid PAX header data format.");var a=i[1],o=i[2];0===o.length?o=null:null!==o.match(/^\\d+$/)&&(o=parseInt(o));var s={name:a,value:o};t.push(s),r=r.subarray(n)}return new u(t)};var a=function(){var e=this;this.applyHeader=function(n){e._fields.forEach(function(e){var r=e.name,t=e.value;"path"===r?(r="name",void 0!==n.prefix&&delete n.prefix):"linkpath"===r&&(r="linkname"),null===t?delete n[r]:n[r]=t})}},l=function e(r){var a=this;s(this,e),this.readString=function(e){for(var r=1*e,t=[],n=0;n<e;++n){var i=a._bufferView.getUint8(a.position()+1*n,!0);if(0===i)break;t.push(i)}return a.seek(r),String.fromCharCode.apply(null,t)},this.readBuffer=function(e){var r=void 0;if("function"==typeof ArrayBuffer.prototype.slice)r=a._bufferView.buffer.slice(a.position(),a.position()+e);else{r=new ArrayBuffer(e);var t=new Uint8Array(r),n=new Uint8Array(a._bufferView.buffer,a.position(),e);t.set(n)}return a.seek(e),r},this.seek=function(e){a._position+=e},this.peekUint32=function(){return a._bufferView.getUint32(a.position(),!0)},this.position=function(e){if(void 0===e)return a._position;a._position=e},this.size=function(){return a._bufferView.byteLength},this._bufferView=new DataView(r),this._position=0},o=function e(r){var o=this;s(this,e),this.hasNext=function(){return o._stream.position()+4<o._stream.size()&&0!==o._stream.peekUint32()},this.next=function(){return o._readNextFile()},this._readNextFile=function(){var e=o._stream,r={},t=!1,n=null,i=e.position()+512;switch(r.name=e.readString(100),r.mode=e.readString(8),r.uid=parseInt(e.readString(8)),r.gid=parseInt(e.readString(8)),r.size=parseInt(e.readString(12),8),r.mtime=parseInt(e.readString(12),8),r.checksum=parseInt(e.readString(8)),r.type=e.readString(1),r.linkname=e.readString(100),r.ustarFormat=e.readString(6),-1<r.ustarFormat.indexOf("ustar")&&(r.version=e.readString(2),r.uname=e.readString(32),r.gname=e.readString(32),r.devmajor=parseInt(e.readString(8)),r.devminor=parseInt(e.readString(8)),r.namePrefix=e.readString(155),0<r.namePrefix.length&&(r.name=r.namePrefix+"/"+r.name)),e.position(i),r.type){case"0":case"":r.buffer=e.readBuffer(r.size);break;case"1":case"2":case"3":case"4":case"5":case"6":case"7":break;case"g":t=!0,o._globalPaxHeader=u.parse(e.readBuffer(r.size));break;case"x":t=!0,n=u.parse(e.readBuffer(r.size))}void 0===r.buffer&&(r.buffer=new ArrayBuffer(0));var a=i+r.size;return r.size%512!=0&&(a+=512-r.size%512),e.position(a),t&&(r=o._readNextFile()),null!==o._globalPaxHeader&&o._globalPaxHeader.applyHeader(r),null!==n&&n.applyHeader(r),r},this._stream=new l(r),this._globalPaxHeader=null};"undefined"!=typeof self&&(self.onmessage=n.onmessage)}])});'])),this._workerPool=[],this.initializeWorkerPool(),this._workerTrimInterval=setInterval(this.trimWorkerPool,n._workerTrimInterval)}return o(n,null,[{key:"instance",value:function(){if(void 0===n._instance){if(!window.Worker)throw new Error("No Worker implementation found.");n._instance=new n}return n._instance}}]),n}();f._instance=void 0,f._desiredWorkerPoolLength=5,f._workerTrimInterval=1e3,f.CHUNK_SIZE=255;var a=function e(r){var s=this;i(this,e),this.readAsString=function(){for(var e=s.buffer,r=e.byteLength,t=new DataView(e),n=new Array(r),o=0;o<r;++o)n[o]=t.getUint8(o,!0);for(var i="";0<n.length;){var a=n.splice(0,f.CHUNK_SIZE),u=String.fromCharCode.apply(null,a);i=i.concat(u)}return i},this.readAsJson=function(){return JSON.parse(s.readAsString())},this.blob=function(){return new Blob([s.buffer])},this.buffer=r.buffer,this.name=r.name,this.checksum=r.checksum,this.gid=r.gid,this.linkname=r.linkname,this.mode=r.mode,this.mtime=r.mtime,this.size=r.size,this.type=r.type,this.uid=r.uid,this.ustarFormat=r.ustarFormat};r.default=f}])});