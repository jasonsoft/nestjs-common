import { ModuleMetadata, Type } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

export interface JwtModuleOptions {
  secret: string | Buffer;
  signOptions?: jwt.SignOptions;
  verifyOptions?: jwt.VerifyOptions;
  /**
   * Use module globally
   * When you want to use SeqLoggerModule in other modules,
   * you'll need to import it (as is standard with any Nest module).
   * Alternatively, declare it as a global module by setting the options object's isGlobal property to true, as shown below.
   * In that case, you will not need to import SeqLoggerModule in other modules once it's been loaded in the root module
   */
  isGlobal?: boolean;
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
