const UserModel = require('../database/models/user.model');

UserModel.findAll().then((collection) => {
  console.log(collection.map((model) => model.email));
  process.exit(0);
});
