const {DataTypes, Model} = require('sequelize');
const sequelize = require('../../config/database');

class Message extends Model {}


Message.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mobileno:{
        type: DataTypes.STRING(12),
        allowNull: true
    },
    mobiNo:{
        type: DataTypes.STRING(12),
        allowNull: true
    },
    otp:{
        type: DataTypes.STRING,
        allowNull: true
    }
},{
    sequelize,
    modelName: 'Message',
    tableName: 'message',
    timestamps: true
});

module.exports = Message;
