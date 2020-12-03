// import { signIn } from '../controllers/firestore';
// // eslint-disable-next-line no-unused-vars
// import { initFirebase } from '../controllers/initialFirebase';

export default () => {
  const viewProfile = `
  <header class="main-header">
  <section class="logo">Aislados</section>
  <nav class="main-nav">
      <ul class="nav-container">
          <li class="nav-container_item"><a href="#/home" class="nav-container_link"><i class="fas fa-home"></i>&nbsp;Inicio</a></li>
          <li class="nav-container_item"><a href="#/contactos" class="nav-container_link"><i class="fas fa-users"></i>&nbsp;Contactos</a></li>
          <li class="nav-container_item"><a href="#/perfil" id ="profile-initial" class="nav-container_link"><i class="fas fa-grin-alt"></i>&nbsp;Perfil</a></li>
          <li class="nav-container_item"><a href="#/" class="nav-container_link"><i class="fas fa-home"></i>&nbsp;Cerrar Sesión</a></li>
      </ul>
  </nav>
  <section class="photo-perfil"><img src="./img/ejemplo.jpg" alt=""width="100px"></section>
  <span class="btn-menu">
      <i class="fa fa-bars"></i>
  </span>
</header>
    <section class="mod-profile">
      <h3 class="name-user" id="userName"></h3>
      <img class="img-edit-profile" src="./img/ejemplo.jpg "alt="" width="100px">
      
      <input id="file" type ="file"/>
      <div id="card" class="hidden">
      <p class="nombre-presentacion" id="name-edit">Nombre</p>
      <p class="presentacion" id="present-edit">Presentacion</p>
      </div>
      <button class="editar" type="button">Editar Cambios</button>

      <!--Modal-->

      <section id="modal" class="hidden">
        <form>
          <p>Usuario</p>
          <input class ="nombre" type="text" id="nombre"  placeholder="Ingresa tu nombre" required>
          <p>Usuario</p>
          <input class = "texto" type="text" id="nombre-usuario"  placeholder="Ingresa su nombre de usuario" required>
          <p>Descripcion</p>
          <input class = "description" type="text" id="user-description" placeholder="Ingresa Descripcion" required>
          <input class="modal-editar" type="submit" id="modal-editar" value="Guardar Cambios">
        </form>
      </section>
    </section>
    
    <!--publicaciones-->

    <main class="main">
    <section class="posts">
    <div class="post-one">
    <p>Buen humor!! </p>
    <img src="./img/ejemplo.jpg" alt=""width="100px">
    </div>
    </section>
    </main>
    
    `;

  const divElement = document.createElement('section');
  divElement.classList.add('container-profile');
  divElement.innerHTML = viewProfile;

  // const user = firebase.auth().currentUser;
  // Volver al profile
  const btn = divElement.querySelector('#profile-initial');
  btn.addEventListener('click', () => { window.location.hash = '#/home'; });

  return divElement;
};
