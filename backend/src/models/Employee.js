import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/sequelize.js';
import { EMPLOYEE_JOB_TITLES } from '../constants/enums.js';

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
		type: DataTypes.ENUM(...EMPLOYEE_JOB_TITLES),
		allowNull: false,
	}
}, {
	sequelize,
	modelName: 'Employee',
});

export default Employee;
