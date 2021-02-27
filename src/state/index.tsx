import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { save, load } from "redux-localstorage-simple";
import app from "./app/reducer";
import swap from "./swap/reducer";

const PERSISTED_KEYS: string[] = ["swap", "app"];

export const reducer = { app, swap };

const store = configureStore({
  reducer,
  middleware: [
    ...getDefaultMiddleware({ thunk: false }),
    save({ states: PERSISTED_KEYS }),
  ],
  preloadedState: load({
    states: PERSISTED_KEYS,
    disableWarnings: process.env.NODE_ENV === "test",
  }),
});

export default store;

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
