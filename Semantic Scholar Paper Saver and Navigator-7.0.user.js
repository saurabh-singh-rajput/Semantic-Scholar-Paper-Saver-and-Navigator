// ==UserScript==
// @name         Semantic Scholar Paper Saver and Navigator
// @namespace    http://tampermonkey.net/
// @version      7.0
// @description  Save papers across all pages on Semantic Scholar
// @author       YourName
// @match        https://www.semanticscholar.org/search*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    async function savePapersOnPage() {
        console.log('Debug-1: Starting to save papers on this page');
        const saveButtons = document.querySelectorAll('button[data-heap-id="save_to_library"][data-test-id="cl-paper-library"]');
        console.log(`Found ${saveButtons.length} save buttons`);

        for (const button of saveButtons) {
            button.click();
            console.log('Debug-2: Clicked Save button');
            await waitForElement('button[data-heap-id="library_shelf_save_and_close_button"]');
            const saveAndCloseButton = document.querySelector('button[data-heap-id="library_shelf_save_and_close_button"]');
            if (saveAndCloseButton) {
                saveAndCloseButton.click();
                console.log('Debug-3: Clicked Save & Close button');
            }
            await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second before processing the next paper
        }
        console.log('Debug-4: Finished saving papers on this page');
    }

async function moveToNextPage() {
    // Updated selector to target the next page button
    const nextPageButtons = document.querySelectorAll('.cl-pager__button-label svg.icon-arrow-lite[data-test-id="icon-arrow-lite"]');
    if (nextPageButtons.length >= 2) {
        const nextPageButton = nextPageButtons[1]; // The second arrow should be for the next page
        const buttonElement = nextPageButton.closest('button');
        if (buttonElement && !buttonElement.disabled) {
            console.log('Debug-5: Next Page button found. Clicking...');
            buttonElement.click();
            await waitForPageLoad();
            return true;
        }
    }
    console.log('Debug-5: Next Page button not found or disabled. Reached the last page.');
    return false;
}
    function waitForElement(selector) {
        return new Promise(resolve => {
            if (document.querySelector(selector)) {
                return resolve(document.querySelector(selector));
            }

            const observer = new MutationObserver(mutations => {
                if (document.querySelector(selector)) {
                    resolve(document.querySelector(selector));
                    observer.disconnect();
                }
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        });
    }

    function waitForPageLoad() {
        return new Promise(resolve => {
            let checkReadyState = setInterval(() => {
                if (document.readyState === 'complete') {
                    clearInterval(checkReadyState);
                    setTimeout(resolve, 3000); // Wait an additional 3 seconds after page load
                }
            }, 100);
        });
    }

    async function processAllPages() {
        let hasNextPage = true;
        let pageCount = 1;
        while (hasNextPage) {
            console.log(`Debug-6: Processing page ${pageCount}`);
            await waitForSaveButtons();
            await savePapersOnPage();
            hasNextPage = await moveToNextPage();
            if (hasNextPage) {
                pageCount++;
                // Wait for a moment before processing the next page
                await new Promise(resolve => setTimeout(resolve, 4000));
            }
        }
        console.log('Debug-7: Finished processing all pages');
    }

    function waitForSaveButtons() {
        return new Promise(resolve => {
            function check() {
                if (document.querySelectorAll('button[data-heap-id="save_to_library"]').length > 0) {
                    console.log('Debug-8: Save buttons found');
                    resolve();
                } else {
                    console.log('Waiting for save buttons to appear...');
                    setTimeout(check, 1000);
                }
            }
            check();
        });
    }

    console.log('Debug-0: Script started');
    window.addEventListener('load', processAllPages);
})();