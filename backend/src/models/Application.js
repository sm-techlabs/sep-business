import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/sequelize.js';

class Application extends Model {}
Application.init({
	eventType: DataTypes.STRING,
	description: DataTypes.STRING,
	expectedNumberOfAttendees: DataTypes.INTEGER,
	budget: DataTypes.FLOAT,
	startsOn: DataTypes.DATE,
	endsOn: DataTypes.DATE,
	otherNeeds: DataTypes.STRING,
	status: DataTypes.ENUM('planning', 'execution', 'completed'),
}, {
	sequelize,
	modelName: 'Application',
});

export default Application;
