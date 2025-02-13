const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../config/database');

class Excel extends Model { }

Excel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        field1: {
            type: DataTypes.STRING,
            allowNull: true
        },
        field2: {
            type: DataTypes.STRING,
            allowNull: true
        },

    }, {
    sequelize,
    modelName: 'Excel',
    tableName: 'excel',
    timestamps: true
}
);