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

declare class Employee extends Model {}
declare class Team extends Model {}

export default class Department extends Model<
  InferAttributes<Department>,
  InferCreationAttributes<Department>
> {
  declare id: CreationOptional<number>;
  declare name: 'HR' | 'Administration' | 'Financial' | 'Production' | 'Services' | 'TopManagement';
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  // Department.belongsTo(Employee, { as: 'manager' })
  declare getManager: BelongsToGetAssociationMixin<Employee>;
  declare setManager: BelongsToSetAssociationMixin<Employee, number>;

  // Department.hasMany(Team, { as: 'teams' })
  declare getTeams: HasManyGetAssociationsMixin<Team>;
  declare addTeam: HasManyAddAssociationMixin<Team, number>;
  declare hasTeam: HasManyHasAssociationMixin<Team, number>;
  declare countTeams: HasManyCountAssociationsMixin;
  declare createTeam: HasManyCreateAssociationMixin<Team>;
}
