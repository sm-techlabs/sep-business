import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/sequelize.js';

class Client extends Model {}
Client.init({
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	businessCode: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	address: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	eligibleForDiscount: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
	}
}, {
	sequelize,
	modelName: 'Client',
});

export default Client;
