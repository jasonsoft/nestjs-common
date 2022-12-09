import { AesCryptoHelper } from './aes-crypto.helper';

describe('AesCryptoHelper', () => {
  const key = 'z6F8v2tgXNzhAEmj';
  const plaintext = 'hello world';
  const expectedHexString = '14c3c15a38e8e9a177139038946cd97d';
  const expectedBase64String = 'FMPBWjjo6aF3E5A4lGzZfQ==';

  it('aes-128-ecb encrypt to hex string', () => {
    const ciphertext = AesCryptoHelper.encryptToHexString(plaintext, key);
    expect(ciphertext).toBe(expectedHexString);
  });

  it('aes-128-ecb decrypt by hex string', () => {
    const plaintext = AesCryptoHelper.decryptByHexString(
      expectedHexString,
      key,
    );
    expect(plaintext).toBe(plaintext);
  });

  it('aes-128-ecb encrypt to base64 string', () => {
    const ciphertext = AesCryptoHelper.encryptToBase64String(plaintext, key);
    expect(ciphertext).toBe(expectedBase64String);
  });

  it('aes-128-ecb decrypt by base64 string', () => {
    const plaintext = AesCryptoHelper.decryptByBase64String(
      expectedBase64String,
      key,
    );
    expect(plaintext).toBe(plaintext);
  });
});
