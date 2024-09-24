"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import NewwalletModal from "../Newwallet/NewwalletModal";
import "../Connectwallet/page.css";

interface ConnectwalletProps {
  onClose: () => void;
}

const Connectwallet: React.FC<ConnectwalletProps> = ({ onClose }) => {
  const router = useRouter();
  const [showNewWalletModal, setShowNewWalletModal] = useState(false);

  const handleLinkWallet = () => {
    router.push("/?showBalance=true");
    onClose();
  };

  const openNewWalletModal = () => {
    setShowNewWalletModal(true);
  };

  const closeNewWalletModal = () => {
    setShowNewWalletModal(false);
  };
  const closeConnectWallet = () => {
    onClose();
  };
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="container">
          <div className="top">
            <Link href="/">
              <div className="logo11">
                <Image src="/logo.png" alt="logo" width={86} height={24} />
              </div>
            </Link>
            <button className="circle" onClick={onClose}>
              <Image src="/circle-x.png" alt="back" width={24} height={24} />
            </button>
          </div>

          <div className="description">
            <div className="wall">Connect Wallet</div>
            <div className="hand">
              <Image src="/hand.png" alt="hand" width={240} height={212} />
            </div>
            <div className="web">
              Your web3 wallet acts as your user account, and is where you store
              your assets like coins.
            </div>
          </div>
          <div className="actions">
            <button className="new" onClick={openNewWalletModal}>
              <div>
                <Image src="/plus.png" alt="plus" width={24} height={24} />
              </div>
              <div className="crt">Create New Wallet</div>
            </button>
            <button className="link" onClick={handleLinkWallet}>
              <div>
                <Image src="/link.png" alt="link" width={24} height={24} />
              </div>
              <div className="crt">Link Existing Wallet</div>
            </button>
          </div>
        </div>
        {showNewWalletModal && (
      <NewwalletModal 
        onClose={closeNewWalletModal} 
        closeConnectWallet={closeConnectWallet}
      />
    )}
      </div>
    </div>
  );
};

export default Connectwallet;
