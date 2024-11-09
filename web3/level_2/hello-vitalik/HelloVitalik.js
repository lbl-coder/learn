import { ethers } from "ethers";
// const provider = ethers.getDefaultProvider();https://eth.blockrazor.xyz
const provider = new ethers.JsonRpcProvider('https://sepolia.infura.io/v3/868563c69418483695325a045c50a027');
const main = async () => {
    const balance = await provider.getBalance(`vitalik.eth`);
    console.log(`ETH Balance of vitalik: ${ethers.formatEther(balance)} ETH`);
}
main()