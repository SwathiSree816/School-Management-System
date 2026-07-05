const jwt = require("jsonwebtoken");
const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const env = require("dotenv")

//Register
const Register = async (req, res) => {
  try {
    const { username, email, password, role, phone } = req.body;
    if (!username || !email || !password || !role || !phone) {
      return res.status(400).json({
        message: "All fields are required.",
      });
    }
    const existingUser = await Users.findOne({
      $or: [{ username }, { email }],
    });
    if (existingUser) {
      return res.status(409).json({
        message:
          "Username is already taken. Please choose a different username.",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await Users.create({
      username: username,
      email: email,
      password: hashedPassword,
      role: role,
      phone: phone,
    });
    console.log("User:", user);
    res.status(201).json({ message: "Registration done successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to register" });
  }
};


//Login
const Login=async(req,res)=>{
    try {
        const {username,password}=req.body;
        if (!username || !password) {
        return res.status(400).json({message: "Username and password are required"});
        }
        const foundUser = await Users.findOne({username:username})
        if (!foundUser) {
            return res.status(404).json({message: "This user is not registered"});
        }
        const comparedPassword = await bcrypt.compare(password,foundUser.password);
        if(!comparedPassword){
            return res.status(400).json({message:"Invalid password"});
        }
        const accesstoken = jwt.sign({userId:foundUser._id,username:foundUser.username,role:foundUser.role},process.env.JWT_SECRET_KEY,{expiresIn:"7d"})
        res.status(200).json({message:"Login Successful",token,user: {
        id: foundUser._id,
        username: foundUser.username,
        email: foundUser.email,
        role: foundUser.role
    }})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Login is not successful"})
    }
}

module.exports = {
    Register,
    Login
};
