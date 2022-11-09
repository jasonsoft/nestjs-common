import { Operator } from '../enums';

/**
 * 转换为数据库运算符
 * Added by Jason.Song on 2021/05/14 20:51:00
 */
export const convertOperator = (operator: Operator): string | undefined => {
  let op: string | undefined;
  switch (operator) {
    case Operator.Equal:
      op = '=';
      break;
    case Operator.Not:
      op = '!=';
      break;
    case Operator.MoreThan:
      op = '>';
      break;
    case Operator.MoreThanOrEqual:
      op = '>=';
      break;
    case Operator.LessThan:
      op = '<';
      break;
    case Operator.LessThanOrEqual:
      op = '<=';
      break;
    case Operator.Like:
      op = 'like';
      break;
    case Operator.Between:
      op = 'between';
      break;
    case Operator.In:
      op = 'in';
      break;

    default:
      op = undefined;
      break;
  }
  return op;
};
