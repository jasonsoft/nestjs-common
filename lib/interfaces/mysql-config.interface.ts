/**
 *  Mysql TypeORM configuration type
 * Added by Jason.Song (成长的小猪) on 2022/09/08 18:16:50
 */
export interface MysqlConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  timezone: string;
  charset: string;
  autoLoadEntities: boolean;
  synchronize: boolean;
  logging: boolean;
}
