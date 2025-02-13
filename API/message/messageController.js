const MessageController = require('./messageController');
const MessageModel = require('./messageModel');
const CRUDHelper=require('../../utils/crud');


exports.createMessage = async (req, res) => {
    try {
        console.log(req.body.data);
        const { message, mobileno, mobiNo, otp } = JSON.parse(req.body.data);
        const createMessage = await MessageModel.create({ message, mobileno, mobiNo, otp })
        res.status(200).json({ success: 1, message: "Message created successfully",data:req.body});
    } catch (error) {
        console.log(error);
        res.status(500).json({success: 0, message: "Internal server error" ,error:error,data:req.body});
    }
}

exports.getMessage = async (req, res) => {
    try {
        const CacheKey='getMessageAll'
        const getMessage = await CRUDHelper.getAll(req, res, MessageModel,CacheKey);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error});
    }
}

exports.messageByMobileno = async (req, res) => {
    try {
        const { mobileno } = req.params;
        const messages = await MessageModel.findOne({ where: { mobileno },order: [['createdAt', 'DESC']] });
        if(!messages){
         return   res.status(200).json([]);
        }
        res.status(200).json( messages );
        messages.destroy();
        console.log("messages");

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}
//

exports.truncateMessage = async (req, res) => {
    try {
        const truncateMessage = await MessageModel.destroy({ where: {} });
        res.status(200).json({ message: "Message deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}