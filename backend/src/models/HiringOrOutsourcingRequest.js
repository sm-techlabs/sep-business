import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/sequelize.js';
import { HIRING_OR_OUTSOURCING_STATUSES } from '../constants/enums.js';

class HiringOrOutsourcingRequest extends Model {}
HiringOrOutsourcingRequest.init({
	status: DataTypes.ENUM(...HIRING_OR_OUTSOURCING_STATUSES),
}, {
	sequelize,
	modelName: 'HiringOrOutsourcingRequest',
});

export default HiringOrOutsourcingRequest;
