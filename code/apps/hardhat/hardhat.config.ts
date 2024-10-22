import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import { config as envConfig } from "@chainlink/env-enc";

envConfig({
  path: ".env.enc",
});
const SEPOLIA_URL = process.env.SEPOLIA_URL;
const SEPOLIA_PRIVATE_KEY = process.env.SEPOLIA_PRIVATE_KEY!;

const config: HardhatUserConfig = {
  solidity: "0.8.27",
  networks: {
    ...(SEPOLIA_URL && SEPOLIA_PRIVATE_KEY
      ? {
          sepolia: {
            url: SEPOLIA_URL,
            accounts: [SEPOLIA_PRIVATE_KEY],
            chainId: 11155111,
          },
        }
      : {}),
  },
};

export default config;
