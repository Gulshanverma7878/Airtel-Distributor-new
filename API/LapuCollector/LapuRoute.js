const LapuControll = require('./LapuControll');
const router = require('express').Router();


router.get('/',LapuControll.getLapu);
router.post('/',LapuControll.createLapu);
router.put('/:id',LapuControll.updateLapu);
router.get("/:id",LapuControll.getLapuById);
router.delete('/:id',LapuControll.deleteLapu);
router.post("/upload",LapuControll.uploadExcel);
router.get("/truncate/data",LapuControll.truncateLapu);


module.exports=router;
