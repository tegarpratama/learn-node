const bcrypt = require('bcryptjs');
const validator = require('validator');

const User = require('../models/user');

module.exports = {
  createUser: async function({ userInput }, req) {
    const errors = [];

    if (!validator.isEmail(userInput.email)
    ){
      errors.push({ message: 'E-mail is invalid' });
    } 

    if (
      validator.isEmpty(userInput.password) || 
      !validator.isLength(userInput.password, { min: 5 })) {
        errors.push({ message: 'Password to short!' });
    }

    if (existingUser) {
      const error = new Error('User exists already!');
      throw error;
    }

    if (errors.length > 0) {
      const error = new Error('Invalid input!');
      throw error;
    }
    
    const existingUser = await User.findOne({ email: userInput.email });
    if (existingUser) {
      const error = new Error('User exists already!');
      throw error;
    }
    const hashedPw = await bcrypt.hash(userInput.password, 12);
    const user = new User({
      email: userInput.email,
      name: userInput.name,
      password: hashedPw
    });
    const createdUser = await user.save();
    return { ...createdUser._doc, _id: createdUser._id.toString() };
  }
};
