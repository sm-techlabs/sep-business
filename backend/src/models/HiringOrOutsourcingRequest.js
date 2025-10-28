import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/sequelize.js';
import { HIRING_OR_OUTSOURCING_STATUSES } from '../constants/enums.js';

class HiringOrOutsourcingRequest extends Model {}
HiringOrOutsourcingRequest.init({
	status: DataTypes.ENUM(...HIRING_OR_OUTSOURCING_STATUSES),
	contractType: DataTypes.ENUM('Full Time', 'Part Time'),
	jobTitle: DataTypes.STRING,
	minYearsOfExperience: DataTypes.INTEGER,
	jobDescription: DataTypes.TEXT,
}, {
	sequelize,
	modelName: 'HiringOrOutsourcingRequest',
});

export default HiringOrOutsourcingRequest;
