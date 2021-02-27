import { createReducer } from "@reduxjs/toolkit";
import { changeLoggedWith } from "./actions";

export interface AppState {
  loggedInWith: string;
}

const initialState: AppState = {
  loggedInWith: "",
};

export default createReducer(initialState, (app) => {
  app.addCase(changeLoggedWith, (state, action) => {
    state.loggedInWith = action.payload;
  });
});
