const {DataTypes, Model} = require('sequelize');
const sequelize = require('../../config/database');
const MasterModel = require('../MasterManagement/MasterModel');


class BTModel extends Model{}

BTModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    amount:{
        type: DataTypes.BIGINT,
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
        allowNull: false,
        references:{
            model:'bank',
            key:'id'
        }
    },
    BeforeBalances:{
        type: DataTypes.BIGINT,
        allowNull: true
    },
    AfterBalances:{
        type: DataTypes.BIGINT,
        allowNull: true
    },
    distributorBeforeBalances:{
        type: DataTypes.BIGINT,
        allowNull: true
    },
    distributorAfterBalances:{
        type: DataTypes.BIGINT,
        allowNull: true
    },
    utrNo:{
        type: DataTypes.STRING,
        allowNull: true
    },
    type:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    remark:{
        type: DataTypes.STRING,
        allowNull: true
    },
    ShopBeforeBalances:{
        type: DataTypes.BIGINT,
        allowNull: true
    },
    ShopAfterBalances:{
        type: DataTypes.BIGINT,
        allowNull: true
    },
    method:{
        type:DataTypes.STRING,
        allowNull:true
    },
    ForTo:{
        type:DataTypes.STRING,
        allowNull: true
    }
},
{
    sequelize,
    modelName: 'BT',
    tableName: 'bankTransaction',
    timestamps: true
});



BTModel.belongsTo(MasterModel,{foreignKey:'distributeId'});
MasterModel.hasMany(BTModel,{foreignKey:'distributeId'});


module.exports = BTModel;