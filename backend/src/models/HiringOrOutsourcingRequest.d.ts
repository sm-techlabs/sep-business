import type {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
} from 'sequelize';

declare class JobAdvertisement extends Model {}
declare class Department extends Model {}

export default class HiringOrOutsourcingRequest extends Model<
  InferAttributes<HiringOrOutsourcingRequest>,
  InferCreationAttributes<HiringOrOutsourcingRequest>
> {
  declare id: CreationOptional<number>;
  declare status: 'Approved' | 'Rejected';
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  // belongs
  declare getJobAdvertisement: BelongsToGetAssociationMixin<JobAdvertisement>;
  declare setJobAdvertisement: BelongsToSetAssociationMixin<JobAdvertisement, number>;
  declare getRequestingDepartment: BelongsToGetAssociationMixin<Department>;
  declare setRequestingDepartment: BelongsToSetAssociationMixin<Department, number>;
}

declare module '../models/HiringOrOutsourcingRequest.js' {
  import HiringOrOutsourcingRequest from './HiringOrOutsourcingRequest';
  export default HiringOrOutsourcingRequest;
}
