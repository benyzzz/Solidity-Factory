const { ethers } = require("hardhat");

async function main() {
  // Utilise le chemin complet pour éviter l'ambiguïté
  const TokenFactory = await ethers.getContractFactory("TokenFactory");
  const tokenFactory = await TokenFactory.deploy();
  await tokenFactory.waitForDeployment();
  console.log("TokenFactory déployé à l'adresse :", tokenFactory.target);

  // Crée un token
  const tx = await tokenFactory.createToken("MonToken", "MTK", 1000000);
  await tx.wait();
  console.log("Token créé avec succès !");

  // Récupère l'adresse du token créé
  const tokens = await tokenFactory.getTokens();
  console.log("Adresse du token créé :", tokens[0]);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});