import { ethers } from "ethers";

const ALCHEMY_MAINNET_URL =
  "https://sepolia.infura.io/v3/868563c69418483695325a045c50a027";
const provider = new ethers.JsonRpcProvider(ALCHEMY_MAINNET_URL);

// 利用私钥和provider创建wallet对象
const privateKey =
  "1883253606d19047c9eef2b10c0328d1c333f3166ed5d206ae004aae644b1a65";
const wallet = new ethers.Wallet(privateKey, provider);

// 2. 声明WETH合约
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

// 3. 创建HD钱包
console.log("\n1. 创建HD钱包");
// 通过助记词生成HD钱包
const mnemonic = `tattoo around foster ramp blur blur bulb monitor loan hat aerobic way almost gauge then space capital pave protect jealous have fork glove amazing`;
const hdNode = ethers.HDNodeWallet.fromPhrase(mnemonic);
// console.log(hdNode);
console.log("\n2. 通过HD钱包派生20个钱包");
const numWallet = 2;
// 派生路径：m / purpose' / coin_type' / account' / change / address_index
// 我们只需要切换最后一位address_index，就可以从hdNode派生出新钱包
let basePath = "44'/60'/0'/0";
let wallets = [];
for (let i = 0; i < numWallet; i++) {
  let hdNodeNew = hdNode.derivePath(basePath + "/" + i);
  let walletNew = new ethers.Wallet(hdNodeNew.privateKey);
  wallets.push(walletNew);
}
// 定义发送数额
const amount = ethers.parseEther("0.00001");
console.log(`发送数额：${amount}`);

const main = async () => {
  console.log("\n3. 读取一个地址的ETH和WETH余额");
  //读取WETH余额
  const balanceWETH = await contractWETH.balanceOf(wallets[1]);
  console.log(`WETH持仓: ${ethers.formatEther(balanceWETH)}\n`);
  //读取ETH余额
  const balanceETH = await provider.getBalance(wallets[1]);
  console.log(`ETH持仓: ${ethers.formatEther(balanceETH)}\n`);

  const balanceETH2 = await provider.getBalance(wallet);
  console.log(`ETH持仓: ${ethers.formatEther(balanceETH2)}\n`);
  // 如果钱包ETH足够
  if (
    ethers.formatEther(balanceETH) > ethers.formatEther(amount) &&
    ethers.formatEther(balanceWETH) >= ethers.formatEther(amount)
  ) {
    // 6. 批量归集钱包的ETH
    console.log("\n4. 批量归集20个钱包的ETH");
    const txSendETH = {
      to: wallet.adress,
      value: amount,
    };
    // for (let i = 0; i < numWallet; i++) {
    //   // 将钱包连接到provider
    //   let walletWithProvider = wallets[i].connect(provider);
    //   var tx = await walletWithProvider.sendTransaction(txSendETH);
    //   console.log(
    //     `第 ${i + 1} 个钱包 ${walletWithProvider.address} ETH 归集开始`
    //   );
    // }
    // await tx.wait();

    // 7. 批量归集钱包的WETH
    console.log("\n5. 批量归集20个钱包的WETH");
    for (let i = 0; i < numWallet; i++) {
      // 将钱包连接到provider
      let walletiWithProvider = wallets[i].connect(provider);
      // 将合约连接到新的钱包
      let contractConnected = contractWETH.connect(walletiWithProvider);
      var tx = await contractConnected.transfer(wallet.address, amount);
      console.log(`第 ${i + 1} 个钱包 ${wallets[i].address} WETH 归集开始`);
    }
    await tx.wait();
    console.log(`WETH 归集结束`);
    // 8. 读取一个地址在归集后的ETH和WETH余额
    console.log("\n6. 读取一个地址在归集后的ETH和WETH余额");
    // // 读取WETH余额
    const balanceWETHAfter = await contractWETH.balanceOf(wallets[1]);
    console.log(`归集后WETH持仓: ${ethers.formatEther(balanceWETHAfter)}`);
    // 读取ETH余额
    // const balanceETHAfter = await provider.getBalance(wallets[1]);
    // console.log(`归集后ETH持仓: ${ethers.formatEther(balanceETHAfter)}\n`);

    const balanceETH2 = await provider.getBalance(wallet);
    console.log(`归集后钱包ETH持仓: ${ethers.formatEther(balanceETH2)}\n`);
  }
};

main();
