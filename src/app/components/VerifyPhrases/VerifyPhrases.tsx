"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "./verifyphrases.css";
import "react-toastify/dist/ReactToastify.css";
import { validateMnemonicPhrase } from "../../utils/utils";
import Image from "next/image";
import Link from "next/link";

type VerifyPhrasesProps = {
  onClose: () => void;
  originalPhrases: string[]; // Added prop
};

const VerifyPhrases: React.FC<VerifyPhrasesProps> = ({
  onClose,
  originalPhrases,
}) => {
  const [enteredPhrases, setEnteredPhrases] = useState<string[]>(
    Array(12).fill("")
  );
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const allPhrasesEntered = enteredPhrases.every(
      (phrase) => phrase.trim() !== ""
    );

    if (allPhrasesEntered) {
      const isValid = enteredPhrases.every(
        (phrase, index) => phrase.trim() === originalPhrases[index]
      );

      if (isValid) {
        const mnemonicPhrase = enteredPhrases.join(" ").trim();
        if (validateMnemonicPhrase(mnemonicPhrase)) {
          setIsVerified(true);
          toast.success("Phrases verified successfully!");
        } else {
          toast.error("The entered phrases are not valid. Please try again.");
        }
      } else {
        setIsVerified(false);
      }
    } else {
      setIsVerified(false);
    }
  }, [enteredPhrases, originalPhrases]);

  const handleInputChange = (index: number, value: string) => {
    const updatedPhrases = [...enteredPhrases];
    updatedPhrases[index] = value;
    setEnteredPhrases(updatedPhrases);
  };

  const handleFinish = () => {
    if (isVerified) {
      router.push(`/Verify`);
      onClose(); // Close the modal when finished
    }
  };

  const getPrompt = (row: number) => {
    const prompts = ["first", "second", "third"];
    return prompts[row] || "";
  };

  return (
    <div className="modal-overlay show">
      <div className="modal-content">
        <div className="top">
          <Link href="/">
            <div className="logo11">
              <Image src="/logo.png" alt="logo" width={86} height={24} />
            </div>
          </Link>
          <button className="circle" onClick={onClose}>
            <Image src="/circle-x.png" alt="close" width={24} height={24} />
          </button>
        </div>
        <div className="verify-container">
          <h1 className="verify-title">Verify Secret Phrases</h1>
          <p className="verify-description">
            Confirm that you have saved the phrase by selecting the correct
            options.
          </p>
          <div className="phrases-grid">
            {Array.from({ length: 3 }).map((_, rowIndex) => (
              <div key={rowIndex} className="phrases-row">
                <div className="prompt">
                  <p className="questions">
                    <span className="text-wrapper">What is the </span>
                    <span className="span">{getPrompt(rowIndex)}</span>
                    <span className="text-wrapper"> phrase?</span>
                  </p>
                </div>
                <div className="phrase-inputs">
                  {Array.from({ length: 3 }).map((_, colIndex) => (
                    <input
                      key={rowIndex * 3 + colIndex}
                      type="text"
                      className="phrase-input"
                      value={enteredPhrases[rowIndex * 3 + colIndex]}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleInputChange(rowIndex * 3 + colIndex, e.target.value)
                      }
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <ToastContainer />
        </div>

        <div className="finish-button-container">
          <div>
            <p className="forgot">I forgot to write them down, go back</p>
          </div>

          <button
            onClick={handleFinish}
            disabled={!isVerified}
            className="finish-button"
            style={{
              border: "none",
              backgroundColor: isVerified ? "#45A5A3" : "#1C2541",
              color: isVerified ? "#fff" : "#ccc",
              cursor: isVerified ? "pointer" : "not-allowed",
            }}
          >
            Finish
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyPhrases;
