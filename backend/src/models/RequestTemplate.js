import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/sequelize.js';
import { REQUEST_TEMPLATE_STATUSES, REQUEST_TEMPLATE_TYPES } from '../constants/enums.js';

class RequestTemplate extends Model {}
RequestTemplate.init({
	eventType: DataTypes.STRING,
	startsOn: DataTypes.DATE,
	endsOn: DataTypes.DATE,
	status: DataTypes.ENUM(...REQUEST_TEMPLATE_STATUSES),
	estimatedBudget: DataTypes.FLOAT,

	// Discriminator for subtypes
	type: {
		type: DataTypes.ENUM(...REQUEST_TEMPLATE_TYPES),
		allowNull: false
	},

	// Non-registered-only fields (nullable for registered subtype)
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    businessCode: DataTypes.STRING,
    address: DataTypes.STRING,
	expectedNumberOfAttendees: DataTypes.INTEGER,
}, {
	sequelize,
	modelName: 'RequestTemplate',
});

// Scopes per subtype
RequestTemplate.addScope(
	'registered',
	{ where: { type: 'registered' } }
);
RequestTemplate.addScope(
	'nonRegistered',
	{ where: { type: 'non_registered' } }
);

// Optional: guard direct base creation without a type
RequestTemplate.addHook('beforeCreate', instance => {
    if (!instance.type) {
        throw new Error(
			'RequestTemplate requires a subtype `type` (registered | non_registered)'
		);
    }
});

export default RequestTemplate;
