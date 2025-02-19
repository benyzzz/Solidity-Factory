import React, { useState } from "react";
import { connectToMetaMask, poolFactory } from "./contracts";
import { ethers } from "ethers"; // Ajoute cette ligne

function Swap() {
  const [poolAddress, setPoolAddress] = useState("");
  const [tokenIn, setTokenIn] = useState("");
  const [amountIn, setAmountIn] = useState("");

  const handleSwap = async () => {
    await connectToMetaMask(); // Assure-toi que MetaMask est connecté
    const tx = await poolFactory.swap(poolAddress, tokenIn, ethers.parseEther(amountIn));
    await tx.wait();
    alert("Swap effectué avec succès !");
  };

  return (
    <div>
      <h2>Faire un Swap</h2>
      <input
        type="text"
        placeholder="Adresse de la pool"
        value={poolAddress}
        onChange={(e) => setPoolAddress(e.target.value)}
      />
      <input
        type="text"
        placeholder="Token à échanger"
        value={tokenIn}
        onChange={(e) => setTokenIn(e.target.value)}
      />
      <input
        type="text"
        placeholder="Montant à échanger"
        value={amountIn}
        onChange={(e) => setAmountIn(e.target.value)}
      />
      <button onClick={handleSwap}>Faire un Swap</button>
    </div>
  );
}

export default Swap;