import{d as i,w as y,e as f,f as p,o as h,c as m,a as t,g as n,n as s,_ as v}from"./app-D7lK0ST_.js";const B=["controls","controlslist","autoPlay","muted"],b=["src"],w=["src"],g=["src"],k=["href"],S=["href"],P=["href"],x=i({__name:"HsVideo",props:{url:{type:String,default:y("/videos/video.mp4")},wrapperStyle:{type:Object,default:{textAlign:"center"}},videoStyle:{type:Object,default:{height:"300px"}},controls:{type:Boolean,default:!0},useControls:{type:Boolean,default:!1},controlslist:{type:String,default:""},autoPlay:{type:Boolean,default:!1},muted:{type:Boolean,default:!1},noFullScreen:{type:Boolean,default:!0},nodownload:{type:Boolean,default:!0},noremoteplayback:{type:Boolean,default:!0},noplaybackrate:{type:Boolean,default:!0}},setup(e){const l=e,r=f(()=>{if(l.useControls)return l.controlslist;const o=[],a=l.noFullScreen?"nofullscreen":"";o.push(a);const c=l.nodownload?"nodownload":"";o.push(c);const d=l.noremoteplayback?"noremoteplayback":"";o.push(d);const u=l.noplaybackrate?"noplaybackrate":"";return o.push(u),console.log("....list",o.join(" ")),o.join(" ")});return p(()=>{}),(o,a)=>(h(),m("div",{class:"hs-video",style:s(e.wrapperStyle)},[t("video",{controls:e.controls,controlslist:r.value,autoPlay:e.autoPlay,crossorigin:"anonymous",disablePictureInPicture:"",muted:e.muted,style:s(e.videoStyle)},[t("source",{src:e.url,type:"video/webm"},null,8,b),t("source",{src:e.url,type:"video/mp4"},null,8,w),t("source",{src:e.url,type:"video/ogg"},null,8,g),n(" 抱歉，你的浏览器不支持内嵌视频，不过不用担心，你可以 "),t("a",{href:e.url,download:""},"下载 WEBM",8,k),t("a",{href:e.url,download:""},"下载 MP4",8,S),t("a",{href:e.url,download:""},"下载 ogg",8,P),n(" 并用你喜欢的播放器观看！ ")],12,B)],4))}}),_=v(x,[["__scopeId","data-v-06ada059"],["__file","HsVideo.vue"]]);export{_ as default};