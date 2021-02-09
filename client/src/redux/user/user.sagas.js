import { takeLatest, put, all, call } from "redux-saga/effects";

import UserActionTypes from "./user.types";
import { signInSuccess, signInFailure, signUpSuccess, signUpFailure, signOutSuccess, signOutFailure } from "./user.actions";

import { auth, googleProvider, createUserProfileDocument, getCurrentUser } from "./../../firebase/firebase.utils";

function* getSnapshotOfUser(user, additionalData) {
    try {
        const userRef = yield call(createUserProfileDocument, user, additionalData ? { additionalData } : null);
        const userSnapshot = yield userRef.get();

        const currentUser = {
            id: userSnapshot.id,      // ID of the document
            ...userSnapshot.data()    // The data stored in the document
        }
        yield put(additionalData ? signUpSuccess(currentUser) : signInSuccess(currentUser));
    } catch (error) {
        yield put(additionalData ? signUpFailure(error) : signInFailure(error));
    }
}

function* isUserAuthenticated() {
    try {
        const user = yield getCurrentUser();
        if (!user) {
            return;
        }
        yield getSnapshotOfUser(user);
    } catch (error) {
        yield put(signInFailure(error));
    }
}

function* signInWithGoogle() {
    try {
        const { user } = yield auth.signInWithPopup(googleProvider);
        yield getSnapshotOfUser(user);
    } catch (error) {
        yield put(signInFailure(error));
    }
}

function* signInWithEmail({ payload: { email, password } }) {
    try {
        const { user } = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapshotOfUser(user);
    } catch (error) {
        yield put(signInFailure(error));
    }
}

function* signUpWithEmail({ payload: { displayName, email, password } }) {
    try {
        const { user } = yield auth.createUserWithEmailAndPassword(email, password);
        yield getSnapshotOfUser(user, displayName);
    } catch (error) {
        yield put(signUpFailure(error));
    }
}

function* signOut() {
    try {
        yield auth.signOut();
        yield put(signOutSuccess());
    } catch (error) {
        yield put(signOutFailure(error));
    }
}

// ---- Primary Generator functions
function* onCheckUserSession() {
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

function* onGoogleSignIn() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

function* onEmailSignIn() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

function* onGoogleSignUp() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_UP_START, signInWithGoogle);   // Same as Sign In
}

function* onEmailSignUp() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_UP_START, signUpWithEmail);
}

function* onSignOut() {
    yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export default function* userSagas() {
    yield all([
        call(onCheckUserSession),
        call(onGoogleSignIn),
        call(onEmailSignIn),
        call(onGoogleSignUp),
        call(onEmailSignUp),
        call(onSignOut),
    ]);
}