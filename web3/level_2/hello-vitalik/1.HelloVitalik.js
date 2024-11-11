import { ethers } from "ethers";
// const provider = ethers.getDefaultProvider();
// https://ethereum-rpc.publicnode.com https://1rpc.io/eth 主网
// https://sepolia.infura.io/v3/868563c69418483695325a045c50a027 infura节点
const provider = new ethers.JsonRpcProvider('https://1rpc.io/eth');
const main = async () => {
    const balance = await provider.getBalance(`vitalik.eth`);
    console.log(`ETH Balance of vitalik: ${ethers.formatEther(balance)} ETH`);
}
main()