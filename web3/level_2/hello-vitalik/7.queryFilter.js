import { ethers } from "ethers";
// 利用公共rpc节点连接以太坊网络
const ALCHEMY_SEPOLIA_URL =
  "https://sepolia.infura.io/v3/868563c69418483695325a045c50a027";
const provider = new ethers.JsonRpcProvider(ALCHEMY_SEPOLIA_URL);

// WETH的ABI
const abiWETH = [
  "event Transfer(address indexed from, address indexed to, uint amount)",
];

// WETH合约地址（sepolia测试网）
const addressWETH = "0x7b79995e5f793a07bc00c21412e50ecae098e7f9";

// 声明合约实例
const contract = new ethers.Contract(addressWETH, abiWETH, provider);

// 获取过去10个区块内的Transfer事件
console.log("\n1. 获取过去10个区块内的Transfer事件，并打印出1个");
// 得到当前block
const block = await provider.getBlockNumber();
console.log(`当前区块高度: ${block}`);
console.log(`打印事件详情:`);
const transferEvents = await contract.queryFilter(
  "Transfer",
  block - 10,
  block
);
// 打印第1个Transfer事件
console.log(transferEvents[0]);
// 解析Transfer事件的数据（变量在args中）
console.log("\n2. 解析事件：");
const amount = ethers.formatUnits(
  ethers.getBigInt(transferEvents[0].args["amount"]),
  "ether"
);
console.log(
  `地址 ${transferEvents[0].args["from"]} 转账${amount} WETH 到地址 ${transferEvents[0].args["to"]}`
);
contract.on("Transfer", (from, to, value) => {
  console.log(
    // 打印结果
    `${from} -> ${to} ${ethers.formatUnits(ethers.getBigInt(value), 6)}`
  );
});
