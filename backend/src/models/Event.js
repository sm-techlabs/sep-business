import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/sequelize.js';

class Event extends Model {}
Event.init({
	date: DataTypes.DATE,
	finalBudget: DataTypes.FLOAT,
	attendees: DataTypes.INTEGER,
	details: DataTypes.STRING,
}, {
	sequelize,
	modelName: 'Event',
});

export default Event;
