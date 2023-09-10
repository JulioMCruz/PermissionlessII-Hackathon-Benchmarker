import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import { useTheme } from "next-themes";

import { getDefaultWallets, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import type { AppProps } from 'next/app';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  goerli,
  scrollSepolia,
  scrollTestnet,
  zkSync,
  zkSyncTestnet,
  mainnet,
} from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { useEffect, useState } from 'react';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    mainnet,
    scrollSepolia,
    scrollTestnet,
    zkSync,
    zkSyncTestnet,  
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [goerli] : []),
  ],
  [publicProvider()]
);

import { ThemeProvider } from "next-themes";
import Header from "../components/Header";
// import type { Metadata } from "next";
// import { Inter } from "next/font/google";


const { connectors } = getDefaultWallets({
  appName: 'RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

function MyApp({ Component, pageProps }: AppProps) {

  const { theme, setTheme } = useTheme();

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}
        theme={ darkTheme({
          accentColor: "black",
          accentColorForeground: 'white',
          borderRadius: 'small',
        })}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <Component {...pageProps} />
        </ThemeProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
