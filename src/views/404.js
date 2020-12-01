export default () => {
  const viewNotfound = `
  <header class="main-header">
    <section class="logo">Aislados</section>
    <nav class="main-nav">
        <section class="action-img">
            <div class="profile">
                <img src="" alt="">
            </div>
            <div class="menu">
                <p>Bienvenidx<br><span></span></p>
                <ul>
                    <li><i class="fas fa-home"></i><a href="#/home">Inicio</a></li>
                    <li><i class="fas fa-users"></i><a href="#contactos">Contactos</a></li>
                    <li><i class="fas fa-grin-alt"></i><a href="#perfil">Perfil</a></li>
                    <li><i class="fas fa-sign-out-alt"></i><a href="#" id="sign-out-btn">Cerrar Sesión</a></li>
                </ul>
            </div>
        </section>
    </nav>
  </header>
  <main class="main-container">
    <section class="main-container_section_notfound">
      <img src="img/icons8_road_closure_3.svg" alt="">
      <p>Opps! error 404</p>
    </section>
  </main>
  <footer class="main-footer">&copy; Por Giovand & Diana</footer>
              `;
  const divElement = document.createElement('section');
  divElement.classList.add('container');
  divElement.innerHTML = viewNotfound;

  /* --DESPLEGAR EL MENU---*/
  const toggleMenu = divElement.querySelector('.menu');

  const profileImg = divElement.querySelector('.profile');
  profileImg.addEventListener('click', () => {
    toggleMenu.classList.toggle('active');
  });

  /* --ESCONDER EL MENÚ AL HACER CLICK EN LA VENTANA---*/
  const mainContainer = divElement.querySelector('.main-container')
  mainContainer.addEventListener('click', () => {
    toggleMenu.classList.remove('active');
  })

  /* --USAR EL OBSERVADOR DE CAMBIO DE ESTADO---*/
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log('user', user); 
      if( user.photoURL ){
        profileImg.querySelector('img').src = user.photoURL
      }else{
        profileImg.querySelector('img').src = 'img/ejemplo.jpg'
      }
    } else {
      console.log('Estas fuera de sesion');
    }
  });

  return divElement;
};
