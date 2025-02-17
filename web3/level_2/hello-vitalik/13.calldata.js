import { ethers } from "ethers";
// 利用公共rpc节点连接以太坊网络
// 可以在 https://chainlist.org 上找到
const ALCHEMY_MAINNET_URL =
  "https://sepolia.infura.io/v3/868563c69418483695325a045c50a027";
const provider = new ethers.JsonRpcProvider(ALCHEMY_MAINNET_URL);

// 利用私钥和provider创建wallet对象
const privateKey =
  "1883253606d19047c9eef2b10c0328d1c333f3166ed5d206ae004aae644b1a65";
const wallet = new ethers.Wallet(privateKey, provider);

// WETH的ABI
const abiWETH = [
  "function balanceOf(address) public view returns(uint)",
  "function deposit() public payable",
];
// WETH合约地址（sepolia测试网）
const addressWETH = "0x7b79995e5f793a07bc00c21412e50ecae098e7f9";
// 声明WETH合约
const contractWETH = new ethers.Contract(addressWETH, abiWETH, wallet);
const address = await wallet.getAddress();
// 1. 读取WETH合约链上信息( WETH abi)
console.log("\n1. 读取WETH余额");
// 编码calldata
const param1 = contractWETH.interface.encodeFunctionData("balanceOf", [
  address,
]);
console.log(`编码结果： ${param1}`);
// 创建交易
const tx1 = {
  to: addressWETH,
  data: param1,
};
// 发起交易，可读操作（view/pure）可以用 provider.call(tx)
const balanceWETH = await provider.call(tx1);
console.log(`存款前WETH持仓: ${ethers.formatEther(balanceWETH)}\n`);

const param2 = contractWETH.interface.encodeFunctionData("deposit");
console.log(`编码结果 ${param2}`);
const tx2 = {
  to: addressWETH,
  data: param2,
  value: ethers.parseEther("0.001"),
};
// 发起交易，写入操作需要 wallet.sendTransaction(tx
const receipt1 = await wallet.sendTransaction(tx2);
// 等待交易上链
await receipt1.wait();
console.log(`交易详情：`);
console.log(receipt1);
const balanceWETH_deposit = await contractWETH.balanceOf(address);
console.log(`存款后WTH持仓: ${ethers.formatEther(balanceWETH_deposit)}`);
