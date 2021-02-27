import { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { useSelector } from "react-redux";

import { AppState } from "../state";
import { useCurrentNetwork } from "./useCurrentNetwork";

export function useEagerConnect(): boolean {
  const { activate, active } = useWeb3React();
  const [tried, setTried] = useState(false);
  const { createInjected } = useCurrentNetwork();

  const loggedInWith = useSelector<AppState, string>(
    (state) => state.app.loggedInWith
  );

  const loggedWithInjected = loggedInWith === "Metamask";

  useEffect(() => {
    const { ethereum } = window as any;
    if (process.env.NODE_ENV !== "test" || !!ethereum) {
      // create at the point of usage
      const injected = createInjected();

      injected.isAuthorized().then((isAuthorized: boolean) => {
        if (isAuthorized && loggedWithInjected) {
          activate(injected, undefined, true).catch(() => {
            setTried(true);
          });
        } else {
          setTried(true);
        }
      });
    }
  }, [activate, createInjected, loggedWithInjected]);

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (!tried && active) {
      setTried(true);
    }
  }, [tried, active]);

  return tried;
}

/**
 * Use for network and injected - logs user in
 * and out after checking what network they're on
 */
export function useInactiveListener(suppress = false): void {
  const { active, error, activate } = useWeb3React();
  const { createInjected } = useCurrentNetwork();

  useEffect(() => {
    const { ethereum } = window as any;
    if (ethereum?.on && !active && !error && !suppress) {
      const injected = createInjected();

      const handleChainChanged = () => {
        // eat errors
        activate(injected, undefined, true).catch((error) => {
          console.error("Failed to activate after chain changed", error);
        });
      };

      const handleAccountsChanged = (accounts: [any]) => {
        if (accounts.length > 0) {
          activate(injected);
        }
      };

      ethereum.on("chainChanged", handleChainChanged);
      ethereum.on("accountsChanged", handleAccountsChanged);

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener("chainChanged", handleChainChanged);
          ethereum.removeListener("accountsChanged", handleAccountsChanged);
        }
      };
    }
  }, [active, error, suppress, activate, createInjected]);
}
