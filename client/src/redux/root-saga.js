import { all, call } from "redux-saga/effects";

import directorySagas from "./directory/directory.sagas";
import shopSagas from "./shop/shop.sagas";
import userSagas from "./user/user.sagas";
import cartSagas from "./cart/cart.sagas";

export default function* rootSaga() {
    yield all([             // Runs all Sagas concurrently
        call(directorySagas),
        call(shopSagas),
        call(userSagas),
        call(cartSagas),
    ]);
}