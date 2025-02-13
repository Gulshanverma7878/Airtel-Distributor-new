const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../config/database');

class LapuModel extends Model { }

LapuModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Retailer_Name: {
        type: DataTypes.STRING,
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
    lapuId: {
        type: DataTypes.STRING,
        allowNull: true
    },

    FSE_Msisdn:{
        type: DataTypes.STRING,
        allowNull: true
    },
    FSE_Name:{
        type: DataTypes.STRING,
        allowNull: true
    },
    Retailer_Msisdn:{
        type: DataTypes.STRING,
        allowNull: true
    },
    Retailer_Name:{
        type: DataTypes.STRING,
        allowNull: true
    },
    Transaction_Id:{
        type: DataTypes.STRING,
        allowNull: true
    },
    Auto_Refill_Date:{
        type: DataTypes.STRING,
        allowNull: true
    },
    Transfered_Amount:{
        type: DataTypes.STRING,
        allowNull: true
    },
    Collectable_Amount:{
        type: DataTypes.STRING,
        allowNull: true
    },
    Status:{
        type: DataTypes.STRING,
        allowNull: true
    },
    Collection_On:{
        type: DataTypes.STRING,
        allowNull: true
    },
    Ageing_In_Days:{
        type: DataTypes.STRING,
        allowNull: true
    },
    UTR_NO:{
        type: DataTypes.STRING,
        allowNull: true
    },
    Digital_Collection_ID:{
        type: DataTypes.STRING,
        allowNull: true
    },
    


}, {
    sequelize,
    modelName: 'Lapu',
    tableName: 'lapu',
    timestamps: true
});

module.exports = LapuModel;