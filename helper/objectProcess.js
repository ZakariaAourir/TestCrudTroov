const Manage = require("../models/manage");

exports.getHomepage = (req, res, next) => {
  res.render("homepage");
};
// add and object
exports.addObj = (req, res, next) => {
  req.checkBody("name", "name is required").notEmpty();
  req.checkBody("description", "description is required").notEmpty();

  let errors = req.validationErrors();

  if (errors) {
    res.render("homepage", {
      errors: errors
    });
  } else {
    let Object = {};
    Object.name = req.body.name;
    Object.description = req.body.description;
    Manage.addObject(Object, (err, obj) => {
      if (err) {
        res.send(err);
      }
      req.flash("success", "Object added");
      res.redirect("/homepage");
    });
  }
};
// get object
exports.getObj = (req, res, next) => {
  Manage.getObjects((err, objects) => {
    if (err) {
      console.log(err);
    } else {
      console.log(objects);
      res.render("homepage", {
        objects: objects
      });
    }
  });
};
// get object by id
exports.getEdit = (req, res, next) => {
  Manage.getObjectsById(req.params.id, (err, object) => {
    if (err) {
      console.log(err);
    } else {
      res.render("edit_obj", {
        object: object
      });
    }
  });
};
// edit object

exports.editObj = (req, res, next) => {
  req.checkBody("name", "Name is required").notEmpty();
  req.checkBody("description", "Description is required").notEmpty();
  const errors = req.validationErrors();
  if (errors) {
    res.render("edit_obj", {
      errors: errors
    });
  } else {
    const query = { _id: req.params.id };
    const update = {
      name: req.body.name,
      description: req.body.description
    };
    Manage.updateObj(query, update, {}, (err, object) => {
      if (err) {
        res.send(err);
      }
      req.flash("success", "Object updated");
      res.redirect("/homepage");
    });
  }
};

// delete object
exports.deleteObj = (req, res, next) => {
  const query = { _id: req.params.id };
  Manage.removeObject(query, (err, object) => {
    console.log("error in delete", err);
    if (err) {
      res.send(err);
    }
    res.status(200).send({});
  });
};
