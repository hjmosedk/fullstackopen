(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{15:function(e,n,t){e.exports=t(38)},20:function(e,n,t){},38:function(e,n,t){"use strict";t.r(n);var r=t(0),a=t.n(r),o=t(13),u=t.n(o),c=(t(20),t(14)),l=t(2),i=function(e){var n=e.onChange;return a.a.createElement("div",null,"Filter shown with:",a.a.createElement("input",{onChange:n}))},s=function(e){var n=e.changeName,t=e.changeNumber,r=e.addPerson,o=e.newName,u=e.newNumber;return a.a.createElement("div",null,a.a.createElement("form",{onSubmit:r},a.a.createElement("div",null,"Name: ",a.a.createElement("input",{value:o,onChange:n})),a.a.createElement("div",null,"Number:",a.a.createElement("input",{value:u,onChange:t})),a.a.createElement("div",null,a.a.createElement("button",{type:"submit"},"Add"))))},m=function(e){var n=e.person,t=e.handleRemoval;return a.a.createElement("li",null,n.name," ",n.number," ",a.a.createElement("button",{onClick:t},"Delete Entry"))},f=function(e){var n=e.persons,t=e.search,r=e.handleRemoval;return a.a.createElement("ul",null,n.filter((function(e){return e.name.toLowerCase().includes(t)})).map((function(e){return a.a.createElement(m,{key:e.id,person:e,handleRemoval:function(){return r(e.id,e.name)}})})))},d=function(e){var n=e.message,t={color:"error"===e.messageStatus?"red":"green",background:"lightgrey",fontSize:"20px",borderStyle:"solid",borderRadius:"15px",padding:"15px",marginBottom:"25px"};return null===n?null:a.a.createElement("div",{style:t},n)},b=t(3),p=t.n(b),h="/api/persons",g=function(){return p.a.get(h).then((function(e){return e.data}))},v=function(e){return p.a.post(h,e).then((function(e){return e.data}))},E=function(e){return p.a.delete("".concat(h,"/").concat(e)).then((function(e){return e.data}))},O=function(e,n){return p.a.put("".concat(h,"/").concat(e),n).then((function(e){return e.data}))};function y(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}var j=function(){var e=Object(r.useState)([]),n=Object(l.a)(e,2),t=n[0],o=n[1],u=Object(r.useState)(""),m=Object(l.a)(u,2),b=m[0],p=m[1],h=Object(r.useState)(""),j=Object(l.a)(h,2),w=j[0],S=j[1],N=Object(r.useState)(""),k=Object(l.a)(N,2),P=k[0],C=k[1],D=Object(r.useState)(null),x=Object(l.a)(D,2),R=x[0],T=x[1],A=Object(r.useState)("message"),B=Object(l.a)(A,2),I=B[0],J=B[1];Object(r.useEffect)((function(){g().then((function(e){o(e)}))}),[]);return a.a.createElement("div",null,a.a.createElement("h2",null,"Phonebook"),a.a.createElement(d,{message:R,messageStatus:I}),a.a.createElement(i,{onChange:function(e){C(e.target.value.toLowerCase())}}),a.a.createElement("h3",null,"Add a New"),a.a.createElement(s,{changeName:function(e){p(e.target.value)},changeNumber:function(e){S(e.target.value)},addPerson:function(e){if(e.preventDefault(),t.some((function(e){return e.name===b}))){if(""!==w&&window.confirm("".concat(b," is already added to phonebook! - Do you want to update phonenumber?"))){var n=t.find((function(e){return e.name===b})),r=function(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?y(t,!0).forEach((function(n){Object(c.a)(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):y(t).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}({},n,{number:w});O(n.id,r).then((function(e){return o(t.map((function(t){return t.id!==n.id?t:e})))}))}}else v({name:b,number:w}).then((function(e){return o(t.concat(e))}),J("message"),T("Added ".concat(b," to the phonebook")),setTimeout((function(){T(null)}),5e3),p(""),S("")).catch((function(e){J("error"),T(e.response.data.error),setTimeout((function(){T(null)}),5e3,p(""),S(""))}))},newName:b,newNumber:w,persons:t}),a.a.createElement("h3",null,"Numbers"),a.a.createElement(f,{persons:t,search:P,handleRemoval:function(e,n){window.confirm("Do you really want to delete ".concat(n))&&E(e).then(o(t.filter((function(n){return n.id!==e}))),J("message"),T("".concat(n," have been succesfully removed from the server")),setTimeout((function(){T(null)}),5e3)).catch((function(e){T("Information of ".concat(n," has already been removed form server")),J("error"),setTimeout((function(){J("message"),T(null)}),5e3)}))}}))};u.a.render(a.a.createElement(j,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.22a92018.chunk.js.map