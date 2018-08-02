const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 

const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const userSchema = new Schema({ 
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true}
});


userSchema.pre('save', function(next) {
  console.log('In mongoose pre - this: ',this)
  bcrypt.hash(this.password, SALT_WORK_FACTOR, (err, hash) => {
    if(hash) {
      this.password = hash;
      return next();
    }  
    return next(new Error(err));
  });

});

module.exports = mongoose.model('users', userSchema); 