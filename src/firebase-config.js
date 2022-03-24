import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'

const firebaseConfig =firebase.initializeApp({
  apiKey: "AIzaSyDj9cV70QNFLrEvNhWVl_EKOxmDzgfEm3Q",
  authDomain: "react-student-form-ee53b.firebaseapp.com",
  projectId: "react-student-form-ee53b",
  storageBucket: "react-student-form-ee53b.appspot.com",
  messagingSenderId: "460087366016",
  appId: "1:460087366016:web:0fb0871f76d81cb957b165",
  measurementId: "G-DD797C3D2H"
});

const auth = firebaseConfig.auth();
const db = firebaseConfig.firestore()
export default db;
export {firebaseConfig};
export {firebase};