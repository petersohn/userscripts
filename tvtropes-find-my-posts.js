// ==UserScript==
// @name         Find my posts
// @namespace    http://tampermonkey.net/
// @version      2024-01-18
// @description  Find my posts on TVTropes forums
// @author       You
// @match        https://tvtropes.org/pmwiki/posts.php?*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tvtropes.org
// @grant        none
// ==/UserScript==

const parent = document.querySelector('#main-container');
const btn = document.createElement('button');
btn.onclick = async () => {
    console.log('Start');
    const url = new URL(document.URL);
    url.hash = '';
    const currentPage = parseInt(url.searchParams.get('page') ?? '1');
    const newElements = [];
    for (let page = 1; page <= currentPage; ++page) {
        url.searchParams.set('page', page);
        console.log(url.toString());
        const response = await fetch(url);
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        for (const post of doc.querySelectorAll('div.comment-box')) {
            const user = post.querySelector('a.troper-name').innerText;
            console.log(post.id, user);
            if (user === tvtropes_config.handle) {
                console.log('Found!');
                newElements.push(post);
            }
        }
    }
    const article = document.querySelector('#main-article');
    for (const post of article.querySelectorAll('div.comment-box')) {
        article.removeChild(post);
    }
    const postButtonWrapper = article.querySelector('.post-button-wrapper');
    for (const element of newElements) {
        article.insertBefore(element, postButtonWrapper);
    }
};
btn.innerText = "find my posts";
parent.insertBefore(btn, parent.firstChild);
