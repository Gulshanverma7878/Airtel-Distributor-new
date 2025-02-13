const TypeModel=require('./TypeModel');
const CRUDHelper=require('../../utils/crud');



exports.createType = async (req, res) => {
    try {
        const { typeName } = req.body;
        if(!typeName){
            return res.status(400).json({ message: "Type name is required" });  
        }
        const createType = await TypeModel.create({ typeName });
        res.status(200).json({ message: "Type created successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

exports.getType =async (req,resp)=>{
    try {
        const getType=await CRUDHelper.getAll(req,resp,TypeModel);
    } catch (error) {
        console.log(error);
        resp.status(500).json({ message: "failed get data " , Error:error });
    }
}

exports.deleteType=async (req,resp)=>{
    try {
        const deleteData=await CRUDHelper.deleteOne(req,resp,TypeModel);
    } catch (error) {
        console.log(error);
        resp.status(500).json({error});
    }
}
