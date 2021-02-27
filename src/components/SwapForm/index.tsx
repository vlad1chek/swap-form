import React, { useMemo, useEffect, useState } from "react";
import { Grid, styled, Typography } from "@material-ui/core";
import { WETH } from "@uniswap/sdk";
import { useWeb3React } from "@web3-react/core";
import { useDispatch, useSelector } from "react-redux";
import { Contract } from "@ethersproject/contracts";

import { SwapInput } from "../Input";
import { AppDispatch, AppState } from "../../state";
import { useSupportedWallets } from "../../hooks/useWallets";
import { changeLoggedWith } from "../../state/app/actions";
import {
  changeFromAmount,
  changeReceiveAmount,
} from "../../state/swap/actions";
import { useGetTrade } from "../../hooks/useGetTrade";
import { slippageTolerance, USDT, deadline } from "../../constants";
import UniswapAbi from "../../abis/UniswapABI.json";
import { ROPSTEN_NETWORK_ID } from "../../networks/constants";

const SwapFornContainer = styled(Grid)({
  height: 420,
  maxWidth: 420,
  width: "100%",
  backgroundColor: "#fff",
  borderRadius: 30,
});

const FormHeader = styled(Grid)({
  padding: "12px 1rem 0px 1.5rem",
  height: 47,
});

const Divider = styled("div")({
  height: 20,
});

const SwapButtonContainer = styled(Grid)({
  marginTop: "1rem",
});

const ErrorContainer = styled(Grid)({
  maxWidth: 420,
  color: "#f00",
});

const SwapButton = styled("button")({
  display: "flex",
  padding: 18,
  width: "100%",
  borderRadius: 20,
  outline: "none",
  border: "none",
  color: "#fff",
  backgroundColor: "#2172E5",
  justifyContent: "center",
  alignItems: "center",
  fontSize: 20,
  cursor: "pointer",
});

const SwapLabel = styled(Typography)({
  color: "#000",
  fontSize: 16,
});

export const SwapForm = () => {
  const { activate, account, library, chainId } = useWeb3React();
  const { fromInputAmount, receiveInputAmount } = useSelector<
    AppState,
    AppState["swap"]
  >((state) => state.swap);
  const [uniContract, setContract] = useState<Contract>();

  const [error, setError] = useState("");

  const dispatch = useDispatch<AppDispatch>();

  const wallet = useSupportedWallets();

  const connectWallet = async () => {
    try {
      const connector = wallet[0].createConnector();
      await activate(connector, undefined, true);
      dispatch(changeLoggedWith(wallet[0].name));
    } catch (e) {
      setError(e.message);
    }
  };

  const { trade } = useGetTrade();

  useEffect(() => {
    if (library) {
      const uniContract = new Contract(
        "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
        UniswapAbi.abi,
        library.getSigner()
      );
      setContract(uniContract);
    }
  }, [library]);

  const { handleChangeFromAmount, handleChangeReceiveAmount } = useMemo(() => {
    const handleChangeFromAmount = async (value: string) => {
      dispatch(changeFromAmount(value));
      return;
    };

    const handleChangeReceiveAmount = async (value: string) => {
      dispatch(changeReceiveAmount(value));
      return;
    };

    return {
      handleChangeFromAmount,
      handleChangeReceiveAmount,
    };
  }, [dispatch]);

  const swapTokens = async () => {
    try {
      if (trade && uniContract) {
        const amountOutMin = trade
          .minimumAmountOut(slippageTolerance)
          .raw.toString();
        const path = [WETH[USDT.chainId].address, USDT.address];
        const value = trade.inputAmount.raw.toString();
        const tx = await uniContract.swapExactETHForTokens(
          amountOutMin,
          path,
          account,
          deadline,
          {
            value: value,
            gasPrice: 10e9,
            gasLimit: chainId === ROPSTEN_NETWORK_ID ? 8000000 : null,
          }
        );
        console.log(tx);
      }
    } catch (e) {
      if (e.code === "INSUFFICIENT_FUNDS") {
        setError("Insufficient funds for transfer");
      }
      setError("Something went wrong. Please try again or check console");
      console.log(e.message);
    }
  };

  return (
    <SwapFornContainer container direction="column">
      {error && <ErrorContainer>{error}</ErrorContainer>}
      <FormHeader container alignItems="flex-start">
        <SwapLabel>Swap</SwapLabel>
      </FormHeader>
      <Grid>
        <Grid container>
          <SwapInput
            label="From"
            amount={fromInputAmount}
            onChange={handleChangeFromAmount}
          />
          <Divider />
          <SwapInput
            label="To"
            amount={receiveInputAmount}
            onChange={handleChangeReceiveAmount}
          />
        </Grid>
        <SwapButtonContainer>
          <SwapButton
            onClick={() => {
              setError("");
              account ? swapTokens() : connectWallet();
            }}
          >
            {account ? <div>Swap</div> : <div>Connect Wallet</div>}
          </SwapButton>
        </SwapButtonContainer>
      </Grid>
    </SwapFornContainer>
  );
};
