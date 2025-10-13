import type { Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';

export default class ApplicationPreferences extends Model<
  InferAttributes<ApplicationPreferences>,
  InferCreationAttributes<ApplicationPreferences>
> {
  declare id: CreationOptional<number>;
  declare decorations: string | null;
  declare foodAndDrinks: string | null;
  declare photosOrFilming: string | null;
  declare music: string | null;
  declare postersArtWork: string | null;
  declare computerRelatedIssues: string | null;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}
