if(!self.define){let i,n={};const e=(e,s)=>(e=new URL(e+".js",s).href,n[e]||new Promise((n=>{if("document"in self){const i=document.createElement("script");i.src=e,i.onload=n,document.head.appendChild(i)}else i=e,importScripts(e),n()})).then((()=>{let i=n[e];if(!i)throw new Error(`Module ${e} didn’t register its module`);return i})));self.define=(s,c)=>{const o=i||("document"in self?document.currentScript.src:"")||location.href;if(n[o])return;let r={};const a=i=>e(i,o),d={module:{uri:o},exports:r,require:a};n[o]=Promise.all(s.map((i=>d[i]||a(i)))).then((i=>(c(...i),r)))}}define(["./workbox-5ffe50d4"],(function(i){"use strict";self.skipWaiting(),i.clientsClaim(),i.precacheAndRoute([{url:"assets/html2canvas.esm-CBrSDip1.js",revision:null},{url:"assets/index-bTd5mLyT.js",revision:null},{url:"assets/index-DDAtzzZa.css",revision:null},{url:"assets/index.es-CvgIV-7r.js",revision:null},{url:"assets/purify.es-C_uT9hQ1.js",revision:null},{url:"icons/icon-128x128.png",revision:"a704aacf1cf5d26996425fbb0dd1daf1"},{url:"icons/icon-144x144.png",revision:"4fe587035a11b4017e4791ada5ce1ca3"},{url:"icons/icon-152x152.png",revision:"40756d6e5c56c5b4b32a486dcd466d9e"},{url:"icons/icon-192x192.png",revision:"ab038579029ab57769895390b4dc4a60"},{url:"icons/icon-384x384.png",revision:"d6f2add61720975a189b27b5f0c5888e"},{url:"icons/icon-512x512.png",revision:"30a7f4d6a2842f649dc7a477781972a0"},{url:"icons/icon-72x72.png",revision:"15932b0c77eac6f7e14395f977775732"},{url:"icons/icon-96x96.png",revision:"53e3a5cf23b5bfd4965a4f6d239cb3ac"},{url:"icons/maskable-icon.png",revision:"30a7f4d6a2842f649dc7a477781972a0"},{url:"index.html",revision:"f276a1ed3baa9feb07c94a9853d349e8"},{url:"manifest.json",revision:"1441a2460786cd28492af77cc776a480"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"icons/icon-72x72.png",revision:"15932b0c77eac6f7e14395f977775732"},{url:"icons/icon-96x96.png",revision:"53e3a5cf23b5bfd4965a4f6d239cb3ac"},{url:"icons/icon-128x128.png",revision:"a704aacf1cf5d26996425fbb0dd1daf1"},{url:"icons/icon-144x144.png",revision:"4fe587035a11b4017e4791ada5ce1ca3"},{url:"icons/icon-152x152.png",revision:"40756d6e5c56c5b4b32a486dcd466d9e"},{url:"icons/icon-192x192.png",revision:"ab038579029ab57769895390b4dc4a60"},{url:"icons/icon-384x384.png",revision:"d6f2add61720975a189b27b5f0c5888e"},{url:"icons/icon-512x512.png",revision:"30a7f4d6a2842f649dc7a477781972a0"},{url:"manifest.webmanifest",revision:"eb3e7d76739907fbf71e80014c064b15"}],{}),i.cleanupOutdatedCaches(),i.registerRoute(new i.NavigationRoute(i.createHandlerBoundToURL("index.html")))}));
//# sourceMappingURL=sw.js.map
