var models = require('../models');

exports.projectInfo = function(req, res) { 
  var projectID = req.params.id;

  // query for the specific project and
  // call the following callback
  models.Project
    .find({"_id": projectID})
    .exec(afterQuery);

  function afterQuery(err, projects) {
    if(err) console.log(err);
    // console.log('afterQuery')

    // .find returns an array of results, 
    // so just get the one and only value 
    // in the array
    res.json(projects[0]);
  }
}

exports.addProject = function(req, res) {

  // get the form_data as posted from the submit button
  var form_data = req.body;

  // scheme uses different naming for "title" and "date"
  // so need to massage form_data before feeding to db
  var post_data = {
    "title": form_data.project_title,
    "date": form_data.date,
    "summary": form_data.summary,
    "image": form_data.image_url
  }

  // create new post
  var newPost = new models.Project(post_data);
  console.log(form_data);
  console.log(newPost)

  // make a new Project and save it to the DB
  // YOU MUST send an OK response w/ res.send();
  newPost.save(afterSaving);

  function afterSaving(err) {
    if(err) {
      console.log(err); 
      res.send(500);
    } else {
      res.redirect('/');  // redirect to home
    }
  }

}

exports.deleteProject = function(req, res) {
  var projectID = req.params.id;

  // find the project and remove it
  // YOU MUST send an OK response w/ res.send();
  models.Project
    .find({"_id": projectID})
    .remove()
    .exec(afterRemoving); 

  // define callback function afterRemoving
  // will call this function after model finds project and removes it
  function afterRemoving(err) {
    if(err) {
      console.log(err); 
      res.send(500);
    } else {
      res.redirect('/');  // redirect to home
    }

  }


}