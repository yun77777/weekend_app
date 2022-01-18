const express = require("express");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const recordRoutes = express.Router();
const router = express.Router();
const User = require('./user');

recordRoutes.route("/user/join/").post(async function (req, res) {
  const { email, name, password } = req.body;
  const user = await User.findOne({email});
  console.log('user:', user);

  if(!user){
    try {
      let user = new User({
        email: email,
        name: name,
        password: password
      });
  
      const savedUser = user.save();
      if(savedUser)
        console.log('saved');
    } catch(err) {
      return res.json({ error: true, msg: 'failed to save user'});
    }
    
  }

});

recordRoutes.route("/user/login/").post(async function (req, res) {
  const { email, name, password } = req.body;

  const user = await User.findOne({email});
  console.log('user: ', user);
  console.log('password: ', password);

  if(user){
    const bcrptCompare = await bcrypt.compare(password, user.password);
    console.log('bcrptCompare: ', bcrptCompare);
    if(bcrptCompare){

      const token = await jwt.sign({ email: user.email}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '7 days'});

      user.token = token;
      console.log('token:', user.token);

      try {
        user.save(function(err, user) {
          if(err) return res.json({error: 'errrrrrror'})
          res.cookie('x_auth', user.token, {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true
          }).json({error:false, email: email});
        });
      } catch(err){
        return res.json({error: true, msg: 'error happened'});
      }

      console.log('logged in successfully');

    }
  } else{
    return res.json({error: true, msg: 'check your account'});
  }

});



const cookieParser = require('cookie-parser')
recordRoutes.use(cookieParser());
recordRoutes.post('/user/login/test', (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
      console.log('check this user: ', user);
        if(!user) {
            return res.json({
                loginSuccess: false, 
                message: "check your account."
            });
        }

        user.comparePassword(req.body.password, (err, isMatch) => {
            if(!isMatch)
                return res.json({ loginSuccess: false, message: "enter correct paassword"})
            user.generateToken((err, user) => {
                if(err) return res.status(400).send(err);
                res.cookie("x_auth", user.token)
                    .status(200)
                    .json({ loginSuccess: true, email: user.email });
            });
        });
    });
});



module.exports = recordRoutes;
