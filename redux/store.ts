import { combineReducers, applyMiddleware, createStore } from "redux";
import { userReducer } from "./reducers/userReducer";
import thunk from "redux-thunk";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

const rootReducers = combineReducers({
  user: userReducer,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store: any = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducers>;

export const useTypeSelector: TypedUseSelectorHook<RootState> = useSelector;
