import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

var firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "crwn-clothing-707d7.firebaseapp.com",
    projectId: "crwn-clothing-707d7",
    storageBucket: "crwn-clothing-707d7.appspot.com",
    messagingSenderId: "342414346331",
    appId: "1:342414346331:web:b103a36c9280154ca6577e",
    measurementId: "G-BFMPLY9RK8"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;