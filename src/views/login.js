/* eslint-disable no-console */
// import { auth, fstore } from '../controllers/initialFirebase.js';
import {
    signIn,
    signInWithGoogle,
    signInWithFacebook,
  } from '../controllers/login_controller.js';
  
  export default () => {
    const viewLogin = `
      <img class="image" src="./img/imageAislados.png" alt="imagen aislados" >
      <main class="right-side">
        <form class="form-login">
          <h2 class="text-center"> Aislados </h2>
          <section class="redes">
            <button class="btn-redes-g"><i class="fab fa-google"></i></button>
            <button class="btn-redes-f"><i class="fab fa-facebook-f"></i></button>
          </section>
          
          <p class="text-sign-in">También puedes ingresar con tu cuenta personal</p>
          <p class="message-error"></p>
          <div class="input-container">
            <label for="email">Correo</label>
            <input type="email" id="email" name="email" required>
          </div>
          <div class="input-container">
            <label for="password">Contraseña</label>
            <input type="password" id="password" name="password" placeholder="Debe ser mínimo 6 caracteres" required>
          </div>
          <button class="btn-login" id="btn-login" value="Iniciar Sesion" type ="submit">Iniciar Sesión</button>
          <p class="text-sign-in">¿Aún no tienes cuenta? <a href="#/register">Registrarse</a></p> 
        
        </form>
      </main>
    `;
  
    const divElement = document.createElement('section');
    divElement.classList.add('container-login');
    divElement.innerHTML = viewLogin;
    // eslint-disable-next-line
    const regExp = /@\w+([\.-]?\w+)/g;
    let name = '';
  
    const loginBtn = divElement.querySelector('.form-login');
    loginBtn.addEventListener('submit', (e) => {
      e.preventDefault();
  
      const inputEmail = document.querySelector('#email').value;
      const inputPassword = document.querySelector('#password').value;
      /* console.log(inputEmail, inputPassword); */
  
      signIn(inputEmail, inputPassword)
        .then((result) => {
          /* console.log('resultNormal', result); */
          name = result.user.email.split(regExp)[0];
          localStorage.setItem('name', name);
          /* console.log('name1', name); */
          window.location.hash = '#/home';
        })
        .catch((error) => {
          document.querySelector('.message-error').innerHTML = `${error.message}`;
          loginBtn.reset();
        });
    });
    /* -------Login with Google------------------*/
    const btnGoogle = divElement.querySelector('.btn-redes-g');
    btnGoogle.addEventListener('click', () => {
      // e.preventDefault();
      signInWithGoogle()
        .then((result) => {
          console.log('resultGoogle', result);
          name = result.additionalUserInfo.profile.given_name;
          name = name.split(regExp)[0];
          localStorage.setItem('name', name);
          /* console.log('name2', name);  */
          window.location.hash = '#/home';
        })
        .catch(error => console.log('error', error));
    });
    /* -------Login with Facebook------------------*/
    const btnFacebook = divElement.querySelector('.btn-redes-f');
    btnFacebook.addEventListener('click', (e) => {
      e.preventDefault();
      signInWithFacebook()
        .then((result) => {
          console.log('resultFacebook', result);
          name = result.additionalUserInfo.profile.name;
          name = name.split(regExp)[0];
          localStorage.setItem('name', name);
  
          window.location.hash = '#/home';
        })
        .catch(error => console.log('error', error));
    });
  
    return divElement;
  };
  