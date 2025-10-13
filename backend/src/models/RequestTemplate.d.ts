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

export default class RequestTemplate extends Model<
  InferAttributes<RequestTemplate>,
  InferCreationAttributes<RequestTemplate>
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
  declare type: 'registered' | 'non_registered';
  declare name: string | null;
  declare email: string | null;
  declare businessCode: string | null;
  declare address: string | null;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  // belongs
  declare getPreferences: BelongsToGetAssociationMixin<RequestPreferences>;
  declare setPreferences: BelongsToSetAssociationMixin<RequestPreferences, number>;
  declare getClient: BelongsToGetAssociationMixin<Client>;
  declare setClient: BelongsToSetAssociationMixin<Client, number>;
}

declare module '../models/RequestTemplate.js' {
  import RequestTemplate from './RequestTemplate';
  export default RequestTemplate;
}
