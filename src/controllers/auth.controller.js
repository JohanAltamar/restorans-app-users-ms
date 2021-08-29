const UserModel = require('../models/auth.model');

// TODO: HASH PASSWORD
const registerUser = async (req, res) => {
  res.json({message: 'register user'});
}

const loginUser = async (req, res) => {
  res.json({message: 'login user'});
}

const logoutUser = async (req, res) => {
  res.json({message: 'logout user'});
}

const updateUser = async (req, res) => {
  res.json({message: 'update user'});
}

const disableUser = async (req, res) => {
  res.json({message: 'disable user'});
}

const verifyToken = async (req, res) => {
  res.json({message: 'verify token'});
}

const refreshToken = async (req, res) => {
  res.json({message: 'refresh token'});
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