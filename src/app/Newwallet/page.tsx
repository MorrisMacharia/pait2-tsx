"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import WalletLayout from "../Layout/WalletLayout";
import "../Newwallet/page.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import { generateMnemonicPhrase } from "../utils/utils";

interface TextData {
  icon: string;
  title: string;
  description: string;
}

const Newwallet: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFinishEnabled, setIsFinishEnabled] = useState<boolean>(false);
  const [generatedPhrases, setGeneratedPhrases] = useState<string[]>([]);
  const router = useRouter();

  const handleClick = () => {
    if (isLoading) {
      setIsLoading(false);
      setIsFinishEnabled(true);
      const mnemonic = generateMnemonicPhrase();
      const phrasesArray = mnemonic.split(" ");
      setGeneratedPhrases(phrasesArray);
      toast.success("Wallet created");
    }
  };

  const handleFinish = () => {
    if (isFinishEnabled) {
      const searchParams = new URLSearchParams({
        phrases: JSON.stringify(generatedPhrases),
      });
      router.push(`/VerifyPhrases?${searchParams.toString()}`);
    }
  };

  const handleCopy = () => {
    if (generatedPhrases.length > 0) {
      const phrasesText = generatedPhrases.join(" ");
      navigator.clipboard.writeText(phrasesText)
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
      title: "Your wallet cannot be recovered if you lose the phrases.",
      description: "",
    },
  ];

  return (
    <WalletLayout
      // hideFooter={isLoading}
      allPhrasesFilled={isFinishEnabled}
      onFinish={handleFinish}
    >
      <div className="description2">
        <h1 className="wall2">Create New Wallet</h1>
        <div className="tips">
          {textData.map((item, index) => (
            <div className="tip1" key={index}>
              <Image src={item.icon} alt="icon" width={24} height={24} />
              <div className="secrets">
                {item.title}
                <br />
                {item.description}
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
            <div>
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
              color: "aqua",
              backgroundColor: "transparent",
              border: "none",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
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
    </WalletLayout>
  );
};

export default Newwallet;
