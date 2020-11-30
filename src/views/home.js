import {
  savePost,
  getPosts,
  deletePost,
  updatePost,
  signOut,
} from '../controllers/firestore.js';

export default () => {
  const viewInicio = `
    <header class="main-header">
          <section class="logo">Aislados</section>
          <nav class="main-nav">
              <section class="action-img">
                  <div class="profile">
                      <img src="img/ejemplo.jpg" alt="">
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
        <section class="main-container_section">
            <form class="upload-post">
          
                <img id='image'>
                <textarea name="" id="post-description" rows="3" class="input-post" placeholder="¿Alguna reflexión?"></textarea>
                <div class="upload-options">  
                  <button id='btn-save'><i class="fas fa-save"></i>&nbsp;Guardar</button>
                  <input class="image-upload-input" type="file" id="post-image">  
                  
                </div>
            </form>
            <section class="card-container">
               
            </section>
        </section>
        <aside class="main-container_aside">
            <section class="aside-post_section">
                <div class="aside-title">
                    <img src="./img/ejemplo.jpg" alt=""><span><span>
                </div>
                <p class="aside-description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto, qui!</p>
                <div class="aside-post">
                    <img src="./img/ejemplo.jpg" alt="" class="aside-post-img">
                    <img src="./img/ejemplo.jpg" alt="" class="aside-post-img">
                    <img src="./img/ejemplo.jpg" alt="" class="aside-post-img">
                    <img src="./img/ejemplo.jpg" alt="" class="aside-post-img">
                    <img src="./img/ejemplo.jpg" alt="" class="aside-post-img">
                    <img src="./img/ejemplo.jpg" alt="" class="aside-post-img">
                </div>
            </section>
        </aside>
    </main>
    <footer class="main-footer">&copy; Por Giovand & Diana</footer>
    `;
  const divElement = document.createElement('section');
  divElement.classList.add('container');
  divElement.innerHTML = viewInicio;

  const postForm = divElement.querySelector('.upload-post');
  const cardsContainer = divElement.querySelector('.card-container');
  const signOutBtn = divElement.querySelector('#sign-out-btn');

  let id = '';
  let imageURL = '';

  const nameLocal = localStorage.getItem('name');

  /* --PINTAR EL NOMBRE DEL USUARIO ---*/
  const nameSpan = divElement.querySelector('.menu p span');
  const asideSpan = divElement.querySelector('.aside-title span');
  nameSpan.innerText = nameLocal;
  asideSpan.innerText = nameLocal;

  /* --DESPLEGAR EL MENU---*/
  const profileImg = divElement.querySelector('.profile');
  profileImg.addEventListener('click', () => {
    const toggleMenu = divElement.querySelector('.menu');
    toggleMenu.classList.toggle('active');
  });

  /* --SUBIR IMAGEN CON STORAGE---*/
  let file = postForm.querySelector('.image-upload-input');
  const image = divElement.querySelector('#image');
  const ref = firebase.storage().ref();
  let name = '';

  file.addEventListener('change', () => {
    file = file.files[0];

    name = file.name;

    const metadata = {
      contentType: file.type,
    };

    const task = ref.child(name).put(file, metadata);
    task
      .then(snapshot => snapshot.ref.getDownloadURL())
      .then((url) => {
        /* console.log(url); */
        image.src = url;
        imageURL = url;
      });
  });
  /* --ELIMINAR LA IMAGEN TAMBIEN DEL STORAGE---*/
  const deleteImage = nameImage => ref.child(nameImage).delete();
  /* --TRAER LA DATA DE LOS POST Y EL TEMPLATE DE LOS CARD---*/
  const templateCard = (data) => {
    if (data.length) {
      cardsContainer.innerHTML = '';
      data.forEach((element) => {
        cardsContainer.innerHTML += `
        <section class="card">
          <section class="card-title"><img src="./img/ejemplo.jpg" alt="">${element.name}</section>
          <section class="card-image"><img src="${element.imageURL}" alt="" data-filename=${name}></section>
          <section class="card-description"><input type="text" id="input-user-description" placeholder='${element.description}' disabled></section>
          <section class="card-options">
              <section class="options-like-comment">
                <div class="like">
                    <i class="fas fa-heart"></i>
                    <span>12k</span>
                </div>
                <div class="comment">
                    <i class="fas fa-comment"></i>
                    <span>12k</span>
                </div>
              
              </section>
              <div class="btn-options">
                <button class="btn-edit" data-id=${element.id}>Editar</button>
                <button class="btn-update" data-id=${element.id}>Actualizar</button>
                <button class="btn-delete" data-id=${element.id}>Eliminar</button>
              </div>
          </section>
        </section>`;
      });

      const btnsDelete = document.querySelectorAll('.btn-delete');
      btnsDelete.forEach((btn) => {
        btn.addEventListener('click', async (e) => {
          const cardFather = e.target.closest('.card');
          const cardImage = cardFather.querySelector('.card-image img');
          cardImage.dataset.filename = name;
          console.log('nameprueba', name);
          /* console.log(e.target); */
          await deletePost(e.target.dataset.id);
          await deleteImage(cardImage.dataset.filename);
          // eslint-disable-next-line no-shadow
          await getPosts((data) => {
            // console.log(data);
            templateCard(data);
          });
        });
      });

      const btnsEdit = document.querySelectorAll('.btn-edit');
      btnsEdit.forEach((btn) => {
        btn.addEventListener('click', async (e) => {
          const cardFather = e.target.closest('.card');
          const input = cardFather.querySelector('#input-user-description');
          const btnUpdate = cardFather.querySelector('.btn-update');
          input.disabled = false;
          // eslint-disable-next-line no-param-reassign
          btn.style.display = 'none';
          btnUpdate.style.display = 'flex';
          input.focus();

          id = e.target.dataset.id;
        });
      });

      const btnsUpdate = document.querySelectorAll('.btn-update');
      btnsUpdate.forEach((btn) => {
        btn.addEventListener('click', async (e) => {
          // eslint-disable-next-line no-param-reassign
          btn.style.display = 'block';
          const cardFather = e.target.closest('.card');
          const input = cardFather.querySelector('#input-user-description');

          await updatePost(id, {
            description: input.value,
          });
          input.disabled = true;
          // eslint-disable-next-line no-shadow
          await getPosts((data) => {
            // console.log(data);
            templateCard(data);
          });
        });
      });
    } else {
      cardsContainer.innerHTML = ' <p> No hay publicaciones pendientes </p> ';
    }
  };

  /* --GUARDAR EL POST EN EL FORM PRINCIPAL---*/
  postForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const description = postForm['post-description'];
    await savePost(nameLocal, description.value, imageURL);
    await getPosts((data) => {
      // console.log(data);
      templateCard(data);
    });
    postForm.reset();
    image.src = '';
  });

  /* --USAR EL OBSERVADOR DE CAMBIO DE ESTADO---*/
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      /*  console.log('user', user); */
      getPosts((data) => {
        // console.log(data);
        templateCard(data);
      });
    } else {
      console.log('Estas fuera de sesion');
    }
  });

  /* --SALIR DE SESIÓN---*/
  signOutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    signOut().then(() => {
      console.log('signOut...');
      window.location.hash = '#/';
    });
  });

  return divElement;
};
