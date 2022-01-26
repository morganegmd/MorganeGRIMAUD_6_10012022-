const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Thing = require("./models/thing");

mongoose
  .connect(
    `mongodb+srv://morganegmd33:Momochani33@cluster0.i7rhn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use(express.json());
//Pour gérer la requête POST venant de l'application front-end, on a besoin d'en extraire le corps JSON.

app.get((req, res, next) => {
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

app.post("/api/stuff", (req, res, next) => {
  delete req.body._id;
  //on retire le champs, car l'id renvoyé par mangoose sera mauvais
  const thing = new Thing({
    ...req.body,
    //raccourci title: req.body.title
  });
  thing
    .save() //enregistre l'objet dans la base
    .then(() => res.status(201).json({ message: "Objet enregistré !" }))
    // réponse sinon la requête va s'expirer
    .catch((error) => res.status(400).json({ error }));
  // error => error : error
});
//On envoie une réponse, car sinon ça ne va pas marcher

app.put("/api/stuff/:id", (req, res, next) => {
  Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Objet modifié !" }))
    .catch((error) => res.status(400).json({ error }));
});

app.delete("/api/stuff/:id", (req, res, next) => {
  Thing.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Objet supprimé !" }))
    .catch((error) => res.status(400).json({ error }));
});
/*Récupération d'un Thing spécifique*/
app.get("/api/stuff/:id", (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    .then((thing) => res.status(200).json(thing))
    .catch((error) => res.status(404).json({ error }));
});

/*Récupération dynamique de la liste Things*/
app.get("/api/stuff", (req, res, next) => {
  //"..." = l'extension de l'url
  Thing.find()
    .then((things) => res.status(200).json(things))
    .catch((error) => res.status(400).json({ error }));
});

module.exports = app;
