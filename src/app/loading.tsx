"use client";
import Image from "next/image";

const Loading: React.FC = (): JSX.Element => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Image
        src="/Group.png"
        alt="pait logo"
        width={257.893}
        height={71.63}
      />
    </div>
  );
};

export default Loading;
