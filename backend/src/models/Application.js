import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/sequelize.js';
import { APPLICATION_STATUSES } from '../constants/enums.js';

class Application extends Model {}
Application.init({
	eventType: DataTypes.STRING,
	description: DataTypes.TEXT,
	expectedNumberOfAttendees: DataTypes.INTEGER,
	budget: DataTypes.FLOAT,
	startsOn: DataTypes.DATE,
	endsOn: DataTypes.DATE,
	otherNeeds: DataTypes.TEXT,
	status: DataTypes.ENUM(...APPLICATION_STATUSES),
}, {
	sequelize,
	modelName: 'Application',
});

export default Application;
