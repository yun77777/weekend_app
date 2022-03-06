const express = require("express");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const recordRoutes = express.Router();
const router = express.Router();
const User = require('./user');
const cookieParser = require('cookie-parser');

const authMiddleware = require('./authMiddleware');
recordRoutes.use(cookieParser());

recordRoutes.route("/user/join/").post(async function (req, res) {
  // const { email, name, password } = req.body;
  console.log('req.body@@@:', req.body.user);

  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
  const deviceToken = req.body.device;

  const user = await User.findOne({ email });
  console.log('email@@@:', email);
  console.log('name@@@:', name);
  console.log('password@@@:', password);
  console.log('deviceToken@@@:', deviceToken);

  if (!user) {
    try {
      let user = new User({
        email: email,
        name: name,
        password: password,
        deviceToken: deviceToken
      });

      const savedUser = user.save();
      if (savedUser) {
        console.log('saved');
        return res.json({ error: false, msg: 'saved user' , status: 'login'});
      }
    } catch (err) {
      return res.json({ error: true, msg: 'failed to save user', status: '' });
    }

  } else {
    return res.json({ error: false, msg: 'already saved user', staus:'signup'});
  }

});



const generateAccessToken = (email) => {
  return jwt.sign({email}, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m"
  });
};

const generateRefreshToken = (email) => {
 return jwt.sign({email}, process.env.REFRESH_TOKEN_SECRET, {
   expiresIn: "180 days"
 });
};

recordRoutes.route("/user/login").post(async function (req, res) {
  // let { email, password } = req.body;
  const email = req.body.email;
  const password = req.body.password;
  const deviceToken = req.body.device;
  
  console.log('email@: ', email);
  console.log('password@: ', password);
  console.log('deviceToken@: ', deviceToken);

  let user = await User.findOne({ email });
  console.log('user@@@: ', user);
  if(!user)
    return res.json({ error: true, msg: 'check your account', status: ''});


  let isMatch = await user.checkPassword(password);

  console.log('isMatch: ', isMatch);

  if (isMatch) {

    let accessToken = generateAccessToken(email);
    let refreshToken = generateRefreshToken(email);

    user.token = refreshToken;

    res.cookie('accessToken', accessToken, { maxAge: 1000 * 60 * 10, httpOnly: false });
    console.log(req.cookies.accessToken,' cookies');

    
    console.log('l@@@@@@ogged in successfully');
    return res.json({ error: false, msg: 'logined successfully' , status: 'login', token: refreshToken, });

  } else {
    
    return res.json({ error: true, msg: 'check your account', status: ''});
  }
});



recordRoutes.route("/user/logout").get(async function (req, res) {
  const email = req.body.email;
  
  console.log('email@: ', email);

  let user = await User.findOne({ email });
  console.log('user@: ', user);
  if(!user)
    return res.json({ error: true, msg: 'check your account', status: ''});


  let isMatch = await user.checkPassword(password);

  console.log('isMatch: ', isMatch);

  if (isMatch) {

    let accessToken = generateAccessToken(email);
    let refreshToken = generateRefreshToken(email);

    user.token = "";

    console.log('l@@@@@@ogged out successfully');
    return res.json({ error: false, msg: 'logged out successfully' , status: 'logout', token: user.token, });

  } else {
    
    return res.json({ error: true, msg: 'check your account', status: ''});
  }
});

recordRoutes.route("/api/token").get(async function (req, res) {
  let { email, password } = req.body;

  let user = await User.findOne({ email });

  let accessToken = user.accessToken;

  return res.json({ accessToken});

});


// regenerate access token based on refresh token
recordRoutes.route("/refresh").post(async function (req, res) {
  let refreshToken = req.body.refreshToken;
  if(!refreshToken) return res.sendStatus(401);

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (error, user) => {
      if(error) return res.sendStatus(403);

      const accessToken = generateAccessToken(user.email);

      res.json({accessToken});
    }
  )
});

recordRoutes.route("/api/mypage").get(authMiddleware, (req, res, next) => {
  res.json(db.users.filter((user) => user.email === req.user.email));
});

module.exports = recordRoutes;
