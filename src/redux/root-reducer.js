import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";       // Allows to browser to cache the state in local or session storage
import storage from "redux-persist/lib/storage";      // Local Storage hook

import UserReducer from "./user/user.reducer";
import CartReducer from "./cart/cart.reducer";

const persistConfig = {
    key: 'root',                // start storing from which store
    storage,
    whitelist: ['cart']         // Reducers to persist in storage (user is handled by firebase)
}

const rootReducer = combineReducers({
    user: UserReducer,
    cart: CartReducer
});


export default persistReducer(persistConfig, rootReducer);