import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/sequelize.js';

class RequestPreferences extends Model {}
RequestPreferences.init({
	decorations: DataTypes.BOOLEAN,
	parties: DataTypes.BOOLEAN,
	photosOrFilming: DataTypes.BOOLEAN,
	breakfastLunchDinner: DataTypes.BOOLEAN,
	softHotDrinks: DataTypes.BOOLEAN,
}, {
	sequelize,
	modelName: 'RequestPreferences',
});

export default RequestPreferences;
