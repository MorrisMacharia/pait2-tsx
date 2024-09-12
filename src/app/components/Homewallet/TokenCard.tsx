import React from "react";
import Image from "next/image";
import "../../Layout/home.css";
import { IoChevronForwardOutline } from "react-icons/io5";


interface TokenCardProps {
  name: string;
  price: string;
  logo: string;
  description: string;
}

export const TokenCard: React.FC<TokenCardProps> = ({ name, price, logo, description }) => {
  return (
    <div className="token-card">
      <div className="token-logo">
        <Image src={logo} alt={name} width={56} height={56} />
      </div>
      <div className="token-info">
        <div className="token-name">{name}</div>
        <span className="sp">
          <div className="token-price">{price}</div>
          <div className="token-description">{description}</div>
        </span>
      </div>

      <button className="small-button">Buy  <IoChevronForwardOutline />
      </button>
    </div>
  );
};
