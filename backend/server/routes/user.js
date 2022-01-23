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
      console.log("hash@:", hash);

      next();
    });
  });
});

UserSchema.methods.checkPassword = function(guess){
  console.log('p1:',guess);
  console.log('p2:',this.password);
  console.log('bcrypt.compare(guess,this.password):', bcrypt.compare(guess,this.password));
  return bcrypt.compare(guess,this.password);
};

// UserSchema.methods.checkPassword = function(guess, done){
//   bcrypt.compare(guess,this.password, function(err, isMatch) {
//     done(err, isMatch);
//   });
// };


module.exports = mongoose.model('User', UserSchema);