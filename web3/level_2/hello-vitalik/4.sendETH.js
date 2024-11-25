import { ethers } from "ethers";
// 利用公共rpc节点连接以太坊网络
// 可以在 https://chainlist.org 上找到
const ALCHEMY_MAINNET_URL = "https://1rpc.io/eth";
const ALCHEMY_SEPOLIA_URL =
  "https://sepolia.infura.io/v3/868563c69418483695325a045c50a027";
const providerETH = new ethers.JsonRpcProvider(ALCHEMY_SEPOLIA_URL);


// 创建随机的wallet对象
const wallet1 = ethers.Wallet.createRandom()
const wallet1WithProvider = wallet1.connect(provider)
const mnemonic = wallet1.mnemonic // 获取助记词

// 利用私钥和provider创建wallet对象
// const privateKey = '1883253606d19047c9eef2b10c0328d1c333f3166ed5d206ae004aae644b1a65'
// const wallet2 = new ethers.Wallet(privateKey, provider)

// 从助记词创建wallet对象
// const wallet3 = ethers.Wallet.fromPhrase(mnemonic.pharse)