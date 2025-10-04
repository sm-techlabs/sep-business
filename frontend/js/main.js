import Router from './router.js';
import Home from './views/home.js';
import Login from './views/login.js';

const router = new Router({
  '/': Home,
  '/login': Login,
});

router.navigate(window.location.pathname);
