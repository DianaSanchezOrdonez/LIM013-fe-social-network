import Login from './login.js';
import Inicio from './home.js';
import Register from './register.js';
/* import Contactos from './contactos.js'
import Perfil from './perfil.js'
import inicio from './inicio.js' */
import NotFound from './404.js';

const components = {
  login: Login,
  home: Inicio,
  register: Register,
  notfound: NotFound,
};

export { components };
