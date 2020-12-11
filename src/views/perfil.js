/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import {
    getDataForm,
    saveData,
  } from '../controllers/perfil_controller.js';
  
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
          <section class="card" >
              <img src=" " alt="">
              <div class="card-profileinfo">
              <div class = "infoProfile">
              <p>...</p>
              <p>...</p>
              <p>...</p>
              </div>
              <button class="btn-editar-profile" id = "editProfile">Editar Perfil</button>
               <form id="card-container" class="ocultar">
                <p>Nombre</p>
                <input class="name" type="text" id="name"  placeholder="Ingresa tu nombre" required>
                <p>Apellidos</p>
                <input class="lastName" type="name" id="lastName"  placeholder="Ingresar Apellidos" required>
                <p>Descripcion</p>
                <input class="description" type="text" id="description"  placeholder="Breve descripcion" required>
                <button  type="submit" class="btn-editar-profile" id="saveProfile">Guardar Cambios</button>
                </form>
              </div>
              
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
    // getUserInfo().then(data => console.log(data));
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
    firebase.auth().onAuthStateChanged(async (user) => {
      await getDataForm(user.uid)
        .then((data) => {
          infoProfile.innerHTML = '';
          infoProfile.innerHTML += `
        <p>${data.data().name}</p>
        <p>${data.data().lastName}</p>
        <p>${data.data().description}</p>
        
        `;
        });
  
      if (user) {
        if (user.photoURL && user.displayName) {
          profileImg.querySelector('img').src = user.photoURL;
          photoProfile.querySelector('img').src = user.photoURL;
          // cardProfileinfo.querySelector('h3').innerText = user.displayName;
        } else {
          profileImg.querySelector('img').src = 'img/ejemplo.jpg';
          photoProfile.querySelector('img').src = 'img/ejemplo.jpg';
          cardProfileinfo.querySelector('h3').innerText = nameLocal;
        }
      } else {
        console.log('Estas fuera de sesion');
      }
    });
  
  
    // MOSTRANDO EL MODAL PARA EDITAR PERFIL
  
    const card = divElement.querySelector('#card-container');
    const button = divElement.querySelector('#editProfile');
    const infoProfile = divElement.querySelector('.infoProfile');
    button.addEventListener('click', (e) => {
      card.style.display = 'block';
      infoProfile.style.display = 'none';
      button.style.display = 'none';
    });
  
    card.addEventListener('submit', (e) => {
      e.preventDefault();
  
      const name = divElement.querySelector('#name');
      const lastName = divElement.querySelector('#lastName');
      const description = divElement.querySelector('#description');
      saveData(name.value, lastName.value, description.value);
      console.log(name.value, lastName.value, description.value);
      card.style.display = 'none';
      infoProfile.style.display = 'block';
      const idUser = firebase.auth().currentUser.uid;
      getDataForm(idUser)
        .then((data) => {
          console.log(data);
          infoProfile.innerHTML = '';
          infoProfile.innerHTML += `
        <p>${data.data().name}</p>
        <p>${data.data().lastName}</p>
        <p>${data.data().description}</p>
        `;
        });
      // name.focus();
    });
  
    return divElement;
  };
  