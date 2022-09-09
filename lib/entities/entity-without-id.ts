import { Column, Index } from 'typeorm';

/**
 * base entity without ID
 * Added by Jason.Song (成长的小猪) on 2022/09/08 19:09:16
 */
export class EntityWithoutId {
  /**
   * 创建日期
   */
  @Index()
  @Column({
    comment: '创建日期',
    type: 'timestamp',
    precision: 3,
    default: () => 'CURRENT_TIMESTAMP(3)',
  })
  createdAt!: Date;

  /**
   * 更新日期
   */
  @Column({
    comment: '更新日期',
    type: 'timestamp',
    precision: 3,
    default: () => 'CURRENT_TIMESTAMP(3)',
    onUpdate: 'CURRENT_TIMESTAMP(3)',
  })
  updatedAt!: Date;
}
