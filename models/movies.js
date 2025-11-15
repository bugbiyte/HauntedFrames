// models/User.js
const mongoose = require('mongoose');


const userSchema = new mongoose.Schema(
  {
    movie: {
      type: String,
    },

}
);

userSchema.index({ email: 1 }, { unique: true });

module.exports = mongoose.model('User', userSchema);
