const MessageController=require('./messageController');
const router=require('express').Router();


router.get('/',MessageController.getMessage);
router.post('/',MessageController.createMessage);
router.get('/get/:mobileno',MessageController.messageByMobileno);
router.delete('/truncate',MessageController.truncateMessage);

module.exports=router
