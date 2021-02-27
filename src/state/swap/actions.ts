import { createAction } from "@reduxjs/toolkit";

export const changeFromAmount = createAction<string>("swap/changeFromAmount");
export const changeReceiveAmount = createAction<string>(
  "swap/changeReceiveAmount"
);
