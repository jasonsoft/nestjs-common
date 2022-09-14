import { ModuleMetadata, Type } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

export interface JwtModuleOptions {
  secret: string | Buffer;
  signOptions?: jwt.SignOptions;
  verifyOptions?: jwt.VerifyOptions;
}

export interface JwtOptionsFactory {
  createJwtOptions(): Promise<JwtModuleOptions> | JwtModuleOptions;
}

export interface JwtModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<JwtOptionsFactory>;
  useClass?: Type<JwtOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<JwtModuleOptions> | JwtModuleOptions;
  inject?: any[];
}

export interface JwtSignOptions extends jwt.SignOptions {
  secret?: string | Buffer;
  privateKey?: string | Buffer;
}

export interface JwtVerifyOptions extends jwt.VerifyOptions {
  secret?: string | Buffer;
  publicKey?: string | Buffer;
}
