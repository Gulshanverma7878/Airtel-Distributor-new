const crypto = require('crypto');
const NodeCache = require('node-cache');

const MessageCache = new NodeCache({ stdTTL: 600 });

exports.getAll = async (req, res, Model,condition) => {
    try {
        const getAll = await Model.findAll(condition);
        return res.status(200).json(getAll)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error })
    }
}

exports.getById = async (req, res, Model) => {
    try {
        const { id } = req.params;
        const getById = await Model.findOne({ where: { id } });
        if (!getById) {
            return res.status(400).json({ message: "Data not found" });
        }
        return res.status(200).json(getById)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
}
exports.deleteOne= async(req,res,Model)=>{
    try {
        const { id } = req.params;
        const deleteOne = await Model.findOne({ where: { id } });
        if(!deleteOne){
            return res.status(400).json("not found for delete");
        }
        deleteOne.destroy();
        return res.status(200).json("deleted successfully");
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
}


exports.updatOne= async (req,res,Model)=>{
    try {
        const {id}=req.params;
        const UploadData= await Model.findOne({where:{id}});
        if(!UploadData){
            return res.status(400).json("not found for update");
        }
        UploadData.update(req.body);
        req.body.id=id
        return res.status(200).json({message:"updated successfully",update:req.body});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
}


exports.generateAdminKey = async() => {
    return crypto.randomBytes(15).toString('hex').substring(0, 30);
  };



  exports.getMessage=async(req,resp)=>{
    try {
        const CacheKey='getMessageAll'
        const getMessage = await CRUDHelper.getAll(req, res, MessageModel,CacheKey);
    } catch (error) {
        console.log(error);
        resp.status(500).json({ error});
    }
  }