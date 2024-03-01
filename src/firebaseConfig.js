// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';



const firebaseConfig = {
    apiKey: "AIzaSyDV8u12X-h2OogPc0j3A9fm8g48Ai3crLo",
    authDomain: "vue-coach-demo-22a3d.firebaseapp.com",
    databaseURL: "https://vue-coach-demo-22a3d-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "vue-coach-demo-22a3d",
    storageBucket: "vue-coach-demo-22a3d.appspot.com",
    messagingSenderId: "520937453453",
    appId: "1:520937453453:web:ee210f432f2f4e3cedafc4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//initialize firebase auth
const auth = getAuth();


export { app, auth }