import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/sequelize.js';

class JobAdvertisement extends Model {}
JobAdvertisement.init({
	contractType: DataTypes.STRING,
	yearsOfExperience: DataTypes.INTEGER,
	jobTitle: DataTypes.STRING,
	description: DataTypes.STRING,
	startsOn: DataTypes.DATE,
	endsOn: DataTypes.DATE,
	status: DataTypes.ENUM('published', 'unpublished'),
}, {
	sequelize,
	modelName: 'JobAdvertisement',
});

export default JobAdvertisement;
