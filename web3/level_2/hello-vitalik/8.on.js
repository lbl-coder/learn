import { ethers } from "ethers";
// 利用公共rpc节点连接以太坊网络
// 可以在 https://chainlist.org 上找到
const ALCHEMY_MAINNET_URL = "https://1rpc.io/eth";
const provider = new ethers.JsonRpcProvider(ALCHEMY_MAINNET_URL);

// USDT的合约地址
const contractAddress = "0xdac17f958d2ee523a2206206994597c13d831ec7";
// 构建USDT的Transfer的ABI
const abi = [
  "event Transfer(address indexed from, address indexed to, uint value)",
];
// 生成USDT合约对象
const contractUSDT = new ethers.Contract(contractAddress, abi, provider);
console.log(contractUSDT);
const main = async () => {
  // 监听USDT合约的Transfer事件

  try {
    // 只监听一次
    console.log("\n1. 利用contract.once()，监听一次Transfer事件");
    contractUSDT.once("Transfer", (from, to, value) => {
      // 打印结果
      console.log(
        `${from} -> ${to} ${ethers.formatUnits(ethers.getBigInt(value), 6)}`
      );
    });

    //持续监听USDT合约
    console.log("\n2. 利用contract.on()，持续监听Transfer事件");
    contractUSDT.on("Transfer", (from, to, value) => {
      console.log(
        // 打印结果
        `${from} -> ${to} ${ethers.formatUnits(ethers.getBigInt(value), 6)}`
      );
    });
  } catch (e) {
    console.log(e);
  }
};
main();
