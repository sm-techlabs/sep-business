import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/sequelize.js';
import { TASK_PRIORITIES, TASK_STATUSES } from '../constants/enums.js';

class Task extends Model {}
Task.init({
	startsOn: DataTypes.DATE,
	endsOn: DataTypes.DATE,
	title: DataTypes.STRING,
	description: DataTypes.STRING,
	comments: DataTypes.STRING,
	priority: DataTypes.ENUM(...TASK_PRIORITIES),
	status: DataTypes.ENUM(...TASK_STATUSES),
}, {
	sequelize,
	modelName: 'Task',
});

export default Task;
