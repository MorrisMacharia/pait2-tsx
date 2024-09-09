import React, { useState, useEffect, ReactNode } from "react";
import BottomNavbar from "../components/Dock/dock";

interface HomeLayoutProps {
  children: ReactNode;
}

const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        minHeight: "100vh",
        padding: isMobile ? "30px" : "20px",
      }}
    >
      {children}

      <footer>
        <BottomNavbar  />
      </footer>
    </div>
  );
};

export default HomeLayout;
