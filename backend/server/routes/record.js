const express = require("express");
const bcrypt = require('bcrypt');

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

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


module.exports = recordRoutes;
