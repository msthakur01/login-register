const User = require("../model/userSchema");
const jwt = require('jsonwebtoken')


const register = async (req, res) => {
  const { name, email, phonenumber, password } = req.body;
  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("User Already Exists");
  }

  const user = await User.create({
    name,
    email,
    phonenumber,
    password,
  });
  if (user) {
    res.status(201).json({
      id: user._id,
      name: user.fullname,
      email: user.email,
      phonenumber: user.phonenumber,
      token: generateWebToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Error Occured");
  }
};


const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      phonenumber: user.phonenumber,
      token: generateWebToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Email and Password");
  }
};


const generateToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET,{
        expiresIn:'5m'
    })
    
}
module.exports = generateToken;
module.exports = { register, login };
