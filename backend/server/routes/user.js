const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
 
const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, require: true, trim: true },
  name: { type: String, unique: false, require: true, trim: true },
  password: { type: String, require: true },
});
 
UserSchema.pre('save', function(next) {
  const user = this;
  const saltFactor = 10;

  console.log("user@:", user);

  bcrypt.genSalt(saltFactor, (err, salt) => {
    if (err) return next(err);
 
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});
 
module.exports = mongoose.model('User', UserSchema);