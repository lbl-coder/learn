import { ethers } from "ethers";
// 利用公共rpc节点连接以太坊网络
// 可以在 https://chainlist.org 上找到
const ALCHEMY_MAINNET_URL = "https://1rpc.io/eth";
const provider = new ethers.JsonRpcProvider(ALCHEMY_MAINNET_URL);

async function erc20Checker(addr) {
  // 获取合约bytecode
  let code = await provider.getCode(addr);
  // 非合约地址的bytecode是0x
  if (code != "0x") {
    // 检查bytecode中是否包含transfer函数和totalSupply函数的selector
    if (code.includes("a9059cbb") && code.includes("18160ddd")) {
      // 如果有，则是ERC20
      return true;
    } else {
      // 如果没有，则不是ERC20
      return false;
    }
  } else {
    return null;
  }
}
// DAI address (mainnet)
const daiAddr = "0x6b175474e89094c44da98b954eedeac495271d0f";
// BAYC address (mainnet)
const baycAddr = "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d";

const main = async () => {
  // 检查DAI合约是否为ERC20
  let isDaiERC20 = await erc20Checker(daiAddr);
  console.log(`1. Is DAI a ERC20 contract: ${isDaiERC20}`);

  // 检查BAYC合约是否为ERC20
  let isBaycERC20 = await erc20Checker(baycAddr);
  console.log(`2. Is BAYC a ERC20 contract: ${isBaycERC20}`);
};

main();
