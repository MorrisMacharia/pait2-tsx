import React from "react";
import "./WalletNav.css";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export const WalletNav = () => {

const router = useRouter();

const handleBackClick = () => {
  router.back();
};
  return (
    <div className="wallet-nav">
      <Link href="">
        <Image src="/logo.png" alt="logo" width={86} height={24} />
      </Link>
      <div className="circle" onClick={handleBackClick}>
        <Image src="/circle-x.png" alt="close" width={24} height={24} />
      </div>
    </div>
  );
};
