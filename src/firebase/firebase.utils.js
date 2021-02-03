import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// Firebase config object
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

//--- Export Google Sign-in auth service provider
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

//--- Export hook to create user entry in DB when signed in for the first time
export const createUserProfileDocument = async (userAuth, additionalData) => {
    // only create while signing in; not while signing out
    if (!userAuth) {
        return;
    }

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const userSnapshot = await userRef.get();
    // Check if user entry already exists in DB
    if (!userSnapshot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch (error) {
            console.log("Error in creating user entry in Database", error);
        }
    }
    return userRef;
}

//--- Export hook to create shop data collection and its entries in DB 
export const addCollectionAndDocuments = async (collectionKey, documentsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);  // Create collection reference
    const batch = firestore.batch();    // Create a batch request to handle failure; since only one doc can be "set" at a time

    documentsToAdd.forEach(doc => {
        const docRef = collectionRef.doc();  // Create empty doc ref with unique key
        batch.set(docRef, doc);              // Creates a batch request to create each document in the collection using the doc reference
    });

    return await batch.commit();            // Executes the batch request
}

// Converts the collection snaphot array to object
export const convertCollectionSnapshotToMap = (collection) => {
    const transformedCollection = collection.docs.map(doc => {
        const id = doc.id;
        const { title, items } = doc.data();

        return {
            id,
            title,
            routeName: encodeURI(title.toLowerCase()),
            items
        }
    });

    // COnvert Collections array to object
    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {});
}

//--- Default Export Firebase
export default firebase;