const mongoose = require('mongoose');


const atlasConnectionUrl = 'mongodb+srv://geny:crxAL5X6GhfPGAg5@cluster0.mt4iklv.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(atlasConnectionUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true, 
    unique: true,  
  },
  password: String,
});


const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;

