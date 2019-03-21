// ==UserScript==
// @name         TVTropes
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Remove ad notifications from TVTropes.
// @author       You
// @match        https://tvtropes.org/*
// @grant        none
// ==/UserScript==

setInterval(function() {
    let button = document.querySelector("a.close");
    if (button !== null) {
        button.click();
    }
}, 1000);
