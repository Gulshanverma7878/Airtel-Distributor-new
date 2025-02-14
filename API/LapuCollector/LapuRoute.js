const LapuControll = require('./LapuControll');
const router = require('express').Router();


router.get('/',LapuControll.getLapu);
router.post('/',LapuControll.createLapu);
router.put('/:id',LapuControll.updateLapu);
router.get("/:id",LapuControll.getLapuById);
router.delete('/:id',LapuControll.deleteLapu);
router.post("/upload",LapuControll.uploadExcel);
router.get("/truncate/data",LapuControll.truncateLapu);
router.post("/upload/data",LapuControll.uploadExcelData);
router.get("/get/transaction",LapuControll.getTransaction);
router.delete("/truncate/transaction",LapuControll.truncateTransaction);
router.get("/list/:id",LapuControll.getHistory);


module.exports=router;
