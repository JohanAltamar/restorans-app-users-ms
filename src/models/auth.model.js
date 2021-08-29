const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  active: { type: Boolean, default: true },
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['SUPER_ADMIN_ROLE' ,'ADMIN_ROLE', 'OWNER_ROLE', 'STAFF_ROLE', 'USER_ROLE'], 
    default: 'USER_ROLE'
  },
  refreshToken: { type: Array, of: String },
});

module.exports = model('User', userSchema);