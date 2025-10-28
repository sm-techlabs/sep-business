import type {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
} from 'sequelize';

declare class Department extends Model {}

declare class Application extends Model {}

export default class BudgetAdjustmentRequest extends Model<
  InferAttributes<BudgetAdjustmentRequest>,
  InferCreationAttributes<BudgetAdjustmentRequest>
> {
  declare id: CreationOptional<number>;
  declare requiredAmount: number | null;
  declare reason: string | null;
  declare status: 'Active' | 'Accepted' | 'Rejected';
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare getRequestingDepartment: BelongsToGetAssociationMixin<Department>;
  declare setRequestingDepartment: BelongsToSetAssociationMixin<Department, number>;
  declare getApplicationReference: BelongsToGetAssociationMixin<Application>;
  declare setApplicationReference: BelongsToSetAssociationMixin<Application, number>;
}
