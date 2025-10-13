import type { Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';

export default class JobAdvertisement extends Model<
  InferAttributes<JobAdvertisement>,
  InferCreationAttributes<JobAdvertisement>
> {
  declare id: CreationOptional<number>;
  declare contractType: string | null;
  declare yearsOfExperience: number | null;
  declare jobTitle: string | null;
  declare description: string | null;
  declare startsOn: string | null; // DATEONLY
  declare endsOn: string | null;   // DATEONLY
  declare status: 'Published' | 'Unpublished';
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}
