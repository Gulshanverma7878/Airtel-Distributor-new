const MTControll=require('./MTController');
const router=require('express').Router();


router.get('/',MTControll.getMT);
router.post('/',MTControll.createMT);


module.exports=router;