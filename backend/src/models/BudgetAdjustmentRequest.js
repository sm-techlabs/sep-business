import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/sequelize.js';
import { BUDGET_ADJUSTMENT_REQUEST_STATUSES } from '../constants/enums.js';

class BudgetAdjustmentRequest extends Model {}
BudgetAdjustmentRequest.init({
	requiredAmount: DataTypes.FLOAT,
	reason: DataTypes.TEXT,
	status: DataTypes.ENUM(...BUDGET_ADJUSTMENT_REQUEST_STATUSES),
}, {
	sequelize,
	modelName: 'BudgetAdjustmentRequest',
});

export default BudgetAdjustmentRequest;
