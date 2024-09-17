"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import Link from "next/link";
import { generateMnemonicPhrase } from "../../utils/utils";
import "./page.css";
import VerifyPhrases from "../VerifyPhrases/VerifyPhrases";

interface TextData {
  icon: string;
  title: string;
  description: string;
}

interface NewwalletModalProps {
  onClose: () => void;
}

const NewwalletModal: React.FC<NewwalletModalProps> = ({ onClose }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFinishEnabled, setIsFinishEnabled] = useState<boolean>(false);
  const [generatedPhrases, setGeneratedPhrases] = useState<string[]>([]);
  const [showVerifyModal, setShowVerifyModal] = useState<boolean>(false);
  const router = useRouter();

  const handleClick = () => {
    if (isLoading) {
      setIsLoading(false);
      setIsFinishEnabled(true);
      const mnemonic = generateMnemonicPhrase();
      const phrasesArray = mnemonic.split(" ");
      setGeneratedPhrases(phrasesArray); // Generates 12 phrases
      toast.success("Wallet created");
    }
  };

  const handleFinish = () => {
    if (isFinishEnabled) {
      setShowVerifyModal(true);
    }
  };

  const handleCloseVerifyModal = () => {
    setShowVerifyModal(false);
  };

  const handleCopy = () => {
    if (generatedPhrases.length > 0) {
      const phrasesText = generatedPhrases.join(" ");
      navigator.clipboard
        .writeText(phrasesText)
        .then(() => {
          toast.success("Phrases copied to clipboard!");
        })
        .catch(() => {
          toast.error("Failed to copy phrases");
        });
    }
  };

  const textData: TextData[] = [
    {
      icon: "/badge-info.png",
      title: "These are your wallet's secret phrases.",
      description: "They let you access the wallet.",
    },
    {
      icon: "/book-key.png",
      title: "Store these in a secure place.",
      description: "Keep your wallet safe. Never share them.",
    },
    {
      icon: "/triangle-alert.png",
      title: "Your wallet cannot be recovered ",
      description: "if you lose the phrases.",
    },
  ];

  return (
    <>
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
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
          <div className="description2">
            <h1 className="wall2">Create New Wallet</h1>
            <div className="tips">
              {textData.map((item, index) => (
                <div className="tip1" key={index}>
                  <div className="tip-icon">
                    <Image src={item.icon} alt="icon" width={24} height={24} />
                  </div>
                  <div className="secrets">
                    <div className="tip-title">{item.title}</div>
                    <div className="tip-description">{item.description}</div>
                  </div>
                </div>
              ))}
            </div>
            <div
              className="phrases"
              onClick={handleClick}
              style={{ cursor: isLoading ? "pointer" : "default" }}
            >
              {isLoading ? (
                <div className="load">
                  <div className="loader-circle black"></div>
                  <p>Creating Wallet</p>
                </div>
              ) : (
                <div className="secret-phrases-grid">
                  {generatedPhrases.map((phrase, index) => (
                    <div key={index} className="phrase-item">
                      {phrase}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {!isLoading && (
              <button
                onClick={handleCopy}
                style={{
                  color: "#5BC0BE",
                  backgroundColor: "transparent",
                  border: "none",
                  display: "flex",
                  justifyContent: "flex-start",
                  cursor: "pointer",
                  gap: "5px",
                }}
              >
                <Image
                  src="/clipboard-copy.png"
                  width={11}
                  height={13}
                  alt="copy"
                />
                Tap to copy
              </button>
            )}
          </div>

          {!isLoading && (
            <button
              onClick={handleFinish}
              disabled={!isFinishEnabled}
              style={{
                backgroundColor: isFinishEnabled ? "#3A506B" : "grey",
                color: isFinishEnabled ? "#fff" : "#ccc",
                cursor: isFinishEnabled ? "pointer" : "not-allowed",
                width: "100%",
                height: "40px",
                border: "none",
                padding: "8px",
                borderRadius: "12px",
                fontSize: "14px",
                fontWeight: "600",
                transition: "background-color 0.3s, color 0.3s, cursor 0.3s",
              }}
            >
              I Have Saved Them, Continue
            </button>
          )}
        </div>
      </div>

      {showVerifyModal && (
        <VerifyPhrases onClose={handleCloseVerifyModal} originalPhrases={generatedPhrases.slice(0, 9)} />
      )}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss
        style={{
          textAlign: "center",
          width: "50%",
          maxWidth: "300px",
          minHeight: "20px",
          padding: "10px",
          margin: "0 auto",
          borderRadius: "12px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      />
    </>
  );
};

export default NewwalletModal;
