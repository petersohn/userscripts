// ==UserScript==
// @name         Jofalat!
// @version      0.2
// @match        https://jofalat.hu/etlap?tipus=heti
// @grant        none
// ==/UserScript==


setInterval(function() {
   'use strict';

    for (const e of document.querySelectorAll('div.is-flag-red')) {
        e.remove();
    }
}, 1000);
