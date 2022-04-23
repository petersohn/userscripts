// ==UserScript==
// @name         Roomstyler planner
// @namespace    http://tampermonkey.net/
// @version      1.1.0
// @description  Load all assets.
// @author       You
// @match        https://roomstyler.com/3dplanner*
// @icon         https://www.google.com/s2/favicons?domain=roomstyler.com
// @require      https://raw.githubusercontent.com/petersohn/userscripts/master/helpers/sync.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let working = false;
    let cancelled = false;

    const search = document.getElementById('search');
    if (search === null) {
        console.log('No search');
        return;
    }

    const btn = document.createElement('button');

    function stop() {
        working = false;
        cancelled = false;
        btn.innerText = 'Load all';
    }

    stop();
    btn.onclick = async function() {
        if (working) {
            console.log('working');
            cancelled = true;
            return;
        }
        working = true;
        btn.innerText = 'cancel loading';
        console.log('begin');
        let scroller = null;
        for (const selector of [
            '#view-search[style*="visibility: visible"]',
            '#view-materials-search[style*="visibility: visible"]',
            '#view-build[style*="visibility: visible"] .build-architecture-container[style=""]',
            '#view-build[style*="visibility: visible"] .build-architecture-container[style*="display: block"]',
            '#view-build[style*="visibility: visible"] .build-garden-container[style=""]',
            '#view-build[style*="visibility: visible"] .build-garden-container[style*="display: block"]',
         ]) {
            scroller = document.querySelector(`${selector} .scroller`);
            if (scroller !== null) {
                break;
            }
        }

        if (scroller === null) {
            console.log('No scroller');
            stop();
            return;
        }
        let current = scroller.scrollHeight;
        while (true) {
            scroller.scrollTo(0, scroller.scrollHeight);
            for (let i = 0; i < 20; ++i) {
                await sleep(100);
                if (cancelled || scroller.scrollHeight != current) {
                    break;
                }
            }
            if (cancelled || scroller.scrollHeight == current) {
                break;
            }
            current = scroller.scrollHeight;
        }
        console.log('end');
        stop();
    };
    search.after(btn);
})();

