import * as firebase from 'firebase';
import {firebaseConfig} from './firebase-config';

firebase.initializeApp(firebaseConfig);

const googleProvider = new firebase.auth.GoogleAuthProvider();
const db = firebase.firestore();

export {googleProvider, firebase, db};