import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/sequelize.js';
import { DEPARTMENT_NAMES } from '../constants/enums.js';

class Department extends Model { }
Department.init({
    name: {
            type: DataTypes.ENUM(...DEPARTMENT_NAMES),
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'Department',
});

// Associations should be set up in a central file after all models are imported

export default Department;
