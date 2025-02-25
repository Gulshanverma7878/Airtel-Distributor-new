const SignupModel = require('./signModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { Sequelize } = require('sequelize');
require('dotenv').config();


const JWT_SECRET = process.env.JWT_SECRET||"Gulshan";


exports.Signup = async (req, res) => {
    const transaction = await SignupModel.sequelize.transaction();
    try {
        const { name, mobileno, password } = req.body;
        if (await SignupModel.findOne({ where: { mobileno } },{transaction})) {
            return res.status(400).json({ message: "User already exist" });
        }
        if(req.body.confirm !=="BYGK" && req.body.role=="superadmin" ){
            console.log(req.body);
            return res.status(400).json({ message: "not permitted for superadmin creating" });
        }
        req.body.adminKey=await generateAdminKey()
        console.log(req.body.adminKey);
        
        const signup = await SignupModel.create(req.body, { transaction });
        transaction.commit();
        console.log(signup);
        res.status(200).json({ message: "Signup successfully" });
    } catch (error) {
        console.log(error);
        transaction.rollback();
        res.status(500).json({ message: "Internal server error" });
    }
}

exports.Signin = async (req, res) => {
    try {
        const { mobileno, password } = req.body;
        
        const signin = await SignupModel.findOne({ where: { mobileno } });
        if (!signin) {
            return res.status(400).json({ message: "User not found" });
        }
        if (!await bcrypt.compare(password, signin.password)) {
            return res.status(400).json({ message: "Invalid password" });
        }

        else {
            const token = jwt.sign({ id: signin.mobileno }, JWT_SECRET, { expiresIn: '1h' });
            signin.token = token;
            delete signin.dataValues.password;
             res.status(200).json({ message: "Signin successfully", signin,token }); }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

exports.users = async (req, res) => {
     try {
        const users = await SignupModel.findAll({ attributes: { exclude: ['password'] } });
        res.status(200).json({ users });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

exports.deleteUser = async (req, res) => {
    const transaction= await SignupModel.sequelize.transaction();
    try {
        const { id } = req.params;
        const user = await SignupModel.destroy({ where: { id } },{transaction});
        transaction.commit();
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.log(error);
        transaction.rollback();
        res.status(500).json({ message: "Internal server error" });
    }
}







const generateAdminKey = async() => {
  return crypto.randomBytes(15).toString('hex').substring(0, 30);
};