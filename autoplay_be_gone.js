// ==UserScript==
// @name         Autoplay Be Gone
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Switch off autoplay on YouTube.
// @author       Péter Szabados
// @match        https://www.youtube.com/watch*
// @grant        none
// ==/UserScript==

setInterval(function() {
    var button = document.querySelector("#improved-toggle")
    if (button !== null && button.getAttribute("aria-pressed") != "false") {
         button.click();
    }
}, 10000)
