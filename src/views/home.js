import {
  savePost,
  getPosts,
  deletePost,
  updatePost,
  fireAddSubcollection,
  signOut,
  saveComment,
  getComments
} from '../controllers/firestore.js';

export default () => {
  const viewInicio = `
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
        <section class="main-container_section">
            <form class="upload-post">
                <img id='image'>
                <textarea name="" id="post-description" rows="3" class="input-post" placeholder="¿Alguna reflexión?" required></textarea>
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
                    <img src=""><span><span>
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

  /* --PINTAR EL NOMBRE DEL USUARIO ---*/
  const nameSpan = divElement.querySelector('.menu p span');
  const asideSpan = divElement.querySelector('.aside-title span');
  nameSpan.innerText = nameLocal;
  asideSpan.innerText = nameLocal;

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
  const deleteImage = nameImage => ref.child(nameImage).delete().catch( error => console.log(error));

  /* --TRAER LA DATA DE LOS COMMENTS---*/
  const templateComments = (data, idPost) => {
    let template = '';
    for(let doc of data ){
      if(idPost === doc.refpost){
        console.log('idPost', idPost);
        console.log('doc.refpost', doc.refpost);
        template += `
        <div class="comment_section_two">
          <span>${doc.username}</span><label id="comment-label" for="">${doc.comment}</label>
        </div>
        `;
      }else{
        console.log('idPost', idPost);
        console.log('doc.refpost', doc.refpost);
        template = '';
      }
    }
    return template;
  }

  /* --TRAER LA DATA DE LOS POST Y EL TEMPLATE DE LOS CARD---*/
  const templateCard = (data) => {
    if (data.length) {
      cardsContainer.innerHTML = '';
      data.forEach(async(element) => {
        if(!element.imageURL){
          cardsContainer.innerHTML += `
            <section class="card" data-id=${element.id} >
              <section class="card-title"><img src="img/ejemplo.jpg" alt="">${element.name}</section>
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
                  ${ element.uid === firebase.auth().currentUser.uid ? '<div class="btn-options"><button class="btn-edit" >Editar</button> <button class="btn-update" >Actualizar</button><button class="btn-delete" >Eliminar</button></div>' :  ''}
              </section>
              <div class="comment_section">
                  <span>${nameLocal}</span><input id="comment-input" type="text">
              </div>
              <section class="comments">
                ${ templateComments(await getComments(), element.id)}
              </section>
            </section>`;
          /*   console.log('hola',cardsContainer.querySelectorAll('.comments'));
            templateComments(await getComments(element.id), cardsContainer.querySelectorAll('.comments'), element.id); */
        }else{
          cardsContainer.innerHTML += `
          <section class="card" data-id=${element.id}>
            <section class="card-title"><img src="img/ejemplo.jpg" alt="">${element.name}</section>
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
                ${ element.uid === firebase.auth().currentUser.uid ? '<div class="btn-options"><button class="btn-edit" >Editar</button> <button class="btn-update" >Actualizar</button><button class="btn-delete" >Eliminar</button></div>' :  ''}
            </section>
            <div class="comment_section">
                <span>${nameLocal}</span><input id="comment-input" type="text">
            </div>
            <section class="comments">
            </section>
          </section>`;
        }
      });

      const commentInputs = cardsContainer.querySelectorAll('#comment-input');
      // console.log('commentInputs', commentInputs);
      commentInputs.forEach((input) => {
        input.addEventListener('keypress', async(e) => {
          console.log('e.target.value', e.target.value);
          const cardFather = e.target.closest('.card');
          const comments = cardFather.querySelector('.comments');
          const idCard = cardFather.dataset.id;
          comments.innerHTML = ''; 
          if(e.keyCode === 13) {
            await saveComment(nameLocal, e.target.value, idCard)
            comments.innerHTML = `
              <div class="comment_section_two">
                  <span>${nameLocal}</span><label id="comment-label" for="">${e.target.value}</label>
              </div>
            `
          } 
        })
      })

      const btnsDelete = document.querySelectorAll('.btn-delete');
      btnsDelete.forEach((btn) => {
        btn.addEventListener('click', async (e) => {
          const cardFather = e.target.closest('.card');
          const cardImage = cardFather.querySelector('.card-image img');
          const idCard = cardFather.dataset.id;
          cardImage.dataset.filename = name;

          await deletePost(idCard); 
          /* await deleteImage(cardImage.dataset.filename); */  
          // eslint-disable-next-line no-shadow
          await getPosts((data) => {
            templateCard(data);
          });
        });
      });
      
      const btnsEdit = document.querySelectorAll('.btn-edit');
      btnsEdit.forEach((btn) => {
        btn.addEventListener('click', async (e) => {
          const cardFather = e.target.closest('.card');
          const idCard = cardFather.dataset.id;
          const input = cardFather.querySelector('#input-user-description');
          const btnUpdate = cardFather.querySelector('.btn-update');
          input.disabled = false;
          // eslint-disable-next-line no-param-reassign
          btn.style.display = 'none';
          btnUpdate.style.display = 'flex';
          input.focus();

          id = idCard;
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
            templateCard(data);
          });
        });
      });

      const likesCard = document.querySelectorAll('.like i');
      likesCard.forEach((btn) => {
        btn.addEventListener('click', (e) => {
          console.log(e.target);
        })
      })
    } else {
      cardsContainer.innerHTML = ' <img src="/img/icons8_empty_box_5.svg"><p> No hay publicaciones pendientes </p> ';
    }
  };

  let uid = '';

  /* --USAR EL OBSERVADOR DE CAMBIO DE ESTADO---*/
  const photoAside = divElement.querySelector('.aside-title img');
  /* const photoimgCard = cardsContainer.querySelector('.card-title img'); */
  firebase.auth().onAuthStateChanged( (user) => {
    if (user) {
      /* console.log('user', user);  */
      if( user.photoURL ){
        profileImg.querySelector('img').src = user.photoURL;
        photoAside.src = user.photoURL;
        /* photoimgCard.src = user.photoURL; */
      }else{
        profileImg.querySelector('img').src = 'img/ejemplo.jpg';
        photoAside.src = 'img/ejemplo.jpg';
        /* photoimgCard.src = 'img/ejemplo.jpg' */
      }
      uid = user.uid;

      getPosts((data) => {
        /* data.forEach(async(post) => {
          await fireAddSubcollection( user.uid, user.displayName, user.email, post.id) 
        }) */
        templateCard(data);
      
      });
    } else {
      console.log('Estas fuera de sesion');
    }
  });

  /* --GUARDAR EL POST EN EL FORM PRINCIPAL---*/
  postForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const description = postForm['post-description'];
    await savePost(nameLocal, description.value, imageURL, uid)
    await getPosts((data) => {
      // console.log(data);
      templateCard(data);
    });
    postForm.reset();
    image.src = '';
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
