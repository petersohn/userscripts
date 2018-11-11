// ==UserScript==
// @name         Youtube No Playlist
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Add a link to YouTube playlists to play video without list.
// @author       You
// @match        https://www.youtube.com/*
// @grant        none
// ==/UserScript==

var previousUrl = ""

setInterval(function() {
    if (document.URL != previousUrl) {
        let contents = document.querySelector("div#contents");
        if (contents == null) {
            return;
        }
        previousUrl = document.URL;
        let elements = contents.querySelectorAll("a.ytd-playlist-video-renderer");
        for (let i = 0; i < elements.length; ++i) {
            let match = elements[i].href.match(".*?v=\\w*");
            if (match.length == 0) {
                continue;
            }
            let link = document.createElement("a");
            link.setAttribute("href", match[0]);
            link.innerHTML = "watch without list";
            let title = elements[i].querySelector("span#video-title");
            title.appendChild(link);
        }
    }
}, 1000);
