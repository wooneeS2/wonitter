import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA1hse1CJDokXafZGsKQu7mYJIcDoDznaM",
    authDomain: "wonitter.firebaseapp.com",
    databaseURL: "https://wonitter.firebaseio.com",
    projectId: "wonitter",
    storageBucket: "wonitter.appspot.com",
    messagingSenderId: "297067902688",
    appId: "1:297067902688:web:d321c940adb41cfe1c0285"
};

firebase.initializeApp(firebaseConfig);
export const firebaseInstance = firebase;

export const authService = firebase.auth();
export const dbService = firebase.firestore();