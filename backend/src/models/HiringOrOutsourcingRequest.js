import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/sequelize.js';

class HiringOrOutsourcingRequest extends Model {}
HiringOrOutsourcingRequest.init({
	status: DataTypes.ENUM('approved', 'rejected'),
}, {
	sequelize,
	modelName: 'HiringOrOutsourcingRequest',
});

export default HiringOrOutsourcingRequest;
