export default class Router {
  constructor(routes) {
    this.routes = routes;
    this.root = document.getElementById('app');

    // Handle browser navigation (back/forward)
    window.addEventListener('popstate', () => this.navigate(window.location.pathname));

    // Handle link clicks with [data-link]
    document.addEventListener('click', e => {
      const link = e.target.closest('[data-link]');
      if (link) {
        e.preventDefault();
        this.navigate(link.getAttribute('href'));
      }
    });
  }

  async navigate(pathname) {
    const route = this.routes[pathname] || this.routes['/'];
    const view = new route();
    this.root.innerHTML = await view.render();
    if (view.afterRender) view.afterRender();
    history.pushState({}, '', pathname);
  }
}
