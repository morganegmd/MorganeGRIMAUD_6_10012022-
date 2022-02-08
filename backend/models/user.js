const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

//Aide à gérer les erreurs lors de l'utilisation d'un Email
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
