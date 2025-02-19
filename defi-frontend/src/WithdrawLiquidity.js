import React, { useState } from "react";
import { connectToMetaMask, poolFactory } from "./contracts";

function WithdrawLiquidity() {
  const [poolAddress, setPoolAddress] = useState("");

  const handleWithdraw = async () => {
    await connectToMetaMask(); // Assure-toi que MetaMask est connecté
    const tx = await poolFactory.withdrawLiquidity(poolAddress);
    await tx.wait();
    alert("Liquidité retirée avec succès !");
  };

  return (
    <div>
      <h2>Retirer de la Liquidité</h2>
      <input
        type="text"
        placeholder="Adresse de la pool"
        value={poolAddress}
        onChange={(e) => setPoolAddress(e.target.value)}
      />
      <button onClick={handleWithdraw}>Retirer Liquidité</button>
    </div>
  );
}

export default WithdrawLiquidity;