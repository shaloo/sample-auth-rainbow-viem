//This example uses Arcana Rainbow connector and MetaMask

import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import { metaMaskWallet } from "@rainbow-me/rainbowkit/wallets";
import { AuthProvider } from "@arcana/auth";
import { ArcanaConnector } from "@arcana/auth-wagmi";
import { newArcanaLogo } from "./logo";

let arcanaAuth = null;

if (!arcanaAuth) {
  arcanaAuth = new AuthProvider(
    "xar_dev_19527cdf585cd31d0bd06bfc1b008accea781404",
    {
      connectOptions: {
        compact: true
      }
    }
  );
}

export const ArcanaRainbowConnector = ({ chains }) => {
  return {
    name: "[Arcana] Login with Email/Social",
    iconBackground: "#101010",
    iconUrl: newArcanaLogo,
    id: "arcana-auth",
    createConnector: () => {
      const connector = new ArcanaConnector({
        chains,
        options: {
          auth: arcanaAuth,
        },
        chains,
      });
      return {
        connector
      };
    }
  };
};

const connectors = (chains) =>
  connectorsForWallets([
    {
      groupName: "Recommended",
      wallets: [ArcanaRainbowConnector({ chains }), metaMaskWallet({ chains })]
    }
  ]);

export { connectors };

