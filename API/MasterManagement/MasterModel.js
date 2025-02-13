const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../config/database');
const bcrypt = require('bcryptjs');
const BTModel = require('../BankTransaction/BTModel');
const CollectorModel = require('../Collectors/collectorModel');
const MTModel=require('../MTManagement/MTModel');

class MasterModel extends Model { }

MasterModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        mobileno: {
            type: DataTypes.STRING(12),
            allowNull: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true
        },
        company: {
            type: DataTypes.STRING(100),
            allowNull: true,
            unique: true
        },
        balance: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        self_com: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        retailer_com: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        total_self_com: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        total_retailer_com: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        main_balance: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        status:{
            type: DataTypes.ENUM('Active','Inactive'),
         
            defaultValue: 'Active'
        }
    },
    {
        sequelize,
        modelName: 'Master',
        tableName: 'distributors',
        timestamps: true,
        hooks: {
            beforeCreate: async (master) => {
                const salt = await bcrypt.genSalt(10);
                master.password = await bcrypt.hash(master.password, salt);
            }
        }

    }
);


MasterModel.hasMany(CollectorModel, { foreignKey: 'distributorId' });
CollectorModel.belongsTo(MasterModel, { foreignKey: 'distributorId' });

MasterModel.hasMany(MTModel, { foreignKey: 'distributorId' });
MTModel.belongsTo(MasterModel, { foreignKey: 'distributorId' });


module.exports = MasterModel;