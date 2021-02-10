const User = require('../models/usermodel');
const sendToken = require('../utils/jwttoken');
const ErrorHandler = require('../utils/errorhandler')
const APIFeatures = require('../utils/apiFeatures')

//creating the user 
exports.createUser = async function(req, res) {
  try {
    const user = await User.create(req.body)
    sendToken(user,200,res);
  } catch (error) {
      res.status(404).json({
          message: error.message
      })
  }
}


//logging in user
exports.userLogin = async (req, res, next) => {
  try{
    const {email , password} = (req.body);

  if(!email || !password){
      return next(new ErrorHandler("Enter Email And Password", 404));
  }

  const user = await User.findOne({email}).select('+password');

  if(!user){
      return next(new ErrorHandler("Invalid Credentials"))
  }

  const isPasswordMatched = await user.comparePassword(password)

  if(!isPasswordMatched){
      return next(new ErrorHandler("Invalid Password"));
  }

  sendToken(user,200 ,res);
  }catch(error){
    res.status(404).json({
      message: error.message
    })
  }
}

// getting all the users 
// this controller is only for admin role 
exports.getAllUsers = async function(req,res,next){
    try {
    const resPerPage = 4;

    const userCount = await User.countDocuments();

    const apiFeatures =  new APIFeatures(User.find() , req.query)
    .filter()
    .pagination(resPerPage)

    const users = await apiFeatures.query;

    res.status(200).json({
        success:"true",
        users:users,
        userCount
    })
    } catch (error) {
      res.status(404).json({
        message: error.message
      })
    }
}