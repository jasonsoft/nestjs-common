import { Column, Index, PrimaryGeneratedColumn } from 'typeorm';

/**
 * Base entity
 * Added by Jason.Song (成长的小猪) on 2022/09/08 19:09:16
 */
export class BaseEntity {
  /**
   * ID (Primary Key)
   */
  @PrimaryGeneratedColumn({
    comment: 'ID',
    unsigned: true,
  })
  id!: number;

  /**
   * 创建日期
   */
  @Index()
  @Column({
    type: 'timestamp',
    precision: 3,
    default: () => 'CURRENT_TIMESTAMP(3)',
  })
  createdAt!: Date;

  /**
   * 更新日期
   */
  @Column({
    type: 'timestamp',
    precision: 3,
    default: () => 'CURRENT_TIMESTAMP(3)',
    onUpdate: 'CURRENT_TIMESTAMP(3)',
  })
  updatedAt!: Date;
}
