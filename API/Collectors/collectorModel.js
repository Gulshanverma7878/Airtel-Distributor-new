const {DataTypes, Model} = require('sequelize');
const sequelize = require('../../config/database');
const LapuModel = require('../LapuCollector/LapuModel');
const LapuTranModel = require('../LapuCollector/LapuTranModel');
const bcrypt = require('bcryptjs');

class Collector extends Model {}

Collector.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
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
    distributorId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'distributors',
            key: 'id'
        }
    },
    },{
        sequelize,
        modelName: 'Collector',
        tableName: 'collector',
        timestamps: true,
        hooks: {
            beforeCreate: async (collector) => {
                const salt = await bcrypt.genSalt(10);
                collector.password = await bcrypt.hash(collector.password, salt);
            }
        }
    }
);


Collector.hasMany(LapuModel, { foreignKey: 'CollectorId' });
LapuModel.belongsTo(Collector, { foreignKey: 'CollectorId' });
Collector.hasMany(LapuTranModel, { foreignKey: 'CollectorId' });
LapuTranModel.belongsTo(Collector, { foreignKey: 'CollectorId' });

module.exports = Collector;