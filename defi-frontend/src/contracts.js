import { ethers } from "ethers";
import TokenFactory from "./abis/TokenFactory.json";
import PoolFactory from "./abis/PoolFactory.json";

let provider;
let signer;
let tokenFactory;
let poolFactory;

async function connectToMetaMask() {
  if (window.ethereum) {
    provider = new ethers.BrowserProvider(window.ethereum);
    await window.ethereum.request({ method: "eth_requestAccounts" }); // Demande la connexion à MetaMask
    signer = await provider.getSigner();

    // Remplace les adresses par celles de tes contrats déployés
    tokenFactory = new ethers.Contract(
      "0x5FbDB2315678afecb367f032d93F642f64180aa3", // Adresse de TokenFactory
      TokenFactory.abi,
      signer
    );

    poolFactory = new ethers.Contract(
      "0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6", // Adresse de PoolFactory
      PoolFactory.abi,
      signer
    );

    return { tokenFactory, poolFactory };
  } else {
    throw new Error("MetaMask n'est pas installé !");
  }
}

export { connectToMetaMask, tokenFactory, poolFactory };