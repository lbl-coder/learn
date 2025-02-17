import { ethers } from "ethers";

console.log("\n1. 创建HD钱包");
// 通过助记词生成HD钱包
const mnemonic = `tattoo around foster ramp blur blur bulb monitor loan hat aerobic way almost gauge then space capital pave protect jealous have fork glove amazing`;
const hdNode = ethers.HDNodeWallet.fromPhrase(mnemonic);
console.log(hdNode);
console.log("\n2. 通过HD钱包派生20个钱包");
const numWallet = 20;
// 派生路径：m / purpose' / coin_type' / account' / change / address_index
// 我们只需要切换最后一位address_index，就可以从hdNode派生出新钱包
let basePath = "44'/60'/0'/0";
let addresses = [];
for (let i = 0; i < numWallet; i++) {
  let hdNodeNew = hdNode.derivePath(basePath + "/" + i);
  let walletNew = new ethers.Wallet(hdNodeNew.privateKey);
  addresses.push(walletNew.address);
}
const amounts = Array(20).fill(ethers.parseEther("0.00001"));
console.log(`发送数额：${amounts}`);

const ALCHEMY_MAINNET_URL =
  "https://sepolia.infura.io/v3/868563c69418483695325a045c50a027";
const provider = new ethers.JsonRpcProvider(ALCHEMY_MAINNET_URL);

// 利用私钥和provider创建wallet对象
const privateKey =
  "1883253606d19047c9eef2b10c0328d1c333f3166ed5d206ae004aae644b1a65";
const wallet = new ethers.Wallet(privateKey, provider);

// 4. 声明Airdrop合约
// Airdrop的ABI
const abiAirdrop = [
  "function multiTransferToken(address,address[],uint256[]) external",
  "function multiTransferETH(address[],uint256[]) public payable",
];
// Airdrop合约地址（sepolia测试网）
const addressAirdrop = "0x271cf0ef2d4da48f751912244f794bbcc9878a1b"; // Airdrop Contract
// 声明Airdrop合约
const contractAirdrop = new ethers.Contract(addressAirdrop, abiAirdrop, wallet);

// 5. 声明WETH合约
// WETH的ABI
const abiWETH = [
  "function balanceOf(address) public view returns(uint)",
  "function transfer(address, uint) public returns (bool)",
  "function approve(address, uint256) public returns (bool)",
];
// WETH合约地址（sepolia测试网）
const addressWETH = "0x7b79995e5f793a07bc00c21412e50ecae098e7f9"; // WETH Contract
// 声明WETH合约
const contractWETH = new ethers.Contract(addressWETH, abiWETH, wallet);
console.log("\n3. 读取一个地址的ETH和WETH余额");
//读取WETH余额
const balanceWETH = await contractWETH.balanceOf(addresses[10]);
console.log(`WETH持仓: ${ethers.formatEther(balanceWETH)}\n`);
//读取ETH余额
const balanceETH = await provider.getBalance(addresses[10]);
console.log(`ETH持仓: ${ethers.formatEther(balanceETH)}\n`);

const balanceETH2 = await contractWETH.balanceOf(addressWETH);
console.log(`2ETH持仓: ${ethers.formatEther(balanceETH2)}\n`);
console.log("\n4. 调用multiTransferETH()函数，给每个钱包转 0.00001 ETH");
// 发起交易
// const tx = await contractAirdrop.multiTransferETH(addresses, amounts, {
//   value: ethers.parseEther("0.0002"),
// });
// // 等待交易上链
// await tx.wait();
// // console.log(`交易详情：`)
// // console.log(tx)
// const balanceETH2 = await provider.getBalance(addresses[10]);

// console.log(`发送后该钱包ETH持仓: ${ethers.formatEther(balanceETH2)}\n`);

// console.log("\n5. 调用multiTransferToken()函数，给每个钱包转 0.00001 WETH");
// // 先approve WETH给Airdrop合约
// const txApprove = await contractWETH.approve(
//   addressAirdrop,
//   ethers.parseEther("0.0002")
// );
// await txApprove.wait();
// // 发起交易
// const tx2 = await contractAirdrop.multiTransferToken(
//   addressWETH,
//   addresses,
//   amounts
// );
// // 等待交易上链
// await tx2.wait();
// // console.log(`交易详情：`)
// // console.log(tx2)
// // 读取WETH余额
// const balanceWETH2 = await contractWETH.balanceOf(addresses[10]);
// console.log(`发送后该钱包WETH持仓: ${ethers.formatEther(balanceWETH2)}\n`);
