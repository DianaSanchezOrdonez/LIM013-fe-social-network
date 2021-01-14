const getDataForm = (uid) =>
  firebase.firestore().collection("users").doc(uid).get();

const saveData = (name, lastName, description) => {
  const idUser = firebase.auth().currentUser.uid;
  firebase.firestore().collection("users").doc(idUser).set({
    name,
    lastName,
    description,
  });
};

const saveDataPost = (description, imageurl, datetime) => {
  const idUser = firebase.auth().currentUser.uid;
  const userPostsRef = firebase
    .firestore()
    .collection("users")
    .doc(idUser)
    .collection("postUsers");
  userPostsRef
    .doc()
    .set({
      description,
      imageurl,
      datetime,
    })
    .then(() => console.log("Post Added"))
    .catch((error) => console.log("Error adding post:", error));
};

const getDataPost = (idUser, callback) => {
  firebase
    .firestore()
    .collection("users")
    .doc(idUser)
    .collection("postUsers")
    .onSnapshot((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        description: doc.data().description,
        imageurl: doc.data().imageurl,
      }));
      callback(data);
    });
};
export { getDataForm, saveData, saveDataPost, getDataPost };
