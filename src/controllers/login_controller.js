/* import { auth, fstore } from './initialFirebase.js'; */
const signUp = (email, password) =>
  firebase.auth().createUserWithEmailAndPassword(email, password);

const signIn = (email, password) =>
  firebase.auth().signInWithEmailAndPassword(email, password);

const signInWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider);
};

const signInWithFacebook = () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  return firebase.auth().signInWithPopup(provider);
};

const signOut = () => firebase.auth().signOut();

export {
  signUp,
  signIn,
  signInWithGoogle,
  signInWithFacebook,
  signOut,
};
