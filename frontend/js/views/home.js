export default class Home {
  async render() {
    // Return the markup for the Home view
    return `
      <section>
        <h2>Welcome to SEP Business</h2>
        <button id="fetchBtn">Test backend connection</button>
        <pre id="output"></pre>
      </section>
    `;
  }

  afterRender() {
    // Attach event listeners after the view is in the DOM
    const btn = document.getElementById('fetchBtn');
    const outputElement = document.getElementById('output');

    btn.addEventListener('click', async () => {
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
  }
}
