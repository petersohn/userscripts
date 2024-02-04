// ==UserScript==
// @name         Find my posts
// @namespace    http://tampermonkey.net/
// @version      2024-02-04
// @description  Find my posts on TVTropes forums
// @author       You
// @match        https://tvtropes.org/pmwiki/posts.php?*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tvtropes.org
// @grant        none
// ==/UserScript==

const parent = document.querySelector('#main-container');

const pageNumber = document.createElement('input');
pageNumber.type = 'number';
pageNumber.min = 1;
pageNumber.max = document.querySelector('nav.pagination-box').getAttribute('data-total-pages');
pageNumber.value = 1;
pageNumber.style = 'width: 50px;';

const btn = document.createElement('button');
btn.onclick = async () => {
    if (!pageNumber.checkValidity()) {
        pageNumber.value = 1;
    }
    const firstPage = parseInt(pageNumber.value);
    pageNumber.disabled = true;
    btn.disabled = true;
    try {
        console.log('Start page', firstPage);
        const url = new URL(document.URL);
        url.hash = '';
        const currentPage = parseInt(url.searchParams.get('page') ?? '1');
        const newElements = [];
        for (let page = firstPage; page <= currentPage; ++page) {
            pageNumber.value = page;
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
                    const link = post.querySelector('a.troper-post-time');
                    const url2 = new URL(url);
                    url2.hash = post.id;
                    link.href = url2.toString();
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
    } finally {
        pageNumber.value = firstPage;
        pageNumber.disabled = false;
        btn.disabled = false;
    }
};
btn.innerText = "find my posts";
parent.insertBefore(pageNumber, parent.firstChild);
parent.insertBefore(btn, parent.firstChild);
