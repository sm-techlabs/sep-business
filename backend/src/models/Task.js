import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/sequelize.js';

class Task extends Model {}
Task.init({
	startsOn: DataTypes.DATE,
	endsOn: DataTypes.DATE,
	description: DataTypes.STRING,
	comments: DataTypes.STRING,
	priority: DataTypes.ENUM('low', 'medium', 'high'),
	status: DataTypes.ENUM('pending', 'in_progress', 'completed'),
}, {
	sequelize,
	modelName: 'Task',
});

export default Task;
