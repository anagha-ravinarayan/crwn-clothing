import { takeLatest, all, call, put } from "redux-saga/effects";

import CartActionTypes from "./cart.types";
import { clearCartFailure, clearCartSuccess } from "./cart.actions";

function* clearCartOnCheckoutPaymentSuccess() {
    try {
        yield put(clearCartSuccess());
    } catch (error) {
        yield put(clearCartFailure());
    }
}

function* onCheckoutPaymentSuccess() {
    yield takeLatest(CartActionTypes.CLEAR_CART_START, clearCartOnCheckoutPaymentSuccess);
}

export default function* cartSagas() {
    yield all([
        call(onCheckoutPaymentSuccess),
    ]);
}