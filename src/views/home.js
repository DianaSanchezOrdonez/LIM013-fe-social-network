import { signOut } from "../controllers/login_controller.js";
import {
  savePost,
  getPosts,
  deletePost,
  updatePost,
  addSubcollectionComments,
  addSubcollectionLikes,
  getSubcollectionComments,
  getSubcollectionLikes,
  deleteLike,
} from "../controllers/home_controller.js";

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
                
                <figure class="container-image-upload">
                  <img id="image">
                  <button class="close-button">&times;</button>
                </figure>
            
                <textarea name="" id="post-description" rows="2" class="input-post" placeholder="¿Alguna reflexión?" required></textarea>
                <div class="upload-options">  
                  <button id='btn-save'><i class="fas fa-save"></i>&nbsp;Guardar</button>
                
                  <label for="upload" id="upload-btn">
                    <i class="fas fa-cloud-upload-alt"></i>
                    <span id="text">Elegir imagen</span>
                  </label>
                  <input type="file" name="upload" id="upload-image">
              
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
  /** <input class="image-upload-input" type="file" id="post-image"> */
  const divElement = document.createElement("section");
  divElement.classList.add("container");
  divElement.innerHTML = viewInicio;

  const postForm = divElement.querySelector(".upload-post");
  const cardsContainer = divElement.querySelector(".card-container");
  const signOutBtn = divElement.querySelector("#sign-out-btn");
  let date = new Date();
  let imageURL = "";

  const nameLocal = localStorage.getItem("name");

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
  const nameSpan = divElement.querySelector(".menu p span");
  const asideSpan = divElement.querySelector(".aside-title span");
  nameSpan.innerText = nameLocal;
  asideSpan.innerText = nameLocal;

  /* --SUBIR IMAGEN CON STORAGE---*/
  let inputFile = divElement.querySelector("#upload-image");
  const image = divElement.querySelector("#image");

  const ref = firebase.storage().ref();
  let name = "";

  const text = divElement.querySelector('#text')
  const btn = divElement.querySelector('#upload-btn')
  const allowedExtensions = /(.jpg|.jpeg|.png|.gif)$/i;

  /* inputFile.addEventListener('change', () => {
      const path = input.value.split('\\')
      console.log('path', path);
      const filename = path[path.length -1]
      console.log('filename', allowedExtensions.exec(filename));

      text.innerText = filename ? filename : "Elegir imagen"

      if(filename)
          btn.classList.add('chosen')
      else
          btn.classList.remove('chosen')
  }) */
  inputFile.addEventListener("change", () => {
    /* console.log(inputFile); */
    inputFile = inputFile.files[0];
    console.log('inputNameNuevo', inputFile);
    /* const path = input.value.split('\\')
    console.log('path', path);
    const filename = path[path.length -1] */

    name = inputFile.name;
  
    /* text.innerText = name ? name : "Elegir imagen" */

    if(!allowedExtensions.exec(name)){
      alert('Please upload file having extensions .jpeg/.jpg/.png/.gif only.');
      inputFile.value = '';
      text.innerText = "Elegir imagen";
     /*  btn.classList.remove('chosen'); */
      return false;
    }else{
      const metadata = {
        contentType: inputFile.type,
      };

      const task = ref.child(name).put(inputFile, metadata);
      task
        .then((snapshot) => snapshot.ref.getDownloadURL())
        .then((url) => {
          console.log(url); 
          image.src = url;
          imageURL = url;
        }); 
      
      divElement.querySelector('.close-button').classList.add('active')
      /* btn.classList.add('chosen') */
    }
    text.innerText = name ? name : "Elegir imagen";
    
    /* if(name)
      btn.classList.add('chosen')
    else
      btn.classList.remove('chosen') */
      
  });

  divElement.querySelector('.close-button').addEventListener('click', () => {
    image.src = '';
   /*  inputFile.value = ''; */
    console.log('inputFile.value',inputFile.value);
    divElement.querySelector('.close-button').classList.remove('active')
    text.innerText = 'Elegir imagen'
  })
  /* --ELIMINAR LA IMAGEN TAMBIEN DEL STORAGE---*/
  const deleteImage = (nameImage) =>
    ref
      .child(nameImage)
      .delete()
      .catch((error) => console.log(error));

  /* --TRAER LA DATA DE LOS COMMENTS---*/
  const templateComments = (data) => {
    /* console.log('dataTemplate', data); */
    let template = "";
    data.forEach((doc) => {
      template += `
      <div class="comment_section_two" data-commentid=${doc.id}>
        <span>${doc.username}</span><label id="comment-label" for="">${doc.comment}</label>
      </div>
      `;
    });
    /* console.log('template',template); */
    return template;
  };

  /* --TRAER LA DATA DE LOS POST Y EL TEMPLATE DE LOS CARD---*/
  const templateCard = (data) => {
    /* console.log("data", data); */
    if (data.length) {
      cardsContainer.innerHTML = "";
      data.forEach(async (element) => {
        if (!element.imageURL) {
          cardsContainer.innerHTML += `
            <section class="card" data-id=${element.id} >
              <section class="card-title">
                <div class="title-img">
                  <img src="img/ejemplo.jpg" alt="">
                  <span>${element.name}</span>
                </div>
              </section>
              <section class="card-description"><input type="text" class="input-user-description" placeholder='${
                element.description
              }' disabled></section>
              <section class="card-options">
                  <section class="options-like-comment">
                    <div class="like">
                        <i class="fas fa-heart"></i>
                        <span>0</span>
                    </div>
                    <div class="comment">
                        <i class="fas fa-comment"></i>
                        <span></span>
                    </div>
                  </section>
                  ${
                    element.uid === firebase.auth().currentUser.uid
                      ? '<div class="btn-options"><button class="btn-edit" >Editar</button> <button class="btn-update" >Actualizar</button><button class="btn-delete" >Eliminar</button></div>'
                      : ""
                  }
              </section>
              <div class="comment_section">
                  <span>${nameLocal}</span><input class="comment-input" type="text">
              </div>
              <section class="comments">
                
              </section>
          
            </section>`;

        } else {
          cardsContainer.innerHTML += `
          <section class="card" data-id=${element.id}>
            <section class="card-title">
                <div class="title-img">
                  <img src="img/ejemplo.jpg" alt="">
                  <span>${element.name}</span>
                </div>
            </section>
            <section class="card-image"><img src="${
              element.imageURL
            }" alt="" data-filename=${name}></section>
            <section class="card-description"><input type="text" class="input-user-description" placeholder='${
              element.description
            }' disabled></section>
            <section class="card-options">
                <section class="options-like-comment">
                  <div class="like">
                      <i class="fas fa-heart"></i>
                      <span>0</span>
                  </div>
                  <div class="comment">
                      <i class="fas fa-comment"></i>
                      <span></span>
                  </div>
                </section>
                ${
                  element.uid === firebase.auth().currentUser.uid
                    ? '<div class="btn-options"><button class="btn-edit" >Editar</button> <button class="btn-update" >Actualizar</button><button class="btn-delete" >Eliminar</button></div>'
                    : ""
                }
            </section>
            <div class="comment_section">
                <span>${nameLocal}</span><input class="comment-input" type="text">
            </div>
            <section class="comments">
          
            </section>
          </section>`;
        }
      });

      const commentInputs = cardsContainer.querySelectorAll(".comment-input");
      // console.log('commentInputs', commentInputs);
      commentInputs.forEach((input) => {
        input.addEventListener("keypress", async (e) => {
          const cardFather = e.target.closest(".card");
          const comments = cardFather.querySelector(".comments");
          const idCard = cardFather.dataset.id;

          if (e.keyCode === 13) {
            await addSubcollectionComments(
              e.target.value,
              nameLocal,
              firebase.auth().currentUser.uid,
              date,
              idCard
            );

            comments.innerHTML = templateComments( await getSubcollectionComments(idCard));
          }
        });
      });

      const btnsDelete = document.querySelectorAll(".btn-delete");
      btnsDelete.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          const cardFather = e.target.closest(".card");
          const cardImage = cardFather.querySelector(".card-image img");
          const idCard = cardFather.dataset.id;
          /* cardImage.dataset.filename = name; */

          await deletePost(idCard);
          /* await deleteImage(cardImage.dataset.filename); */
          // eslint-disable-next-line no-shadow
          await getPosts((data) => {
            templateCard(data);

            cardsContainer.querySelectorAll(".card").forEach((card) => {
              if (card.dataset.id === idCard) {
                getSubcollectionComments(idCard).then((data) => {
                  if (data.length) {
                    data.forEach((doc) => {
                      card.querySelector(".comment span").innerText =
                        data.length;
                      card.querySelector(
                        ".comments"
                      ).innerHTML += `<div class="comment_section_two">
                                              <span>${doc.username}</span><label id="comment-label" for="">${doc.comment}</label>
                                          </div>
                                          `;
                    });
                  } else {
                    card.querySelector(".comment span").innerText = 0;
                  }
                });
              } else {
                card.querySelector(".comment span").innerText = 0;
                card.querySelector(".comments").innerHTML = "";
              }
            });
          });
        });
      });

      const btnsEdit = document.querySelectorAll(".btn-edit");
      btnsEdit.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          const cardFather = e.target.closest(".card");

          const input = cardFather.querySelector(".input-user-description");
          const btnUpdate = cardFather.querySelector(".btn-update");
          input.disabled = false;
          // eslint-disable-next-line no-param-reassign
          btn.style.display = "none";
          btnUpdate.style.display = "block";
          input.focus();
        });
      });

      const btnsUpdate = document.querySelectorAll(".btn-update");
      btnsUpdate.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          // eslint-disable-next-line no-param-reassign
          btn.style.display = "block";

          const cardFather = e.target.closest(".card");
          const idCard = cardFather.dataset.id;
          const input = cardFather.querySelector(".input-user-description");
          const btnEdit = cardFather.querySelector(".btn-edit");

          await updatePost(idCard, {
            description: input.value,
          });
          input.disabled = true;
          // eslint-disable-next-line no-shadow
          await getPosts((data) => {
            templateCard(data);

            cardsContainer.querySelectorAll(".card").forEach((card) => {
              if (card.dataset.id === idCard) {
                getSubcollectionComments(idCard).then((data) => {
                  if (data.length) {
                    data.forEach((doc) => {
                      card.querySelector(".comment span").innerText =
                        data.length;
                      card.querySelector(
                        ".comments"
                      ).innerHTML += `<div class="comment_section_two">
                                              <span>${doc.username}</span><label id="comment-label" for="">${doc.comment}</label>
                                          </div>
                                          `;
                    });
                  } else {
                    card.querySelector(".comment span").innerText = 0;
                  }
                });
              } else {
                card.querySelector(".comment span").innerText = 0;
                card.querySelector(".comments").innerHTML = "";
              }
            });
          });
          btn.style.display = 'none';
          btnEdit.style.display = 'block'
        });
      });

      const likesCard = document.querySelectorAll(".like i");
      likesCard.forEach((btn) => {
        btn.addEventListener("click", async(e) => {
          const cardFather = e.target.closest(".card");
          const idCard = cardFather.dataset.id;
          console.log(e.target);

         await addSubcollectionLikes(idCard, firebase.auth().currentUser.uid);
          getSubcollectionLikes(idCard).then(data => {
            btn.style.color = '#f0a000';
            cardFather.querySelector('.like span').innerText = data.length
          })
        });
      });
    } else {
      cardsContainer.innerHTML =
        ' <img src="/img/icons8_empty_box_5.svg"><p> No hay publicaciones pendientes </p> ';
    }
  };

  let uid = "";

  /* --USAR EL OBSERVADOR DE CAMBIO DE ESTADO---*/
  const photoAside = divElement.querySelector(".aside-title img");
  /* const photoimgCard = cardsContainer.querySelector('.card-title img'); */
  firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
      /* console.log('user', user);  */
      if (user.photoURL) {
        profileImg.querySelector("img").src = user.photoURL;
        photoAside.src = user.photoURL;
        /* photoimgCard.src = user.photoURL; */
      } else {
        profileImg.querySelector("img").src = "img/ejemplo.jpg";
        photoAside.src = "img/ejemplo.jpg";
        /* photoimgCard.src = 'img/ejemplo.jpg' */
      }
      uid = user.uid;

      await getPosts((data) => {
        templateCard(data);
        data.forEach((doc) => {
          cardsContainer.querySelectorAll(".card").forEach((card) => {
            if (card.dataset.id === doc.id) {
              getSubcollectionComments(doc.id).then((data) => {
                if (data.length) {
                  data.forEach((doc) => {
                    card.querySelector(".comment span").innerText = data.length;
                    card.querySelector(
                      ".comments"
                    ).innerHTML += `<div class="comment_section_two">
                                      <span>${doc.username}</span><label id="comment-label" for="">${doc.comment}</label>
                                  </div>
                                  `;
                  });
                } else {
                  card.querySelector(".comment span").innerText = 0;
                }
              });
              getSubcollectionLikes(doc.id).then(data => {
                if(data.length){
                  card.querySelector('.like i').style.color = '#f0a000';
                  card.querySelector('.like span').innerText = data.length
                }else{
                  card.querySelector('.like i').style.color = '#a5aaa3';
                  card.querySelector('.like span').innerText = 0;
                }
                
              })
            } else {
              card.querySelector(".comment span").innerText = 0;
              card.querySelector(".comments").innerHTML = "";
            }
          });
        });
      });
    } else {
      console.log("Estas fuera de sesion");
    }
  });

  /* --GUARDAR EL POST EN EL FORM PRINCIPAL---*/
  postForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const description = postForm["post-description"];
    await savePost(nameLocal, description.value, imageURL, date, uid);
    await getPosts((data) => {
      templateCard(data);
      data.forEach((doc) => {
        cardsContainer.querySelectorAll(".card").forEach((card) => {
          if (card.dataset.id === doc.id) {
            getSubcollectionComments(doc.id).then((data) => {
              if (data.length) {
                data.forEach((doc) => {
                  card.querySelector(".comment span").innerText = data.length;
                  card.querySelector(
                    ".comments"
                  ).innerHTML += `<div class="comment_section_two">
                                    <span>${doc.username}</span><label id="comment-label" for="">${doc.comment}</label>
                                </div>
                                `;
                });
              } else {
                card.querySelector(".comment span").innerText = 0;
              }
            });
            getSubcollectionLikes(doc.id).then(data => {
              card.querySelector('.like span').innerText = data.length
            })
          } else {
            card.querySelector(".comment span").innerText = 0;
            card.querySelector(".comments").innerHTML = "";
          }
        });
      });
    });
    postForm.reset();
    image.src = "";
  });

  /* --SALIR DE SESIÓN---*/
  signOutBtn.addEventListener("click", (e) => {
    e.preventDefault();
    signOut().then(() => {
      console.log("signOut...");
      window.location.hash = "#/";
    });
  });

  return divElement;
};
