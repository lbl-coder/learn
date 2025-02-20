import { ethers } from "ethers";

const ALCHEMY_SEPOLIA_URL =
  "wss://sepolia.infura.io/ws/v3/868563c69418483695325a045c50a027";
const provider = new ethers.WebSocketProvider(ALCHEMY_SEPOLIA_URL);
let network = provider.getNetwork();
network.then((res) =>
  console.log(
    `[${new Date().toLocaleTimeString()}] 连接到 chain ID ${res.chainId}`
  )
);

const iface = new ethers.Interface([
  "function transfer(address, uint) public returns (bool)",
]);

const selector = iface.getFunction("transfer").selector;
console.log("函数选择器是" + selector);
// 处理bigInt
function handleBigInt(key, value) {
  if (typeof value === "bigint") {
    return value.toString() + "n"; // or simply return value.toString();
  }
  return value;
}

let j = 0;
provider.on("pending", async (txHash) => {
  if (txHash) {
    const tx = await provider.getTransaction(txHash);
    j++;
    if (tx !== null && tx.data.indexOf(selector) !== -1) {
      console.log(
        `[${new Date().toLocaleTimeString()}]监听到第${
          j + 1
        }个pending交易:${txHash}`
      );
      console.log(
        `打印解码交易详情:${JSON.stringify(
          iface.parseTransaction(tx),
          handleBigInt,
          2
        )}`
      );
      console.log(`转账目标地址:${iface.parseTransaction(tx).args[0]}`);
      console.log(
        `转账金额:${ethers.formatEther(iface.parseTransaction(tx).args[1])}`
      );
      provider.removeListener("pending", this);
    }
  }
});
