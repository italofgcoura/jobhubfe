import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {

  apiKey: 'AIzaSyD5-sjldz-YtxLbafZwXv14CU4Kpm1Ss9g',

  authDomain: 'me-contrata-be6b0.firebaseapp.com',

  projectId: 'me-contrata-be6b0',

  storageBucket: 'me-contrata-be6b0.appspot.com',

  messagingSenderId: '459069271033',

  appId: '1:459069271033:web:418a993d7e9378cc266b28',

  measurementId: 'G-P20ENYV5P0'

};


export const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

export { auth, db, initializeApp, };
