import * as bip39 from 'bip39';
import { randomBytes } from 'crypto';

export function generateMnemonicPhrase(): string {
  const entropy = randomBytes(16); 
  return bip39.entropyToMnemonic(entropy);
}

export function validateMnemonicPhrase(phrase: string): boolean {
  return bip39.validateMnemonic(phrase);
}
