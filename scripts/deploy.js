// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
// fetch the balances
async function getBalances(address) {
  const balanceBigInt = await hre.ethers.provider.getBalance(address);
  return hre.ethers.utils.formatEther(balanceBigInt); //cast to bigInt
}
// console balances
async function consoleBalances(addresses) {
  let counter = 0;
  for (const address of addresses) {
    console.log(`Address ${counter} balance: `, await getBalances(address));
    counter++;
  }
}

// check memos
async function consoleMemos(memos) {
  for (const memo of memos) {
    const timestamp = memo.timestamp;
    const name = memo.name;
    const from = memo.from;
    const message = memo.message;
    console.log(`At ${timestamp}, name ${name}, address ${from}, message ${message}`);
  }
}

async function main() {

  const [owner, from1, from2, from3] = await hre.ethers.getSigners();
  const coffee = await hre.ethers.getContractFactory("coffee");
  const contract = await coffee.deploy(); // instance of contract

  await contract.deployed();
  console.log("Address of contract: ", contract.address);

  const addresses = [owner.address, from1.address, from2.address, from3.address];
  console.log("Before buying coffee: ");
  await consoleBalances(addresses);

  const amount = { value: hre.ethers.utils.parseEther("1") }
  await contract.connect(from1).buyCoffee("Avinash", "Great Indeed!", amount);
  await contract.connect(from2).buyCoffee("Avinash2", "2Great Indeed!", amount);
  await contract.connect(from3).buyCoffee("Avinash3", "3Great Indeed!", amount);

  console.log("After buying coffee: ");
  await consoleBalances(addresses);

  const memos = await contract.getMemos();
  consoleMemos(memos);


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
