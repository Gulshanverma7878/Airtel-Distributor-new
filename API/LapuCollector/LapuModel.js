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
    CollectorId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'collector',
            key: 'id'
        }
    },
    balance: {
        type: DataTypes.BIGINT,
        allowNull: true,
        defaultValue: 5000
    },
    role: {
        type: DataTypes.ENUM('shop'),
        defaultValue: "shop",
    },
    whatsapp: {
        type: DataTypes.STRING(12),
        allowNull: true,
        defaultValue: "8529670548"
    }
}, {
    sequelize,
    modelName: 'Shops',
    tableName: 'shops',
    timestamps: true
});

module.exports = Shops;