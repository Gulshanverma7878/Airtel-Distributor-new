const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../config/database');

class MTModel extends Model { }

MTModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        balance:{
            type: DataTypes.FLOAT,
            allowNull: true
        },
        distributeId:{
            type: DataTypes.INTEGER,
            allowNull: true,
            references:{
                model:'distributors',
                key:'id'
            }
        },
        BankId:{
            type: DataTypes.INTEGER,
            allowNull: true,
            references:{
                model:'bank',
                key:'id'
            }
        },
        utrNo:{
            type: DataTypes.STRING(20),
            allowNull:true

        },
        type:{
            type: DataTypes.ENUM('Debit','Credit','other'),
            allowNull: true
        },
        remark:{
            type: DataTypes.TEXT,
            allowNull: true
        },
        self_com:{
            type: DataTypes.FLOAT,
            allowNull: true
        },
        retailer_com:{
            type: DataTypes.FLOAT,
            allowNull: true
        },
        total_self_com:{
            type: DataTypes.FLOAT,
            allowNull: true
        },
        total_retailer_com:{
            type: DataTypes.FLOAT,
            allowNull: true
        },
        main_balance:{
            type: DataTypes.FLOAT,
            allowNull: true
        }

    },
    {
        sequelize,
        modelName: 'MT',
        tableName: 'distributor_transaction',
        timestamps: true
    }
);


module.exports = MTModel;