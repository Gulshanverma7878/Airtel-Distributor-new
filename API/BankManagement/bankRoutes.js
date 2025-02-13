const BankController = require('./bankController');
const router=require('express').Router();



router.get('/',BankController.getBank);
router.post('/',BankController.AddBank);
router.put('/:id',BankController.updateBank);  
router.delete('/:id',BankController.deleteBank);
router.get("/:id",BankController.getById);


module.exports=router;
