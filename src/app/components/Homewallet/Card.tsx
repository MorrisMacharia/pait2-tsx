import Image from "next/image";
import React from "react";
import "./page.css";

export default function PaitCard() {
  return (
    <div className="pait">
      <div className="wordings">
        <h2>Buy PAiT</h2>
        <p>Unlock profits exclusive to PAiT holders.</p>
        <div className="one">
          <span>USD $0.50</span> / 1 $PAIT
        </div>
        <button className="buybutton">Buy Now &gt;</button>
      </div>
      <div className="logo">
        <Image src="/Logo3.png" alt="image" width="88" height="88" />
      </div>
    </div>
  );
}
