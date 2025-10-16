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

export default class NonRegisteredClientRequest extends Model<
  InferAttributes<NonRegisteredClientRequest>,
  InferCreationAttributes<NonRegisteredClientRequest>
> {
  declare id: CreationOptional<number>;
  // declare recordNumber: number | null;
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
  declare type: 'non_registered';
  declare name: string | null;
  declare email: string | null;
  declare businessCode: string | null;
  declare address: string | null;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare expectedNumberOfAttendees: number | null;

  // belongs
  declare getPreferences: BelongsToGetAssociationMixin<RequestPreferences>;
  declare setPreferences: BelongsToSetAssociationMixin<RequestPreferences, number>;
  // declare getClient: BelongsToGetAssociationMixin<Client>;
  // declare setClient: BelongsToSetAssociationMixin<Client, number>;
}

declare module '../models/NonRegisteredClientRequest.js' {
  import NonRegisteredClientRequest from './NonRegisteredClientRequest';
  export default NonRegisteredClientRequest;
}
