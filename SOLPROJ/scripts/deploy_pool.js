const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  // Déploie PoolFactory
  const PoolFactory = await ethers.getContractFactory("PoolFactory");
  const poolFactory = await PoolFactory.deploy();
  await poolFactory.waitForDeployment();
  console.log("PoolFactory déployé à :", poolFactory.target);

  // Adresses des tokens récupérées après le premier déploiement
  const tokenA = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Remplace par l'adresse de ton TokenA
  const tokenB = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"; // Remplace par l'adresse de ton TokenB

  // Création de la pool
  let tx = await poolFactory.createPool(tokenA, tokenB);
  await tx.wait();
  console.log(`Pool créée entre ${tokenA} et ${tokenB} !`);

  // Récupère l'adresse de la pool
  const poolAddress = await poolFactory.pools(deployer.address);
  console.log("Adresse de la pool :", poolAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});