const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../config/database');
const BTModel=require('../BankTransaction/BTModel');
const MTModel=require('../MTManagement/MTModel');


class Bank extends Model { }

Bank.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    bankName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    ifscCode: {
        type: DataTypes.STRING,
        allowNull: true
    },
    branchName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    AC_Number: {
        type: DataTypes.STRING,
        allowNull: true
    },
    ACH_Name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    mobileno: {
        type: DataTypes.STRING(12),
        allowNull: true
    },
    balance: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    BankKey:{
        type: DataTypes.STRING(40),
        allowNull: false
    }
}
    , {
        sequelize,
        modelName: 'Bank',
        tableName: 'bank',
        timestamps: true

    });



Bank.hasMany(BTModel, { foreignKey: 'BankId' });
BTModel.belongsTo(Bank, { foreignKey: 'BankId' });


Bank.hasMany(MTModel, { foreignKey: 'BankId' });
MTModel.belongsTo(Bank, { foreignKey: 'BankId' });

module.exports = Bank