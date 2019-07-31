var __awaiter=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))(function(i,s){function a(e){try{o(r.next(e))}catch(e){s(e)}}function u(e){try{o(r["throw"](e))}catch(e){s(e)}}function o(e){e.done?i(e.value):new n(function(t){t(e.value)}).then(a,u)}o((r=r.apply(e,t||[])).next())})};var __generator=this&&this.__generator||function(e,t){var n={label:0,sent:function(){if(s[0]&1)throw s[1];return s[1]},trys:[],ops:[]},r,i,s,a;return a={next:u(0),throw:u(1),return:u(2)},typeof Symbol==="function"&&(a[Symbol.iterator]=function(){return this}),a;function u(e){return function(t){return o([e,t])}}function o(a){if(r)throw new TypeError("Generator is already executing.");while(n)try{if(r=1,i&&(s=a[0]&2?i["return"]:a[0]?i["throw"]||((s=i["return"])&&s.call(i),0):i.next)&&!(s=s.call(i,a[1])).done)return s;if(i=0,s)a=[a[0]&2,s.value];switch(a[0]){case 0:case 1:s=a;break;case 4:n.label++;return{value:a[1],done:false};case 5:n.label++;i=a[1];a=[0];continue;case 7:a=n.ops.pop();n.trys.pop();continue;default:if(!(s=n.trys,s=s.length>0&&s[s.length-1])&&(a[0]===6||a[0]===2)){n=0;continue}if(a[0]===3&&(!s||a[1]>s[0]&&a[1]<s[3])){n.label=a[1];break}if(a[0]===6&&n.label<s[1]){n.label=s[1];s=a;break}if(s&&n.label<s[2]){n.label=s[2];n.ops.push(a);break}if(s[2])n.ops.pop();n.trys.pop();continue}a=t.call(e,n)}catch(e){a=[6,e];i=0}finally{r=s=0}if(a[0]&5)throw a[1];return{value:a[0]?a[1]:void 0,done:true}}};System.register(["./p-f51e9fae.system.js","./p-bd2688b1.system.js"],function(e){"use strict";var t,n,r;return{setters:[function(e){t=e.r;n=e.h},function(e){r=e.a}],execute:function(){var i=function(){function e(e){t(this,e);this.users=[]}e.prototype.getUsers=function(){return __awaiter(this,void 0,void 0,function(){var e,t;return __generator(this,function(n){switch(n.label){case 0:return[4,r.get("https://api.5zvezd.kz/admin/users")];case 1:e=n.sent();t=e.data;this.users=t;return[2]}})})};e.prototype.componentDidLoad=function(){this.getUsers()};e.prototype.render=function(){return n("div",{class:"app-users"},n("header",null,n("h1",null,"Пользователи"),n("div",{class:"routes"},n("stencil-route-link",{url:"/cargo",anchorClass:"routeLink",activeClass:"activeRouteLink"},"Грузы"),n("span",{class:"divider"},"|"),n("stencil-route-link",{url:"/vehicle",exact:true,anchorClass:"routeLink",activeClass:"activeRouteLink"},"Транспорт"),n("span",{class:"divider"},"|"),n("stencil-route-link",{url:"/users",exact:true,anchorClass:"routeLink",activeClass:"activeRouteLink"},"Пользователи"))),n("main",null,n("div",{class:"users"},this.users.map(function(e){return n("f-user",{data:e})}))))};Object.defineProperty(e,"style",{get:function(){return"main{padding:16px}header{background:#f44336;height:64px;display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;-ms-flex-pack:justify;justify-content:space-between;-ms-flex-align:center;align-items:center;-webkit-box-shadow:0 2px 5px 0 rgba(0,0,0,.26);box-shadow:0 2px 5px 0 rgba(0,0,0,.26);padding-left:16px;padding-right:16px}h1,header{color:#fff}h1{font-size:1.4rem;font-weight:600}.divider{margin-left:16px;margin-right:16px;color:hsla(0,0%,100%,.25)}.routeLink{color:#fff;text-decoration:none}.activeRouteLink{color:#fff;font-weight:600}"},enumerable:true,configurable:true});return e}();e("app_users",i)}}});