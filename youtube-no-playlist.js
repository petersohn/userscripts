// ==UserScript==
// @name         Youtube No Playlist
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Add a link to YouTube playlists to play video without list.
// @author       You
// @match        https://www.youtube.com/playlist?*
// @require      https://raw.githubusercontent.com/petersohn/userscripts/master/helpers/sync.js
// @grant        none
// ==/UserScript==

waitForElement(1000,
    function() {
        return document.querySelector("div#contents");
    }).then(function(contents) {
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
    })
