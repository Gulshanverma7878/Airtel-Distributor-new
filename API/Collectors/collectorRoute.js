const CollectorController = require('./collectorControll');
const router= require('express').Router();


router.get('/',CollectorController.getCollector);
router.post('/',CollectorController.createCollector);
router.put('/:id',CollectorController.updateCollector);
router.delete('/:id',CollectorController.deletCollector);
router.get("/:id",CollectorController.getCollectorById);
router.post("/login",CollectorController.loginCollector);
router.get("/get/lapu/:id",CollectorController.findLapu);


module.exports=router;