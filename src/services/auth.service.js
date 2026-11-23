const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

const register = async (userData) => {

  const { name, email, password } = userData;

  const userExist = await User.findOne({ email })

  if (userExist) {
    throw new Error('email already exists')
  }

  const user = await User.create({
    name, email, password
  })
  return user;

}


const login = async (userData) => {
  const { email, password } = userData

  const user = await User.findOne({ email }).select('+password')
  if (!user) {
    throw new Error('Invalid email or password ')
  }

  const isPasswordMatched = await user.comparePassword(password)

  if (!isPasswordMatched) {
    throw new Error("Invalid email or password !")
  }

  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET,
    //    {erxpireIn:'15m'}
  )


  return { user, token };
}

const getProfile = async (userID) => {

  const user = await User.findById(userID)

  if (!user) {
    throw new Error('User not found')
  }
  return user
}

const updateProfile = async ( userId,updatedData) => {
  const { name, email } = updatedData

  const updates = {}

  if (name !== undefined) {
    updates.name = name
  }
  if (email !== undefined) {
    updates.email = email
  }

  const user = await User.findByIdAndUpdate(userId, updates, {
    new: true,
    runValidators: true
  })
  //  if (!user) {
  //       throw new AppError('User not found', 404);
  //   }
  return user;
}

const changePassword=async(userId,currentPassword,newPassword)=>{
          const user =await User.findById(userId).select('+password')

          if(!user){
            throw new Error ('User not found !!')
          }

          const isPasswordMatched= await user.comparePassword(currentPassword)

          if(!isPasswordMatched){
            throw new Error ('password is incorrect')
          }

          user.password=newPassword

          await user.save()

          return user;
}


module.exports = { register, login, getProfile, updateProfile,changePassword }