import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/sequelize.js';

class Team extends Model {}
Team.init({
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	}
}, {
	sequelize,
	modelName: 'Team',
});

export default Team;
