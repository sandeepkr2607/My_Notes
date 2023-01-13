const asyncHandler = require("express-async-handler");
// for password encrypt import bcrypt
const bcrypt = require("bcryptjs");
const User = require("../modals/userModal");
const jwt = require("jsonwebtoken");

// @desc user register
// @dsec /api/users
// @access Public

const registerUser = asyncHandler(async (req, res) => {
  // const { name, email, password, pic } = req.body;

  // res.json({
  //     name, email
  // })
  const { name, email, password, pic } = req.body;
  // validation
  if (!name || !email || !password) {
    // return res.status(400).json({ message: "Please include all fields" })
    return res.status(400).json({ message: "Please include all fields" });
    // throw new Error("Please include all fields")
  }
  // find if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
    // throw new Error('User already exists')
  }

  // hash password ( actually we want user encrypt password) and what is salt
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    pic,
  });

  if (user) {
    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    return res.status(400).json({ message: "Inavalid user data" });
  }
});
// @desc user login
// @dsec /api/users/login
// @access Public

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    return res.status(401).json({ message: "Invalid Credential" });
  }
});

// @desc user login
// @dsec /api/users/profile
// @access Public

const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.pic = req.body.pic || user.pic;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      pic: updatedUser.pic,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404).json({ message: "User Not Found" });
  }
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "10d" });
};

module.exports = {
  registerUser,
  loginUser,
  updateProfile,
};
