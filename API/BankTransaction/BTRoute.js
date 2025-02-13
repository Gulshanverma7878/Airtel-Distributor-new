const BTController = require('./BTController');
const router=require('express').Router();


router.get('/',BTController.getBT);
router.post('/',BTController.createBT);
router.put('/:id',BTController.updateBT);
router.delete('/:id',BTController.deleteBT);
router.get("/:id",BTController.getBTById);
router.delete("/truncate/data",BTController.truncateBT);


module.exports=router;