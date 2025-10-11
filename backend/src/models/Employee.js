import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/sequelize.js';

class Employee extends Model {}
Employee.init({
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	username: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
		primaryKey: true,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	jobTitle: {
		type: DataTypes.ENUM('Manager', 'Staff', 'Intern', 'Other'), // Add your enum values
		allowNull: false,
	}
}, {
	sequelize,
	modelName: 'Employee',
});

export default Employee;
