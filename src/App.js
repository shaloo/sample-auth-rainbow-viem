import "./styles.css";
import "@rainbow-me/rainbowkit/styles.css";

import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { polygon, mainnet, optimism, arbitrum } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { connectors } from "./wallet";
import { useAccount, useConnect } from 'wagmi'
import { Connect } from "./Connect";

const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum],
  [publicProvider()]
);

const wagmiConfig = createConfig({
  connectors: connectors(chains),
  autoConnect: true,
  publicClient,
});

function App() {
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect();
  const { connector: activeConnector, isConnected } = useAccount()

  console.log("isConnected =",isConnected, "activeConnector = ", activeConnector);

  return (
    <>
    {isConnected && <div><Connect /><br />Connected to {activeConnector.name}! <br /></div>}
    {!isConnected && <div><Connect /> Not connected</div>}
    {error && <div>{error.message}</div>}
    </>
  );
}

export default function Provider() {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <App />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

