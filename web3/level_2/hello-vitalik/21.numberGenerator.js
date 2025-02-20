import { ethers } from "ethers";
import { promises as fs } from "fs";
var wallet; // 钱包
// const regex = /^0x000.*$/; // 表达式
// var isValid = false;
// while (!isValid) {
//   wallet = ethers.Wallet.createRandom();
//   isValid = regex.test(wallet.address);
// }
// // 打印靓号地址与私钥
// console.log(`靓号地址：${wallet.address}`);
// console.log(`靓号私钥：${wallet.privateKey}`);

// for (let i = 1; i <= 101; i += 1) {
//   // 填充3位数字，比如001，002，003，...，999
//   const paddedIndex = (i).toString().padStart(3, '0');
//   const regex = new RegExp(`^0x${paddedIndex}.*$`);  // 表达式
//   var isValid = false
//   while(!isValid){
//       wallet = ethers.Wallet.createRandom() // 随机生成钱包
//       isValid = regex.test(wallet.address) // 检验正则表达式
//   }
//   // 打印地址与私钥
//   console.log(`钱包地址：${wallet.address}`)
//   console.log(`钱包私钥：${wallet.privateKey}`)
// }

function CreatedRegex(total) {
  const regexList = [];
  for (let index = 0; index < total; index++) {
    // 填充3位数字, 比如001,002,003,...,999
    const paddedIndex = (index + 1).toString().padStart(3, "0");
    const regex = new RegExp(`^0x${paddedIndex}.*$`);
    regexList.push(regex);
  }
  return regexList;
}

async function CreateWallet(regexList) {
  let wallet;
  var isValid = false;
  while (!isValid && regexList.length > 0) {
    wallet = ethers.Wallet.createRandom();
    const index = regexList.findIndex((regex) => regex.test(wallet.address));
    // 移除匹配的正则表达式
    if (index !== -1) {
      isValid = true;
      regexList.splice(index, 1);
    }
  }
  const data = `${wallet.address}:${wallet.privateKey}`;
  console.log(data);
  return data;
}

const total = 20;

async function main() {
  const regexList = CreatedRegex(total);
  const privateKeys = [];
  for (let index = 0; index < total; index++) {
    const walletData = await CreateWallet(regexList);
    privateKeys.push(walletData);
  }
  await fs.appendFile("seeds.txt", privateKeys.sort().join("\n"));
}
main().catch(console.error);
