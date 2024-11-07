require("@nomicfoundation/hardhat-toolbox");
/** @type import('hardhat/config').HardhatUserConfig */

const ALCHEMY_SEPOLIA_KEY = "";
const ETHERSCAN_API_KEY = "";
const SEPOLIA_PRIVATE_KEY = "";
module.exports = {
  solidity: "0.8.27",
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_SEPOLIA_KEY}`,
      accounts: [SEPOLIA_PRIVATE_KEY]
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  sourcify: {
    enabled: true
  }
};