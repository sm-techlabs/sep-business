import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/sequelize.js';

class Department extends Model {}
Department.init({
	name: {
		type: DataTypes.ENUM('HR', 'Finance', 'IT', 'Marketing', 'Other'), // Add your enum values
		allowNull: false,
	}
}, {
	sequelize,
	modelName: 'Department',
});

// Associations should be set up in a central file after all models are imported

export default Department;
