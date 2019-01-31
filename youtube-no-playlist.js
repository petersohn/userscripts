// ==UserScript==
// @name         Youtube No Playlist
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Add a link to YouTube playlists to play video without list.
// @author       You
// @match        https://www.youtube.com/*
// @grant        none
// ==/UserScript==

setInterval(function() {
    let allContents = document.querySelectorAll("div#contents");
    for (let j = 0; j < allContents.length; ++j) {
        let contents = allContents[j];
        let elements = contents.querySelectorAll("a.ytd-playlist-video-renderer");
        if (elements.length == 0) {
            continue;
        }
        for (let i = 0; i < elements.length; ++i) {
            let match = elements[i].href.match(".*?v=[^&]*");
            if (match.length == 0) {
                continue;
            }
            let link = elements[i].querySelector("a#watch-without-list");
            if (link != null) {
                link.setAttribute("href", match[0]);
            } else {
                link = document.createElement("a");
                link.setAttribute("href", match[0]);
                link.setAttribute("id", "watch-without-list");
                link.innerHTML = "watch without list";
                let title = elements[i].querySelector("span#video-title");
                title.appendChild(link);
            }
        }
        break;
    }
}, 1000);
