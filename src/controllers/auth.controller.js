const bcrypt = require('bcrypt');
const { request } = require('express');
const UserModel = require('../models/auth.model');

const registerUser = async (req, res) => {
  try {
    let { password, ...restUserInfo } = req.body;
    /* hash password */
    password = await bcrypt.hash(password, 10);
    /* create user */
    const newUser = new UserModel({ password, ...restUserInfo });
    await newUser.save();

    res.json({ message: 'User created succesfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user' });
  }
}

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    /* check if user exists*/
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }
    /* check if passwords match */
    const isValidPassword = await user.isValidPassword(password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    /* generate token pairs */
    const { accessToken, refreshToken } = await user.generateTokens();
    /* send tokens to client */
    res.json({ accessToken, refreshToken });
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: 'Error logging user' });
  }
}

const logoutUser = async (req = request, res) => {
  const refreshToken = req.headers.authorization;
  const userId = req.userId;

  /* check if the userId is present in the request */
  if (!userId) {
    return res.status(401).json({ message: 'User not found' });
  }

  let user = await UserModel.findOne({ _id: userId, refreshToken });
  /* check if the user exists */
  if (!user) {
    return res.status(401).json({ message: 'User not found' });
  }
  /* filter User tokens to remove the current one */
  user.refreshToken = user.refreshToken.filter(token => token !== refreshToken);
  await user.save();

  res.json({ message: `logout user: ${userId}` });
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