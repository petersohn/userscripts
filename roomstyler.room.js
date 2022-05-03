// ==UserScript==
// @name         Roomstyler Viewer
// @namespace    http://tampermonkey.net/
// @version      1.0
// @author       You
// @match        https://roomstyler.com/rooms/*
// @icon         https://www.google.com/s2/favicons?domain=roomstyler.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const cover = document.querySelector('.cover-parallax');
    const a = document.createElement('a');
    a.href = cover.getAttribute('data-url');
    a.innerText = 'Image';
    document.querySelector('.cover').insertAdjacentElement('afterend', a);
})();
