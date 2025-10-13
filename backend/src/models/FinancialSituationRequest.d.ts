import type { Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';

export default class FinancialSituationRequest extends Model<
  InferAttributes<FinancialSituationRequest>,
  InferCreationAttributes<FinancialSituationRequest>
> {
  declare id: CreationOptional<number>;
  declare financialReport: Buffer | null;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

declare module '../models/FinancialSituationRequest.js' {
  import FinancialSituationRequest from './FinancialSituationRequest';
  export default FinancialSituationRequest;
}
