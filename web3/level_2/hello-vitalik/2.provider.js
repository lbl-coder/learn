import { ethers } from "ethers";

// 利用公共rpc节点连接以太坊网络
// 可以在 https://chainlist.org 上找到
const ALCHEMY_MAINNET_URL = "https://1rpc.io/eth";
const ALCHEMY_SEPOLIA_URL =
  "https://sepolia.infura.io/v3/868563c69418483695325a045c50a027";
// 连接以太坊主网
const providerETH = new ethers.JsonRpcProvider(ALCHEMY_MAINNET_URL);
// 连接Sepolia测试网
const providerSepolia = new ethers.JsonRpcProvider(ALCHEMY_SEPOLIA_URL);

async function checkBalances() {
  // 1. 查询vitalik在主网和Sepolia测试网的ETH余额
  // console.log("1. 查询vitalik在主网和Sepolia测试网的ETH余额");
  // const balance = await providerETH.getBalance("vitalik.eth")
  // const balanceSepolia = await providerSepolia.getBalance("vitalik.eth")
  // const balanceSepolia2 = await providerSepolia.getBalance("0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045")
  // console.log(`ETH Balance of vitalik: ${ethers.formatEther(balance)} ETH`);
  // console.log(`balanceSepolia Balance of vitalik: ${ethers.formatEther(balanceSepolia)} ETH`);
  // console.log(`balanceSepolia2 Balance of vitalik: ${ethers.formatEther(balanceSepolia2)} ETH`);
  // 2. 查询provider连接到了哪条链
  //   console.log("\n2. 查询provider连接到了哪条链");
  // const networkETH = await providerETH.getNetwork();
  // const networkSepolia = await providerSepolia.getNetwork();
  // console.log(networkETH.toJSON(),networkSepolia.toJSON());
  // 3. 查询区块高度
  //   console.log("\n3. 查询区块高度");
  //   const blockNumberETH = await providerETH.getBlockNumber();
  //   const blockNumberSepolia = await providerSepolia.getBlockNumber();
  //   console.log(blockNumberETH, blockNumberSepolia);
  // 4. 查询 vitalik 钱包历史交易次数
  //   console.log("\n4. 查询 vitalik 钱包历史交易次数")
  //   const txCount = await providerETH.getTransactionCount("vitalik.eth")
  //   const txCount2 = await providerSepolia.getTransactionCount("vitalik.eth")
  //   console.log(txCount, txCount2);
  // 5. 查询当前建议的gas设置
  //   console.log("\n5. 查询当前建议的gas设置");
  //   const feeData = await providerETH.getFeeData();
  //   console.log(feeData);
  // 6. 查询区块信息
  console.log("\n6. 查询区块信息");
  const block = await providerETH.getBlock(0);
  console.log(block);
  // 7. 给定合约地址查询合约bytecode，例子用的WETH地址
  console.log("\n7. 给定合约地址查询合约bytecode，例子用的WETH地址");
  const code = await providerETH.getCode(
    "0xc778417e063141139fce010982780140aa0cd5ab"
  );
  console.log(code);
}
checkBalances();
