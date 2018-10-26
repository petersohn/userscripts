async function waitForElement(interval, query) {
    while (true) {
        var element = query();
        if (element !== null) {
            return element;
        }
        await new Promise(resolve => setTimeout(resolve, interval));
    }
}
