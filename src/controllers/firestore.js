/* import { auth, fstore } from './initialFirebase.js'; */
const signUp = (email, password) => firebase.auth().createUserWithEmailAndPassword(email, password);

const signIn = (email, password) => firebase.auth().signInWithEmailAndPassword(email, password);

const signInWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider);
}

const signInWithFacebook = () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  return firebase.auth().signInWithPopup(provider);
}

const signOut = () => firebase.auth().signOut();

const getPosts = callback => firebase
  .firestore()
  .collection('posts')
  .get()
  .then((snapshot) => {
    // console.log(snapshot);
    const data = [];
    snapshot.forEach((doc) => {
      // console.log(doc.id, ' => ', doc.data());
      data.push({
        id: doc.id,
        name: doc.data().name,
        description: doc.data().description,
        imageURL: doc.data().imageURL,
      });
    });
    callback(data);
  });

 /*  function fireAddStudentToClassroom(studentUserId, classroomId) {

    var db = firebase.firestore();
    var studentsClassroomRef =
        db.collection('student_class').doc(classroomId)
          .collection('students');

    studentsClassroomRef
        .doc(studentUserId)
        .set({})
        .then(function () {
            console.log('Document Added ');
        })
        .catch(function (error) {
            console.error('Error adding document: ', error);
        });
} */

const savePost = (name, description, imageURL) => firebase.firestore().collection('posts').doc().set({
  name,
  description,
  imageURL,
}).collection('users').doc().set({
  username: 'Diana123'
});

const deletePost = id => firebase.firestore().collection('posts').doc(id).delete();

const updatePost = (id, updatedPost) => firebase.firestore().collection('posts').doc(id).update(updatedPost);

export {
  savePost,
  getPosts,
  deletePost,
  updatePost,
  signUp,
  signIn,
  signInWithGoogle,
  signInWithFacebook,
  signOut,
};
