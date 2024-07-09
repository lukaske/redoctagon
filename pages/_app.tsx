import "@mantine/core/styles.css";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { theme } from "../theme";
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  taiko,
  sepolia,
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import { sep } from "path";


export default function App({ Component, pageProps }: any) {
  const config = getDefaultConfig({
    appName: 'REDOctogon',
    projectId: 'YOUR_PROJECT_ID',
    chains: [mainnet, polygon, taiko, sepolia],
    ssr: true, // If your dApp uses server side rendering (SSR)
  });
  const queryClient = new QueryClient();

  return (
    <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <RainbowKitProvider>
          <MantineProvider theme={theme}>
          <Head>
            <title>Mantine Template</title>
            <meta
              name="viewport"
              content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
            />
            <link rel="shortcut icon" href="/favicon.svg" />
          </Head>
          <Component {...pageProps} />
        </MantineProvider>
      </RainbowKitProvider>
    </QueryClientProvider>
  </WagmiProvider>

  );
}
