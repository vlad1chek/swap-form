import React from "react";
import Grid from "@material-ui/core/Grid";
import "./App.css";
import { useConnectWallet } from "./state/app/updater";
import { AccountInfo } from "./components/AccountInfo";
import { SwapForm } from "./components/SwapForm";

export function Updaters(): null {
  useConnectWallet();
  return null;
}

function App() {
  return (
    <div className="App">
      <Grid container direction="column" alignItems="center">
        <AccountInfo />
        <SwapForm />
      </Grid>
    </div>
  );
}

export default App;
