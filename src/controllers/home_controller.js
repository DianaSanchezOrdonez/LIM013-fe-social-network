/* eslint-disable no-console */

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

export {
  savePost,
  getPosts,
  deletePost,
  updatePost,
  fireAddSubcollection,
  saveComment,
};
