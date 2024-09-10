import React from "react";
import { LuWallet } from "react-icons/lu";
import "./page.css";

const breakdownData = [
  { name: "PAIT", amount: "54,000.0", usd: "$27,000" },
  { name: "SOL", amount: "24.64", usd: "$3,449" },
  { name: "TON", amount: "34.04", usd: "$255" },
];

const HomeBalance = () => {
  return (
    <div className="home">
      <div className="balance-header">
        <span>My Balance</span>

        <div className="label">
<div className="text-wrapper"><LuWallet className="wallet-icon" /> 0x******uio</div>
</div>
        
      </div>
      <div className="balance">USDT $30,704</div>
      <div className="breakdown">
        {breakdownData.map((item, index) => (
          <div className="breakdown-item" key={index}>
            <div className="bal-box">
              <span>{item.amount}</span>
              <p>{item.name}</p>
            </div>
            <span>
              <p>usdt</p>
              {item.usd}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeBalance;
