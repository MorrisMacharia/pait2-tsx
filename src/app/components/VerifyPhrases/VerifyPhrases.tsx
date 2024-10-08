import React, { useState, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./verifyphrases.css";
import Image from "next/image";
import Link from "next/link";

type VerifyPhrasesProps = {
  onClose: () => void;
  originalPhrases: string[];
  closeAllModals: () => void;
  closeConnectWallet: () => void;
};

const VerifyPhrases: React.FC<VerifyPhrasesProps> = ({
  onClose,
  originalPhrases,
  closeAllModals,
  closeConnectWallet,
}) => {
  const [enteredPhrases, setEnteredPhrases] = useState<string[]>([]);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [activeInputs, setActiveInputs] = useState<boolean[]>(
    new Array(9).fill(false)
  );
  const [userInteracted, setUserInteracted] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    setEnteredPhrases(originalPhrases);
  }, [originalPhrases]);

  useEffect(() => {
    const allPhrasesEntered = enteredPhrases.every(
      (phrase) => phrase.trim() !== ""
    );

    if (allPhrasesEntered) {
      const isValid = enteredPhrases.every(
        (phrase, index) =>
          phrase.trim().toLowerCase() === originalPhrases[index].toLowerCase()
      );

      if (isValid) {
        setIsVerified(true);

        if (!toast.isActive("success-toast")) {
          toast.success("Phrases verified successfully!", {
            toastId: "success-toast",
          });
        }
      } else {
        setIsVerified(false);
        if (!toast.isActive("error-toast")) {
          toast.error(
            "The entered phrases are incorrect. Please check and try again.",
            { toastId: "error-toast" }
          );
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
    setUserInteracted(true);
  };

  const handleInputClick = (index: number) => {
    setActiveInputs((prev) => {
      const newActiveInputs = [...prev];
      newActiveInputs[index] = !newActiveInputs[index];
      return newActiveInputs;
    });
    setUserInteracted(true);
  };

  const handleFinish = async () => {
    if (isVerified) {
      closeAllModals();
      closeConnectWallet();
      router.replace("/?showBalance=true");
    }
  };

  const getPrompt = (row: number) => {
    const prompts = ["first", "second", "third"];
    return prompts[row] || "";
  };

  const getButtonStyle = () => {
    if (!isVerified) {
      return {
        backgroundColor: "#1C2541",
        color: "#ccc",
        cursor: "not-allowed",
      };
    }
    if (userInteracted) {
      return {
        backgroundColor: "#45A5A3",
        color: "#fff",
        cursor: "pointer",
      };
    }
    return {
      backgroundColor: "#1C2541",
      color: "#fff",
      cursor: "pointer",
    };
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
            Please review the auto-filled phrases and make any necessary
            corrections.
          </p>
          <div className="phrases-grid">
            {Array.from({ length: 3 }).map((_, rowIndex) => (
              <div key={rowIndex} className="phrases-row">
                <div className="prompt">
                  <p className="questions">
                    <span className="text-wrapper">Verify the </span>
                    <span className="span">{getPrompt(rowIndex)}</span>
                    <span className="text-wrapper"> set of phrases:</span>
                  </p>
                </div>
                <div className="phrase-inputs">
                  {Array.from({ length: 3 }).map((_, colIndex) => {
                    const index = rowIndex * 3 + colIndex;
                    return (
                      <input
                        key={index}
                        type="text"
                        className={`phrase-input ${
                          activeInputs[index] ? "active" : ""
                        }`}
                        value={enteredPhrases[index] || ""}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          handleInputChange(index, e.target.value)
                        }
                        onClick={() => handleInputClick(index)}
                        style={{
                          backgroundColor: activeInputs[index] ? "white" : "",
                          color: activeInputs[index] ? "black" : "",
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="finish-button-container">
          <div>
            <p className="forgot">
              <Image
                src="/chevron-left.png"
                width="24"
                height="24"
                alt="back"
              />
              I forgot to write them down, go back
            </p>
          </div>

          <button
            onClick={handleFinish}
            disabled={!isVerified}
            className="finish-button"
            style={{
              border: "none",
              borderRadius: "12px",
              ...getButtonStyle(),
            }}
          >
            Finish
          </button>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default VerifyPhrases;
