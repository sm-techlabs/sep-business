import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/sequelize.js';
import RequestTemplate from './RequestTemplate.js';

class NonRegisteredClientRequest extends RequestTemplate {}
NonRegisteredClientRequest.init({
	name: DataTypes.STRING,
	email: DataTypes.STRING,
	businessCode: DataTypes.STRING,
	address: DataTypes.STRING,
}, {
	sequelize,
	modelName: 'NonRegisteredClientRequest',
});

export default NonRegisteredClientRequest;
