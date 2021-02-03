import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";       // Allows to browser to cache the state in local or session storage

// Redux middlewares
import logger from "redux-logger";
import thunk from "redux-thunk";

import RootReducer from "./root-reducer";

const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
}

const store = createStore(RootReducer, applyMiddleware(...middlewares));

const persistor = persistStore(store);

export { store, persistor };