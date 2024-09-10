import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import "../WalletFooter/WalletFooter.css"; 

interface WalletFooterProps {
  allPhrasesFilled: boolean;
  onFinish: () => void;
}

export const WalletFooter: React.FC<WalletFooterProps> = ({ allPhrasesFilled, onFinish }) => {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <div className="actions">
      <div className="forgot" onClick={handleBackClick}>
        <div>
          <Image src="/chevron-left.png" alt="back" width={24} height={24} />
        </div>
        <div className="write">I forgot to write them down, go back</div>
      </div>
      <div className="actions2">
        <button
          className="saved2"
          style={{
            backgroundColor: allPhrasesFilled ? 'aqua' : 'gray',
            width: '100%',
          }}
          onClick={onFinish}
          disabled={!allPhrasesFilled}
        >
          Finish
        </button>
      </div>
    </div>
  );
};
