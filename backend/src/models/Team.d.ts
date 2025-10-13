import type {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyHasAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
} from 'sequelize';

declare class Department extends Model {}
declare class Employee extends Model {}

export default class Team extends Model<
  InferAttributes<Team>,
  InferCreationAttributes<Team>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  // Team.hasMany(Employee, { as: 'employees' })
  declare getEmployees: HasManyGetAssociationsMixin<Employee>;
  declare addEmployee: HasManyAddAssociationMixin<Employee, number>;
  declare hasEmployee: HasManyHasAssociationMixin<Employee, number>;
  declare countEmployees: HasManyCountAssociationsMixin;
  declare createEmployee: HasManyCreateAssociationMixin<Employee>;

  // If you later enable Team.belongsTo(Department, { as: 'department' })
  declare getDepartment: BelongsToGetAssociationMixin<Department>;
  declare setDepartment: BelongsToSetAssociationMixin<Department, number>;
}
