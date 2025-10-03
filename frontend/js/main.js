document.getElementById('fetchBtn').addEventListener('click', async () => {
    const outputElement = document.getElementById('output');
    try {
        const response = await fetch(`${window.APP_CONFIG.API_BASE_URL}/api/hello`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        outputElement.textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        outputElement.textContent = `Error: ${error.message}`;
        console.error('There was a problem with the fetch operation:', error);
    }
});
