const axios = require("axios");
const BTModel = require('../BankTransaction/BTModel');
const LapuModel = require('./LapuModel');
const CRUDHelper = require('../../utils/crud');
const CollectorModel = require("../Collectors/collectorModel");
const TransactionModel = require("./LapuTranModel");
const xlsx = require('xlsx');
const MasterModel = require('../MasterManagement/MasterModel');
require('dotenv').config();


exports.createLapu = async (req, res) => {
    try {
        const { name, CollectorId, lapuId } = req.body;
        const missingFields = ['name', 'CollectorId', 'lapuId'].filter(field => !req.body[field]);
        if (missingFields.length > 0) {
            return res.status(400).json({ message: `missing fields values: ${missingFields.join(", ")}` });
        }
        const createLapu = await LapuModel.create({ name, CollectorId, lapuId })
        res.status(200).json({ message: "Lapu created successfully", createLapu });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
}


exports.getLapu = async (req, res) => {
    try {
        // const getLapu = await CRUDHelper.getAll(req, res, LapuModel);
        const getLapuData = await LapuModel.findAll();
        res.status(200).json({ TotalItems: getLapuData.length, data: getLapuData });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
}

exports.updateLapu = async (req, res) => {
    try {
        const updateLapu = await CRUDHelper.updatOne(req, res, LapuModel);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
}

exports.deleteLapu = async (req, res) => {
    try {
        const deleteLapu = await CRUDHelper.deleteOne(req, res, LapuModel);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
}

exports.getLapuById = async (req, res) => {
    try {
        const getLapu = await CRUDHelper.getById(req, res, LapuModel);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
}


exports.truncateLapu = async (req, res) => {
    try {
        const truncateLapu = await LapuModel.truncate();
        res.status(200).json({ message: "Lapu deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}





exports.uploadExcel = async (req, res) => {
    try {
        const Excel = req.files.file;
        console.log(Excel);

        if (!Excel || !Excel.mimetype.includes('spreadsheetml')) {
            return res.status(400).json({ error: "Please upload a valid Excel file" });
        }

        const workbook = xlsx.read(Excel.data, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(worksheet);

        // Function to transform headers
        const transformHeaders = (data) => {
            return data.map(item => {
                const transformedItem = {};
                for (const key in item) {
                    if (item.hasOwnProperty(key)) {
                        const newKey = key.replace(/\s+/g, '_'); // replace spaces with underscores
                        transformedItem[newKey] = item[key];
                    }
                }
                return transformedItem;
            });
        };

        const transformedData = transformHeaders(data);

        // Loop through transformed data and add CollectorId to each item
        for (const item of transformedData) {
            console.log(item.FSE_Msisdn);

            const collector = await CollectorModel.findOne({
                where: { mobileno: item.FSE_Msisdn },
                attributes: ['id']
            });

            console.log(collector);

            if (collector) {
                item.CollectorId = collector.id;
            } else {
                console.log(`No collector found for MSISDN: ${item.FSE_Msisdn}`);
            }
        }

        // Create records in the database using transformedData
        const createLapu = await LapuModel.bulkCreate(transformedData);

        // Respond with success
        res.status(200).json({ message: "Lapu created successfully", data: createLapu });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};







exports.uploadExcelData = async (req, res) => {
    try {
        const Excel = req.files.file;
        console.log(Excel);
        if (!Excel || !Excel.mimetype.includes('spreadsheetml')) {
            return res.status(400).json({ error: "Please upload a valid Excel file" });
        }
        const workbook = xlsx.read(Excel.data, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(worksheet);

        const transformHeaders = (data) => {
            return data.map(item => {
                const transformedItem = {};
                for (const key in item) {
                    if (item.hasOwnProperty(key)) {
                        const newKey = key.replace(/\s+/g, '_');
                        transformedItem[newKey] = item[key];
                    }
                }
                return transformedItem;
            });
        };
        const transformedData = transformHeaders(data);

        for (const item of transformedData) {
            const bankId = 3;
            const ShopId = await LapuModel.findOne({ where: { mobileno: item.Retailer_Msisdn } });
            console.log(`shop:  `, ShopId?.id ? ShopId?.id : "not found");
            const postData = await axios.post(`http://localhost:${process.env.PORT}/api/bank-transaction`, {
                amount: item.Collectable_Amount,
                shopId: ShopId?.id ? ShopId.id : null,
                BankId: bankId,
                utrNo: item.UTR,
                type: "Credit",
                remark: "EXCEl to database",
                ForTo: ShopId?.id ? ShopId.id : null
            });
            const createLapu = await TransactionModel.create(item);
        };
        // const createLapu = await TransactionModel.bulkCreate(transformedData);

        res.status(200).json({ message: "Lapu created successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.getTransaction = async (req, res) => {
    try {
        const getLapu = await CRUDHelper.getAll(req, res, TransactionModel);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
}



exports.truncateTransaction = async (req, res) => {
    try {
        const truncateLapu = await TransactionModel.truncate();
        res.status(200).json({ message: "Lapu deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

exports.getHistory = async (req, res) => {
    try {
        const getHistory = await TransactionModel.findAll({ where: { Retailer_Msisdn: req.params.id } });
        return res.status(200).json({ data: getHistory });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
}