const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  // Adresse de PoolFactory (remplace par la tienne)
  const poolFactoryAddress = "0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6";
  const PoolFactory = await ethers.getContractFactory("PoolFactory");
  const poolFactory = PoolFactory.attach(poolFactoryAddress);

  // Adresse de la pool (remplace par la tienne)
  const poolAddress = deployer.address; // Ou l'adresse de la pool que tu as créée

  // Retire la liquidité
  const tx = await poolFactory.withdrawLiquidity(poolAddress);
  await tx.wait();
  console.log("Liquidité retirée avec succès !");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});