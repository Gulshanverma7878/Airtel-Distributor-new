const BankModel = require('./bankModel');
const CRUDHelper = require('../../utils/crud');


    
exports.getBank = async (req, res) => {
    try {
        const bankGet = await CRUDHelper.getAll(req, res, BankModel);
    } catch (error) {
        console.log(error);
       return  res.statu(500).json({ error });

    }
}

exports.AddBank = async (req, res) => {
    try {
        const { bankName, ifscCode, branchName, AC_Number, ACH_Name, mobileno,balance } = req.body;
        req.body.BankKey = await CRUDHelper.generateAdminKey();
        
        const BankData = await BankModel.findOne({ where: { AC_Number } });
        if (BankData) {
            return res.status(400).json({ message: "Bank already exist" });
        }
        const bankAdd = await BankModel.create(req.body);
        res.status(200).json({ message: "Bank created successfully", bankAdd });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
}

exports.deleteBank = async (req, res) => {
    try {
        const deleteBank = await CRUDHelper.deleteOne(req, res, BankModel);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
}

exports.updateBank = async (req, res) => {
    try {
        const updateBank = await CRUDHelper.updatOne(req, res, BankModel);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
}

exports.getById =async (req, res) => {
    try {
        const getById = await CRUDHelper.getById(req, res, BankModel);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error });        
    }
}