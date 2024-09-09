"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "../CreateNewWallet/page.css";

// Define the type for the secretPhrase state
type SecretPhrase = string[];

// Define the word list as a constant
const wordList: string[] = [
  "alpha", "beta", "gamma", "delta", "zeta", "eta", "theta", "iota",
  "kappa", "lambda", "mu", "nu", "twelve", "omicron", "pi", "rho",
  "sigma", "tau", "upsilon", "phi", "chi", "psi", "omega"
];

// Function to generate a secret phrase
const generateSecretPhrase = (): SecretPhrase => {
  const phrase: SecretPhrase = [];
  for (let i = 0; i < 12; i++) {
    const randomIndex = Math.floor(Math.random() * wordList.length);
    phrase.push(wordList[randomIndex]);
  }
  return phrase;
};

const CreateNewWallet: React.FC = () => {
  const [secretPhrase, setSecretPhrase] = useState<SecretPhrase>([]);
  const router = useRouter();

  useEffect(() => {
    setSecretPhrase(generateSecretPhrase());
  }, []);

  const handleCopy = () => {
    const phraseString = secretPhrase.join(" ");
    navigator.clipboard.writeText(phraseString)
      .then(() => {
        alert("Secret phrases copied to clipboard!");
      })
      .catch((err) => {
        console.error("Could not copy text: ", err);
      });
  };

  const handleBackClick = () => {
    router.back();
  };

  const handleContinue = () => {
    const query = secretPhrase.map((phrase, index) => `phrase${index}=${phrase}`).join('&');
    router.push(`/Verify?${query}`);
  };

  return (
    <div className="creation3">
      <div className="cont2">
        <div className="panel3">
          <div className="top3">
            <Link href="/Home">
              <div className="logo12">
                <Image src="/logo.png" alt="logo" width={86} height={24} />
              </div>
            </Link>
            <button className="circle2" onClick={handleBackClick}>
              <Image src="/circle-x.png" alt="back" width={24} height={24} />
            </button>
          </div>
          <div className="description2">
            <div className="wall2">Create New Wallet</div>
            <div className="tips">
              {[
                {
                  icon: "/badge-info.png",
                  text: "These are your wallet’s secret phrases. They let you access the wallet.",
                },
                {
                  icon: "/book-key.png",
                  text: "Store these in a secure place to keep your wallet safe. Never share them.",
                },
                {
                  icon: "/triangle-alert.png",
                  text: "Your wallet cannot be recovered if you lose the phrases.",
                },
              ].map((tip, index) => (
                <div className="tip1" key={index}>
                  <div className="iconcircle">
                    <div>
                      <Image src={tip.icon} alt="icon" width={24} height={24} />
                    </div>
                    <div className="secrets">{tip.text}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="copy">
              <div className="phrases">
                <table className="table">
                  <tbody>
                    {Array.from({ length: 4 }, (_, rowIndex) => (
                      <tr key={rowIndex}>
                        {Array.from({ length: 3 }, (_, colIndex) => (
                          <td key={colIndex}>
                            {secretPhrase[rowIndex * 3 + colIndex]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="tap" onClick={handleCopy}>
                <div className="copyicon">
                  <Image src="/clipboard-copy.png" alt="icon" width={16} height={16} />
                </div>
                <div className="tocopy">Tap to copy</div>
              </div>
            </div>
          </div>
          <div className="actions2">
            <button className="saved1" onClick={handleContinue}>
              I have saved them, continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNewWallet;
