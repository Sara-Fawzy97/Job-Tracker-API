const express=require('express')
const router=express.Router()
const protect= require('../middlewares/auth.middleware')
const {addNewJob,getAllJobs,getOneJob}=require('../controllers/job.controller')




router.post('/',protect,addNewJob)
router.get('/all-jobs',protect,getAllJobs)
router.get('/:id',protect,getOneJob)

module.exports=router