const MasterController = require('./MasterController');
const router = require('express').Router();



router.get('/',MasterController.getMaster); 
router.post('/',MasterController.createMaster);
router.put('/:id',MasterController.updateMaster);
router.delete('/:id',MasterController.deleteMaster);
router.get("/:column/:value",MasterController.getMasterByColumn);

//login
router.post('/login',MasterController.loginMaster);


module.exports=router