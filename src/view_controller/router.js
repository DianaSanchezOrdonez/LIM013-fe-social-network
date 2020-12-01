import { components } from '../views/components.js';

// eslint-disable-next-line consistent-return
const changeView = (route) => {
  const container = document.getElementById('container');
  container.innerHTML = '';
  switch (route) {
    case '#/': { return container.appendChild(components.login()); }
    case '#': { return container.appendChild(components.login()); }
    case '': { return container.appendChild(components.login()); }
    case '#/home': { return container.appendChild(components.home()); }
    case '#/register': { return container.appendChild(components.register()); }
    default:
      return container.appendChild(components.notfound())
  }
  /* console.log(route); */
};

const initRoute = () => {
  changeView(window.location.hash);
  window.addEventListener('hashchange', () => {
    changeView(window.location.hash);
  });
};

export { changeView, initRoute };
