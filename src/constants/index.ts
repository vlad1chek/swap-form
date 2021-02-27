import { Percent, Token, ChainId } from "@uniswap/sdk";

export const slippageTolerance = new Percent("50", "10000");

export const USDT = new Token(
  ChainId.MAINNET,
  "0xdAC17F958D2ee523a2206206994597C13D831ec7",
  6
);

export const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes from the current Unix time
