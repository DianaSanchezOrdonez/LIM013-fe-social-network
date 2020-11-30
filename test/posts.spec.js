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
          name: 'Giovand'
        },
        post_2: {
          description: 'aprendi a pintar',
          imagenURL: '',
          name: 'Diana'
        },
      },
    },
  },
};

window.firebase = new MockFirebase(fixtureData);

/*-------------------Test savePost Version 02-------------------------------*/

describe('Guardar post 3', () => {
  it('Deberia guardar el post', (done) => {
    firebase.firestore().collection('posts').get()
      .then((response) => {
        expect(response._data.length).toBe(2);
      })
      .then(() => {
        return savePost('Nuevo post post_3', 'ejemplo.png', 'Post_3')
      })
      .then(() => {
        return firebase.firestore().collection('posts').get();
      })
      .then((posts) => {
        const result = posts._data.find(docPost => docPost['_data'].name === 'Post_3');
        expect(posts._data.length).toBe(3);
        expect(result['_data'].name).toBe('Post_3');
        done();
      })
  })
})

describe('Guardar post 4', () => {
  it('Deberia guardar el post', (done) => {
    firebase.firestore().collection('posts').get()
      .then((response) => {
        expect(response._data.length).toBe(3);
      })
      .then(() => {
        return savePost('Nuevo post post_4', 'test.png', 'Test')
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

/*-------------------Test updatePost version 01-------------------------------*/

describe('Actualizar post_01', () => {
  it('Debería actualizar el post _02', (done) => updatePost('post_1', 'Aprendi a tejer').then(() => getPosts((data) => {
    const result = data.find(post => post.id === 'post_1');
    expect(result.id).toBe('post_1');
    done();
  })));
});

describe('Actualizar post_02', () => {
  it('Debería actualizar el post _02', (done) => updatePost('post_2', 'Hello World').then(() => getPosts((data) => {
    const result = data.find(post => post.id === 'post_2');
    expect(result.id).toBe('post_2');
    done();
  })));
});

/*-------------------Test deletePost version 02-------------------------------*/

describe.skip('Eliminar post_1', () => {
  it('Deberia eliminar el post', (done) => {
    firebase.firestore().collection('posts').get()
      .then((response) => {
        expect(response._data.length).toBe(4);
      })
      .then(() => {
        return deletePost('post_1')
      })
      .then(() => {
        return firebase.firestore().collection('posts').get();
      })
      .then((posts) => {
        const result = posts._data.find(docPost => docPost['_data'].name === 'Giovand');
        expect(posts._data.length).toBe(3);
        expect(result).toBe(undefined);
        done();
      })
  })
})

describe.skip('Eliminar post_02', () => {
  it('Deberia eliminar el post', (done) => {
    firebase.firestore().collection('posts').get()
      .then((response) => {
        expect(response._data.length).toBe(3);
      })
      .then(() => {
        return deletePost('post_2')
      })
      .then(() => {
        return firebase.firestore().collection('posts').get();
      })
      .then((posts) => {
        const result = posts._data.find(docPost => docPost['_data'].name === 'Diana');
        expect(posts._data.length).toBe(2);
        expect(result).toBe(undefined);
        done();
      })
  })
})