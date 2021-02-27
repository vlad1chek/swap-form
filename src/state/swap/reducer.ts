import { createReducer } from "@reduxjs/toolkit";
import { changeFromAmount, changeReceiveAmount } from "./actions";

interface SwapState {
  fromInputAmount: string;
  receiveInputAmount: string;
}

const initialState: SwapState = {
  fromInputAmount: "1",
  receiveInputAmount: "0",
};

export default createReducer(initialState, (app) => {
  app
    .addCase(changeFromAmount, (state, action) => {
      state.fromInputAmount = action.payload;
    })
    .addCase(changeReceiveAmount, (state, action) => {
      state.receiveInputAmount = action.payload;
    });
});
