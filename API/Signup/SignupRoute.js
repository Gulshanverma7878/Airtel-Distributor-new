const signController=require('./signController');
const express=require('express');
const router=express.Router();


router.post('/',signController.Signup);
router.post('/login',signController.Signin);
router.get('/',signController.users);
router.delete('/:id',signController.deleteUser);


module.exports=router;