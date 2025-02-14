const BTModel = require('./BTModel');
const BankModel = require('../BankManagement/bankModel');
const CRUDHelper = require('../../utils/crud');
const MasterModel = require('../MasterManagement/MasterModel');
const ShopModel = require("../LapuCollector/LapuModel")
const CollectorModel = require('../Collectors/collectorModel');




exports.createBT = async (req, res) => {
    try {
        const { amount, distributeId, BankId, utrNo, type, remark, shopId, ForTo } = req.body;
        const bank = await BankModel.findOne({
            where: { id: BankId },
        });
        if (!bank) {
            return res.status(400).json({ message: "Bank not found" });
        }
        // if (bank.balance < amount) {
        //     return res.status(400).json({ message: "Insufficient balance" });
        // }

        let shop;
        if (shopId) {
            shop = await ShopModel.findOne({
                where: { id: shopId },
                include: [
                    {
                        model: CollectorModel,
                        attributes: ['id'],
                        include: [
                            {
                                model: MasterModel,
                                attributes: ['id'],
                            },
                        ]
                    }
                ]
            });

        }
        /////master balance
        let masterId = shop?.Collector ? shop.Collector : null;

        let master;
        if (masterId) {
            master = await MasterModel.findOne({
                where: { id: masterId.Master.id },
            });
        }
        if(distributeId){
            master= await MasterModel.findOne({ where: { id: distributeId } });
        }


        //  distributorBeforeBalances: master.balance, distributorAfterBalances: type !== "Debit" ? parseFloat(master.balance) + parseFloat(amount) : parseFloat(master.balance - amount), ShopBeforeBalances: shop.balance,

        const createBT = await BTModel.create({
            amount,
            distributeId,
            BankId,
            utrNo,
            type,
            ForTo,
            remark,
            BeforeBalances: bank.balance,
            // AfterBalances: type !== "Debit"
            //     ? (shop ? parseFloat(bank.balance) + parseFloat(amount) : parseFloat(bank.balance) + parseFloat(amount))
            //     : (shop ? parseFloat(bank.balance) - parseFloat(amount) : parseFloat(bank.balance) - parseFloat(amount)),


            AfterBalances: type === "refill.digital.collection.complete"
                ? parseFloat(bank.balance)  // If type is "refill.digital.collection.complete", use the bank balance as is.
                : (type !== "Debit"
                    ? (shop ? parseFloat(bank.balance) + parseFloat(amount) : parseFloat(bank.balance) + parseFloat(amount))
                    : (shop ? parseFloat(bank.balance) - parseFloat(amount) : parseFloat(bank.balance) - parseFloat(amount))
                ),


            ShopBeforeBalances: shop?.balance || null,
            ShopAfterBalances: type !== "Debit" ? parseFloat(shop?.balance || 0) - parseFloat(amount) : parseFloat(shop?.balance || 0) + parseFloat(shop?.balance ? amount : 0) || null,
            distributorBeforeBalances: master?.main_balance || undefined,
            distributorAfterBalances:type === "refill.digital.collection.complete"
            ? parseFloat(master?.balance? main_balance : undefined) 
            : (type !== "Debit"
                ? (shop ? parseFloat(master.main_balance) + parseFloat(amount) : parseFloat(master.main_balance) + parseFloat(amount))
                : (shop ? parseFloat(master.main_balance) - parseFloat(amount) : parseFloat(master.main_balance) - parseFloat(amount))
            ),
        });



        if (createBT) {
            const balance = type == "Debit" ? parseFloat( bank.balance) - parseFloat(amount) : parseFloat(bank.balance) + parseFloat(amount);
            console.log(balance, "JJJJ")
            console.log(type);
            if(type!=="refill.digital.collection.complete"){
                const updateBank = await BankModel.update({ balance }, {
                    where: {
                        id: BankId
                    }
                });
                // console.log("Entered" + updateBank);
            }
            if (distributeId) {
                const master= await MasterModel.findOne({ where: { id: distributeId } }); 

           
                const comm = parseFloat(master.self_com) //- parseFloat(master.retailer_com);
                let totalbalanc = parseFloat(amount) + parseFloat(amount * comm / 100);
                console.log((parseFloat(totalbalanc) + parseFloat(master.main_balance)));
                await MasterModel.update({ main_balance: (parseFloat(totalbalanc) + parseFloat(master.main_balance)) }, {
                    where: {
                        id: distributeId
                    }
                });
            }
            if (shop) {
                shop.update({ balance: parseFloat(shop?.balance || 0) - parseFloat(amount) })
            }
        }
        return res.status(200).json({ message: "BT created successfully", data: req.body });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

exports.getBT = async (req, res) => {
    try {
        const getBT = await BTModel.findAll({
            include: [
                {
                    model: BankModel,
                    attributes: ['bankName']
                },
                {
                    model: MasterModel,
                    attributes: ['name']

                }
            ]
        });

        return res.status(200).json(getBT);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}


exports.getBTById = async (req, res) => {
    try {
        const getOne = await CRUDHelper.getById(req, res, BTModel);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

exports.deleteBT = async (req, res) => {
    try {
        const deleteBT = await CRUDHelper.deleteOne(req, res, BTModel);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

exports.updateBT = async (req, res) => {
    try {
        const updateBT = await CRUDHelper.updatOne(req, res, BTModel);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}



exports.truncateBT = async (req, res) => {
    try {
        const truncateBT = await BTModel.truncate();
        res.status(200).json({ message: "BT deleted successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}