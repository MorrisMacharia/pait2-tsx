"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import WalletLayout from "@/app/Layout/WalletLayout";
import "./page.css";
import { validateMnemonicPhrase } from "../utils/utils";

// Define the type for the phrases state
type Phrase = string;

const Verify: React.FC = (): JSX.Element => {
  const [phrases, setPhrases] = useState<Phrase[]>([]);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const routerPhrases = searchParams.get("phrases");
    if (routerPhrases) {
      try {
        const decodedPhrases = JSON.parse(decodeURIComponent(routerPhrases));
        if (Array.isArray(decodedPhrases) && decodedPhrases.every((p: any) => typeof p === 'string')) {
          setPhrases(decodedPhrases as Phrase[]);
          setIsVerified(true);
        } else {
          throw new Error("Invalid phrases format");
        }
      } catch (error) {
        console.error("Error decoding phrases:", error);
        setIsVerified(false);
      }
    }
  }, [searchParams]);

  const handleFinish = () => {
    if (isVerified) {
      router.push("/Connectwallet");
    }
  };

  return (
    <WalletLayout allPhrasesFilled={isVerified} onFinish={handleFinish}>
      <div className="holder">
        <div className="description">
          <h3 className="h1">Verify Secret Phrases</h3>
          <p className="p1">These are your verified secret phrases.</p>
        </div>
        <div className="grid-container">
          {phrases.map((phrase, index) => (
            <div key={index} className="phrase-item">
              <input
                type="text"
                className="input-phrase"
                value={phrase}
                readOnly
              />
            </div>
          ))}
        </div>
      </div>
    </WalletLayout>
  );
};

export default Verify;
