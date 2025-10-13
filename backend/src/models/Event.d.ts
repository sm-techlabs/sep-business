import type {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
} from 'sequelize';

declare class Client extends Model {}

export default class Event extends Model<
  InferAttributes<Event>,
  InferCreationAttributes<Event>
> {
  declare id: CreationOptional<number>;
  declare date: Date | null;
  declare finalBudget: number | null;
  declare attendees: number | null;
  declare details: string | null;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  // Event.belongsTo(Client, { as: 'client' })
  declare getClient: BelongsToGetAssociationMixin<Client>;
  declare setClient: BelongsToSetAssociationMixin<Client, number>;
}

declare module '../models/Event.js' {
  import Event from './Event';
  export default Event;
}
