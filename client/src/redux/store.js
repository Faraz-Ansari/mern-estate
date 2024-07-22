import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

// user is the name of the slice and userReducer is the reducer function
const rootReducer = combineReducers({ user: userReducer });

// persistConfig is the configuration object for redux-persist
const persistConfig = {
    key: "root",
    storage,
    version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);