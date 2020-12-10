/* eslint-disable import/no-unresolved */
/* eslint-disable no-underscore-dangle */
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
          name: 'Giovand',
          description: 'aprendi a cocinar',
          imagenURL: '',
        },
        post_2: {
          name: 'Diana',
          description: 'aprendi a pintar',
          imageURL: '',
        },
      },
    },
  },
};

window.firebase = new MockFirebase(fixtureData);

/* -------------------Test savePost Version 02-------------------------------*/

describe('Guardar post 3', () => {
  it('Deberia guardar el post', (done) => {
    firebase.firestore().collection('posts').get()
      .then((response) => {
        expect(response._data).toHaveLength(2);
      })
      .then(() => savePost('Post_3', 'Nuevo post post_3', 'ejemplo.png'))
      .then(() => firebase.firestore().collection('posts').get())
      .then((posts) => {
        const result = posts._data.find(docPost => docPost._data.name === 'Post_3');
        expect(posts._data).toHaveLength(3);
        expect(result._data.name).toBe('Post_3');
        done();
      });
  });
});

describe('Guardar post 4', () => {
  it('Deberia guardar el post', (done) => {
    firebase.firestore().collection('posts').get()
      .then((response) => {
        expect(response._data).toHaveLength(3);
      })
      .then(() => savePost('Test', 'Nuevo post post_4', 'test.png'))
      .then(() => firebase.firestore().collection('posts').get())
      .then((posts) => {
        const result = posts._data.find(docPost => docPost._data.name === 'Test');
        expect(posts._data).toHaveLength(4);
        expect(result._data.name).toBe('Test');
        done();
      });
  });
});

/* -------------------Test updatePost version 01-------------------------------*/

describe('Actualizar post_01', () => {
  it('Debería actualizar el post _02', done => updatePost('post_1', 'Aprendi a tejer').then(() => getPosts((data) => {
    const result = data.find(post => post.id === 'post_1');
    expect(result.id).toBe('post_1');
    done();
  })));
});

describe('Actualizar post_02', () => {
  it('Debería actualizar el post _02', done => updatePost('post_2', 'Hello World').then(() => getPosts((data) => {
    const result = data.find(post => post.id === 'post_2');
    expect(result.id).toBe('post_2');
    done();
  })));
});

/* -------------------Test deletePost version 02-------------------------------*/

describe('Eliminar post_1', () => {
  it('Deberia eliminar el post', (done) => {
    firebase.firestore().collection('posts').get()
      .then((response) => {
        expect(response._data).toHaveLength(4);
      })
      .then(() => deletePost('post_1'))
      .then(() => firebase.firestore().collection('posts').get())
      .then((posts) => {
        const result = posts._data.find(docPost => docPost._data.name === 'Giovand');
        expect(posts._data).toHaveLength(3);
        expect(result).toBe(undefined);
        done();
      });
  });
});

describe('Eliminar post_02', () => {
  it('Deberia eliminar el post', (done) => {
    firebase.firestore().collection('posts').get()
      .then((response) => {
        expect(response._data).toHaveLength(3);
      })
      .then(() => deletePost('post_2'))
      .then(() => firebase.firestore().collection('posts').get())
      .then((posts) => {
        const result = posts._data.find(docPost => docPost._data.name === 'Diana');
        expect(posts._data).toHaveLength(2);
        expect(result).toBe(undefined);
        done();
      });
  });
});
