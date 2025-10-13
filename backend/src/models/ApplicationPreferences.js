import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/sequelize.js';

class ApplicationPreferences extends Model {}
ApplicationPreferences.init({
	decorations: DataTypes.TEXT,
	foodAndDrinks: DataTypes.TEXT,
	photosOrFilming: DataTypes.TEXT,
	music: DataTypes.TEXT,
	postersArtWork: DataTypes.TEXT,
	computerRelatedIssues: DataTypes.TEXT,
}, {
	sequelize,
	modelName: 'ApplicationPreferences',
});

export default ApplicationPreferences;
