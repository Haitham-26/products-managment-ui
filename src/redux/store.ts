import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import ProductReducer from "./product/product.slice";
import UserReducer from "./user/user.slice";

const persistConfig = {
  key: "root",
  storage,
  version: 0,
};

const reducers = combineReducers({
  product: ProductReducer,
  user: UserReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

const _store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

type AppDispatch = typeof _store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export type RootState = ReturnType<typeof _store.getState>;

export const useAppSelector = useSelector.withTypes<RootState>();

const persistedStore = persistStore(_store);
const store = { store: _store, persistor: persistedStore };

export default store;
