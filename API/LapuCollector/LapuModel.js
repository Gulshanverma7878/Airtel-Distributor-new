const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../config/database');

class Shops extends Model { }

Shops.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Retailer_Name: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    mobileno:{
        type:DataTypes.STRING(12),
        unique:true,
        allowNull:false,
    },
    CollectorId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'collector',
            key: 'id'
        }
    },
    balance:{
        type:DataTypes.BIGINT,
        allowNull:true,
        defaultValue:0
    }
}, {
    sequelize,
    modelName: 'Shops',
    tableName: 'shops',
    timestamps: true
});

module.exports = Shops;