/**
 * MySql Operator
 * Added by Jason.Song on 2021/05/13 17:39:14
 */
export enum Operator {
  /** = */
  Equal = 'equal',
  /** != */
  Not = 'not',
  /** \> */
  MoreThan = 'moreThan',
  /** \>= */
  MoreThanOrEqual = 'moreThanOrEqual',
  /** < */
  LessThan = 'lessThan',
  /** <= */
  LessThanOrEqual = 'lessThanOrEqual',
  /** LIKE */
  Like = 'like',
  /** BETWEEN */
  Between = 'between',
  /** IN */
  In = 'in',
}
