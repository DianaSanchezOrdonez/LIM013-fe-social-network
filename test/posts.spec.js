import MockFirebase from 'mock-cloud-firestore';
import {
  savePost,
  deletePost,
  getPosts,
  updatePost,
} from '../src/controllers/firestore.js';

const fixtureData = {
  __collection__: {
    posts: {
      __doc__: {
        post_1: {
          description: 'aprendi a cocinar',
          imagenURL: '',
        },
        post_2: {
          description: 'aprendi a pintar',
          imagenURL: '',
        },
      },
    },
  },
};

window.firebase = new MockFirebase(fixtureData);

describe('Guardar Post', () => {
  it('Debería guardar el Post', done => savePost('Nuevo post post_3', 'ejemplo.png').then(() => getPosts((data) => {
    const result = data.find(post => post.description === 'Nuevo post post_3');
    expect(result.description).toBe('Nuevo post post_3');
    done();
  })));
});

describe.only('guardar post version 2', () => {
  it('Deberia guardar el post', (done) => {
    firebase.firestore().collection('posts').get()
      .then((repsonse) => {
        expect(repsonse._data.length).toBe(3);
      })
      .then(() => {
        return savePost('Test', 'Nuevo post post_4', 'test.png')
      })
      .then(() => {
        return firebase.firestore().collection('posts').get();
      })
      .then((posts) => {
        const result = posts._data.find(docPost => docPost['_data'].name === 'Test');
        expect(posts._data.length).toBe(4);
        expect(result['_data'].name).toBe('Test');
        done();
      })
  })
})

describe('Actualizar Post', () => {
  it('Debería actualizar el Post', done => updatePost('post_2', 'Hello World').then(() => getPosts((data) => {
    const result = data.find(post => post.id === 'post_2');
    expect(result.id).toBe('post_2');
    done();
  })));
});

describe('Eliminar Post', () => {
  it('Debería eliminar el Post', done => deletePost({ id: 'post_3' }).then(() => getPosts((data) => {
    const result = data.find(post => post.id === 'post_3');
    expect(result.id).toBe(undefined);
    done();
  })));
});
 