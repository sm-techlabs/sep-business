import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/sequelize.js';

class FinancialSituationRequest extends Model {}
FinancialSituationRequest.init({
	financialReport: DataTypes.BLOB, // external blob
}, {
	sequelize,
	modelName: 'FinancialSituationRequest',
});

export default FinancialSituationRequest;
