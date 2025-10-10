import sequelize from '../db/sequelize.js';
import RequestTemplate from './RequestTemplate.js';

class RegisteredClientRequest extends RequestTemplate {}
RegisteredClientRequest.init({
	// Inherit all fields from RequestTemplate
	// Add client association in central association file
}, {
	sequelize,
	modelName: 'RegisteredClientRequest',
});

export default RegisteredClientRequest;
