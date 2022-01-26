const express = require("express");

const router = express.Router();

router.get((req, res, next) => {
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

router.post("/", (req, res, next) => {
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

router.put("/:id", (req, res, next) => {
  Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Objet modifié !" }))
    .catch((error) => res.status(400).json({ error }));
});

router.delete("/api/stuff/:id", (req, res, next) => {
  Thing.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Objet supprimé !" }))
    .catch((error) => res.status(400).json({ error }));
});
/*Récupération d'un Thing spécifique*/
router.get("/:id", (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    .then((thing) => res.status(200).json(thing))
    .catch((error) => res.status(404).json({ error }));
});

/*Récupération dynamique de la liste Things*/
router.get("/", (req, res, next) => {
  //"..." = l'extension de l'url
  Thing.find()
    .then((things) => res.status(200).json(things))
    .catch((error) => res.status(400).json({ error }));
});

module.exports = router;
