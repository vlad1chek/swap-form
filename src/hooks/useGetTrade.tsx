import { useEffect, useState } from "react";
import {
  WETH,
  Fetcher,
  Trade,
  Route,
  TokenAmount,
  TradeType,
} from "@uniswap/sdk";
import { useSelector } from "react-redux";
import { AppState } from "../state";
import { etherToWei } from "../utils/helpers";
import { USDT } from "../constants";

export const useGetTrade = () => {
  const fromInputAmount = useSelector<
    AppState,
    AppState["swap"]["fromInputAmount"]
  >((state) => state.swap.fromInputAmount);

  const convertedEth = etherToWei(fromInputAmount);

  const [trade, setTrade] = useState<Trade>();
  const [error, setError] = useState();

  useEffect(() => {
    async function createTrade() {
      try {
        const pair = await Fetcher.fetchPairData(USDT, WETH[USDT.chainId]);
        const route = new Route([pair], WETH[USDT.chainId]);
        const trade = new Trade(
          route,
          new TokenAmount(WETH[USDT.chainId], convertedEth),
          TradeType.EXACT_INPUT
        );
        setTrade(trade);
      } catch (e) {
        setError(e);
      }
    }
    createTrade();
  }, [convertedEth]);

  return {
    trade,
    error,
  };
};
