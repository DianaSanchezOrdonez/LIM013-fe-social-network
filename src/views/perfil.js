export default () => {
  const viewProfile = `
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
                          <li><i class="fas fa-users"></i><a href="#/contactos">Contactos</a></li>
                          <li><i class="fas fa-grin-alt"></i><a href="#/profile">Perfil</a></li>
                          <li><i class="fas fa-sign-out-alt"></i><a href="#/" id="sign-out-btn">Cerrar Sesión</a></li>
                      </ul>
                  </div>
              </section>
          </nav>
    </header>
    <main class="main-container">
    <aside class="main-container_aside_profile">
        <section class="card">
            <img src=" " alt="">
            <div class="card-profileinfo">
                <h3></h3>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, fuga.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam delectus soluta voluptatum officiis reiciendis, corporis cupiditate sequi magnam obcaecati molestias.</p>
            </div>
            <button class="btn-editar-profile">Editar Perfil</button>
        </section>
    </aside>

    <section class="main-container_section_profile">
        <section class="card">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam delectus soluta voluptatum officiis reiciendis, corporis cupiditate sequi magnam obcaecati molestias.</p>
            <img class="img-card-profile" src="img/ejemplo.jpg" alt="">
        </section>   
        <section class="card">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam delectus soluta voluptatum officiis reiciendis, corporis cupiditate sequi magnam obcaecati molestias.</p>
            <img class="img-card-profile" src="img/ejemplo.jpg" alt="">
        </section>            
    </section>
    </main>
    <footer class="main-footer">&copy; Por Giovand & Diana</footer>`;

  const divElement = document.createElement("section");
  divElement.classList.add("container");
  divElement.innerHTML = viewProfile;

  const nameLocal = localStorage.getItem('name');

  /* --DESPLEGAR EL MENU---*/
  const toggleMenu = divElement.querySelector(".menu");

  const profileImg = divElement.querySelector(".profile");
  profileImg.addEventListener("click", () => {
    toggleMenu.classList.toggle("active");
  });

  /* --ESCONDER EL MENÚ AL HACER CLICK EN LA VENTANA---*/
  const mainContainer = divElement.querySelector(".main-container");
  mainContainer.addEventListener("click", () => {
    toggleMenu.classList.remove("active");
  });

   /* --PINTAR EL NOMBRE DEL USUARIO ---*/
   const nameSpan = divElement.querySelector('.menu p span');
   nameSpan.innerText = nameLocal;

  /* --USAR EL OBSERVADOR DE CAMBIO DE ESTADO---*/
  const photoProfile = divElement.querySelector(".main-container_aside_profile .card ");
  const cardProfileinfo = divElement.querySelector('.card-profileinfo');
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      
      if (user.photoURL && user.displayName) {
        profileImg.querySelector('img').src = user.photoURL;
        photoProfile.querySelector("img").src = user.photoURL;
        cardProfileinfo.querySelector('h3').innerText = user.displayName;
      
      } else {
        profileImg.querySelector('img').src = 'img/ejemplo.jpg';
        photoProfile.querySelector("img").src = "img/ejemplo.jpg";
        cardProfileinfo.querySelector('h3').innerText = nameLocal;
      }
    } else {
      console.log("Estas fuera de sesion");
    }
  });

  return divElement;
};
