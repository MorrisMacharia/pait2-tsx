"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import "./Layout/home.css";
import Loading from "./loading";
import { IoIosLink } from "react-icons/io";
import HomeLayout from "./Layout/HomeLayout";
import { TokenCard } from "./components/Homewallet";
import PaitCard from "./components/Homewallet/Card";
import HomeBalance from "./components/Homewallet/Balance";

// Define the type for the token objects
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

  useEffect(() => {
    const splashScreenShown = localStorage.getItem("splashScreenShown");
    if (!splashScreenShown) {
      localStorage.setItem("splashScreenShown", "true");
      setTimeout(() => setShowSplash(false), 3000);
    } else {
      setShowSplash(false);
    }
  }, []);

  const handleShowBal = () => {
    setShowBal(!showBal);
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
        <Link href="/Connectwallet" className="connect-wallet">
          <button className="connect-button" onClick={handleShowBal}>
            <IoIosLink />
            Connect Wallet
          </button>
        </Link>
      </div>
    </HomeLayout>
  );
}
