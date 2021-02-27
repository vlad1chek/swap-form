import { Web3Provider, ExternalProvider } from "@ethersproject/providers";

export function getLibrary(provider: ExternalProvider): Web3Provider {
  const library = new Web3Provider(provider);
  return library;
}

export function etherToWei(priceInEth: string): string {
  const priceInWei = +priceInEth * Math.pow(10, 18);
  return priceInWei.toString();
}
