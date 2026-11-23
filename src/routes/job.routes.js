const express=require('express')
const router=express.Router()
const protect= require('../middlewares/auth.middleware')
const {addNewJob,getAllJobs}=require('../controllers/job.controller')




router.post('/',protect,addNewJob)
router.get('/all-jobs',protect,getAllJobs)

module.exports=router