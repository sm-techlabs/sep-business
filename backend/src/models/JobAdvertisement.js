import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/sequelize.js';
import { JOB_AD_STATUSES } from '../constants/enums.js';

class JobAdvertisement extends Model {}
JobAdvertisement.init({
	contractType: DataTypes.STRING,
	yearsOfExperience: DataTypes.INTEGER,
	jobTitle: DataTypes.STRING,
	description: DataTypes.STRING,
	startsOn: DataTypes.DATEONLY,
	endsOn: DataTypes.DATEONLY,
	status: DataTypes.ENUM(...JOB_AD_STATUSES),
}, {
	sequelize,
	modelName: 'JobAdvertisement',
});

export default JobAdvertisement;
