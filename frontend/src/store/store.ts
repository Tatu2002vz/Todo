import { configureStore } from "@reduxjs/toolkit";
// ...
import userReducer from "../features/user/userSlice";
import themeReducer from '../features/theme/themeSlice'
import statusFormReducer from '../features/statusForm/statusFormSlice'
import todoReducer from '../features/todo/todoSlice'
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { thunk } from "redux-thunk";
import logger from "redux-logger";
const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, userReducer);
const themePersist = persistReducer(persistConfig, themeReducer)
export const store = configureStore({
  reducer: {
    persistedReducer,
    statusFormReducer,
    todoReducer,
    themePersist
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger, thunk), // logger + thunk
});
export const persistor = persistStore(store);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
