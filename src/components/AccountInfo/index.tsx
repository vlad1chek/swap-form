import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { formatEther } from "ethers/lib/utils";
import Typography from "@material-ui/core/Typography";

export const AccountInfo = (): JSX.Element => {
  const { account, library } = useWeb3React<Web3Provider>();
  const [balance, setBalance] = useState<string>("");

  useEffect(() => {
    async function getBalance() {
      if (library && account) {
        const userEthBalance = await library.getBalance(account);
        setBalance(formatEther(userEthBalance).substring(0, 5));
      }
    }
    getBalance();
  }, [account, library]);

  return account ? (
    <div>
      <Typography>{account}</Typography> <Typography>{balance} ETH</Typography>
    </div>
  ) : (
    <div />
  );
};
