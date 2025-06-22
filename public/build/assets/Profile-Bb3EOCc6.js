import{r as u,x as F,j as o,Q as J}from"./app-D-7yzNUJ.js";import{C as K}from"./CustomerLayout-BjZqR9HG.js";import{B as C}from"./button-DHJbW8oJ.js";import{I as W}from"./input-BmiQVFfx.js";import{L as I,C as Y,S as Z}from"./save-D3tO7eI8.js";import{c as B}from"./createLucideIcon-5zpcRbng.js";import"./index-BC9FM76-.js";import"./index-Q3JifOfZ.js";import"./index-BePhyc-H.js";import"./proxy-MVNBRUna.js";import"./user-BOUMN4L_.js";import"./ticket-0mf3PkMq.js";import"./log-out-B7Oe4BTf.js";import"./x-BfWkU1uw.js";import"./clsx-B-dksMZM.js";/**
 * @license lucide-react v0.479.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const X=[["path",{d:"M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",key:"ct8e1f"}],["path",{d:"M14.084 14.158a3 3 0 0 1-4.242-4.242",key:"151rxh"}],["path",{d:"M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",key:"13bj9a"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]],ee=B("EyeOff",X);/**
 * @license lucide-react v0.479.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const te=[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],ae=B("Eye",te);let se={data:""},re=e=>typeof window=="object"?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||se,oe=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,ie=/\/\*[^]*?\*\/|  +/g,R=/\n+/g,w=(e,t)=>{let a="",r="",i="";for(let s in e){let n=e[s];s[0]=="@"?s[1]=="i"?a=s+" "+n+";":r+=s[1]=="f"?w(n,s):s+"{"+w(n,s[1]=="k"?"":t)+"}":typeof n=="object"?r+=w(n,t?t.replace(/([^,])+/g,l=>s.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,d=>/&/.test(d)?d.replace(/&/g,l):l?l+" "+d:d)):s):n!=null&&(s=/^--/.test(s)?s:s.replace(/[A-Z]/g,"-$&").toLowerCase(),i+=w.p?w.p(s,n):s+":"+n+";")}return a+(t&&i?t+"{"+i+"}":i)+r},x={},H=e=>{if(typeof e=="object"){let t="";for(let a in e)t+=a+H(e[a]);return t}return e},ne=(e,t,a,r,i)=>{let s=H(e),n=x[s]||(x[s]=(d=>{let m=0,f=11;for(;m<d.length;)f=101*f+d.charCodeAt(m++)>>>0;return"go"+f})(s));if(!x[n]){let d=s!==e?e:(m=>{let f,y,v=[{}];for(;f=oe.exec(m.replace(ie,""));)f[4]?v.shift():f[3]?(y=f[3].replace(R," ").trim(),v.unshift(v[0][y]=v[0][y]||{})):v[0][f[1]]=f[2].replace(R," ").trim();return v[0]})(e);x[n]=w(i?{["@keyframes "+n]:d}:d,a?"":"."+n)}let l=a&&x.g?x.g:null;return a&&(x.g=x[n]),((d,m,f,y)=>{y?m.data=m.data.replace(y,d):m.data.indexOf(d)===-1&&(m.data=f?d+m.data:m.data+d)})(x[n],t,r,l),n},le=(e,t,a)=>e.reduce((r,i,s)=>{let n=t[s];if(n&&n.call){let l=n(a),d=l&&l.props&&l.props.className||/^go/.test(l)&&l;n=d?"."+d:l&&typeof l=="object"?l.props?"":w(l,""):l===!1?"":l}return r+i+(n??"")},"");function z(e){let t=this||{},a=e.call?e(t.p):e;return ne(a.unshift?a.raw?le(a,[].slice.call(arguments,1),t.p):a.reduce((r,i)=>Object.assign(r,i&&i.call?i(t.p):i),{}):a,re(t.target),t.g,t.o,t.k)}let V,A,U;z.bind({g:1});let b=z.bind({k:1});function ce(e,t,a,r){w.p=t,V=e,A=a,U=r}function j(e,t){let a=this||{};return function(){let r=arguments;function i(s,n){let l=Object.assign({},s),d=l.className||i.className;a.p=Object.assign({theme:A&&A()},l),a.o=/ *go\d+/.test(d),l.className=z.apply(a,r)+(d?" "+d:"");let m=e;return e[0]&&(m=l.as||e,delete l.as),U&&m[0]&&U(l),V(m,l)}return i}}var de=e=>typeof e=="function",T=(e,t)=>de(e)?e(t):e,pe=(()=>{let e=0;return()=>(++e).toString()})(),me=(()=>{let e;return()=>{if(e===void 0&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})(),ue=20,q=(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,ue)};case 1:return{...e,toasts:e.toasts.map(s=>s.id===t.toast.id?{...s,...t.toast}:s)};case 2:let{toast:a}=t;return q(e,{type:e.toasts.find(s=>s.id===a.id)?1:0,toast:a});case 3:let{toastId:r}=t;return{...e,toasts:e.toasts.map(s=>s.id===r||r===void 0?{...s,dismissed:!0,visible:!1}:s)};case 4:return t.toastId===void 0?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(s=>s.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(s=>({...s,pauseDuration:s.pauseDuration+i}))}}},fe=[],D={toasts:[],pausedAt:void 0},L=e=>{D=q(D,e),fe.forEach(t=>{t(D)})},ge=(e,t="blank",a)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...a,id:(a==null?void 0:a.id)||pe()}),P=e=>(t,a)=>{let r=ge(t,e,a);return L({type:2,toast:r}),r.id},p=(e,t)=>P("blank")(e,t);p.error=P("error");p.success=P("success");p.loading=P("loading");p.custom=P("custom");p.dismiss=e=>{L({type:3,toastId:e})};p.remove=e=>L({type:4,toastId:e});p.promise=(e,t,a)=>{let r=p.loading(t.loading,{...a,...a==null?void 0:a.loading});return typeof e=="function"&&(e=e()),e.then(i=>{let s=t.success?T(t.success,i):void 0;return s?p.success(s,{id:r,...a,...a==null?void 0:a.success}):p.dismiss(r),i}).catch(i=>{let s=t.error?T(t.error,i):void 0;s?p.error(s,{id:r,...a,...a==null?void 0:a.error}):p.dismiss(r)}),e};var he=b`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,xe=b`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,be=b`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,ye=j("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${he} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${xe} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${be} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,ve=b`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,we=j("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${ve} 1s linear infinite;
`,je=b`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,Ne=b`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,ke=j("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${je} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${Ne} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,Ee=j("div")`
  position: absolute;
`,$e=j("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,Pe=b`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Se=j("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${Pe} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,Ce=({toast:e})=>{let{icon:t,type:a,iconTheme:r}=e;return t!==void 0?typeof t=="string"?u.createElement(Se,null,t):t:a==="blank"?null:u.createElement($e,null,u.createElement(we,{...r}),a!=="loading"&&u.createElement(Ee,null,a==="error"?u.createElement(ye,{...r}):u.createElement(ke,{...r})))},ze=e=>`
0% {transform: translate3d(0,${e*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,_e=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e*-150}%,-1px) scale(.6); opacity:0;}
`,Fe="0%{opacity:0;} 100%{opacity:1;}",Ie="0%{opacity:1;} 100%{opacity:0;}",De=j("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,Ae=j("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,Ue=(e,t)=>{let a=e.includes("top")?1:-1,[r,i]=me()?[Fe,Ie]:[ze(a),_e(a)];return{animation:t?`${b(r)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${b(i)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}};u.memo(({toast:e,position:t,style:a,children:r})=>{let i=e.height?Ue(e.position||t||"top-center",e.visible):{opacity:0},s=u.createElement(Ce,{toast:e}),n=u.createElement(Ae,{...e.ariaProps},T(e.message,e));return u.createElement(De,{className:e.className,style:{...i,...a,...e.style}},typeof r=="function"?r({icon:s,message:n}):u.createElement(u.Fragment,null,s,n))});ce(u.createElement);z`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;function Ze({user:e,flash:t}){const a=F({name:e.name,email:e.email,photo:e.photo}),r=F({current_password:"",password:"",password_confirmation:""}),i=F({photo:null}),s=u.useRef(null),[n,l]=u.useState(null),[d,m]=u.useState(!1),[f,y]=u.useState({current:!1,new:!1,confirm:!1});u.useEffect(()=>{t!=null&&t.success&&p.success(t.success),t!=null&&t.message&&p.success(t.message),t!=null&&t.error&&p.error(t.error)},[t]);const v=c=>{var $;const g=($=c.target.files)==null?void 0:$[0];if(!g)return;const E=["image/jpeg","image/png","image/gif","image/webp"].includes(g.type),N=g.size<=2*1024*1024;if(!E||!N){p.error(N?"Tipe file tidak valid":"Ukuran gambar harus kurang dari 2MB"),s.current&&(s.current.value="");return}const h=new FileReader;h.onloadend=()=>l(h.result),h.readAsDataURL(g),m(!0),i.setData("photo",g),console.log(i),i.post("/profile/photo",{onSuccess:()=>{p.success("Foto profil berhasil diperbarui"),M()},onError:()=>{p.error("Upload gagal"),M()},preserveScroll:!0,forceFormData:!0}),console.log("halo")},M=()=>{s.current&&(s.current.value=""),m(!1)},O=(c,g,S)=>E=>{E.preventDefault(),c.put(g,{onSuccess:()=>{p.success(S),c===r&&c.reset()},onError:N=>Object.values(N).forEach(h=>p.error(h)),preserveScroll:!0})},_=c=>{y(g=>({...g,[c]:!g[c]}))},Q=()=>{confirm("Hapus foto profil?")&&i.delete("/profile/photo/delete",{onSuccess:()=>{l(null),p.success("Foto berhasil dihapus")},onError:()=>p.error("Gagal menghapus foto"),preserveScroll:!0})},G=()=>n||(e.photo?`/storage/${e.photo}`:"https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_640.png"),k=({id:c,label:g,type:S="text",value:E,onChange:N,show:h,toggle:$})=>o.jsxs("div",{children:[o.jsx("label",{htmlFor:c,className:"block text-sm font-medium text-gray-700 mb-1",children:g}),o.jsxs("div",{className:"relative",children:[o.jsx(W,{id:c,type:h?"text":S,value:E,onChange:N,required:!0}),$&&o.jsx("button",{type:"button",onClick:$,className:"absolute inset-y-0 right-0 flex items-center pr-3","aria-label":`${h?"Sembunyikan":"Tampilkan"} password`,children:h?o.jsx(ee,{size:16,className:"text-gray-400"}):o.jsx(ae,{size:16,className:"text-gray-400"})})]})]});return o.jsxs(K,{children:[o.jsx(J,{title:"Profile"}),o.jsx("div",{className:"max-w-3xl mx-auto py-6 px-4",children:o.jsxs("div",{className:"bg-white rounded-lg shadow-sm",children:[o.jsx("div",{className:"p-6 flex flex-col sm:flex-row sm:space-x-6",children:o.jsxs("div",{className:"w-full",children:[o.jsx("h2",{className:"text-lg font-medium mb-4",children:"Informasi Profil"}),o.jsx("form",{onSubmit:O(a,"/profile/update","Profil berhasil diperbarui"),className:"space-y-4",children:o.jsxs("div",{className:"flex gap-8",children:[" ",o.jsxs("div",{className:"relative mb-4 sm:mb-0",children:[o.jsx("div",{className:"w-24 h-24 rounded-full overflow-hidden border",children:d?o.jsx("div",{className:"w-full h-full flex items-center justify-center bg-gray-100",children:o.jsx(I,{className:"animate-spin text-gray-500"})}):o.jsx("img",{src:G(),alt:"Profile",className:"w-full h-full object-cover",onError:c=>{c.currentTarget.src="https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_640.png"}})}),o.jsxs("div",{className:"mt-2 flex space-x-2",children:[o.jsxs(C,{size:"sm",variant:"outline",className:"px-2 py-1 h-8",onClick:()=>{var c;return(c=s.current)==null?void 0:c.click()},children:[o.jsx(Y,{size:14,className:"mr-1"})," ","Ubah"]}),e.photo&&o.jsx(C,{size:"sm",variant:"outline",className:"px-2 py-1 h-8 text-red-500",onClick:Q,children:"Hapus"})]}),o.jsx("input",{type:"file",ref:s,name:"photo",className:"hidden",accept:"image/*",onChange:v,"aria-label":"Upload foto profil"})]}),o.jsxs("div",{className:"w-full space-y-4",children:[o.jsx(k,{id:"name",label:"Nama",value:a.data.name,onChange:c=>a.setData("name",c.target.value)}),o.jsx(k,{id:"email",label:"Email",type:"email",value:a.data.email,onChange:c=>a.setData("email",c.target.value)}),o.jsxs(C,{type:"submit",disabled:a.processing,className:"bg-indigo-600 hover:bg-indigo-700",children:[a.processing?o.jsx(I,{size:16,className:"mr-2 animate-spin"}):o.jsx(Z,{className:"mr-2 w-4 h-4"}),"Simpan Perubahan"]})]})]})})]})}),o.jsx("hr",{className:"my-2"}),o.jsxs("div",{className:"p-6",children:[o.jsx("h2",{className:"text-lg font-medium mb-4",children:"Perbarui Password"}),o.jsxs("form",{onSubmit:O(r,"/profile/password","Password berhasil diperbarui"),className:"space-y-4",children:[o.jsx(k,{id:"current_password",label:"Password Saat Ini",type:"password",value:r.data.current_password,onChange:c=>r.setData("current_password",c.target.value),show:f.current,toggle:()=>_("current")}),o.jsx(k,{id:"password",label:"Password Baru",type:"password",value:r.data.password,onChange:c=>r.setData("password",c.target.value),show:f.new,toggle:()=>_("new")}),o.jsx(k,{id:"password_confirmation",label:"Konfirmasi Password",type:"password",value:r.data.password_confirmation,onChange:c=>r.setData("password_confirmation",c.target.value),show:f.confirm,toggle:()=>_("confirm")}),o.jsxs(C,{type:"submit",disabled:r.processing,className:"bg-indigo-600 hover:bg-indigo-700",children:[r.processing&&o.jsx(I,{size:16,className:"mr-2 animate-spin"}),"Perbarui Password"]})]})]})]})})]})}export{Ze as default};
