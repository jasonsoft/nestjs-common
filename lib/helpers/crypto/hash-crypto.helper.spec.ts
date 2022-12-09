import { HashCryptoHelper } from './hash-crypto.helper';

describe('Md5CryptoHelper', () => {
  const plaintext = 'hello world';

  it('md5 hash', () => {
    const ciphertext = HashCryptoHelper.md5ToHexString(plaintext);
    expect(ciphertext).toBe('5eb63bbbe01eeed093cb22bb8f5acdc3');
  });

  it('sha1 hash', () => {
    const ciphertext = HashCryptoHelper.sha1ToHexString(plaintext);
    expect(ciphertext).toBe('2aae6c35c94fcfb415dbe95f408b9ce91ee846ed');
  });
});
