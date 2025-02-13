const CollectorModel = require('./collectorModel');
const BTModel=require('../BankTransaction/BTModel');
const MasterModel=require('../MasterManagement/MasterModel');
const LapuModel=require('../LapuCollector/LapuModel');
const CRUDHelper = require('../../utils/crud');
const bcrypt= require('bcryptjs');
const jwt=require('jsonwebtoken');

require('dotenv').config();





exports.createCollector = async (req, res) => {
    try {
      
        const {name,mobileno,distributorId,password}=req.body;
        const requiredFields = ['name', 'mobileno', 'password', 'distributorId','password'];
        const missingFields = requiredFields.filter(field => !req.body[field]);
        if (missingFields.length > 0) {
            return res.status(400).json({ message: `missing fields values: ${missingFields.join(", ")}` });
        }

        if (await CollectorModel.findOne({ where: { mobileno } })) {
            return res.status(400).json({ message: "Collector already exist" });
        }

        const createCollector = await CollectorModel.create(req.body);
        return res.status(200).json({ message: "Collector created successfully", createCollector });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
};



exports.getCollector = async (req, res) => {
    try {
        const condition= { attributes: { exclude: ['password'] } };
        const getCollector = await CRUDHelper.getAll(req, res, CollectorModel,condition);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
};



exports.getCollectorById = async (req, res) => {
    try {
        const getCollector = await CRUDHelper.getById(req, res, CollectorModel);        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
};



exports.updateCollector = async (req, res) => {
    try {
        const updateCollector = await CRUDHelper.updatOne(req, res, CollectorModel);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
};

exports.deletCollector = async (req, res) => {
    try {
        const deletCollector = await CRUDHelper.deleteOne(req, res, CollectorModel);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
};



exports.loginCollector = async (req, res) => {
    try {
        const { mobileno, password } = req.body;
        if (!mobileno || !password) {
            return res.status(400).json({ message: "mobileno and password are required" });
        }
        const collector = await CollectorModel.findOne({ where: { mobileno } });
        if (!collector) {
            return res.status(400).json({ message: "Collector not found" });
        }
        if (!await bcrypt.compare(password, collector.password)) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = jwt.sign({ id: collector.id },process.env.JWT_SECRET, { expiresIn: '1h' });
        collector.token = token;
        collector.setDataValue('role', 'CollectorAdmin');
        delete collector.dataValues.password;
        res.status(200).json({ message: "Login successfully", collector, token });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


exports.findLapu=async(req,res)=>{
    try {
        const {id}=req.params;
        const LapuList=await CollectorModel.findOne({where:{
            id:id
        },
        include:[
            {
                model:LapuModel,
                attributes:['Retailer_Name','mobileno']
            }
        ],
        attributes:['id','name','mobileno']
    
    
    });

    return res.status(200).json(LapuList)
    } catch (error) {
        return res.status(500).json(error)
        
    }
}