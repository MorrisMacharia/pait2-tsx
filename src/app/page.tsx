"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import "./Layout/home.css";
import Loading from "./loading";
import { IoIosLink } from "react-icons/io";
import HomeLayout from "./Layout/HomeLayout";
import { TokenCard } from "./components/Homewallet";
import PaitCard from "./components/Homewallet/Card";
import HomeBalance from "./components/Homewallet/Balance";
import Connectwallet from "./components/Connectwallet/Connectwallet";

interface Token {
  name: string;
  price: string;
  description: string;
  logo: string;
}

const tokens: Token[] = [
  {
    name: "Solana",
    price: "USD $140.90",
    description: "/ 1 $SOL",
    logo: "/Logo4.png",
  },
  {
    name: "Ton",
    price: "USD $7.59",
    description: "/ 1 $TON",
    logo: "/Logo5.png",
  },
];

export default function Home(): JSX.Element {
  const [showSplash, setShowSplash] = useState<boolean>(true);
  const [showBal, setShowBal] = useState<boolean>(false);
  const [modalState, setModalState] = useState<
    "closed" | "opening" | "open" | "closing"
  >("closed");
  const searchParams = useSearchParams();

  useEffect(() => {
    const splashScreenShown = localStorage.getItem("splashScreenShown");
    if (!splashScreenShown) {
      localStorage.setItem("splashScreenShown", "true");
      setTimeout(() => setShowSplash(false), 3000);
    } else {
      setShowSplash(false);
    }

    const showBalance = searchParams.get("showBalance");
    if (showBalance === "true") {
      setShowBal(true);
    }
  }, [searchParams]);

  useEffect(() => {
    if (modalState === "opening") {
      const timer = setTimeout(() => setModalState("open"), 50);
      return () => clearTimeout(timer);
    }
  }, [modalState]);

  const handleConnectWallet = () => {
    setModalState("opening");
  };

  const handleCloseModal = () => {
    setModalState("closing");
    setTimeout(() => setModalState("closed"), 300); // Match this with your CSS transition duration
  };

  if (showSplash) return <Loading />;

  return (
    <HomeLayout>
      <div className="home1">
        {showBal ? (
          <HomeBalance />
        ) : (
          <div className="home-link">
            <Image src="/Clip.png" alt="home" width={122} height={34} />
          </div>
        )}

        <div className="wrapper">
          <PaitCard />
          <h2>Other Tokens</h2>
          <div className="cryptopurchase">
            {tokens.map((token, index) => (
              <TokenCard
                key={index}
                name={token.name}
                price={token.price}
                logo={token.logo}
                description={token.description}
              />
            ))}
          </div>
        </div>
        <div className="connect-wallet">
          <button className="connect-button" onClick={handleConnectWallet}>
            <IoIosLink />
            Connect Wallet
          </button>
        </div>
      </div>
      {modalState !== "closed" && (
        <div
          className={`modal-overlay ${modalState === "open" ? "active" : ""} ${
            modalState === "closing" ? "closing" : ""
          }`}
        >
          <Connectwallet onClose={handleCloseModal} />
        </div>
      )}
    </HomeLayout>
  );
}
