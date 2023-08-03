import { ConditionValue, ConditionsDto } from '../dto';
import { Operator } from '../enums';

export class ConditionsHelper {
  /**
   *
   * @param conditions
   * @param field
   * @param value
   * @param op
   */
  public static AddConditions(
    conditions: ConditionsDto,
    field: string,
    value: ConditionValue,
    op: Operator = Operator.Equal,
  ) {
    if (!field) {
      throw new Error('field is required');
    }
    if (!value) {
      throw new Error('value is required');
    }
    if (!conditions) {
      conditions = new ConditionsDto();
    }
    conditions.where = conditions.where.filter(
      (item) => item.field.toLowerCase() !== field.toLowerCase(),
    );
    conditions.where.push({ field, value, op });
  }
}
