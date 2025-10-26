import type {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
} from 'sequelize';

declare class Client extends Model {}
declare class RequestPreferences extends Model {}
declare class Employee extends Model {}

export default class RegisteredClientRequest extends Model<
  InferAttributes<RegisteredClientRequest>,
  InferCreationAttributes<RegisteredClientRequest>
> {
  declare id: CreationOptional<number>;
  declare recordNumber: number | null;
  declare eventType: string | null;
  declare startsOn: Date | null;
  declare endsOn: Date | null;
  declare status:
    | 'Draft'
    | 'Submitted'
    | 'ApprovedBySCSO'
    | 'ReviewedByFinancialManager'
    | 'Rejected'
    | 'Approved';
  declare estimatedBudget: number | null;
  declare type: 'registered';
  // registered requests do not use inline name/email/businessCode/address
  // declare name: null;
  // declare email: null;
  // declare businessCode: null;
  // declare address: null;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare expectedNumberOfAttendees: number | null;

  // belongs
  declare getPreferences: BelongsToGetAssociationMixin<RequestPreferences>;
  declare setPreferences: BelongsToSetAssociationMixin<RequestPreferences, number>;
  declare getClient: BelongsToGetAssociationMixin<Client>;
  declare setClient: BelongsToSetAssociationMixin<Client, number>;

  declare getCreatedBy: BelongsToGetAssociationMixin<Employee>;
  declare setCreatedBy: BelongsToSetAssociationMixin<Employee, number>;
}

declare module '../models/RegisteredClientRequest.js' {
  import RegisteredClientRequest from './RegisteredClientRequest';
  export default RegisteredClientRequest;
}
