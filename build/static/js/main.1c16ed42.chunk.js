(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{14:function(e,n,t){e.exports=t(37)},19:function(e,n,t){},37:function(e,n,t){"use strict";t.r(n);var a=t(0),o=t.n(a),r=t(13),l=t.n(r),u=(t(19),t(2)),c=function(e){return o.a.createElement("form",null,o.a.createElement("div",null,"filter shown with: ",o.a.createElement("input",{onChange:function(n){e.setFilter(n.target.value)}})))},s=t(3),m=t.n(s),i="/api/persons",f=function(){return m.a.get(i)},b=function(e){return m.a.post(i,e)},d=function(e,n){return m.a.put("".concat(i,"/").concat(e),n)},w=function(e){return m.a.delete("".concat(i,"/").concat(e))},h=function(e){return o.a.createElement("div",null,o.a.createElement("form",{onSubmit:function(n){if(n.preventDefault(),-1===e.persons.findIndex((function(n){return n.name===e.newName})))e.setPersons(e.persons.concat({name:e.newName,number:e.newNumber})),e.setNewName(""),e.setNumber(""),b({name:e.newName,number:e.newNumber}).then((function(e){console.log(e)})),e.setMessage("Added: "+e.newName);else{var t=window.confirm(e.newName+" is already in the phonebook. Would you like to replace the old number with the new one?"),a=e.persons.find((function(n){return e.newName===n.name}));console.log("Person:",a),console.log("id",a.id),console.log("New Name:"+e.newName),console.log("New Number:",e.newNumber),!0===t&&d(a.id,{name:e.newName,number:e.newNumber}).then((function(n){console.log(n),e.setMessage("Changed phone number of: "+e.newName+" to: "+e.newNumber)})).catch((function(n){console.log(n.response.data),e.setMessage("Information of "+e.newName+" has already been removed from the server")}))}}},o.a.createElement("div",null,"name: ",o.a.createElement("input",{onChange:function(n){e.setNewName(n.target.value)}}),o.a.createElement("br",null),"phone number: ",o.a.createElement("input",{onChange:function(n){e.setNumber(n.target.value)}})),o.a.createElement("div",null,o.a.createElement("button",{type:"submit"},"add"))))},p=function(e){console.log("Filter Lenght",e.filter.length),console.log("Persons:",e.persons);var n=0===e.filter.length?e.persons:e.persons.filter((function(n){return n.name.includes(e.filter)}));return console.log(n),o.a.createElement("div",null,n.map((function(e,n){return o.a.createElement("li",{key:n},e.name," ",e.number," ",o.a.createElement("button",{onClick:function(){return function(e){window.confirm("Delete "+e.name+"?"),w(e.id).then((function(e){console.log(e)}))}(e)}},"Delete"))})))},N=function(e){var n=e.message;return null===n?null:o.a.createElement("div",{className:"update"},n)},g=function(){var e=Object(a.useState)([]),n=Object(u.a)(e,2),t=n[0],r=n[1],l=Object(a.useState)(""),s=Object(u.a)(l,2),m=s[0],i=s[1],b=Object(a.useState)(""),d=Object(u.a)(b,2),w=d[0],g=d[1],E=Object(a.useState)(""),v=Object(u.a)(E,2),j=v[0],O=v[1],k=Object(a.useState)(null),S=Object(u.a)(k,2),y=S[0],C=S[1];return Object(a.useEffect)((function(){f().then((function(e){r(e.data)}))}),[]),console.log("Database:",t),o.a.createElement("div",null,o.a.createElement(N,{message:y}),o.a.createElement("h2",null,"PhoneBook"),o.a.createElement(c,{setFilter:i}),o.a.createElement("h2",null,"Add a new"),o.a.createElement(h,{persons:t,newName:w,newNumber:j,filter:m,setPersons:r,setNewName:g,setNumber:O,setMessage:C}),o.a.createElement("h2",null,"Numbers"),o.a.createElement(p,{filter:m,setFilter:i,persons:t}))};l.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(g,null)),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.1c16ed42.chunk.js.map