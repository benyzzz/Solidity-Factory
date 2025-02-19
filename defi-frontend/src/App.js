import React from "react";
import CreateToken from "./CreateToken";
import CreatePool from "./CreatePool";
import AddLiquidity from "./Addliquidity";
import Swap from "./Swap";
import WithdrawLiquidity from "./WithdrawLiquidity";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">DeFi Scam Swap</h1>
      <div className="bg-blue-500 text-white p-4">
  Ceci est un test TailwindCSS !
</div>
      <div className="space-y-6">
        <CreateToken />
        <CreatePool />
        <AddLiquidity />
        <Swap />
        <WithdrawLiquidity />
      </div>
    </div>
  );
}

export default App;