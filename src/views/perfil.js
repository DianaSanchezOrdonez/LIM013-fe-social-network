/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import { getUserInfo } from '../controllers/firestore.js';

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
            <div class="card-profileinfo" id = "modal1">
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

  const divElement = document.createElement('section');
  divElement.classList.add('container');
  divElement.innerHTML = viewProfile;
  getUserInfo().then(data => console.log(data));
  const nameLocal = localStorage.getItem('name');
  /* --DESPLEGAR EL MENU---*/
  const toggleMenu = divElement.querySelector('.menu');

  const profileImg = divElement.querySelector('.profile');
  profileImg.addEventListener('click', () => {
    toggleMenu.classList.toggle('active');
  });

  /* --ESCONDER EL MENÚ AL HACER CLICK EN LA VENTANA---*/
  const mainContainer = divElement.querySelector('.main-container');
  mainContainer.addEventListener('click', () => {
    toggleMenu.classList.remove('active');
  });

  /* --PINTAR EL NOMBRE DEL USUARIO ---*/
  const nameSpan = divElement.querySelector('.menu p span');
  nameSpan.innerText = nameLocal;

  /* --USAR EL OBSERVADOR DE CAMBIO DE ESTADO---*/
  const photoProfile = divElement.querySelector('.main-container_aside_profile .card ');
  const cardProfileinfo = divElement.querySelector('.card-profileinfo');
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      if (user.photoURL && user.displayName) {
        profileImg.querySelector('img').src = user.photoURL;
        photoProfile.querySelector('img').src = user.photoURL;
        cardProfileinfo.querySelector('h3').innerText = user.displayName;
      } else {
        profileImg.querySelector('img').src = 'img/ejemplo.jpg';
        photoProfile.querySelector('img').src = 'img/ejemplo.jpg';
        cardProfileinfo.querySelector('h3').innerText = nameLocal;
      }
      getUserInfo((data) => {});
    } else {
      console.log('Estas fuera de sesion');
    }
  });


  // MOSTRANDO EL MODAL PARA EDITAR PERFIL
  const open = divElement.querySelector('.btn-editar-profile');
  open.addEventListener('click', () => {
    cardProfileinfo.innerHTML = '';
    cardProfileinfo.innerHTML += `
      <form id="card-modal">
          <p>Nombre</p>
          <input class ="name" type="text" id="name"  placeholder="Ingresa tu nombre" required>
          <p>Apellidos</p>
          <input class = "lastName" type="name" id="lastName"  placeholder="Ingresar Apellidos" required>
          <p>Descripcion</p>
          <input class = "description" type="text" id="description"  placeholder="Breve descripcion" required>
          
        </form>
    `;
    open.innerText = 'Guardar Cambios';
    const db = firebase.firestore();
    const formElement = divElement.querySelector('#card-modal');
    const name = formElement.querySelector('#name');
    const lastName = formElement.querySelector('#lastName');
    const description = formElement.querySelector('#description');
    console.log(name);
    const close = divElement.querySelector('#close');
    open.addEventListener('click', () => {
      db.collection('modalEdit').doc().set({
        name: name.value,
        lastName: lastName.value,
        description: description.value,
      });
    });
  });

  return divElement;
};
