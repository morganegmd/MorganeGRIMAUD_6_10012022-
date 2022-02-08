const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
<<<<<<< HEAD
require("dotenv").config();
const stuffRoutes = require("./routes/sauce");
=======

const sauceRoutes = require("./routes/sauce");
>>>>>>> 642f23bd16daa34fa6333fdf9bd60e2f301d37a0
const userRoutes = require("./routes/user");

/*Connexion à Mongoose*/
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PW}@cluster0.i7rhn.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

//App express
const app = express();

//Extraire le corps JSON afin de gérer la requête POST (frontend)
app.use(express.json());

/*Correction erreurs CORS*/
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
/*d'accéder à notre API depuis n'importe quelle origine ( '*' ) ;
d'ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.) ;
d'envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.).*/

app.use("/images", express.static(path.join(__dirname, "images")));
<<<<<<< HEAD
app.use("/api/sauces", sauceRoutes);
=======
app.use("/api/sauce", sauceRoutes);
>>>>>>> 642f23bd16daa34fa6333fdf9bd60e2f301d37a0
app.use("/api/auth", userRoutes);

module.exports = app;
