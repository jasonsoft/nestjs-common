import { PrimaryGeneratedColumn } from 'typeorm';
import { EntityWithoutId } from './entity-without-id';

/**
 * base entity with ID
 * Added by Jason.Song (成长的小猪) on 2022/09/08 19:08:32
 */
export class EntityWithId extends EntityWithoutId {
  /**
   * ID (Primary Key)
   */
  @PrimaryGeneratedColumn({
    comment: 'ID',
    unsigned: true,
  })
  id!: number;
}
