import { ethers } from "ethers";
// 利用公共rpc节点连接以太坊网络
// 可以在 https://chainlist.org 上找到
const ALCHEMY_MAINNET_URL = "https://1rpc.io/eth";
const ALCHEMY_SEPOLIA_URL =
  "https://sepolia.infura.io/v3/868563c69418483695325a045c50a027";
const provider = new ethers.JsonRpcProvider(ALCHEMY_SEPOLIA_URL);

// 利用私钥和provider创建wallet对象
const privateKey =
  "1883253606d19047c9eef2b10c0328d1c333f3166ed5d206ae004aae644b1a65";
const wallet = new ethers.Wallet(privateKey, provider);

// WETH的ABI
const abiWETH = [
  "function balanceOf(address) public view returns(uint)",
  "function deposit() public payable",
  "function transfer(address, uint) public returns (bool)",
  "function withdraw(uint) public",
];

// WETH合约地址（sepolia测试网）
const addressWETH = "0x7b79995e5f793a07bc00c21412e50ecae098e7f9";

// 声明可写合约
const contractWETH = new ethers.Contract(addressWETH, abiWETH, wallet);

const address = await wallet.getAddress();
// 读取WETH合约的链上信息（WETH abi）
console.log("\n1. 读取WETH余额");
const balanceWETH = await contractWETH.balanceOf(address);
console.log(`存款前WETH持仓: ${ethers.formatEther(balanceWETH)}\n`);
console.log("\n2. 调用desposit()函数，存入0.001 ETH");
// 发起交易
const tx = await contractWETH.deposit({ value: ethers.parseEther("0.001") });
// 等待交易上链
await tx.wait();
console.log(`交易详情：`);
console.log(tx);
const balanceWETH_deposit = await contractWETH.balanceOf(address);
console.log(`存款后WETH持仓: ${ethers.formatEther(balanceWETH_deposit)}\n`);
console.log("\n3. 调用transfer()函数，给vitalik转账0.001 WETH");
// 发起交易
const tx2 = await contractWETH.transfer(
  "vitalik.eth",
  ethers.parseEther("0.001")
);
// 等待交易上链
await tx2.wait();
const balanceWETH_transfer = await contractWETH.balanceOf(address);
console.log(`转账后WETH持仓: ${ethers.formatEther(balanceWETH_transfer)}\n`);
