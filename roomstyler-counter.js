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
        const usernameElement = document.querySelector('.username');
        let username = null;
        if (usernameElement !== null) {
            username = usernameElement.innerHTML;
        }

        const cards = document.querySelectorAll('.room-card');
        let totalVotes = 0;
        let yourVotes = null;
        for (const card of cards) {
            const votes = card.querySelector('.no_votes');
            if (votes !== null) {
                const votesNumber = Number(votes.innerText);
                totalVotes += votesNumber;

                if (username !== null) {
                    const userNode = card.querySelector('a.user');
                    if (userNode !== null && userNode.innerText === username) {
                        yourVotes = votesNumber;
                    }
                }
            }
        }
        alert(`entries=${cards.length} votes=${totalVotes} your votes=${yourVotes}`);
    };
    btn.innerText = 'count';
    const contest_info = document.querySelector('.contest__info');
    if (contest_info !== null) {
        contest_info.appendChild(btn);
    }
})();
