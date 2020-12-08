/* eslint-disable no-undef */
/* eslint-disable no-console */
/* import { auth, fstore } from './initialFirebase.js'; */
const signUp = (email, password) => firebase.auth().createUserWithEmailAndPassword(email, password);

const signIn = (email, password) => firebase.auth().signInWithEmailAndPassword(email, password);

const signInWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider);
};

const signInWithFacebook = () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  return firebase.auth().signInWithPopup(provider);
};

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
        uid: doc.data().uid,
      });
    });
    callback(data);
  });

const savePost = (name, description, imageURL, uid) => firebase.firestore().collection('posts').doc().set({
  name,
  description,
  imageURL,
  uid,
});

const deletePost = id => firebase.firestore().collection('posts').doc(id).delete();

const updatePost = (id, updatedPost) => firebase.firestore().collection('posts').doc(id).update(updatedPost);

/** ----------GUARDANDO COMENTARIOS----------------------- */
const saveComment = (username, comment, refpost) => firebase.firestore().collection('comments').doc().set({
  username,
  comment,
  refpost,
});

/* -----------AGREGANDO SUBCOLLECTION----------------------*/
const fireAddSubcollection = (uid, username, useremail, postId) => {
  const commentsPostRef = firebase
    .firestore()
    .collection('comments')
    .doc(postId)
    .collection('likes');

  commentsPostRef
    .doc(uid)
    .set({
      uid,
      username,
      useremail,
    })
    .then(() => console.log('Document Added '))
    .catch(error => console.error('Error adding document: ', error));
};

const getUserInfo = () => firebase.firestore()
  .collection('modalEdit')
  .get()
  .then((snapshot) => {
    const data = [];
    snapshot.forEach((doc) => {
      data.push({
        id: doc.id,
        name: doc.data().name,
        lasName: doc.data().lasName,
        description: doc.data().description,
      });
    });
    return data;
  });

export {
  savePost,
  getPosts,
  deletePost,
  updatePost,
  fireAddSubcollection,
  signUp,
  signIn,
  signInWithGoogle,
  signInWithFacebook,
  signOut,
  saveComment,
  getUserInfo,
};
