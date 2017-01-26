// get path location PC

var path = location.pathname.substring(0,location.pathname.lastIndexOf('/')+1);
path = path.substring(1); // on PC
path = path.substring(0,path.lastIndexOf('/'));
path = path.substring(0,path.lastIndexOf('/'));
path = path.substring(0,path.lastIndexOf('/'));
path = path.substring(0,path.lastIndexOf('/')+1);
// console.log( path );
// Initialize the database
var Datastore = require('nedb');
db = new Datastore({ filename: path+'db/trivia.db', autoload: true });

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

// Edit data
exports.editData = function(datos, preg, r1, r2, r3, r4, v1, v2, v3, v4) {
// if(preg !== '')console.log(id, preg, r1, r2, r3, r4, v1, v2, v3, v4);
  var pr = {};
  if(preg !== '')pr.preg = preg; 
  else pr.preg = datos.preg; 

  if(r1 !== '')pr.r1 = r1; 
  else pr.r1 = datos.r1;
  if(r2 !== '')pr.r2 = r2; 
  else pr.r2 = datos.r2;
  if(r3 !== '')pr.r3 = r3;
  else pr.r3 = datos.r3; 
  if(r4 !== '')pr.r4 = r4; 
  else pr.r4 = datos.r4;
  if(v1 !== '')pr.v1 = v1; 
  else pr.v1 = datos.v1;
  if(v1 !== '')pr.v2 = v2;
  else pr.v2 = datos.v2; 
  if(v3 !== '')pr.v3 = v3;
  else pr.v3 = datos.v3;
  if(v4 !== '')pr.v4 = v4;
  else pr.v4 = datos.v4;  

  db.update({ _id: datos._id }, pr, function(err, numRemoved) {
    // Do nothing
  });
};