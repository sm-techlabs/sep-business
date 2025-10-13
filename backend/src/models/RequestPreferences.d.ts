import type { Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';

export default class RequestPreferences extends Model<
  InferAttributes<RequestPreferences>,
  InferCreationAttributes<RequestPreferences>
> {
  declare id: CreationOptional<number>;
  declare decorations: boolean | null;
  declare parties: boolean | null;
  declare photosOrFilming: boolean | null;
  declare breakfastLunchDinner: boolean | null;
  declare softHotDrinks: boolean | null;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}
