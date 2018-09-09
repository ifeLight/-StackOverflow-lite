!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);var o={apiUrl:"http://localhost:8050/api/v1/"};var r=function(){var e=document.getElementById("overlay"),t=document.getElementById("alertbox");e.style.display="none",t.style.display="none"};var i=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"Alert",n=window.innerHeight,o=window.innerWidth,i=document.getElementById("overlay"),a=document.getElementById("alertbox");i.style.display="block",i.style.height=n+"px",a.style.left=o/2-125+"px",a.style.top="100px",a.style.display="block",document.getElementById("alertheader").innerHTML=t,document.getElementById("alertbody").innerHTML=e,document.getElementById("alertfooter").innerHTML="<input type='button' value='ok' id='stopAlert'>",document.getElementById("stopAlert").addEventListener("click",r)};function a(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var l=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}return function(e,t,n){t&&a(e.prototype,t),n&&a(e,n)}(e,[{key:"show",value:function(){document.getElementById("loader").style.display="block",document.getElementById("overlay").style.display="block"}},{key:"hide",value:function(){document.getElementById("overlay").style.display="none",document.getElementById("loader").style.display="none"}}]),e}(),u=function(e){var t=window.location.hostname;window.location.href="".concat(t,"/").concat(e)},c=function(e){(new l).hide(),i("There is something wrong with your network","Network Error")},d=function(){var e=o.apiUrl,t=new FormData,n=document.getElementById("email"),r=document.getElementById("password"),a=new l;if(t.append("email",n),t.append("password",r),""==n||""==r)return i("Fields can't be empty","Error");a.show(),fetch(e+"auth/login",{method:"POST",body:t}).then(function(e){a.hide(),e.ok?((new Token).setToken(e.body.token),u("/index.html")):i("Login Error","The password or username is not correct")}).catch(c)};function s(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var m=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}return function(e,t,n){t&&s(e.prototype,t),n&&s(e,n)}(e,[{key:"getToken",value:function(){return sessionStorage.getItem("auth-token")?sessionStorage.getItem("auth-token"):null}},{key:"setToken",value:function(e){return sessionStorage.setItem("auth-token",e)}},{key:"removeToken",value:function(){return sessionStorage.removeItem("auth-token")}}]),e}(),y=function(){var e=o.apiUrl,t=new FormData,n=document.getElementById("email"),r=document.getElementById("password"),a=document.getElementById("displayName"),d=document.getElementById("confirm-password"),s=new l;return t.append("email",n),t.append("password",r),t.append("displayName",a),""==n||""==r?i("Fields can't be empty","Error"):r!==d?i("Passwords do not match","Error"):(fetch(e+"auth/login",{method:"POST",body:t}),s.show(),void fetch(e+"auth/signup",{method:"POST",body:t}).then(function(e){s.hide(),e.ok?((new m).setToken(e.body.token),u("/index.html")):i("Signup Error","User with this email already exist")}).catch(c))},f=function(){return!!sessionStorage.getItem("auth-token")},p=function(){var e,t=document.getElementById("topnav");e=f?'<li class="right"><a class="active" href="/login.html">Sign In</a></li>\n        <li class="right"><a href="/signup.html">Signup</a></li>\n        <li class="right"><a href="/ask.html">Ask a Question</a></li>':'<li class="right"><a class="active" href="#" id="logout">Logout</a></li>\n        <li class="right"><a href="/profile.html">My Profile</a></li>\n        <li class="right"><a href="/ask.html">Ask a Question</a></li>\n        <li class="right"><a> Welcome </a></li>',t.innerHTML="<li><a>StackOverflow Lite</a></li>"+e},h=function(){(new m).removeToken(),u("/index.html")},g=document.getElementById("loginActionButton");g&&g.addEventListener("click",d);var v=document.getElementById("signupButtonAction");v&&v.addEventListener("click",y),document.getElementById("topnav")&&p();var k=document.getElementById("logout");k&&k.addEventListener("click",h)}]);
//# sourceMappingURL=main.bundle.js.map