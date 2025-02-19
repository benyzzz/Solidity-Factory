const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  // Adresse de PoolFactory (remplace par la tienne)
  const poolFactoryAddress = "0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6";
  const PoolFactory = await ethers.getContractFactory("PoolFactory");
  const poolFactory = PoolFactory.attach(poolFactoryAddress);

  // Adresse de la pool (remplace par la tienne)
  const poolAddress = deployer.address; // Ou l'adresse de la pool que tu as créée

  // Token à échanger (remplace par l'adresse de ton token)
  const tokenIn = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // TokenA
  const amountIn = ethers.parseEther("10"); // 10 TokenA à échanger

  // Fais un swap
  const tx = await poolFactory.swap(poolAddress, tokenIn, amountIn);
  await tx.wait();
  console.log("Swap effectué avec succès !");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});