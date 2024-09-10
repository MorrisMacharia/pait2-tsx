"use client";

import React from "react";
import "../Dock/dock.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

const BottomNavbar = () => {
  const router = useRouter();

  const handleonClick = () => {
    router.push("/");
  };

  const navItems = [
    { src: "/white-logomark 1.png", label: "Home", onClick: handleonClick },
    { src: "/copy.png", label: "Copy" },
    { src: "/trade.png", label: "Trade" },
    { src: "/coins.png", label: "Meme" },
  ];

  return (
    <div className="dock">
      {navItems.map((item, index) => (
        <div key={index} className="btn11">
          <button className={index === 0 ? "dock1" : "dock2"} onClick={item.onClick}>
            <Image src={item.src} alt={item.label} width={24} height={17} />
            <div className="hm">{item.label}</div>
          </button>
        </div>
      ))}
    </div>
  );
};

export default BottomNavbar;
