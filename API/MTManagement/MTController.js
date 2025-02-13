const MTModel=require('./MTModel');
const CRUDHelper=require('../../utils/crud');


exports.createMT=async(req,res)=>{
    try {
        const {balance,mobileno,distributeId,BankId,utrNo,type,remark,self_com,retailer_com}=req.body;
        const requiredFields = ['balance', 'mobileno', 'distributeId', 'BankId', 'utrNo', 'type', 'remark', 'self_com', 'retailer_com'];
        const missingFields = requiredFields.filter(field => !req.body[field]);
        if (missingFields.length > 0) {
            return res.status(400).json({ message: `missing fields values: ${missingFields.join(", ")}` });
        }
        const total_self_com=balance * (self_com/100);
        const total_retailer_com=balance * (retailer_com/100);
        const main_balance = parseFloat(balance)+parseFloat(total_self_com-total_retailer_com);

        const createMT=await MTModel.create(req.body);
        res.status(200).json({ message: "MT created successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: " trancation not inserted ",error });
    }
}

exports.getMT=async(req,res)=>{
    try {
        const getMT=await CRUDHelper.getAll(req,res,MTModel);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "failed get data " , Error:error });
    }
}


