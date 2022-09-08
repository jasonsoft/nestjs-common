import { readFileSync } from 'fs';
import { resolve } from 'path';
import yaml from 'js-yaml';

/** Yaml Config Options */
export interface YamlConfigOptions {
  /** Base path to load the configurations from. */
  basePath?: string;
}

/**
 * Use a configuration file in YAML format
 * Added by Jason.Song (成长的小猪) on 2022/09/08 15:42:31
 */
export default function YamlConfig(options?: YamlConfigOptions) {
  const fileName = `${process.env.NODE_ENV || 'development'}.yaml`;
  const path =
    options && options.basePath
      ? resolve(options.basePath, fileName)
      : resolve(fileName);
  return yaml.load(readFileSync(path, { encoding: 'utf-8' })) as Record<
    string,
    any
  >;
}
