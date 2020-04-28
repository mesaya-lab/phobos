!function(t){var n={};function e(i){if(n[i])return n[i].exports;var r=n[i]={i:i,l:!1,exports:{}};return t[i].call(r.exports,r,r.exports,e),r.l=!0,r.exports}e.m=t,e.c=n,e.d=function(t,n,i){e.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:i})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,n){if(1&n&&(t=e(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(e.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var r in t)e.d(i,r,function(n){return t[n]}.bind(null,r));return i},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},e.p="",e(e.s=3)}([function(t,n,e){"use strict";var i=e(4),r={VERSION:e(1).version,HEADER_CHUNK_TYPE:[77,84,104,100],HEADER_CHUNK_LENGTH:[0,0,0,6],HEADER_CHUNK_FORMAT0:[0,0],HEADER_CHUNK_FORMAT1:[0,1],HEADER_CHUNK_DIVISION:[0,128],TRACK_CHUNK_TYPE:[77,84,114,107],META_EVENT_ID:255,META_TEXT_ID:1,META_COPYRIGHT_ID:2,META_TRACK_NAME_ID:3,META_INSTRUMENT_NAME_ID:4,META_LYRIC_ID:5,META_MARKER_ID:6,META_CUE_POINT:7,META_TEMPO_ID:81,META_SMTPE_OFFSET:84,META_TIME_SIGNATURE_ID:88,META_KEY_SIGNATURE_ID:89,META_END_OF_TRACK_ID:[47,0],CONTROLLER_CHANGE_STATUS:176,PROGRAM_CHANGE_STATUS:192,PITCH_BEND_STATUS:224};function a(t){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}function s(t,n){for(var e=0;e<n.length;e++){var i=n[e];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function c(t,n,e){return n&&s(t.prototype,n),e&&s(t,e),t}var m=function(){function t(){o(this,t)}return c(t,null,[{key:"version",value:function(){return r.VERSION}},{key:"stringToBytes",value:function(t){return t.split("").map((function(t){return t.charCodeAt()}))}},{key:"isNumeric",value:function(t){return!isNaN(parseFloat(t))&&isFinite(t)}},{key:"getPitch",value:function(t){return i.toMidi(t)}},{key:"numberToVariableLength",value:function(t){for(var n=127&t;t>>=7;)n<<=8,n|=127&t|128;for(var e=[];e.push(255&n),128&n;)n>>=8;return e}},{key:"stringByteCount",value:function(t){return encodeURI(t).split(/%..|./).length-1}},{key:"numberFromBytes",value:function(t){var n,e="";return t.forEach((function(t){1==(n=t.toString(16)).length&&(n="0"+n),e+=n})),parseInt(e,16)}},{key:"numberToBytes",value:function(t,n){n=n||1;var e=t.toString(16);1&e.length&&(e="0"+e);var i=e.match(/.{2}/g);if((i=i.map((function(t){return parseInt(t,16)}))).length<n)for(;n-i.length>0;)i.unshift(0);return i}},{key:"toArray",value:function(t){return Array.isArray(t)?t:[t]}},{key:"convertVelocity",value:function(t){return t=t>100?100:t,Math.round(t/100*127)}},{key:"getTickDuration",value:function(n){if(Array.isArray(n))return n.map((function(n){return t.getTickDuration(n)})).reduce((function(t,n){return t+n}),0);if("t"===(n=n.toString()).toLowerCase().charAt(0))return parseInt(n.substring(1));var e=t.numberFromBytes(r.HEADER_CHUNK_DIVISION);return Math.round(e*t.getDurationMultiplier(n))}},{key:"getDurationMultiplier",value:function(t){switch(t){case"0":return 0;case"1":return 4;case"2":return 2;case"d2":return 3;case"dd2":return 3.5;case"4":return 1;case"4t":return.666;case"d4":return 1.5;case"dd4":return 1.75;case"8":return.5;case"8t":return.33;case"d8":return.75;case"dd8":return.875;case"16":return.25;case"16t":return.166;case"32":return.125;case"64":return.0625}throw t+" is not a valid duration."}}]),t}(),u=function(){function t(n){o(this,t),n=Object.assign({channel:1,startTick:null,velocity:50,wait:0},n),this.type="note-on",this.channel=n.channel,this.pitch=n.pitch,this.wait=n.wait,this.velocity=n.velocity,this.startTick=n.startTick,this.midiNumber=m.getPitch(this.pitch),this.tick=null,this.delta=null,this.data=n.data}return c(t,[{key:"buildData",value:function(t){return this.data=[],this.startTick?(this.tick=this.startTick,0==t.tickPointer&&(this.delta=this.tick)):(this.delta=m.getTickDuration(this.wait),this.tick=t.tickPointer+this.delta),this.data=m.numberToVariableLength(this.delta).concat(this.getStatusByte(),this.midiNumber,m.convertVelocity(this.velocity)),this}},{key:"getStatusByte",value:function(){return 144+this.channel-1}}]),t}(),l=function(){function t(n){o(this,t),n=Object.assign({channel:1,noteOnTick:null,velocity:50},n),this.type="note-off",this.channel=n.channel,this.pitch=n.pitch,this.duration=n.duration,this.velocity=n.velocity,this.noteOnTick=n.noteOnTick,this.midiNumber=m.getPitch(this.pitch),this.tick=null,this.delta=m.getTickDuration(this.duration),this.data=n.data}return c(t,[{key:"buildData",value:function(t){return this.noteOnTick?this.tick=this.noteOnTick+m.getTickDuration(this.duration):this.tick=this.delta+t.tickPointer,this.data=m.numberToVariableLength(this.delta).concat(this.getStatusByte(),this.midiNumber,m.convertVelocity(this.velocity)),this}},{key:"getStatusByte",value:function(){return 128+this.channel-1}}]),t}(),h=function(){function t(n){o(this,t),n=Object.assign({channel:1,repeat:1,sequential:!1,startTick:null,velocity:50,wait:0},n),this.data=[],this.type="note",this.pitch=m.toArray(n.pitch),this.channel=n.channel,this.duration=n.duration,this.grace=n.grace,this.repeat=n.repeat,this.sequential=n.sequential,this.startTick=n.startTick,this.velocity=n.velocity,this.wait=n.wait,this.tickDuration=m.getTickDuration(this.duration),this.restDuration=m.getTickDuration(this.wait),this.events=[]}return c(t,[{key:"buildData",value:function(){var n=this;this.data=[];var e=this.tickDuration;this.restDuration;if(this.grace){this.grace=m.toArray(this.grace),this.grace.forEach((function(i){var r=new t({pitch:n.grace,duration:"T1"});n.data=n.data.concat(r.data),e-=1}))}if(this.sequential)for(i=0;i<this.repeat;i++)this.pitch.forEach((function(t,i){if(i>0&&0,"8t"===n.duration&&i==n.pitch.length-1){var a=m.numberFromBytes(r.HEADER_CHUNK_DIVISION);e=a-2*e}var o=new u({channel:n.channel,wait:i>0?0:n.wait,velocity:n.velocity,pitch:t,startTick:n.startTick}),s=new l({channel:n.channel,duration:n.duration,velocity:n.velocity,pitch:t,noteOnTick:n.startTick});n.events.push(o,s)}));else for(var i=0;i<this.repeat;i++)this.pitch.forEach((function(t,e){if(0==e)var i=new u({channel:n.channel,wait:n.wait,velocity:n.velocity,pitch:t,startTick:n.startTick});else i=new u({channel:n.channel,wait:0,velocity:n.velocity,pitch:t,startTick:n.startTick});n.events.push(i)})),this.pitch.forEach((function(t,e){if(0==e)var i=new l({channel:n.channel,duration:n.duration,velocity:n.velocity,pitch:t,noteOnTick:n.startTick});else i=new l({channel:n.channel,duration:0,velocity:n.velocity,pitch:t,noteOnTick:n.startTick});n.events.push(i)}));return this}}]),t}(),d=function t(n){o(this,t),this.type="pitch-bend";var e,i=(e=n.bend)<=0?Math.floor(16384*(e+1)/2):Math.floor(16383*(e+1)/2),a=n.channel||0,s=127&i,c=i>>7&127;this.data=m.numberToVariableLength(0).concat(r.PITCH_BEND_STATUS|a,s,c)},M=function t(n){o(this,t),this.type="controller",this.data=m.numberToVariableLength(0).concat(r.CONTROLLER_CHANGE_STATUS,n.controllerNumber,n.controllerValue)},P=function t(n){o(this,t),this.type="copyright";var e=m.stringToBytes(n);this.data=m.numberToVariableLength(0).concat(r.META_EVENT_ID,r.META_COPYRIGHT_ID,m.numberToVariableLength(e.length),e)},f=function t(n){o(this,t),this.type="marker";var e=m.stringToBytes(n);this.data=m.numberToVariableLength(0).concat(r.META_EVENT_ID,r.META_CUE_POINT,m.numberToVariableLength(e.length),e)},p=function t(){o(this,t),this.type="end-track",this.data=m.numberToVariableLength(0).concat(r.META_EVENT_ID,r.META_END_OF_TRACK_ID)},y=function t(n){o(this,t),this.type="instrument-name";var e=m.stringToBytes(n);this.data=m.numberToVariableLength(0).concat(r.META_EVENT_ID,r.META_INSTRUMENT_NAME_ID,m.numberToVariableLength(e.length),e)},b=function t(n,e){o(this,t),this.type="key-signature";var i=e||0;if(n=n||0,void 0===e){var a=n.length,s=n||"C";if(n[0]===n[0].toLowerCase()&&(i=1),a>1)switch(n.charAt(a-1)){case"m":case"-":i=1,s=(s=n.charAt(0).toLowerCase()).concat(n.substring(1,a-1));break;case"M":case"+":i=0,s=(s=n.charAt(0).toUpperCase()).concat(n.substring(1,a-1))}var c=[["Cb","Gb","Db","Ab","Eb","Bb","F","C","G","D","A","E","B","F#","C#"],["ab","eb","bb","f","c","g","d","a","e","b","f#","c#","g#","d#","a#"]][i].indexOf(s);n=-1===c?0:c-7}this.data=m.numberToVariableLength(0).concat(r.META_EVENT_ID,r.META_KEY_SIGNATURE_ID,[2],m.numberToBytes(n,1),m.numberToBytes(i,1))},v=function t(n){o(this,t),this.type="marker";var e=m.stringToBytes(n);this.data=m.numberToVariableLength(0).concat(r.META_EVENT_ID,r.META_LYRIC_ID,m.numberToVariableLength(e.length),e)},g=function t(n){o(this,t),this.type="marker";var e=m.stringToBytes(n);this.data=m.numberToVariableLength(0).concat(r.META_EVENT_ID,r.META_MARKER_ID,m.numberToVariableLength(e.length),e)},T=function t(n){o(this,t),this.type="tempo";var e=Math.round(6e7/n);this.data=m.numberToVariableLength(0).concat(r.META_EVENT_ID,r.META_TEMPO_ID,[3],m.numberToBytes(e,3))},A=function t(n){o(this,t),this.type="text";var e=m.stringToBytes(n);this.data=m.numberToVariableLength(0).concat(r.META_EVENT_ID,r.META_TEXT_ID,m.numberToVariableLength(e.length),e)},E=function t(n,e,i,a){o(this,t),this.type="time-signature",this.data=m.numberToVariableLength(0).concat(r.META_EVENT_ID,r.META_TIME_SIGNATURE_ID,[4],m.numberToBytes(n,1),m.numberToBytes(Math.log2(e),1),m.numberToBytes(i||24,1),m.numberToBytes(a||8,1))},k=function t(n){o(this,t),this.type="track-name";var e=m.stringToBytes(n);this.data=m.numberToVariableLength(0).concat(r.META_EVENT_ID,r.META_TRACK_NAME_ID,m.numberToVariableLength(e.length),e)},I=function(){function t(){o(this,t),this.type=r.TRACK_CHUNK_TYPE,this.data=[],this.size=[],this.events=[],this.explicitTickEvents=[],this.tickPointer=0}return c(t,[{key:"addEvent",value:function(t,n){var e=this;return m.toArray(t).forEach((function(t,i){if("note"===t.type){if("function"==typeof n){var r=n(i,t);if("object"===a(r))for(var o in r)switch(o){case"channel":t.channel=r[o];break;case"duration":t.duration=r[o];break;case"sequential":t.sequential=r[o];break;case"velocity":t.velocity=m.convertVelocity(r[o])}}null!==t.startTick?e.explicitTickEvents.push(t):t.buildData().events.forEach((function(t){return e.events.push(t)}))}else e.events.push(t)})),this}},{key:"buildData",value:function(){var t=this;return this.removeEventsByType("end-track").addEvent(new p),this.data=[],this.size=[],this.tickPointer=0,this.events.forEach((function(n,e){"note-on"===n.type||"note-off"===n.type?(t.data=t.data.concat(n.buildData(t).data),t.tickPointer=n.tick):t.data=t.data.concat(n.data)})),this.mergeExplicitTickEvents(),this.size=m.numberToBytes(this.data.length,4),this}},{key:"mergeExplicitTickEvents",value:function(){var t=this;this.explicitTickEvents.length&&(this.explicitTickEvents.sort((function(t,n){return t.startTick-n.startTick})),this.explicitTickEvents.forEach((function(n){n.buildData().events.forEach((function(n){return n.buildData(t)})),n.events.forEach((function(n){return t.mergeSingleEvent(n)}))})),this.explicitTickEvents=[],this.buildData())}},{key:"mergeTrack",value:function(t){var n=this;this.buildData(),t.buildData().events.forEach((function(t){return n.mergeSingleEvent(t)}))}},{key:"mergeSingleEvent",value:function(t){for(var n=0,e=0;e<this.events.length&&!(this.events[e].tick>t.tick);e++)n=e;var i=n+1;t.delta=t.tick-this.events[n].tick,this.events.splice(i,0,t);for(e=i+1;e<this.events.length;e++)this.events[e].delta=this.events[e].tick-this.events[e-1].tick}},{key:"removeEventsByType",value:function(t){var n=this;return this.events.forEach((function(e,i){e.type===t&&n.events.splice(i,1)})),this}},{key:"setTempo",value:function(t){return this.addEvent(new T(t))}},{key:"setTimeSignature",value:function(t,n,e,i){return this.addEvent(new E(t,n,e,i))}},{key:"setKeySignature",value:function(t,n){return this.addEvent(new b(t,n))}},{key:"addText",value:function(t){return this.addEvent(new A(t))}},{key:"addCopyright",value:function(t){return this.addEvent(new P(t))}},{key:"addTrackName",value:function(t){return this.addEvent(new k(t))}},{key:"addInstrumentName",value:function(t){return this.addEvent(new y(t))}},{key:"addMarker",value:function(t){return this.addEvent(new g(t))}},{key:"addCuePoint",value:function(t){return this.addEvent(new f(t))}},{key:"addLyric",value:function(t){return this.addEvent(new v(t))}},{key:"polyModeOn",value:function(){var t=new u({data:[0,176,126,0]});return this.addEvent(t)}},{key:"setPitchBend",value:function(t){return this.addEvent(new d({bend:t}))}},{key:"controllerChange",value:function(t,n){return this.addEvent(new M({controllerNumber:t,controllerValue:n}))}}]),t}(),_=function(){function t(){o(this,t)}return c(t,[{key:"trackFromVoice",value:function(t){var n,e=this,i=new I,r=[];return t.tickables.forEach((function(t){if(r=[],"n"===t.noteType)t.keys.forEach((function(t){r.push(e.convertPitch(t))}));else if("r"===t.noteType)return void(n=e.convertDuration(t));i.addEvent(new h({pitch:r,duration:e.convertDuration(t),wait:n})),n=0})),i}},{key:"convertPitch",value:function(t){return t.replace("/","")}},{key:"convertDuration",value:function(t){switch(t.duration){case"w":return"1";case"h":return t.isDotted()?"d2":"2";case"q":return t.isDotted()?"d4":"4";case"8":return t.isDotted()?"d8":"8"}return t.duration}}]),t}(),D=function t(n){o(this,t),this.type=r.HEADER_CHUNK_TYPE;var e=n>1?r.HEADER_CHUNK_FORMAT1:r.HEADER_CHUNK_FORMAT0;this.data=e.concat(m.numberToBytes(n,2),r.HEADER_CHUNK_DIVISION),this.size=[0,0,0,this.data.length]},N=function(){function t(n){var e=this;o(this,t),n=m.toArray(n),this.data=[],this.data.push(new D(n.length)),n.forEach((function(t,n){e.data.push(t.buildData())}))}return c(t,[{key:"buildFile",value:function(){var t=[];return this.data.forEach((function(n){return t=t.concat(n.type,n.size,n.data)})),new Uint8Array(t)}},{key:"base64",value:function(){return"function"==typeof btoa?btoa(String.fromCharCode.apply(null,this.buildFile())):Buffer.from(this.buildFile()).toString("base64")}},{key:"dataUri",value:function(){return"data:audio/midi;base64,"+this.base64()}},{key:"stdout",value:function(){return process.stdout.write(new Buffer(this.buildFile()))}},{key:"saveMIDI",value:function(t){var n=e(2),i=new Buffer.from(this.buildFile());n.writeFile(t+".mid",i,(function(t){if(t)throw t}))}}]),t}(),w={Constants:r,NoteEvent:h,PitchBendEvent:d,ProgramChangeEvent:function t(n){o(this,t),this.type="program",this.data=m.numberToVariableLength(0).concat(r.PROGRAM_CHANGE_STATUS,n.instrument)},Track:I,Utils:m,VexFlow:_,Writer:N};t.exports=w},function(t){t.exports=JSON.parse('{"name":"midi-writer-js","version":"1.7.2","description":"A library providing an API for generating MIDI files.","main":"build/index.js","dependencies":{"tonal-midi":"^0.69.7"},"devDependencies":{"@babel/core":"^7.2.2","@babel/plugin-transform-destructuring":"^7.2.0","@babel/preset-env":"^7.2.3","eslint":"^5.16.0","eslint-config-standard":"^12.0.0","eslint-plugin-import":"^2.17.3","eslint-plugin-node":"^9.1.0","eslint-plugin-promise":"^4.1.1","eslint-plugin-standard":"^4.0.0","jsdoc":"^3.5.5","minami":"^1.1.1","mocha":"^6.2.0","nyc":"^14.1.1","rollup":"^1.0.1","rollup-plugin-babel":"^4.2.0","uglify-js":"^2.7.3","watch":"^1.0.2"},"directories":{"lib":"src","example":"examples","test":"test"},"scripts":{"build":"mkdir -p build && rollup -c && npm run docs","docs":"./node_modules/.bin/jsdoc -r src README.md -d ./docs -t ./node_modules/minami","lint:js":"eslint \'src/**/**.js\'","prepublishOnly":"npm test","pretest":"npm run build","test":"nyc --reporter=text mocha --no-config --no-package","watch":"watch \'npm run build\' src"},"repository":{"type":"git","url":"git+https://github.com/grimmdude/MidiWriterJS.git"},"keywords":["midi","generator","music"],"author":"Garrett Grimm","license":"MIT","bugs":{"url":"https://github.com/grimmdude/MidiWriterJS/issues"},"homepage":"https://github.com/grimmdude/MidiWriterJS#readme"}')},function(t,n){t.exports=require("fs")},function(t,n,e){"use strict";e.r(n);var i={};e.r(i),e.d(i,"accToAlt",(function(){return p})),e.d(i,"altToAcc",(function(){return f})),e.d(i,"coordToInterval",(function(){return N})),e.d(i,"coordToNote",(function(){return g})),e.d(i,"decode",(function(){return h})),e.d(i,"deprecate",(function(){return a})),e.d(i,"distance",(function(){return j})),e.d(i,"encode",(function(){return u})),e.d(i,"fillStr",(function(){return r})),e.d(i,"interval",(function(){return _})),e.d(i,"isNamed",(function(){return o})),e.d(i,"isPitch",(function(){return s})),e.d(i,"note",(function(){return y})),e.d(i,"stepToLetter",(function(){return P})),e.d(i,"tokenizeInterval",(function(){return k})),e.d(i,"tokenizeNote",(function(){return v})),e.d(i,"transpose",(function(){return w}));const r=(t,n)=>Array(Math.abs(n)+1).join(t);function a(t,n,e){return function(...i){return console.warn(`${t} is deprecated. Use ${n}.`),e.apply(this,i)}}function o(t){return null!==t&&"object"==typeof t&&"string"==typeof t.name}function s(t){return null!==t&&"object"==typeof t&&"number"==typeof t.step&&"number"==typeof t.alt}const c=[0,2,4,-1,1,3,5],m=c.map(t=>Math.floor(7*t/12));function u(t){const{step:n,alt:e,oct:i,dir:r=1}=t,a=c[n]+7*e;return void 0===i?[r*a]:[r*a,r*(i-m[n]-4*e)]}const l=[3,0,4,1,5,2,6];function h(t){const[n,e,i]=t,r=l[function(t){const n=(t+1)%7;return n<0?7+n:n}(n)],a=Math.floor((n+1)/7);return void 0===e?{step:r,alt:a,dir:i}:{step:r,alt:a,oct:e+4*a+m[r],dir:i}}const d={empty:!0,name:"",pc:"",acc:""},M=new Map,P=t=>"CDEFGAB".charAt(t),f=t=>t<0?r("b",-t):r("#",t),p=t=>"b"===t[0]?-t.length:t.length;function y(t){const n=M.get(t);if(n)return n;const e="string"==typeof t?function(t){const n=v(t);if(""===n[0]||""!==n[3])return d;const e=n[0],i=n[1],r=n[2],a=(e.charCodeAt(0)+3)%7,o=p(i),s=r.length?+r:void 0,c=u({step:a,alt:o,oct:s}),m=e+i+r,l=e+i,h=(T[a]+o+120)%12,M=void 0===s?-100:s,P=T[a]+o+12*(M+1),f=P>=0&&P<=127?P:null,y=void 0===s?null:440*Math.pow(2,(P-69)/12);return{empty:!1,acc:i,alt:o,chroma:h,coord:c,freq:y,height:P,letter:e,midi:f,name:m,oct:s,pc:l,step:a}}(t):s(t)?y(function(t){const{step:n,alt:e,oct:i}=t,r=P(n);if(!r)return"";const a=r+f(e);return i||0===i?a+i:a}(t)):o(t)?y(t.name):d;return M.set(t,e),e}const b=/^([a-gA-G]?)(#{1,}|b{1,}|x{1,}|)(-?\d*)\s*(.*)$/;function v(t){const n=b.exec(t);return[n[1].toUpperCase(),n[2].replace(/x/g,"##"),n[3],n[4]]}function g(t){return y(h(t))}const T=[0,2,4,5,7,9,11];const A={empty:!0,name:"",acc:""},E=new RegExp("^([-+]?\\d+)(d{1,4}|m|M|P|A{1,4})|(AA|A|P|M|m|d|dd)([-+]?\\d+)$");function k(t){const n=E.exec(""+t);return null===n?["",""]:n[1]?[n[1],n[2]]:[n[4],n[3]]}const I={};function _(t){return"string"==typeof t?I[t]||(I[t]=function(t){const n=k(t);if(""===n[0])return A;const e=+n[0],i=n[1],r=(Math.abs(e)-1)%7,a="PMMPPMM"[r];if("M"===a&&"P"===i)return A;const o="M"===a?"majorable":"perfectable",s=""+e+i,c=e<0?-1:1,m=8===e||-8===e?e:c*(r+1),l=function(t,n){return"M"===n&&"majorable"===t||"P"===n&&"perfectable"===t?0:"m"===n&&"majorable"===t?-1:/^A+$/.test(n)?n.length:/^d+$/.test(n)?-1*("perfectable"===t?n.length:n.length+1):0}(o,i),h=Math.floor((Math.abs(e)-1)/7),d=c*(D[r]+l+12*h),M=(c*(D[r]+l)%12+12)%12,P=u({step:r,alt:l,oct:h,dir:c});return{empty:!1,name:s,num:e,q:i,step:r,alt:l,dir:c,type:o,simple:m,semitones:d,chroma:M,coord:P,oct:h}}(t)):s(t)?_(function(t){const{step:n,alt:e,oct:i=0,dir:a}=t;if(!a)return"";return(a<0?"-":"")+(n+1+7*i)+function(t,n){return 0===n?"majorable"===t?"M":"P":-1===n&&"majorable"===t?"m":n>0?r("A",n):r("d","perfectable"===t?n:n+1)}("M"==="PMMPPMM"[n]?"majorable":"perfectable",e)}(t)):o(t)?_(t.name):A}const D=[0,2,4,5,7,9,11];function N(t){const[n,e=0]=t;return _(h(7*n+12*e<0?[-n,-e,-1]:[n,e,1]))}function w(t,n){const e=y(t),i=_(n);if(e.empty||i.empty)return"";const r=e.coord,a=i.coord;return g(1===r.length?[r[0]+a[0]]:[r[0]+a[0],r[1]+a[1]]).name}function j(t,n){const e=y(t),i=y(n);if(e.empty||i.empty)return"";const r=e.coord,a=i.coord,o=a[0]-r[0];return N([o,2===r.length&&2===a.length?a[1]-r[1]:-Math.floor(7*o/12)]).name}function S(t,n){const e=n.length,i=(t%e+e)%e;return n.slice(i,e).concat(n.slice(0,i))}function C(t){return t.filter(t=>0===t||t)}const V={empty:!0,name:"",setNum:0,chroma:"000000000000",normalized:"000000000000",intervals:[]},x=t=>Number(t).toString(2),O=t=>parseInt(t,2),R=/^[01]{12}$/;function B(t){return R.test(t)}const U={[V.chroma]:V};function F(t){const n=B(t)?t:"number"==typeof(e=t)&&e>=0&&e<=4095?x(t):Array.isArray(t)?function(t){if(0===t.length)return V.chroma;let n;const e=[0,0,0,0,0,0,0,0,0,0,0,0];for(let i=0;i<t.length;i++)n=y(t[i]),n.empty&&(n=_(t[i])),n.empty||(e[n.chroma]=1);return e.join("")}(t):(t=>t&&B(t.chroma))(t)?t.chroma:V.chroma;var e;return U[n]=U[n]||function(t){const n=O(t),e=function(t){const n=t.split("");return n.map((t,e)=>S(e,n).join(""))}(t).map(O).filter(t=>t>=2048).sort()[0],i=x(e),r=H(t);return{empty:!1,name:"",setNum:n,chroma:t,normalized:i,intervals:r}}(n)}a("Pcset.pcset","Pcset.get",F);const L=["1P","2m","2M","3m","3M","4P","5d","5P","6m","6M","7m","7M"];function H(t){const n=[];for(let e=0;e<12;e++)"1"===t.charAt(e)&&n.push(L[e]);return n}function G(t,n=!0){const e=F(t).chroma.split("");return C(e.map((t,i)=>{const r=S(i,e);return n&&"0"===r[0]?null:r.join("")}))}function q(t){const n=F(t).setNum;return t=>{const e=F(t).setNum;return n&&n!==e&&(e&n)===e}}function K(t){const n=F(t).setNum;return t=>{const e=F(t).setNum;return n&&n!==e&&(e|n)===e}}const $={...V,name:"",quality:"Unknown",intervals:[],aliases:[]};let z=[],Y={};function W(t){return Y[t]||$}a("ChordType.chordType","ChordType.get",W);function J(){return z.slice()}a("ChordType.entries","ChordType.all",J);function X(t,n,e){const i=function(t){const n=n=>-1!==t.indexOf(n);return n("5A")?"Augmented":n("3M")?"Major":n("5d")?"Diminished":n("3m")?"Minor":"Unknown"}(t),r={...F(t),name:e||"",quality:i,intervals:t,aliases:n};z.push(r),r.name&&(Y[r.name]=r),Y[r.setNum]=r,Y[r.chroma]=r,r.aliases.forEach(t=>function(t,n){Y[n]=t}(r,t))}[["1P 3M 5P","major","M "],["1P 3M 5P 7M","major seventh","maj7 Δ ma7 M7 Maj7"],["1P 3M 5P 7M 9M","major ninth","maj9 Δ9"],["1P 3M 5P 7M 9M 13M","major thirteenth","maj13 Maj13"],["1P 3M 5P 6M","sixth","6 add6 add13 M6"],["1P 3M 5P 6M 9M","sixth/ninth","6/9 69"],["1P 3M 5P 7M 11A","lydian","maj#4 Δ#4 Δ#11"],["1P 3M 6m 7M","major seventh b6","M7b6"],["1P 3m 5P","minor","m min -"],["1P 3m 5P 7m","minor seventh","m7 min7 mi7 -7"],["1P 3m 5P 7M","minor/major seventh","m/ma7 m/maj7 mM7 m/M7 -Δ7 mΔ"],["1P 3m 5P 6M","minor sixth","m6"],["1P 3m 5P 7m 9M","minor ninth","m9"],["1P 3m 5P 7m 9M 11P","minor eleventh","m11"],["1P 3m 5P 7m 9M 13M","minor thirteenth","m13"],["1P 3m 5d","diminished","dim ° o"],["1P 3m 5d 7d","diminished seventh","dim7 °7 o7"],["1P 3m 5d 7m","half-diminished","m7b5 ø"],["1P 3M 5P 7m","dominant seventh","7 dom"],["1P 3M 5P 7m 9M","dominant ninth","9"],["1P 3M 5P 7m 9M 13M","dominant thirteenth","13"],["1P 3M 5P 7m 11A","lydian dominant seventh","7#11 7#4"],["1P 3M 5P 7m 9m","dominant b9","7b9"],["1P 3M 5P 7m 9A","dominant #9","7#9"],["1P 3M 7m 9m","altered","alt7"],["1P 4P 5P","suspended 4th","sus4"],["1P 2M 5P","suspended 2nd","sus2"],["1P 4P 5P 7m","suspended 4th seventh","7sus4"],["1P 5P 7m 9M 11P","eleventh","11"],["1P 4P 5P 7m 9m","suspended 4th b9","b9sus phryg"],["1P 5P","fifth","5"],["1P 3M 5A","augmented","aug + +5"],["1P 3M 5A 7M","augmented seventh","maj7#5 maj7+5"],["1P 3M 5P 7M 9M 11A","major #11 (lydian)","maj9#11 Δ9#11"],["1P 2M 4P 5P","","sus24 sus4add9"],["1P 3M 13m","","Mb6"],["1P 3M 5A 7M 9M","","maj9#5 Maj9#5"],["1P 3M 5A 7m","","7#5 +7 7aug aug7"],["1P 3M 5A 7m 9A","","7#5#9 7alt"],["1P 3M 5A 7m 9M","","9#5 9+"],["1P 3M 5A 7m 9M 11A","","9#5#11"],["1P 3M 5A 7m 9m","","7#5b9"],["1P 3M 5A 7m 9m 11A","","7#5b9#11"],["1P 3M 5A 9A","","+add#9"],["1P 3M 5A 9M","","M#5add9 +add9"],["1P 3M 5P 6M 11A","","M6#11 M6b5 6#11 6b5"],["1P 3M 5P 6M 7M 9M","","M7add13"],["1P 3M 5P 6M 9M 11A","","69#11"],["1P 3M 5P 6m 7m","","7b6"],["1P 3M 5P 7M 9A 11A","","maj7#9#11"],["1P 3M 5P 7M 9M 11A 13M","","M13#11 maj13#11 M13+4 M13#4"],["1P 3M 5P 7M 9m","","M7b9"],["1P 3M 5P 7m 11A 13m","","7#11b13 7b5b13"],["1P 3M 5P 7m 13M","","7add6 67 7add13"],["1P 3M 5P 7m 9A 11A","","7#9#11 7b5#9"],["1P 3M 5P 7m 9A 11A 13M","","13#9#11"],["1P 3M 5P 7m 9A 11A 13m","","7#9#11b13"],["1P 3M 5P 7m 9A 13M","","13#9"],["1P 3M 5P 7m 9A 13m","","7#9b13"],["1P 3M 5P 7m 9M 11A","","9#11 9+4 9#4"],["1P 3M 5P 7m 9M 11A 13M","","13#11 13+4 13#4"],["1P 3M 5P 7m 9M 11A 13m","","9#11b13 9b5b13"],["1P 3M 5P 7m 9m 11A","","7b9#11 7b5b9"],["1P 3M 5P 7m 9m 11A 13M","","13b9#11"],["1P 3M 5P 7m 9m 11A 13m","","7b9b13#11 7b9#11b13 7b5b9b13"],["1P 3M 5P 7m 9m 13M","","13b9"],["1P 3M 5P 7m 9m 13m","","7b9b13"],["1P 3M 5P 7m 9m 9A","","7b9#9"],["1P 3M 5P 9M","","Madd9 2 add9 add2"],["1P 3M 5P 9m","","Maddb9"],["1P 3M 5d","","Mb5"],["1P 3M 5d 6M 7m 9M","","13b5"],["1P 3M 5d 7M","","M7b5"],["1P 3M 5d 7M 9M","","M9b5"],["1P 3M 5d 7m","","7b5"],["1P 3M 5d 7m 9M","","9b5"],["1P 3M 7m","","7no5"],["1P 3M 7m 13m","","7b13"],["1P 3M 7m 9M","","9no5"],["1P 3M 7m 9M 13M","","13no5"],["1P 3M 7m 9M 13m","","9b13"],["1P 3m 4P 5P","","madd4"],["1P 3m 5A","","m#5 m+ mb6"],["1P 3m 5P 6M 9M","","m69"],["1P 3m 5P 6m 7M","","mMaj7b6"],["1P 3m 5P 6m 7M 9M","","mMaj9b6"],["1P 3m 5P 7M 9M","","mMaj9"],["1P 3m 5P 7m 11P","","m7add11 m7add4"],["1P 3m 5P 9M","","madd9"],["1P 3m 5d 6M 7M","","o7M7"],["1P 3m 5d 7M","","oM7"],["1P 3m 6m 7M","","mb6M7"],["1P 3m 6m 7m","","m7#5"],["1P 3m 6m 7m 9M","","m9#5"],["1P 3m 6m 7m 9M 11P","","m11A"],["1P 3m 6m 9m","","mb6b9"],["1P 3m 7m 12d 2M","","m9b5 h9"],["1P 3m 7m 12d 2M 4P","","m11b5 h11"],["1P 4P 5A 7M","","M7#5sus4"],["1P 4P 5A 7M 9M","","M9#5sus4"],["1P 4P 5A 7m","","7#5sus4"],["1P 4P 5P 7M","","M7sus4"],["1P 4P 5P 7M 9M","","M9sus4"],["1P 4P 5P 7m 9M","","9sus4 9sus"],["1P 4P 5P 7m 9M 13M","","13sus4 13sus"],["1P 4P 5P 7m 9m 13m","","7sus4b9b13 7b9b13sus4"],["1P 4P 7m 10m","","4 quartal"],["1P 5P 7m 9m 11P","","11b9"]].forEach(([t,n,e])=>X(t.split(" "),e.split(" "),n)),z.sort((t,n)=>t.setNum-n.setNum);const Q={weight:0,name:""};function Z(t){const n=t.map(t=>y(t).pc).filter(t=>t);return 0===y.length?[]:function(t,n){const e=t[0],i=y(e).chroma,r=(t=>{const n=t.reduce((t,n)=>{const e=y(n).chroma;return void 0!==e&&(t[e]=t[e]||y(n).name),t},{});return t=>n[t]})(t);return G(t,!1).map((t,a)=>{const o=W(t).aliases[0];if(!o)return Q;const s=r(a);return a!==i?{weight:.5*n,name:`${s}${o}/${e}`}:{weight:1*n,name:`${s}${o}`}})}(n,1).filter(t=>t.weight).sort((t,n)=>n.weight-t.weight).map(t=>t.name)}const tt={...V,intervals:[],aliases:[]};let nt=[],et={};function it(){return nt.map(t=>t.name)}function rt(t){return et[t]||tt}a("ScaleDictionary.scaleType","ScaleType.get",rt);function at(){return nt.slice()}a("ScaleDictionary.entries","ScaleType.all",at);function ot(t,n,e=[]){const i={...F(t),name:n,intervals:t,aliases:e};return nt.push(i),et[i.name]=i,et[i.setNum]=i,et[i.chroma]=i,i.aliases.forEach(t=>function(t,n){et[n]=t}(i,t)),i}[["1P 2M 3M 5P 6M","major pentatonic","pentatonic"],["1P 3M 4P 5P 7M","ionian pentatonic"],["1P 3M 4P 5P 7m","mixolydian pentatonic","indian"],["1P 2M 4P 5P 6M","ritusen"],["1P 2M 4P 5P 7m","egyptian"],["1P 3M 4P 5d 7m","neopolitan major pentatonic"],["1P 3m 4P 5P 6m","vietnamese 1"],["1P 2m 3m 5P 6m","pelog"],["1P 2m 4P 5P 6m","kumoijoshi"],["1P 2M 3m 5P 6m","hirajoshi"],["1P 2m 4P 5d 7m","iwato"],["1P 2m 4P 5P 7m","in-sen"],["1P 3M 4A 5P 7M","lydian pentatonic","chinese"],["1P 3m 4P 6m 7m","malkos raga"],["1P 3m 4P 5d 7m","locrian pentatonic","minor seven flat five pentatonic"],["1P 3m 4P 5P 7m","minor pentatonic","vietnamese 2"],["1P 3m 4P 5P 6M","minor six pentatonic"],["1P 2M 3m 5P 6M","flat three pentatonic","kumoi"],["1P 2M 3M 5P 6m","flat six pentatonic"],["1P 2m 3M 5P 6M","scriabin"],["1P 3M 5d 6m 7m","whole tone pentatonic"],["1P 3M 4A 5A 7M","lydian #5P pentatonic"],["1P 3M 4A 5P 7m","lydian dominant pentatonic"],["1P 3m 4P 5P 7M","minor #7M pentatonic"],["1P 3m 4d 5d 7m","super locrian pentatonic"],["1P 2M 3m 4P 5P 7M","minor hexatonic"],["1P 2A 3M 5P 5A 7M","augmented"],["1P 3m 4P 5d 5P 7m","minor blues","blues"],["1P 2M 3m 3M 5P 6M","major blues"],["1P 2M 4P 5P 6M 7m","piongio"],["1P 2m 3M 4A 6M 7m","prometheus neopolitan"],["1P 2M 3M 4A 6M 7m","prometheus"],["1P 2m 3M 5d 6m 7m","mystery #1"],["1P 2m 3M 4P 5A 6M","six tone symmetric"],["1P 2M 3M 4A 5A 7m","whole tone"],["1P 2M 3M 4P 5d 6m 7m","locrian major","arabian"],["1P 2m 3M 4A 5P 6m 7M","double harmonic lydian"],["1P 2M 3m 4P 5P 6m 7M","harmonic minor"],["1P 2m 3m 3M 5d 6m 7m","altered","super locrian","diminished whole tone","pomeroy"],["1P 2M 3m 4P 5d 6m 7m","locrian #2","half-diminished",'"aeolian b5'],["1P 2M 3M 4P 5P 6m 7m","mixolydian b6","melodic minor fifth mode","hindu"],["1P 2M 3M 4A 5P 6M 7m","lydian dominant","lydian b7","overtone"],["1P 2M 3M 4A 5P 6M 7M","lydian"],["1P 2M 3M 4A 5A 6M 7M","lydian augmented"],["1P 2m 3m 4P 5P 6M 7m","dorian b2","phrygian #6","melodic minor second mode"],["1P 2M 3m 4P 5P 6M 7M","melodic minor"],["1P 2m 3m 4P 5d 6m 7m","locrian"],["1P 2m 3m 4d 5d 6m 7d","ultralocrian","superlocrian bb7","·superlocrian diminished"],["1P 2m 3m 4P 5d 6M 7m","locrian 6","locrian natural 6","locrian sharp 6"],["1P 2A 3M 4P 5P 5A 7M","augmented heptatonic"],["1P 2M 3m 5d 5P 6M 7m","romanian minor"],["1P 2M 3m 4A 5P 6M 7m","dorian #4"],["1P 2M 3m 4A 5P 6M 7M","lydian diminished"],["1P 2m 3m 4P 5P 6m 7m","phrygian"],["1P 2M 3M 4A 5A 7m 7M","leading whole tone"],["1P 2M 3M 4A 5P 6m 7m","lydian minor"],["1P 2m 3M 4P 5P 6m 7m","phrygian dominant","spanish","phrygian major"],["1P 2m 3m 4P 5P 6m 7M","balinese"],["1P 2m 3m 4P 5P 6M 7M","neopolitan major"],["1P 2M 3m 4P 5P 6m 7m","aeolian","minor"],["1P 2M 3M 4P 5P 6m 7M","harmonic major"],["1P 2m 3M 4P 5P 6m 7M","double harmonic major","gypsy"],["1P 2M 3m 4P 5P 6M 7m","dorian"],["1P 2M 3m 4A 5P 6m 7M","hungarian minor"],["1P 2A 3M 4A 5P 6M 7m","hungarian major"],["1P 2m 3M 4P 5d 6M 7m","oriental"],["1P 2m 3m 3M 4A 5P 7m","flamenco"],["1P 2m 3m 4A 5P 6m 7M","todi raga"],["1P 2M 3M 4P 5P 6M 7m","mixolydian","dominant"],["1P 2m 3M 4P 5d 6m 7M","persian"],["1P 2M 3M 4P 5P 6M 7M","major","ionian"],["1P 2m 3M 5d 6m 7m 7M","enigmatic"],["1P 2M 3M 4P 5A 6M 7M","major augmented","major #5","ionian augmented","ionian #5"],["1P 2A 3M 4A 5P 6M 7M","lydian #9"],["1P 2m 3M 4P 4A 5P 6m 7M","purvi raga"],["1P 2m 3m 3M 4P 5P 6m 7m","spanish heptatonic"],["1P 2M 3M 4P 5P 6M 7m 7M","bebop"],["1P 2M 3m 3M 4P 5P 6M 7m","bebop minor"],["1P 2M 3M 4P 5P 5A 6M 7M","bebop major"],["1P 2m 3m 4P 5d 5P 6m 7m","bebop locrian"],["1P 2M 3m 4P 5P 6m 7m 7M","minor bebop"],["1P 2M 3m 4P 5d 6m 6M 7M","diminished","whole-half diminished"],["1P 2M 3M 4P 5d 5P 6M 7M","ichikosucho"],["1P 2M 3m 4P 5P 6m 6M 7M","minor six diminished"],["1P 2m 3m 3M 4A 5P 6M 7m","half-whole diminished","dominant diminished"],["1P 3m 3M 4P 5P 6M 7m 7M","kafi raga"],["1P 2M 3m 3M 4P 5d 5P 6M 7m","composite blues"],["1P 2m 2M 3m 3M 4P 5d 5P 6m 6M 7m 7M","chromatic"]].forEach(([t,n,...e])=>ot(t.split(" "),n,e));const st={empty:!0,name:"",type:"",tonic:null,setNum:NaN,quality:"Unknown",chroma:"",normalized:"",aliases:[],notes:[],intervals:[]},ct=/^(6|64|7|9|11|13)$/;function mt(t){const[n,e,i,r]=v(t);return""===n?["",t]:"A"===n&&"ug"===r?["","aug"]:r||"4"!==i&&"5"!==i?ct.test(i)?[n+e,i+r]:[n+e+i,r]:[n+e,i]}function ut(t){const{type:n,tonic:e}=function(t){if(!t||!t.length)return{};const n=Array.isArray(t)?t:mt(t),e=y(n[0]).name,i=W(n[1]);return i.empty?e&&"string"==typeof t?{tonic:"",type:W(t)}:{}:{tonic:e,type:i}}(t);if(!n||n.empty)return st;const i=e?n.intervals.map(t=>w(e,t)):[],r=e?e+" "+n.name:n.name;return{...n,name:r,type:n.name,tonic:e||"",notes:i}}a("Chord.chord","Chord.get",ut);const lt=[];[[.125,"dl",["large","duplex longa","maxima","octuple","octuple whole"]],[.25,"l",["long","longa"]],[.5,"d",["double whole","double","breve"]],[1,"w",["whole","semibreve"]],[2,"h",["half","minim"]],[4,"q",["quarter","crotchet"]],[8,"e",["eighth","quaver"]],[16,"s",["sixteenth","semiquaver"]],[32,"t",["thirty-second","demisemiquaver"]],[64,"sf",["sixty-fourth","hemidemisemiquaver"]],[128,"h",["hundred twenty-eighth"]],[256,"th",["two hundred fifty-sixth"]]].forEach(([t,n,e])=>function(t,n,e){lt.push({empty:!1,dots:"",name:"",value:1/t,fraction:t<1?[1/t,1]:[1,t],shorthand:n,names:e})}(t,n,e));"P m M m M P d P m M m M".split(" ");ht((t,n)=>[t[0]+n[0],t[1]+n[1]]),ht((t,n)=>[t[0]-n[0],t[1]-n[1]]);function ht(t){return(n,e)=>{const i=_(n).coord,r=_(e).coord;if(i&&r){return N(t(i,r)).name}}}Math.log(2),Math.log(440);const dt="C C# D D# E F F# G G# A A# B".split(" "),Mt="C Db D Eb E F Gb G Ab A Bb B".split(" ");function Pt(t,n={}){t=Math.round(t);const e=(!0===n.sharps?dt:Mt)[t%12];return n.pitchClass?e:e+(Math.floor(t/12)-1)}const ft=["C","D","E","F","G","A","B"],pt=t=>t.name,yt=t=>t.map(y).filter(t=>!t.empty);const bt=y;const vt=w,gt=w,Tt=t=>n=>vt(n,t),At=Tt,Et=t=>n=>vt(t,n),kt=Et;function It(t,n){const e=bt(t);if(e.empty)return"";const[i,r]=e.coord;return g(void 0===r?[i+n]:[i+n,r]).name}const _t=It,Dt=(t,n)=>t.height-n.height;function Nt(t,n){return n=n||Dt,yt(t).sort(n).map(pt)}function wt(t){return Nt(t,Dt).filter((t,n,e)=>0===n||t!==e[n-1])}const jt=Ct(!0),St=Ct(!1);function Ct(t){return n=>{const e=bt(n);if(e.empty)return"";const i=t?e.alt>0:e.alt<0,r=null===e.midi;return Pt(e.midi||e.chroma,{sharps:i,pitchClass:r})}}var Vt={names:function(t){return void 0===t?ft.slice():Array.isArray(t)?yt(t).map(pt):[]},get:bt,name:t=>bt(t).name,pitchClass:t=>bt(t).pc,accidentals:t=>bt(t).acc,octave:t=>bt(t).oct,midi:t=>bt(t).midi,ascending:Dt,descending:(t,n)=>n.height-t.height,sortedNames:Nt,sortedUniqNames:wt,fromMidi:function(t){return Pt(t)},fromMidiSharps:function(t){return Pt(t,{sharps:!0})},freq:t=>bt(t).freq,chroma:t=>bt(t).chroma,transpose:vt,tr:gt,transposeBy:Tt,trBy:At,transposeFrom:Et,trFrom:kt,transposeFifths:It,trFifths:_t,simplify:jt,enharmonic:St};const xt={empty:!0,name:"",chordType:""},Ot={};function Rt(t){return"string"==typeof t?Ot[t]||(Ot[t]=function(t){const[n,e,i,r]=(a=t,Bt.exec(a)||["","","",""]);var a;if(!i)return xt;const o=i.toUpperCase(),s=Ft.indexOf(o),c=p(e);return{empty:!1,name:n,roman:i,interval:_({step:s,alt:c,dir:1}).name,acc:e,chordType:r,alt:c,step:s,major:i===o,oct:0,dir:1}}(t)):"number"==typeof t?Rt(Ft[t]||""):s(t)?Rt(f((n=t).alt)+Ft[n.step]):o(t)?Rt(t.name):xt;var n}a("RomanNumeral.romanNumeral","RomanNumeral.get",Rt);const Bt=/^(#{1,}|b{1,}|x{1,}|)(IV|I{1,3}|VI{0,2}|iv|i{1,3}|vi{0,2})([^IViv]*)$/;const Ut="I II III IV V VI VII",Ft=Ut.split(" ");Ut.toLowerCase().split(" ");const Lt=t=>(n,e="")=>n.map((n,i)=>"-"!==n?t[i]+e+n:"");function Ht(t,n,e,i){return r=>{const a=t.split(" "),o=a.map(t=>Rt(t).interval||""),s=o.map(t=>w(r,t)),c=Lt(s);return{tonic:r,grades:a,intervals:o,scale:s,chords:c(n.split(" ")),chordsHarmonicFunction:e.split(" "),chordScales:c(i.split(",")," ")}}}Ht("I II III IV V VI VII","maj7 m7 m7 maj7 7 m7 m7b5","T SD T SD D T D","major,dorian,phrygian,lydian,mixolydian,minor,locrian"),Ht("I II bIII IV V bVI bVII","m7 m7b5 maj7 m7 m7 maj7 7","T SD T SD D SD SD","minor,locrian,major,dorian,phrygian,lydian,mixolydian"),Ht("I II bIII IV V bVI VII","mmaj7 m7b5 +maj7 m7 7 maj7 mo7","T SD T SD D SD D","harmonic minor,locrian 6,major augmented,lydian diminished,phrygian dominant,lydian #9,ultralocrian"),Ht("I II bIII IV V VI VII","m6 m7 +maj7 7 7 m7b5 m7b5","T SD T SD D - -","melodic minor,dorian b2,lydian augmented,lydian dominant,mixolydian b6,locrian #2,altered");const Gt={...V,name:"",alt:0,modeNum:NaN,triad:"",seventh:"",aliases:[]},qt=[[0,2773,0,"ionian","","Maj7","major"],[1,2902,2,"dorian","m","m7"],[2,3418,4,"phrygian","m","m7"],[3,2741,-1,"lydian","","Maj7"],[4,2774,1,"mixolydian","","7"],[5,2906,3,"aeolian","m","m7","minor"],[6,3434,5,"locrian","dim","m7b5"]].map((function(t){const[n,e,i,r,a,o,s]=t,c=s?[s]:[],m=Number(e).toString(2);return{empty:!1,intervals:H(m),modeNum:n,chroma:m,normalized:m,name:r,setNum:e,alt:i,triad:a,seventh:o,aliases:c}})),Kt={};function $t(t){return"string"==typeof t?Kt[t.toLowerCase()]||Gt:t&&t.name?$t(t.name):Gt}qt.forEach(t=>{Kt[t.name]=t,t.aliases.forEach(n=>{Kt[n]=t})});const zt=a("Mode.mode","Mode.get",$t);function Yt(){return qt.slice()}a("Mode.mode","Mode.all",Yt);const Wt={empty:!0,name:"",type:"",tonic:null,setNum:NaN,chroma:"",normalized:"",aliases:[],notes:[],intervals:[]};function Jt(t){if("string"!=typeof t)return["",""];const n=t.indexOf(" "),e=y(t.substring(0,n));if(e.empty){const n=y(t);return n.empty?["",t]:[n.name,""]}const i=t.substring(e.name.length+1);return[e.name,i.length?i:""]}function Xt(t){const n=Array.isArray(t)?t:Jt(t),e=y(n[0]).name,i=rt(n[1]);if(i.empty)return Wt;const r=i.name,a=e?i.intervals.map(t=>w(e,t)):[],o=e?e+" "+r:r;return{...i,name:o,type:r,tonic:e,notes:a}}a("Scale.scale","Scale.get",Xt);var Qt=e(2),Zt=e.n(Qt),tn=e(0),nn=e(5),en=e.n(nn);new class{constructor(t={}){console.info("🔭  Phobos\n"),this.configuration=t,this.configuration.scales.forEach(t=>{this.configuration.notes.forEach(n=>{const{duration:e,velocity:i}=this.configuration.midi,{octaves:r}=this.configuration,a=en.a.resolve("../scales",t.name),o=`${n} ${t.name}`,s=[0,...t.intervals];let c=this.shift(n,[...this.configuration.notes]);s.forEach(t=>{for(let n=0;n<t;n++)c.shift();c.push(c.shift())}),c=this.shift(this.configuration.notes.filter(t=>c.includes(t))[0],c);let m=[];for(let t=Math.min(...r);t<Math.max(...r);t++)c.forEach(n=>{m.push(n+t)});m=m.filter(t=>null!==Vt.midi(t));const u=new tn.Track,l=new tn.NoteEvent({duration:e,pitch:m,velocity:i});u.addEvent(l);const h=new tn.Writer(u);try{Zt.a.existsSync(a)||Zt.a.mkdirSync(a,{recursive:!0}),Zt.a.writeFileSync(en.a.resolve(a,o+".mid"),h.dataUri().replace(/^data:audio\/midi;base64,/,""),{encoding:"base64"}),console.log("💾  Scale saved: %s",o)}catch{console.warn("❗️  Warning: Scale can't be saved (%s)",o)}})})}shift(t,n){for(;n[0]!==t;)n.push(n.shift());return n}}({midi:{duration:1,velocity:100},notes:["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"],octaves:[-1,10],scales:[]})},function(t,n,e){"use strict";function i(t){return"number"==typeof t}function r(t,n){return Math.pow(2,(t-69)/12)*(n||440)}e.r(n),e.d(n,"toMidi",(function(){return m})),e.d(n,"note",(function(){return h}));var a=/^([a-gA-G])(#{1,}|b{1,}|x{1,}|)(-?\d*)\s*(.*)\s*$/;var o=[0,2,4,5,7,9,11];function s(t,n,e){if("string"!=typeof t)return null;var i=a.exec(t);if(!i||!n&&i[4])return null;var s={letter:i[1].toUpperCase(),acc:i[2].replace(/x/g,"##")};s.pc=s.letter+s.acc,s.step=(s.letter.charCodeAt(0)+3)%7,s.alt="b"===s.acc[0]?-s.acc.length:s.acc.length;var c=o[s.step]+s.alt;return s.chroma=c<0?12+c:c%12,i[3]&&(s.oct=+i[3],s.midi=c+12*(s.oct+1),s.freq=r(s.midi,e)),n&&(s.tonicOf=i[4]),s}function c(t){if((i(t)||"string"==typeof t)&&t>=0&&t<128)return+t;var n=s(t);return n&&function(t){return void 0!==t}(n.midi)?n.midi:null}function m(t){return Array.isArray(t)&&2===t.length?7*t[0]+12*t[1]+12:c(t)}var u="C Db D Eb E F Gb G Ab A Bb B".split(" "),l="C C# D D# E F F# G G# A A# B".split(" ");function h(t,n){return!0===t||!1===t?function(n){return h(n,t)}:(t=Math.round(t),(!0===n?l:u)[t%12]+(Math.floor(t/12)-1))}},function(t,n){t.exports=require("path")}]);