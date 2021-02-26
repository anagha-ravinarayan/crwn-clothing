import { takeLatest, all, call, put, select } from "redux-saga/effects";

import { getUserCartRef } from "../../firebase/firebase.utils";

import UserActionTypes from "../user/user.types";
import { selectCurrentUser } from "../user/user.selectors";

import CartActionTypes from "./cart.types";
import { clearCartFailure, clearCartSuccess, pullCartFromFirebase } from "./cart.actions";
import { selectCartItems } from './cart.selectors';


function* clearCart() {
    try {
        yield put(clearCartSuccess());
    } catch (error) {
        yield put(clearCartFailure());
    }
}

function* updateCartInFirebase() {
    const currentUser = yield select(selectCurrentUser);        // invoke a selector
    if (currentUser) {
        try {
            const cartDocRef = yield getUserCartRef(currentUser.id);
            const cartItems = yield select(selectCartItems);
            yield cartDocRef.update({ cartItems });
        } catch (error) {
            console.log('Failed to update cart in DB', error);
        }
    }
}

function* getCartFromFirebase({ payload: user }) {
    const cartDocRef = yield getUserCartRef(user.id);
    const snapshot = yield cartDocRef.get();
    yield put(pullCartFromFirebase(snapshot.data().cartItems));      // Invoke an action
}


function* onCheckoutPaymentSuccess() {
    yield takeLatest(CartActionTypes.CLEAR_CART_START, clearCart);
}

function* onCartChange() {
    yield takeLatest([
        CartActionTypes.ADD_ITEM,
        CartActionTypes.REMOVE_ITEM,
        CartActionTypes.CLEAR_ITEM_FROM_CART,
        CartActionTypes.CLEAR_CART_START,
    ], updateCartInFirebase);
}

function* onUserSignIn() {
    yield takeLatest(UserActionTypes.SIGN_IN_SUCCESS, getCartFromFirebase);
}


function* onUserSignOut() {
    yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCart);
}

export default function* cartSagas() {
    yield all([
        call(onCheckoutPaymentSuccess),
        call(onCartChange),
        call(onUserSignIn),
        call(onUserSignOut),
    ]);
}