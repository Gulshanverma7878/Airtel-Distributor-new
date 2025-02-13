const MasterModel = require('./MasterModel');
const CRUDHelper = require('../../utils/crud');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const JWT_SECRET = process.env.JWT_SECRET||"Gulshan";

exports.createMaster = async (req, res) => {
    try {
        const { name,password,mobileno, company, balance, self_com, retailer_com } = req.body;
        const requiredFields = ['name', 'password', 'mobileno', 'company', 'balance', 'self_com', 'retailer_com'];
        const missingFields = requiredFields.filter(field => !req.body[field]);
        
        if (missingFields.length > 0) {
            return res.status(400).json({ message: `missing fields values: ${missingFields.join(", ")}` });
        }

       const total_self_com=balance * (self_com/100);
       const total_retailer_com=balance * (retailer_com/100);
        
       const main_balance = parseFloat(balance)+parseFloat(total_self_com);
        console.log(main_balance); 
        if (await MasterModel.findOne({ where: { mobileno } })) {
            return res.status(400).json({ message: "Master already exist" });
        }
        let createMaster = await MasterModel.create({ password,mobileno,name, company, balance, self_com, retailer_com, total_self_com, total_retailer_com,main_balance });


        const result = createMaster.toJSON();
        delete result.password;
        console.log(result.password);
        
        return res.status(200).json({ message: "Master created successfully" ,Data:result});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "master not created " ,Error:error});
    }
}

exports.getMaster = async (req, res) => {
    try {
        const condition= { attributes: { exclude: ['password'] } };
        const getMaster = await CRUDHelper.getAll(req, res, MasterModel,condition);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

exports.getMasterByColumn = async (req, res) => {
    try {
        const cookie = req.cookies.token;
        const getMaster= await MasterModel.findOne({ where: { [req.params.column]: req.params.value }, attributes: { exclude: ['password'] } });
        res.status(200).json(getMaster);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}
exports.updateMaster = async (req, res) => {
    try {
        const updateMaster = await CRUDHelper.updatOne(req, res, MasterModel);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

exports.deleteMaster = async (req, res) => {
    try {
        const deleteMaster = await CRUDHelper.deleteOne(req, res, MasterModel);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

exports.getMasterByMobileno = async (req, res) => {
    try {
        const { mobileno } = req.params;
        const getMaster = await MasterModel.findOne({ where: { mobileno } });
        res.status(200).json(getMaster);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

exports.loginMaster = async (req, res) => {
    try {
        const { mobileno, password } = req.body;
        if (!mobileno || !password) {
            return res.status(400).json({ message: "Mobileno and password are required" });
        }
        const loginMaster = await MasterModel.findOne({ where: { mobileno } });
        if (!loginMaster) {
            return res.status(400).json({ message: "Master not found" });
        }
        if (!await bcrypt.compare(password, loginMaster.password)) {
            return res.status(400).json({ message: "Invalid password" });
        }
        const token = jwt.sign({ id: loginMaster.mobileno }, JWT_SECRET, { expiresIn: '1h' });
        loginMaster.token = token;
        loginMaster.setDataValue('role', 'MasterAdmin');
        delete loginMaster.dataValues.password;
        res.cookie('token', token, { httpOnly: true },{ maxAge: 24 * 60 * 60 * 1000 });
       return res.status(200).json({ message: "Login successfully", loginMaster, token });
    } catch (error) {
        console.log(error);


        return res.status(500).json({ message: "Internal server error" ,error:error}); 
    }
}