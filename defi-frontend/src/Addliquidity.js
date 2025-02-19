import React, { useState } from "react";
import { connectToMetaMask, poolFactory } from "./contracts";
import { ethers } from "ethers"; // Ajoute cette ligne

function AddLiquidity() {
  const [poolAddress, setPoolAddress] = useState("");
  const [amountA, setAmountA] = useState("");
  const [amountB, setAmountB] = useState("");

  const handleAddLiquidity = async () => {
    await connectToMetaMask(); // Assure-toi que MetaMask est connecté
    const tx = await poolFactory.addLiquidity(poolAddress, ethers.parseEther(amountA), ethers.parseEther(amountB));
    await tx.wait();
    alert("Liquidité ajoutée avec succès !");
  };

  return (
    <div>
      <h2>Ajouter de la Liquidité</h2>
      <input
        type="text"
        placeholder="Adresse de la pool"
        value={poolAddress}
        onChange={(e) => setPoolAddress(e.target.value)}
      />
      <input
        type="text"
        placeholder="Montant de Token A"
        value={amountA}
        onChange={(e) => setAmountA(e.target.value)}
      />
      <input
        type="text"
        placeholder="Montant de Token B"
        value={amountB}
        onChange={(e) => setAmountB(e.target.value)}
      />
      <button onClick={handleAddLiquidity}>Ajouter Liquidité</button>
    </div>
  );
}

export default AddLiquidity;