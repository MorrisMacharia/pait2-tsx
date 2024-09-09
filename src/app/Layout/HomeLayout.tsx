import React, { useState, useEffect, ReactNode } from "react";
import BottomNavbar from "../components/Dock/dock";

// Define prop types
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
        padding: isMobile ? "50px" : "20px",
        position: "relative",
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
