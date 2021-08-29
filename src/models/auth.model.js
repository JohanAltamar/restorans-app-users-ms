const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

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

userSchema.pre(
  'save',
  async function (next) {
    const user = this;
    const hash = await bcrypt.hash(this.password, 10);

    this.password = hash;
    next();
  }
);

userSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);

  return compare;
}

module.exports = model('User', userSchema);