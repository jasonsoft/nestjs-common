import { DynamicModule, Module, Provider, Type } from '@nestjs/common';
import { JWT_MODULE_OPTIONS } from '../../constants';
import {
  JwtModuleAsyncOptions,
  JwtModuleOptions,
  JwtOptionsFactory,
} from './interfaces';
import { JwtService } from './jwt.service';

@Module({
  providers: [JwtService],
  exports: [JwtService, JWT_MODULE_OPTIONS],
})
export class JwtModule {
  static register(options: JwtModuleOptions): DynamicModule {
    return {
      module: JwtModule,
      providers: [{ provide: JWT_MODULE_OPTIONS, useValue: options || {} }],
    };
  }

  static registerAsync(options: JwtModuleAsyncOptions): DynamicModule {
    return {
      module: JwtModule,
      imports: options.imports || [],
      providers: this.createAsyncProviders(options),
    };
  }

  private static createAsyncProviders(
    options: JwtModuleAsyncOptions,
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    const useClass = options.useClass as Type<JwtOptionsFactory>;
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: useClass,
        useClass,
      },
    ];
  }

  private static createAsyncOptionsProvider(
    options: JwtModuleAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: JWT_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }
    return {
      provide: JWT_MODULE_OPTIONS,
      useFactory: async (optionsFactory: JwtOptionsFactory) =>
        await optionsFactory.createJwtOptions(),
      inject: [
        (options.useClass || options.useExisting) as Type<JwtOptionsFactory>,
      ],
    };
  }
}
