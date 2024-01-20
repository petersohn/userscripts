// ==UserScript==
// @name         Quoteblock to forum posts
// @namespace    http://tampermonkey.net/
// @version      2024-01-15
// @description  Add [[quoteblock]]/[[/quoteblock]] widget to forum post editor.
// @author       You
// @match        https://tvtropes.org/pmwiki/addpost.php*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tvtropes.org
// @grant        none
// ==/UserScript==

(function() {
    const element = document.querySelector('#smileyPanel');
    if (element === null) {
        return;
    }

    const open = document.createElement('img');
    open.src = 'https://static.tvtropes.org/pmwiki/pub/images/openquote.png';
    open.alt = '[[quoteblock]]';
    open.title = '[[quoteblock]]';
    element.appendChild(open);

    const close = document.createElement('img');
    close.src = 'https://static.tvtropes.org/pmwiki/pub/images/closequote.png';
    close.alt = '[[/quoteblock]]';
    close.title = '[[/quoteblock]]';
    element.appendChild(close);
})();
