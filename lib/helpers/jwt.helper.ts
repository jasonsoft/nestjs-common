import * as jwt from 'jsonwebtoken';

/**
 * JWT Helper
 * sign and verify
 * Added by Jason.Song (成长的小猪) on 2022/09/16 11:30:44
 */
export class JwtHelper {
  static sign(
    payload: string | object | Buffer,
    secretOrPrivateKey: jwt.Secret,
    options?: jwt.SignOptions,
  ): string {
    return jwt.sign(payload, secretOrPrivateKey, options);
  }

  static signAsync(
    payload: string | object | Buffer,
    secretOrPrivateKey: jwt.Secret,
    options: jwt.SignOptions,
  ): Promise<string | undefined> {
    return new Promise((resolve, reject) =>
      jwt.sign(payload, secretOrPrivateKey, options, (err, encoded) =>
        err ? reject(err) : resolve(encoded),
      ),
    );
  }

  static verify<T extends object = any>(
    token: string,
    secretOrPublicKey: jwt.Secret,
    options?: jwt.VerifyOptions,
  ): T {
    return jwt.verify(token, secretOrPublicKey, options) as T;
  }

  static verifyAsync<T extends object = any>(
    token: string,
    secretOrPublicKey: jwt.Secret | jwt.GetPublicKeyOrSecret,
    options?: jwt.VerifyOptions,
  ): Promise<T> {
    return new Promise((resolve, reject) =>
      jwt.verify(token, secretOrPublicKey, options, (err, decoded) =>
        err ? reject(err) : resolve(decoded as T),
      ),
    ) as Promise<T>;
  }
}
