//Importation
const mongoose = require("mongoose");

//Création du schéma

const thingSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  userId: { type: String, required: true },
  price: { type: Number, required: true },
  // sans le true, l'article ne sera pas sauvegardé, Pas besoin de mettre un champ pour l'Id puisqu'il est automatiquement généré par Mongoose ;
});

//Exportation du model
module.exports = mongoose.model("Thing", thingSchema);
