const UserModel = require('../database/models/user.model');
const validateEmail = require('../middlewares/validate-email');
const email = process.argv[2];

const password = 'password';
const firstName = 'test';
const lastName = 'user';

if (!email) {
  throw new Error('Email is required!');
}

const emailValidated = validateEmail(email);

if (emailValidated) {
  throw new Error(validateEmail);
}

const addUser = async () => {
  if (await UserModel.findOne({ where: { email } })) {
    throw new Error('Email is exists!');
  }

  try {
    return await UserModel.create({ password, firstName, lastName, email });
  } catch (e) {
    throw new Error(e);
  }
};

addUser()
  .then((userModel) => {
    console.log(userModel);
    process.exit(0);
  })
  .catch((error) => {
    console.log(error);
    process.exit(2);
  });
