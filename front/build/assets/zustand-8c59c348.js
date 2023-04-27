import{r as m,g as R}from"./vendor-b5695ea8.js";const D=e=>{let t;const n=new Set,o=(s,p)=>{const c=typeof s=="function"?s(t):s;if(!Object.is(c,t)){const l=t;t=p??typeof c!="object"?c:Object.assign({},t,c),n.forEach(v=>v(t,l))}},r=()=>t,f={setState:o,getState:r,subscribe:s=>(n.add(s),()=>n.delete(s)),destroy:()=>{({BASE_URL:"/",MODE:"production",DEV:!1,PROD:!0,SSR:!1}&&"production")!=="production"&&console.warn("[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."),n.clear()}};return t=e(o,r,f),f},j=e=>e?D(e):D;var x={},V={get exports(){return x},set exports(e){x=e}},b={},h={},P={get exports(){return h},set exports(e){h=e}},O={};/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var S=m;function _(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var $=typeof Object.is=="function"?Object.is:_,A=S.useState,I=S.useEffect,B=S.useLayoutEffect,C=S.useDebugValue;function L(e,t){var n=t(),o=A({inst:{value:n,getSnapshot:t}}),r=o[0].inst,u=o[1];return B(function(){r.value=n,r.getSnapshot=t,y(r)&&u({inst:r})},[e,n,t]),I(function(){return y(r)&&u({inst:r}),e(function(){y(r)&&u({inst:r})})},[e]),C(n),n}function y(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!$(e,n)}catch{return!0}}function M(e,t){return t()}var T=typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"?M:L;O.useSyncExternalStore=S.useSyncExternalStore!==void 0?S.useSyncExternalStore:T;(function(e){e.exports=O})(P);/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var E=m,U=h;function k(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var q=typeof Object.is=="function"?Object.is:k,z=U.useSyncExternalStore,W=E.useRef,F=E.useEffect,G=E.useMemo,H=E.useDebugValue;b.useSyncExternalStoreWithSelector=function(e,t,n,o,r){var u=W(null);if(u.current===null){var a={hasValue:!1,value:null};u.current=a}else a=u.current;u=G(function(){function s(i){if(!p){if(p=!0,c=i,i=o(i),r!==void 0&&a.hasValue){var d=a.value;if(r(d,i))return l=d}return l=i}if(d=l,q(c,i))return d;var g=o(i);return r!==void 0&&r(d,g)?d:(c=i,l=g)}var p=!1,c,l,v=n===void 0?null:n;return[function(){return s(t())},v===null?void 0:function(){return s(v())}]},[t,n,o,r]);var f=z(e,u[0],u[1]);return F(function(){a.hasValue=!0,a.value=f},[f]),H(f),f};(function(e){e.exports=b})(V);const J=R(x),{useSyncExternalStoreWithSelector:K}=J;function N(e,t=e.getState,n){const o=K(e.subscribe,e.getState,e.getServerState||e.getState,t,n);return m.useDebugValue(o),o}const w=e=>{({BASE_URL:"/",MODE:"production",DEV:!1,PROD:!0,SSR:!1}&&"production")!=="production"&&typeof e!="function"&&console.warn("[DEPRECATED] Passing a vanilla store will be unsupported in a future version. Instead use `import { useStore } from 'zustand'`.");const t=typeof e=="function"?j(e):e,n=(o,r)=>N(t,o,r);return Object.assign(n,t),n},Q=e=>e?w(e):w;var Y=e=>(({BASE_URL:"/",MODE:"production",DEV:!1,PROD:!0,SSR:!1}&&"production")!=="production"&&console.warn("[DEPRECATED] Default export is deprecated. Instead use `import { create } from 'zustand'`."),Q(e));export{Y as r};