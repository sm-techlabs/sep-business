import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/sequelize.js';

class Event extends Model {}
Event.init({
	date: DataTypes.DATE,
	finalBudget: DataTypes.FLOAT,
	attendees: DataTypes.INTEGER,
	details: DataTypes.TEXT,
}, {
	sequelize,
	modelName: 'Event',
});

export default Event;
