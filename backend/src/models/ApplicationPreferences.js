import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/sequelize.js';

class ApplicationPreferences extends Model {}
ApplicationPreferences.init({
	decorations: DataTypes.STRING,
	foodAndDrinks: DataTypes.STRING,
	photosOrFilming: DataTypes.STRING,
	music: DataTypes.STRING,
	postersArtWork: DataTypes.STRING,
	computerRelatedIssues: DataTypes.STRING,
}, {
	sequelize,
	modelName: 'ApplicationPreferences',
});

export default ApplicationPreferences;
