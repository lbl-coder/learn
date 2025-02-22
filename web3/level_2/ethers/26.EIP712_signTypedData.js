import { ethers } from "ethers";
const ALCHEMY_SEPOLIA_URL = "https://1rpc.io/eth";
const provider = new ethers.JsonRpcProvider(ALCHEMY_SEPOLIA_URL);

// 利用私钥和provider创建wallet对象
const privateKey =
  "1883253606d19047c9eef2b10c0328d1c333f3166ed5d206ae004aae644b1a65";
const wallet = new ethers.Wallet(privateKey, provider);

// 创建 EIP712 Domain，它包含了合约的 name、version（通常约定为 “1”）、chainId 以及 verifyingContract（验证签名的合约地址）。
let contractName = "EIP712Storage";
let version = "1";
let chainId = "1";
let contractAddress = "0xe343983e66e0492c0744B8D3ADC81ec0CA0669c7";

const domain = {
  name: contractName,
  version: version,
  chainId: chainId,
  verifyingContract: contractAddress,
};
// 创建签名消息的类型化数据，其中 types 声明类型，而 message 包含数据。
let spender = "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4";
let number = "234";

const types = {
  Storage: [
    { name: "spender", type: "address" },
    { name: "number", type: "uint256" },
  ],
};

const message = {
  spender: spender,
  number: number,
};
// EIP712 签名
const signature = await wallet.signTypedData(domain, types, message);
console.log(signature);
// 你可以使用 verifyTypedData() 方法复原出签名的 signer 地址并验证签名的有效性。通常，这一步会在智能合约中执行。
let eip712Signer = ethers.verifyTypedData(domain, types, message, signature);
console.log("EIP712 Signer: ", eip712Signer);
