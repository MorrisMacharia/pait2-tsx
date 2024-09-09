"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import WalletLayout from "../Layout/WalletLayout";
import { ToastContainer, toast } from "react-toastify";
import "../VerifyPhrases/verifyphrases.css";
import "react-toastify/dist/ReactToastify.css";
import { validateMnemonicPhrase } from "../utils/utils";

type VerifyPhrasesProps = {
  hideFooter?: boolean;
  allPhrasesFilled?: boolean;
  onFinish?: () => void;
};

const VerifyPhrases: React.FC = () => {
  const [enteredPhrases, setEnteredPhrases] = useState<string[]>(Array(12).fill(""));
  const [originalPhrases, setOriginalPhrases] = useState<string[]>([]);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const routerPhrases = searchParams.get("phrases");
    if (routerPhrases) {
      try {
        const decodedPhrases = JSON.parse(decodeURIComponent(routerPhrases));
        if (Array.isArray(decodedPhrases) && decodedPhrases.every((p: any) => typeof p === 'string')) {
          setOriginalPhrases(decodedPhrases as string[]);
        } else {
          throw new Error("Invalid phrases format");
        }
      } catch (error) {
        console.error("Error decoding phrases:", error);
        toast.error(
          "An error occurred while processing phrases. Please try again."
        );
      }
    }
  }, [searchParams]);

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
      const encodedPhrases = encodeURIComponent(JSON.stringify(enteredPhrases));
      router.push(`/Verify?phrases=${encodedPhrases}`);
    }
  };

  return (
    <WalletLayout
      // hideFooter={false}
      allPhrasesFilled={isVerified}
      onFinish={handleFinish}
    >
      <div className="verify-container">
        <h1 className="verify-title">Verify Secret Phrases</h1>
        <p className="verify-description">
          Enter all 12 phrases in the correct order.
        </p>
        <div className="phrases-grid">
          {Array.from({ length: 12 }).map((_, index) => (
            <input
              key={index}
              type="text"
              className="phrase-input"
              value={enteredPhrases[index]}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(index, e.target.value)}
            />
          ))}
        </div>
      </div>
      <ToastContainer />
    </WalletLayout>
  );
};

export default VerifyPhrases;
