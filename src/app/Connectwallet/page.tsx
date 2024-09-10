"use client";

import React from "react";
import "../Connectwallet/page.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Connectwallet = () => {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  const handleLinkWallet = () => {
    // Redirect to home page with a query parameter
    router.push("/?showBalance=true");
  };

  return (
    <div className="creation1">
           <div className="top">
        <Link href="/Home">
          <div className="logo11">
            <Image src="/logo.png" alt="logo" width={86} height={24} />
          </div>
        </Link>
        <button className="circle" onClick={handleBackClick}>
          <Image src="/circle-x.png" alt="back" width={24} height={24} />
        </button>
      </div>

      <div className="description">
        <div className="wall">Connect Wallet</div>
        <div className="hand">
          <Image
            src="/hand.png"
            alt="hand"
            width={240}
            height={212}
            color="white"
          />
        </div>
        <div className="web">
          Your web3 wallet acts as your user account, and is where you store
          your assets like coins.
        </div>
      </div>
      <div className="actions">
        <Link className="crt1" href="/Newwallet">
          <button className="new">
            <div>
              <Image src="/plus.png" alt="plus" width={24} height={24} />
            </div>
            <div className="crt">Create New Wallet</div>
          </button>
        </Link>

        <button className="link" onClick={handleLinkWallet}>
          <div>
            <Image src="/link.png" alt="link" width={24} height={24} />
          </div>
          <div className="crt">Link Existing Wallet</div>
        </button>
      </div>
    </div>
  );
};

export default Connectwallet;