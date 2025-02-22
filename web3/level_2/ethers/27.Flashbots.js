import { ethers } from "ethers";

const ALCHEMY_SEPOLIA_URL =
  "wss://sepolia.infura.io/ws/v3/868563c69418483695325a045c50a027";
const provider = new ethers.WebSocketProvider(ALCHEMY_SEPOLIA_URL);
// 利用私钥和provider创建wallet对象
const privateKey =
  "1883253606d19047c9eef2b10c0328d1c333f3166ed5d206ae004aae644b1a65";
const authSigner = new ethers.Wallet(privateKey, provider);
const flashbotsProvider = await FlashbotsBundleProvider.create(
  provider,
  authSigner,
  "https://relay-sepolia.flashbots.net",
  "sepolia"
);
console.log(flashbotsProvider);
