const getDataForm = uid => firebase.firestore().collection('users').doc(uid).get();

const saveData = (name, lastName, description) => {
  const idUser = firebase.auth().currentUser.uid;
  firebase.firestore().collection('users').doc(idUser).set({
    name,
    lastName,
    description,
  });
};

export {
  getDataForm,
  saveData,
};
