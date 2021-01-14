import {
  getDataForm,
  saveData,
  saveDataPost,
  getDataPost,
} from "../controllers/perfil_controller.js";

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
              <div class = "info-profile">
            
              </div>
               <button class="btn-editar-profile ocultar" id = "edit-profile">Editar Perfil</button>
               <form id="form-profile" class="ocultar">
                <label>Nombre:</label>
                <input class="name" type="text" id="name"  placeholder="Ingresa tu nombre" required>
                <label>Apellidos:</label>
                <input class="last-name" type="name" id="last-name"  placeholder="Ingresar Apellidos" required>
                <label>Descripción:</label>
                <input class="description" type="text" id="description"  placeholder="Breve descripcion" required>
                <button  type="submit" class="btn-editar-profile" id="saveProfile">Guardar Cambios</button>
                </form>
              </div>
              
          </section>
      </aside>
      <section class="main-container_section_profile">
          <p>Puedes compartir tus hobbies, reflexiones que has adquirido en esta cuarentena...</p>
          <form class="upload-post2">
                
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
                     
      </section>
      </main>
      <footer class="main-footer">&copy; Por Giovand & Diana</footer>`;

  const divElement = document.createElement("section");
  divElement.classList.add("container");
  divElement.innerHTML = viewProfile;
  // getUserInfo().then(data => console.log(data));
  const containerPost = divElement.querySelector(
    ".main-container_section_profile"
  );
  const formPost = divElement.querySelector(".upload-post2");
  const nameLocal = localStorage.getItem("name");
  const card = divElement.querySelector("#form-profile");
  let imageURL = "";

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
  nameSpan.innerText = nameLocal;

  const buttonEdit = divElement.querySelector("#edit-profile");

  const templatePost = (data) => {
    console.log("data2", data);
    containerPost.innerHTML = ` 
      <p>Puedes compartir tus hobbies, reflexiones que has adquirido en esta cuarentena...</p>
        <form class="upload-post2">
            
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
        </form>`;
    data.forEach((doc) => {
      containerPost.innerHTML += `
        <section class="card">
          <p>${doc.description}</p>
          <img class="img-card-profile" src="${doc.imageurl}" alt="">
        </section>  
        `;
    });
  };

  /* ------------SUBIR IMAGEN CON STORAGE----------------------*/
  let inputFile = divElement.querySelector("#upload-image");
  const image = divElement.querySelector("#image");

  const ref = firebase.storage().ref();
  let name = "";

  const text = divElement.querySelector("#text");
  const btn = divElement.querySelector("#upload-btn");
  const allowedExtensions = /(.jpg|.jpeg|.png|.gif)$/i;

  inputFile.addEventListener("change", () => {
    /* console.log(inputFile); */
    inputFile = inputFile.files[0];
    console.log("inputNameNuevo", inputFile);

    name = inputFile.name;

    if (!allowedExtensions.exec(name)) {
      alert("Please upload file having extensions .jpeg/.jpg/.png/.gif only.");
      inputFile.value = "";
      text.innerText = "Elegir imagen";
      /*  btn.classList.remove('chosen'); */
      return false;
    } else {
      const metadata = {
        contentType: inputFile.type,
      };

      const task = ref.child("userPosts/" + name).put(inputFile, metadata);
      task
        .then((snapshot) => snapshot.ref.getDownloadURL())
        .then((url) => {
          console.log(url);
          image.src = url;
          imageURL = url;
        });

      divElement.querySelector(".close-button").classList.add("active");
      /* btn.classList.add('chosen') */
    }
    text.innerText = name ? name : "Elegir imagen";
  });

  // MOSTRANDO EL MODAL PARA EDITAR PERFIL

  const infoProfile = divElement.querySelector(".info-profile");
  buttonEdit.addEventListener("click", (e) => {
    card.style.display = "block";
    infoProfile.style.display = "none";
    buttonEdit.style.display = "none";
  });

  card.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = divElement.querySelector("#name");
    const lastName = divElement.querySelector("#last-name");
    const description = divElement.querySelector("#description");
    const idUser = firebase.auth().currentUser.uid;
    saveData(name.value, lastName.value, description.value);

    card.style.display = "none";
    infoProfile.style.display = "block";

    getDataForm(idUser).then((data) => {
      console.log("dataperfil", data.data());
      if (!data.data() || data.data() === undefined) {
        infoProfile.innerText = "Actualizar información";
        buttonEdit.style.display = "none";
      } else {
        card.style.display = "none";
        infoProfile.innerHTML = "";
        infoProfile.innerHTML += `
          <p>${data.data().name}</p>
          <p>${data.data().lastName}</p>
          <p>${data.data().description}</p>
          `;
        buttonEdit.classList.remove("ocultar");
      }
    });
  });

  /* --USAR EL OBSERVADOR DE CAMBIO DE ESTADO---*/
  const photoProfile = divElement.querySelector(
    ".main-container_aside_profile .card "
  );
  const cardProfileinfo = divElement.querySelector(".card-profileinfo");
  firebase.auth().onAuthStateChanged(async (user) => {
    await getDataForm(user.uid).then((data) => {
      if (!data.data() || data.data() === undefined) {
        infoProfile.innerHTML = `<span>Falta actualizar la información</span>`;
      } else {
        card.style.display = "none";
        infoProfile.innerHTML = "";
        infoProfile.innerHTML += `
            <p>${data.data().name}</p>
            <p>${data.data().lastName}</p>
            <p>${data.data().description}</p>
            `;
        buttonEdit.classList.remove("ocultar");
      }
    });

    if (user) {
      if (user.photoURL && user.displayName) {
        profileImg.querySelector("img").src = user.photoURL;
        photoProfile.querySelector("img").src = user.photoURL;
        // cardProfileinfo.querySelector('h3').innerText = user.displayName;
      } else {
        profileImg.querySelector("img").src = "img/ejemplo.jpg";
        photoProfile.querySelector("img").src = "img/ejemplo.jpg";
      }
    } else {
      console.log("Estas fuera de sesion");
    }

    getDataPost(user.uid, (data) => {
      templatePost(data);
    });
  });

  /* -----------GUARDAR INFORMACION DEL USER POST-------------------*/
  const postDescripction = divElement.querySelector("#post-description");
  let date = new Date();
  formPost.addEventListener("submit", async (e) => {
    e.preventDefault();
    await saveDataPost(postDescripction.value, imageURL, date);
  });

  return divElement;
};
