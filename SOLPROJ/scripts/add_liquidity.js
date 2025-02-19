const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  // Adresse de PoolFactory (remplace par la tienne)
  const poolFactoryAddress = "0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6";
  const PoolFactory = await ethers.getContractFactory("PoolFactory");
  const poolFactory = PoolFactory.attach(poolFactoryAddress);

  // Adresse de la pool (remplace par la tienne)
  const poolAddress = deployer.address; // Ou l'adresse de la pool que tu as créée

  // Adresses des tokens (remplace par les tiennes)
  const tokenA = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const tokenB = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

  // Montants de liquidité à ajouter (en wei)
  const amountA = ethers.parseEther("100"); // 100 TokenA
  const amountB = ethers.parseEther("100"); // 100 TokenB

  // Ajoute de la liquidité
  const tx = await poolFactory.addLiquidity(poolAddress, amountA, amountB);
  await tx.wait();
  console.log("Liquidité ajoutée avec succès !");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});