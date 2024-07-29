const express = require('express');
const router = express.Router();
const {userResume,getResumeList,userStoreDetails,getResumeInfo,handleDelete}=require('../controllers/userController')

router.post('/user-resume',userResume)
router.post('/user',getResumeList)
router.put('/user-resume/user-data',userStoreDetails)
router.get('/user-resume/get-data',getResumeInfo)
router.post('/user-resume/del',handleDelete)
module.exports=router