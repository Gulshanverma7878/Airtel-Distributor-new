const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../config/database');



class Type extends Model { }

Type.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        typeName: {
            type: DataTypes.STRING,
            allowNull: true
        },
    },
    {
        sequelize,
        modelName: 'Type',
        tableName: 'type',
        timestamps: true
        
    }
);


module.exports = Type;