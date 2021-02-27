import React, { useState, useEffect } from "react";
import { Grid, styled } from "@material-ui/core";

import eth from "../../assets/eth.png";
import usdt from "../../assets/usdt.png";
import { useGetTrade } from "../../hooks/useGetTrade";
import { slippageTolerance } from "../../constants";

const Container = styled("div")({
  border: "1px solid #000",
  borderRadius: 20,
  width: "100%",
});

const LabelContainer = styled(Grid)({
  color: "#000",
  fontSize: "0.75rem",
  padding: "0.75rem 1rem 0 1rem",
});

const Label = styled("div")({
  fontSize: 14,
});

const InputContainer = styled(Grid)({
  padding: "0.75rem 0.75rem 0.75rem 1rem",
});

const Input = styled("input")({
  width: 0,
  position: "relative",
  outline: "none",
  border: "none",
  flex: "1 1 auto",
  fontSize: 24,
  padding: 0,
  overflow: "hidden",
  "&:disabled": {
    backgroundColor: "#fff",
  },
});

const Currency = styled("div")({
  display: "inline-flex",
  alignItems: "center",
  height: "2.2rem",
  fontSize: 20,
  borderRadius: 12,
  border: "none",
  padding: "0 0.5rem",
});

const CoinLogo = styled("img")({
  width: 24,
  height: 24,
  borderRadius: 30,
  paddingRight: 8,
});

type SwapProps = {
  label: "From" | "To";
  onChange: (value: string) => void;
  amount: string;
};

export const SwapInput = (props: SwapProps): JSX.Element => {
  const isFromInput = props.label === "From";

  const [value, setValue] = useState<string>(props.amount);
  const { trade } = useGetTrade();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let index = 0;
    let inputValue = e.target.value
      .replace(/[^\d.,]/g, "")
      .replace(/,/g, ".")
      .replace(/\./g, (item: string) => (!index++ ? item : ""));
    props.onChange(inputValue);
    setValue(inputValue);
  };

  useEffect(() => {
    setValue(props.amount);
  }, [props.amount]);

  useEffect(() => {
    if (trade && !isFromInput) {
      props.onChange(trade.minimumAmountOut(slippageTolerance).toFixed());
    }
  }, [trade, isFromInput, props, value]);

  return (
    <Container>
      <LabelContainer container alignItems="center">
        {isFromInput ? <Label>From</Label> : <Label>To (estimated)</Label>}
      </LabelContainer>
      <InputContainer container alignItems="center">
        <Input
          placeholder="0.0"
          onChange={isFromInput ? handleInput : undefined}
          value={value}
          readOnly={!isFromInput}
        />
        {isFromInput ? (
          <Currency>
            <CoinLogo src={eth} alt="ether" /> ETH
          </Currency>
        ) : (
          <Currency>
            <CoinLogo src={usdt} alt="usdt" /> USDT
          </Currency>
        )}
      </InputContainer>
    </Container>
  );
};
