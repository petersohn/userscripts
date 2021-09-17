// ==UserScript==
// @name         Roomstyler counter
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Count cards and votes. Load all items first.
// @author       You
// @match        https://roomstyler.com/contests/*
// @icon         https://www.google.com/s2/favicons?domain=roomstyler.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const btn = document.createElement('button');
    btn.onclick = function() {
        const cards = document.querySelectorAll('.room-card');
        let totalVotes = 0;
        for (const card of cards) {
            const votes = card.querySelector('.no_votes');
            if (votes !== null) {
                totalVotes += Number(votes.innerText);
            }
        }
        alert(`entries=${cards.length} votes=${totalVotes}`);
    };
    btn.innerText = 'count';
    const contest_info = document.querySelector('.contest__info');
    if (contest_info !== null) {
        contest_info.appendChild(btn);
    }
})();
