import Login from './login.js';
import Inicio from './home.js';
import Register from './register.js';
import Profile from './perfil.js';
/* import Contactos from './contactos.js'*/
import NotFound from './404.js';

const components = {
  login: Login,
  home: Inicio,
  register: Register,
  profile : Profile,
  notfound: NotFound,
};

export { components };
