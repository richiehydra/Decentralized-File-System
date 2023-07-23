// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const drive = await hre.ethers.getContractFactory("Drive");
  const contract = await drive.deploy();
  await contract.deployed();
  console.log(`The Contract Address is ${contract.address}`);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
