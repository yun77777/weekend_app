const express = require("express");
const bcrypt = require('bcrypt');

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");
const User = require("./user");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;



recordRoutes.route("/user/join/").post(function (req, response) {
  let db_connect = dbo.getDb();

  
  var password = req.body.password;
  const saltFactor = 10;


  bcrypt.genSalt(saltFactor, (err, salt) => {
    if (err) return next(err);
 
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) return next(err);
      password = hash;
      console.log('password:',password);
      let myobj = {
        email: req.body.email,
        name: req.body.name,
        password: password
      };
      console.log('myobj:',myobj);
      db_connect.collection("user").insertOne(myobj, function (err, res) {
        if (err) throw err;
        response.json(res);
      });
    });
  });

});





recordRoutes.post('/user/login', (req, res) => {
  console.log('req.body: ', req.body);

  User.findOne({ email: req.body.email }, (error, user) => {
    console.log('user: ', user);

    if (error) {
      return res.status(500).json({ error: "error" });
    }

    if (!user) {
      return res.status(403).json({
        loginSuccess: false,
        message: "check your account."
      });
    }

    if (user) {
      const checkPW = () => {
        bcrypt.compare(req.body.password, user.password, (error, isMatch) => {
          if (error) {
            return res.status(500).json({ error: "something went wrong" });
          }
          if (isMatch) {
            // this token stays for a week
            const token = jwt.sign({ userID: user.email }, SECRET_TOKEN, {expiresIn: 'a week'});

            // assign the token to the user and save it
            user.token = token;
            user.save((error, user) => {
              if (error) {
                return res.status(400).json({ error: "something went wrong" });
              }

              // after saving the token in DB, identify the user by saved token in cookie
              return res
                .cookie("x_auth", user.token, {
                  maxAge: 1000 * 60 * 60 * 24 * 7, // stay for a week
                  httpOnly: true,
                })
                .status(200)
                .json({ loginSuccess: true, userId: user.email });
            });
          } else {
            return res.status(403).json({
              loginSuccess: false,
              message: "enter correct password"
            });
          }
        });
      };
      checkPW();
    }
  });
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
