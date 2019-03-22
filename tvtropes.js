// ==UserScript==
// @name         TVTropes
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Remove ad notifications from TVTropes.
// @author       You
// @match        https://tvtropes.org/*
// @grant        none
// ==/UserScript==

waitForElement(1000,
    function() { return document.querySelector("a.close"); },
    function(button) { button.parentNode.parentNode.remove(); }, 1000);
