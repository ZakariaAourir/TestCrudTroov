const mongoose = require("mongoose");

const ManageSchema = mongoose.Schema({
  name: {
    type: String
  },
  description: {
    type: String
  }
});

const Manage = (module.exports = mongoose.model("Manage", ManageSchema));
// add an object
module.exports.addObject = function(object, callback) {
  Manage.create(object, callback);
};
// get objects
module.exports.getObjects = function(callback, limit) {
  Manage.find(callback).limit(limit);
};
// edit object
module.exports.updateObj = function(query, update, options, callback) {
  Manage.findOneAndUpdate(query, update, options, callback);
};
// get object by id

module.exports.getObjectsById = function(id, callback) {
  Manage.findById(id, callback);
};
// remove object

module.exports.removeObject = function(query, callback) {
  Manage.remove(query, callback);
};
