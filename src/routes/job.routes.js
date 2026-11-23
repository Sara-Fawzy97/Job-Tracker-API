const express=require('express')
const router=express.Router()
const protect= require('../middlewares/auth.middleware')
const {addNewJob,getAllJobs,getOneJob,updateJob,deleteJob}=require('../controllers/job.controller')




router.post('/',protect,addNewJob)
router.get('/',protect,getAllJobs)
router.get('/:id',protect,getOneJob)
router.patch('/:id',protect,updateJob)

router.delete('/:id',protect,deleteJob)

module.exports=router