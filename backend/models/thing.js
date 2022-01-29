//Importation
const mongoose = require("mongoose");

//Création du schéma

const thingSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  ProfilePicture: { type: String, required: true },
  // sans le true, l'article ne sera pas sauvegardé, Pas besoin de mettre un champ pour l'Id puisqu'il est automatiquement généré par Mongoose ;
});

//Exportation du model
module.exports = mongoose.model("Thing", thingSchema);
