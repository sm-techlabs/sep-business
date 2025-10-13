import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/sequelize.js';

class FinancialSituationRequest extends Model {}
FinancialSituationRequest.init({
	financialReport: DataTypes.BLOB,
}, {
	sequelize,
	modelName: 'FinancialSituationRequest',
});

export default FinancialSituationRequest;
