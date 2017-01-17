// Initialize the database
var Datastore = require('nedb');
db = new Datastore({ filename: 'db/trivia.db', autoload: true });

// Adds a person
exports.addData = function(da, preg, r1, r2, r3, r4, v1, v2, v3, v4) {

  // Create the person object
  var pr = {
    "da": da,
    "preg": preg,
    "r1": r1,
    "r2": r2,
    "r3": r3,
    "r4": r4,
    "v1": v1,
    "v2": v2,
    "v3": v3,
    "v4": v4,
  };

  // Save the person to the database
  db.insert(pr, function(err, newDoc) {
    // Do nothing
  });
};

// Returns all persons
exports.getData = function(fnc) {

  // Get all persons from the database
  db.find({}, function(err, docs) {

    // Execute the parameter function
    fnc(docs);
  });
};

// Deletes a person
exports.deleteData = function(id) {

  db.remove({ _id: id }, {}, function(err, numRemoved) {
    // Do nothing
  });
};
