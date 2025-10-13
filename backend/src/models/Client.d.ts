import type {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyHasAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
} from 'sequelize';

declare class Application extends Model {}

export default class Client extends Model<
  InferAttributes<Client>,
  InferCreationAttributes<Client>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare email: string;
  declare businessCode: string;
  declare address: string;
  declare eligibleForDiscount: boolean;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  // Client.hasMany(Application) if added in future
  declare getApplications: HasManyGetAssociationsMixin<Application>;
  declare addApplication: HasManyAddAssociationMixin<Application, number>;
  declare hasApplication: HasManyHasAssociationMixin<Application, number>;
  declare countApplications: HasManyCountAssociationsMixin;
  declare createApplication: HasManyCreateAssociationMixin<Application>;
}
