/* eslint-disable no-lone-blocks */
import { components } from '../views/components.js';

// eslint-disable-next-line consistent-return
const changeView = (route) => {
  const container = document.getElementById('container');
  container.innerHTML = '';
  switch (route) {
    case '#/': { return container.appendChild(components.login()); }
    // case '': { return container.appendChild(components.login()); }
    case '#': { return container.appendChild(components.login()); }
    case '#/home': { return container.appendChild(components.home()); }
    case '#/register': { return container.appendChild(components.register()); }
    case '#/profile': { return container.appendChild(components.profile()); }
    default:
      { container.appendChild(components.login()); }
      break;
  }
  // eslint-disable-next-line no-console
  /* console.log(route); */
};

const initRoute = () => {
  changeView(window.location.hash);
  window.addEventListener('hashchange', () => {
    changeView(window.location.hash);
  });
};

export { changeView, initRoute };
