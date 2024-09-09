import { ReactNode } from 'react';
import { poppins } from "@/app/utils/font";
import "./globals.css";

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }): JSX.Element => {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  );
};

export default RootLayout;
