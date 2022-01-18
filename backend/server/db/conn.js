// const { MongoClient } = require("mongodb");


/* index.js */
var mongoose = require('mongoose');
const Db = process.env.ATLAS_URI;

mongoose.connect(Db);
var db = mongoose.connection;

// const User = mongoose.model("User", UserSchema);

// const client = new MongoClient(Db, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
 
// var _db;
 
module.exports = {
  connectToServer: function (callback) {
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function callback () {
      console.log("mongo db connection OK.");
      console.log(mongoose.model('User'));
    });
    // client.connect(function (err, db) {
    //   // Verify we got a good "db" object
    //   if (db)
    //   {
    //     _db = db.db("weekend_app");
    //     console.log("Successfully connected to MongoDB."); 
    //   }
    //   return callback(err);
    //      });
  },
 
  getDb: function () {
    return db;
  },
};