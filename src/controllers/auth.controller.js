const authService = require('../services/auth.service')

const register = async (req, res) => {

    try {
        const userData = req.body

        const user = await authService.register(userData)

        res.status(200).json({
            message: "user registered successfully",
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
            }
        })

    }
    catch (error) {
        res.status(500).json({
            message: 'something wrong ',
            error: error.message
        })
    }
}

const login = async (req, res) => {
    try {
        const userData = req.body;

        const { user, token } = await authService.login(userData)

        res.status(200).json({
            message: 'login Successfully',
            token,
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            }
        })
    }
    catch (error) {
        res.status(500).json({
            message: 'somthing wrong',
            error: error.message
        })
    }
}

const getProfile = async (req, res) => {
    try {

        const user = await authService.getProfile(req.user.userId)

        res.status(200).json({
            // message:'welcome',
            success: true,
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            }
        })
    }
    catch (error) {
        res.status(500).json({
            message: 'something error',
            error: error.message
        })
    }
}

const updateProfile = async (req, res) => {
    try {
        const updatedData = req.body

        const user = await authService.updateProfile( req.user.userId, updatedData)

        res.status(200).json({
            message: 'Profile updated successfully',
            data: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })
    }
    catch (error) {
        res.status(500).json({
            message: 'something error',
            error: error.message
        })
    }
}

const changePassword=async(req,res)=>{
    
    try{
        const {currentPassword,newPassword}=req.body
         await authService.changePassword(
            req.user.userId,currentPassword,newPassword
         )
        res.status(200).json({
            success:true,
            message:'Password changed successfully',
            
        })
    }
    catch(error){
        res.status(500).json({
            message:'Something wrong',
            error:error.message
        })
    }
    
}

module.exports = { register, login, getProfile, updateProfile ,changePassword}