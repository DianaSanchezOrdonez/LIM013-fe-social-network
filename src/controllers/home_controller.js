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
          uid: doc.data().uid
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
    uid
  });

const deletePost = (id) =>
  firebase.firestore().collection("posts").doc(id).delete();

const updatePost = (id, updatedPost) =>
  firebase.firestore().collection("posts").doc(id).update(updatedPost);

/* db.collection("cities").where("capital", "==", true) */
const getLikes = () =>
  firebase
    .firestore()
    .collection('likes')
    .get()
    .then((snapshot) => {
      const data = [];
      snapshot.forEach((doc) => {
       
          data.push({
            userid: doc.data().userid,
            refpost: doc.data().refpost,
          });
   
      });
      return data;
    })
    .catch(error => {
      console.log('The error is: ', error);
    });

/*-----------AGREGANDO SUBCOLLECTION COMMENTS----------------------*/
/* function fireAddStudentToClassroom(studentUserId, classroomId) {

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

const addSubcollectionComments = ( comment, username, uid, postId) => {
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
    })
    .then(() => console.log("Comment Added "))
    .catch((error) => console.error("Error adding comment: ", error));
};

/*-----------OBTENIENDO SUBCOLLECTION COMMENTS----------------------*/
/* let transactionSnapshot = db.collection("shops").doc(shopDoc[i].id).collection("transactions").get().then((doc) => {
  let transactionDoc = transactionSnapshot.docs.map(document => document.data());
  console.log(transactionDoc); */
 
const getSubcollectionComments = (idPost) => firebase
  .firestore()
    .collection("posts")
    .doc(idPost)
    .collection("comments")
    .get()
    .then(snapshot => {
      const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          comment: doc.data().comment,
          username: doc.data().username,
          uid: doc.data().uid
      }));
      return data;
    })
    .catch(error => {
      console.log('The error is: ', error);
    });
    
/*-----------AGREGANDO SUBCOLLECTION LIKES----------------------*/
const addSubcollectionLikes = (idPost, iduser) => {
  const likesPostRef = firebase
  .firestore()
  .collection('posts')
  .doc(idPost)
  .collection('likes')
  likesPostRef
  .doc(iduser)
  .set({
    iduser
  })
  .then(() => console.log('Like Added'))
  .catch((error) => console.log('Error adding like:', error))
}

const getSubcollectionLikes = (idPost) => firebase
  .firestore()
  .collection('posts')
  .doc(idPost)
  .collection('likes')
  .get()
  .then(snapshot => {
    const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        iduser: doc.data().iduser
    }));
    return data;
  })

const deleteLike = (idPost, idLike) => firebase
  .firestore()
  .collection('posts')
  .doc(idPost)
  .collection('likes')
  .doc(idLike)
  .delete()
  .then( console.log('Like Deleted') )
  .catch( error => console.log(error))


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
  getLikes,
};
