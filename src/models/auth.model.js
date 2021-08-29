const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new Schema({
  active: { type: Boolean, default: true },
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['SUPER_ADMIN_ROLE', 'ADMIN_ROLE', 'OWNER_ROLE', 'STAFF_ROLE', 'USER_ROLE'],
    default: 'USER_ROLE'
  },
  refreshToken: { type: Array, of: String },
});

userSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);

  return compare;
}

userSchema.methods.generateTokens = async function () {
  const user = this;
  const refreshToken = jwt.sign(
    { id: user._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '1d' }
  );

  const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '15min'
  });

  user.refreshToken.push(refreshToken);
  await user.save();

  return { refreshToken, accessToken };
}

module.exports = model('User', userSchema);