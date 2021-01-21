import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";       // Allows to browser to cache the state in local or session storage
import logger from "redux-logger";

import RootReducer from "./root-reducer";

const middlewares = [logger];

const store = createStore(RootReducer, applyMiddleware(...middlewares));

const persistor = persistStore(store);

export { store, persistor };