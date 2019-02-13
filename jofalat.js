// ==UserScript==
// @name         Jofalat!
// @version      0.1
// @match        https://www.jofalat.hu/etlap.htm
// @require      https://code.jquery.com/jquery-3.3.1.min.js
// @grant        none
// ==/UserScript==


setInterval(function() {
   'use strict';

   $('td.etelbox[style*="background-color"]').empty();
}, 1000);
