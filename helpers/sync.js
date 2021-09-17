async function sleep(interval) {
    return new Promise(resolve => setTimeout(resolve, interval));
}

async function waitForElement(interval, query) {
    while (true) {
        var element = query();
        if (element !== null) {
            return element;
        }
        await sleep(interval);
    }
}
