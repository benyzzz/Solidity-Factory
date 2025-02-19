import React, { useState } from "react";
import { connectToMetaMask, poolFactory } from "./contracts";

function CreatePool() {
  const [tokenA, setTokenA] = useState("");
  const [tokenB, setTokenB] = useState("");

  const handleCreatePool = async () => {
    await connectToMetaMask(); // Assure-toi que MetaMask est connecté
    const tx = await poolFactory.createPool(tokenA, tokenB);
    await tx.wait();
    alert("Pool créée avec succès !");
  };

  return (
    <div>
      <h2>Créer une Pool</h2>
      <input
        type="text"
        placeholder="Adresse de Token A"
        value={tokenA}
        onChange={(e) => setTokenA(e.target.value)}
      />
      <input
        type="text"
        placeholder="Adresse de Token B"
        value={tokenB}
        onChange={(e) => setTokenB(e.target.value)}
      />
      <button onClick={handleCreatePool}>Créer Pool</button>
    </div>
  );
}

export default CreatePool;