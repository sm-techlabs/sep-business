import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/sequelize.js';

class BudgetAdjustmentRequest extends Model {}
BudgetAdjustmentRequest.init({
	requiredAmount: DataTypes.FLOAT,
	reason: DataTypes.STRING,
}, {
	sequelize,
	modelName: 'BudgetAdjustmentRequest',
});

export default BudgetAdjustmentRequest;
