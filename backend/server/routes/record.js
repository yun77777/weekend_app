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

  const email = req.body.user.email;
  const name = req.body.user.name;
  const password = req.body.user.password;

  const user = await User.findOne({ email });
  console.log('email@@@:', email);
  console.log('name@@@:', name);
  console.log('password@@@:', password);

  if (!user) {
    try {
      let user = new User({
        email: email,
        name: name,
        password: password
      });

      const savedUser = user.save();
      if (savedUser)
        console.log('saved');
    } catch (err) {
      return res.json({ error: true, msg: 'failed to save user' });
    }

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
  const email = req.body.user.email;
  const password = req.body.user.password;
  
  console.log('email@: ', email);
  console.log('password@: ', password);

  let user = await User.findOne({ email });
  console.log('user@: ', user);

  let isMatch = await user.checkPassword(password);

  console.log('isMatch: ', isMatch);

  if (isMatch) {

    let accessToken = generateAccessToken(email);
    // jwt.sign({ email: user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '7 days' });
    let refreshToken = generateRefreshToken(email);
    // jwt.sign({ email: user.email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '180 days' });

    user.accessToken = accessToken;
    user.refreshToken = refreshToken;
    console.log('accessToken:', user.accessToken);

    // try {
    //     user.save(function (err, user) {
    //     if (err) return res.json({ error: 'errrrrrror' })
    //     res.cookie('x_auth', user.accessToken, {
    //       maxAge: 1000 * 60 * 60 * 24 * 7,
    //       httpOnly: true
    //     }).json({ error: false, email: email });

    //   });
    // } catch (err) {
    //   return res.json({ error: true, msg: 'error happened' });
    // }

    res.cookie('accessToken', accessToken, { maxAge: 1000 * 60 * 10, httpOnly: false });
    // res.cookie('accessToken', accessToken);
    console.log(req.cookies.accessToken,' cookies');

    
    console.log('l@@@@@@ogged in successfully');
    return res.json({ accessToken, refreshToken});

  } else {
    return res.json({ error: true, msg: 'check your account' });
  }
});



recordRoutes.route("/api/token").get(async function (req, res) {
  let { email, password } = req.body;

  let user = await User.findOne({ email });

  let accessToken = user.accessToken;

  return res.json({ accessToken});

});

// const authMiddleware = (req, res, next) => {
//   let authHeader = req.headers["authorization"];
//   let token = authHeader && authHeader.split(" ")[1];

//   if(!token) {
//     console.log('something went wrong on token');
//     return res.sendStatus(400);
//   }

//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
//     if(error) {
//       console.log(error);
//       return res.sendStatus(403);
//     }

//     req.user = user;
//     next();
//   });
// };

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

// recordRoutes.use("/api/mypage", authMiddleware);
recordRoutes.route("/api/mypage").get(authMiddleware, (req, res, next) => {
  // const users = await db.users.find({token:token});
  

  res.json(db.users.filter((user) => user.email === req.user.email));
});

// http://localhost:5000/api/mypage
// recordRoutes.route("/api/mypage").get(function (req, res) {
//   // console.log('req.cookies.x_auth:',req.cookies);
//   // const users = await db.users.find({token:token});

// });

module.exports = recordRoutes;
