"use strict";

Object.defineProperty(exports, "__esModule", {
   value: true
});
var stripHTML = function stripHTML(html) {
   var tmp = document.createElement("DIV");
   tmp.innerHTML = html;
   return tmp.textContent || tmp.innerText || "";
};

exports.stripHTML = stripHTML;