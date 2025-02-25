const {DataTypes, Model,UUID,UUIDV4} = require('sequelize');
const sequelize = require('../../config/database');
const bcrypt = require('bcryptjs');

class Signup extends Model {}

Signup.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mobileno: {
        type: DataTypes.STRING(12),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role:{
        type: DataTypes.ENUM('SuperAdmin','MasterAdmin','Collector','User'),
        allowNull: true,
        defaultValue: 'user'
    },
    adminKey:{
        type: DataTypes.STRING(40),
        allowNull: true,
    
    }
},{
    sequelize,
    modelName: 'Signup',
    tableName: 'Signup',
    timestamps: true,
    hooks:{
        beforeCreate: async (signup) => {
            const salt = await bcrypt.genSalt(10);
            signup.password = await bcrypt.hash(signup.password, salt);
        }
    },
    indexes: [
        {
            unique: true,
            fields: ['adminKey']
            
        }
    ]
});


module.exports = Signup;