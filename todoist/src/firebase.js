import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = firebase.initializeApp({

    apiKey: "AIzaSyBxzl8OxEL_LnOiProjEnIuq4PFK_abxfU",
    authDomain: "todoist-81c65.firebaseapp.com",
    databaseURL: "https://todoist-81c65.firebaseio.com",
    projectId: "todoist-81c65",
    storageBucket: "todoist-81c65.appspot.com",
    messagingSenderId: "686192728982",
    appId: "1:686192728982:web:0ae3f07b8d05a387ef1bb7"
});

export {firebaseConfig as firebase};