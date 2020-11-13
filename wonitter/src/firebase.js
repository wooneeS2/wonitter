import * as firebase from "firebase/app";


const firebaseConfig = {
    apiKey: "AIzaSyA1hse1CJDokXafZGsKQu7mYJIcDoDznaM",
    authDomain: "wonitter.firebaseapp.com",
    databaseURL: "https://wonitter.firebaseio.com",
    projectId: "wonitter",
    storageBucket: "wonitter.appspot.com",
    messagingSenderId: "297067902688",
    appId: "1:297067902688:web:d321c940adb41cfe1c0285"
};

// .env 파일을 만들어서 gitignore에 추가하므로써 깃헙에 뜨지 않음

// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);