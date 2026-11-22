const express=require('express')
const router=express.Router()
const protect= require('../middlewares/auth.middleware')
const {addNewJob}=require('../controllers/job.controller')




router.post('/',protect,addNewJob)

module.exports=router