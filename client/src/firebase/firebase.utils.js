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
export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);


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


// Get ref of carts document for a specific user
export const getUserCartRef = async (userId) => {
    const cartsRef = firestore.collection('carts').where('userId', '==', userId);
    const snapshot = await cartsRef.get();

    if (snapshot.empty) {
        const cartDocRef = firestore.collection('carts').doc();
        await cartDocRef.set({ userId, cartItems: [] });
        return cartDocRef;
    }
    return snapshot.docs[0].ref;
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


// Converts the directories collection snapshot to Array
export const convertDirectorySnapshotToArray = (collection) => {
    const transformedDirectory = collection.docs.map(doc => {
        const id = doc.id;
        const { title, imageUrl } = doc.data();

        return {
            id,
            title,
            imageUrl
        }
    });
    return transformedDirectory;
}


// Converts the collection snapshot array to object
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

    // Convert Collections array to object
    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {});
}


// Mimick the onAuthStateChanged functionality: get current user and immediately unsubscribe after getting the user 
export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribeFromAuth = auth.onAuthStateChanged(userAuth => {
            unsubscribeFromAuth();
            resolve(userAuth);
        }, reject);
    });
}


//--- Default Export Firebase
export default firebase;