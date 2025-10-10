import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/sequelize.js';

class RequestTemplate extends Model {}
RequestTemplate.init({
	recordNumber: DataTypes.INTEGER,
	eventType: DataTypes.STRING,
	startsOn: DataTypes.DATE,
	endsOn: DataTypes.DATE,
	status: DataTypes.ENUM('pending', 'approved', 'rejected'),
	estimatedBudget: DataTypes.FLOAT,
}, {
	sequelize,
	modelName: 'RequestTemplate',
});

export default RequestTemplate;
