import { InjectedConnector } from "@web3-react/injected-connector";
import { useCurrentNetwork } from "./useCurrentNetwork";

type SpecificWalletConnector = InjectedConnector;

export interface WalletInfo<
  T extends SpecificWalletConnector = SpecificWalletConnector
> {
  name: string;
  createConnector(): T;
  href?: string;
}

export function useSupportedWallets(): WalletInfo[] {
  const { createInjected } = useCurrentNetwork();

  const SUPPORTED_WALLETS: WalletInfo[] = [
    {
      name: "Metamask",
      createConnector: createInjected,
      href: "https://metamask.io",
    },
  ];
  return SUPPORTED_WALLETS;
}
