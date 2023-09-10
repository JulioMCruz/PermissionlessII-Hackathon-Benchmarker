import { HardhatUserConfig } from "hardhat/config";

import "@matterlabs/hardhat-zksync-deploy";
import "@matterlabs/hardhat-zksync-solc";

require("dotenv").config();

// dynamically changes endpoints for local tests
const zkSyncLocalTestnet =
  process.env.NODE_ENV == "test"
    ? {
        url: "http://localhost:3050",
        ethNetwork: "",
        zksync: true,
      }
    : {
        url: "https://zksync2-testnet.zksync.dev",
        ethNetwork: "goerli",
        zksync: true,
        // Verification endpoint for Goerli
        verifyURL:
          "https://zksync2-testnet-explorer.zksync.dev/contract_verification",
      };

const config: HardhatUserConfig = {
  zksolc: {
    version: "latest",
    settings: {},
  },
  defaultNetwork: "zkSyncLocalTestnet",
  networks: {
    hardhat: {
      zksync: false,
    },
    zkSyncLocalTestnet,
    // for mainnet
    "base-mainnet": {
      url: "https://mainnet.base.org",
      accounts: [process.env.WALLET_PRIVATE_KEY as string],
      gasPrice: 1000000000,
    },
    // for testnet
    "base-goerli": {
      url: "https://goerli.base.org",
      accounts: [process.env.WALLET_PRIVATE_KEY as string],
      gasPrice: 1000000000,
    },
  },
  solidity: {
    version: "0.8.17",
  },
};

export default config;
