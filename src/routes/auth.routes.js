const express=require('express')
const router =express.Router()
const {register,login,getProfile,updateProfile,changePassword}=require('../controllers/auth.controller')
const protect=require('../middlewares/auth.middleware')

router.post('/register',register)
router.post('/login',login)
router.get('/profile',protect,getProfile)
router.patch('/profile',protect,updateProfile)
router.patch('/change-password',protect,changePassword)


module.exports=router