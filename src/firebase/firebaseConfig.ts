// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDyShhCcXMAwegXSHzhzuY0do_M6Om32J0",
    authDomain: "recipeapp-a1dc4.firebaseapp.com",
    projectId: "recipeapp-a1dc4",
    storageBucket: "recipeapp-a1dc4.firebasestorage.app",
    messagingSenderId: "924557376976",
    appId: "1:924557376976:web:3084c605687307d723cdd5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
