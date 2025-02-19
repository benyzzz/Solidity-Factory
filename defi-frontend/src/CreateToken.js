import React, { useState } from "react";
import { connectToMetaMask, tokenFactory } from "./contracts";
import { ethers } from "ethers"; // Ajoute cette ligne

function CreateToken() {
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [supply, setSupply] = useState("");

  const handleCreateToken = async () => {
    await connectToMetaMask(); // Assure-toi que MetaMask est connecté
    const tx = await tokenFactory.createToken(name, symbol, ethers.parseEther(supply));
    await tx.wait();
    alert("Token créé avec succès !");
  };

  return (
    <div>
      <h2>Créer un Token</h2>
      <input
        type="text"
        placeholder="Nom du token"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Symbole du token"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
      />
      <input
        type="text"
        placeholder="Supply initial"
        value={supply}
        onChange={(e) => setSupply(e.target.value)}
      />
      <button onClick={handleCreateToken}>Créer Token</button>
    </div>
  );
}

export default CreateToken;