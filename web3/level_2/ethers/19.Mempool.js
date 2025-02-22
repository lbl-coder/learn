import { ethers } from "ethers";

const ALCHEMY_SEPOLIA_URL =
  "wss://sepolia.infura.io/ws/v3/868563c69418483695325a045c50a027";
const provider = new ethers.WebSocketProvider(ALCHEMY_SEPOLIA_URL);

// let i = 0;
// provider.on("pending", async (txHash) => {
//   if (txHash && i < 100) {
//     // 打印txHash
//     console.log(
//       `[${new Date().toLocaleTimeString()}] 监听Pending交易 ${i}: ${txHash} \r`
//     );
//     i++;
//   }
// });

let j = 0;
provider.on(
  "pending",
  throttle(async (txHash) => {
    if (txHash && j < 100) {
      // 打印tx详情
      let tx = await provider.getTransaction(txHash);
      console.log(
        `\n[${new Date().toLocaleTimeString()}] 监听Pending交易 ${j}: ${txHash} \r`
      );
      console.log(tx);
      j++;
    }
  }),
  1000
);

function throttle(fn, delay) {
  let timer;
  return function () {
    if (!timer) {
      fn.apply(this, arguments);
      timer = setTimeout(() => {
        clearTimeout(timer);
        timer = null;
      }, delay);
    }
  };
}
