// ==UserScript==
// @name         TVTropes
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Remove ad notifications from TVTropes.
// @author       You
// @match        https://tvtropes.org/*
// @require      https://raw.githubusercontent.com/petersohn/userscripts/master/helpers/sync.js
// @grant        none
// ==/UserScript==

waitForElement(1000,
    function() { return document.querySelector("a.close"); }).then(
    function(button) { button.parentNode.parentNode.remove(); }, 1000);
