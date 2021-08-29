const UserModel = require('../models/auth.model');

const registerUser = async (req, res) => {
  try {
    const newUser = new UserModel(req.body);
    await newUser.save();
    res.json({ message: 'User created succesfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user' });
  }
}

const loginUser = async (req, res) => {
  res.json({ message: 'login user' });
}

const logoutUser = async (req, res) => {
  res.json({ message: 'logout user' });
}

const updateUser = async (req, res) => {
  res.json({ message: 'update user' });
}

const disableUser = async (req, res) => {
  res.json({ message: 'disable user' });
}

const verifyToken = async (req, res) => {
  res.json({ message: 'verify token' });
}

const refreshToken = async (req, res) => {
  res.json({ message: 'refresh token' });
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
  disableUser,
  verifyToken,
  refreshToken,
}