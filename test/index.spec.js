// importamos la funcion que vamos a testear
// import { myFunction } from "../src/lib/index";
import firebasemock from 'firebase-mock';
import { signIn, signUp } from '../src/controllers/firestore.js';

const mockauth = new firebasemock.MockAuthentication();
mockauth.autoFlush();

global.firebase = firebasemock.MockFirebaseSdk(
  () => null,
  () => mockauth,
);

describe('Function signIn', () => {
  it('signIn', () => signIn('prueba1@gmail.com', 'pruebas').then((user) => {
    expect(user.email).toBe('prueba1@gmail.com');
  }));
});

describe('Function signUp', () => {
  it('signUp', () => signUp('prueba123@gmail.com', 'pruebas').then((user) => {
    expect(user.email).toBe('prueba123@gmail.com');
  }));
});
