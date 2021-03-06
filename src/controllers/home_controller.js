const getPosts = (callback) =>
  firebase
    .firestore()
    .collection("posts")
    .orderBy("datetime", "desc")
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
          datetime: doc.data().datetime,
          uid: doc.data().uid,
        });
      });
      callback(data);
    });

const savePost = (name, description, imageURL, datetime, uid) =>
  firebase.firestore().collection("posts").doc().set({
    name,
    description,
    imageURL,
    datetime,
    uid,
  });

const deletePost = (id) =>
  firebase.firestore().collection("posts").doc(id).delete();

const updatePost = (id, updatedPost) =>
  firebase.firestore().collection("posts").doc(id).update(updatedPost);

/*-----------AGREGANDO SUBCOLLECTION COMMENTS----------------------*/
const addSubcollectionComments = (comment, username, uid, datetime, postId) => {
  const commentsPostRef = firebase
    .firestore()
    .collection("posts")
    .doc(postId)
    .collection("comments");

  commentsPostRef
    .doc()
    .set({
      comment,
      username,
      uid,
      datetime,
    })
    .then(() => console.log("Comment Added "))
    .catch((error) => console.error("Error adding comment: ", error));
};

/*-----------OBTENIENDO SUBCOLLECTION COMMENTS----------------------*/

const getSubcollectionComments = (idPost) =>
  firebase
    .firestore()
    .collection("posts")
    .doc(idPost)
    .collection("comments")
    .orderBy("datetime", "desc")
    .get()
    .then((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        comment: doc.data().comment,
        username: doc.data().username,
        uid: doc.data().uid,
        datetime: doc.data().datetime,
      }));
      return data;
    })
    .catch((error) => {
      console.log("The error is: ", error);
    });

/*-----------AGREGANDO SUBCOLLECTION LIKES----------------------*/
const addSubcollectionLikes = (idPost, iduser) => {
  const likesPostRef = firebase
    .firestore()
    .collection("posts")
    .doc(idPost)
    .collection("likes");
  likesPostRef
    .doc(iduser)
    .set({
      iduser,
    })
    .then(() => console.log("Like Added"))
    .catch((error) => console.log("Error adding like:", error));
};

const getSubcollectionLikes = (idPost) =>
  firebase
    .firestore()
    .collection("posts")
    .doc(idPost)
    .collection("likes")
    .get()
    .then((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        iduser: doc.data().iduser,
      }));
      return data;
    });

const deleteLike = (idPost, idLike) =>
  firebase
    .firestore()
    .collection("posts")
    .doc(idPost)
    .collection("likes")
    .doc(idLike)
    .delete()
    .then(console.log("Like Deleted"))
    .catch((error) => console.log(error));

export {
  savePost,
  getPosts,
  deletePost,
  updatePost,
  addSubcollectionComments,
  getSubcollectionComments,
  addSubcollectionLikes,
  getSubcollectionLikes,
  deleteLike,
};
