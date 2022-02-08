const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cryptojs = require("crypto-js");
require("dotenv").config();

exports.signup = (req, res, next) => {
  const hashedEmail = cryptojs
    .HmacSHA512(req.body.email, process.env.SECRET_CRYPTOJS_TOKEN)
    .toString(cryptojs.enc.Base64);
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: hashedEmail,
        password: hash,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({ error });
    });
};

exports.login = (req, res, next) => {
  const hashedEmail = cryptojs
    .HmacSHA512(req.body.email, process.env.SECRET_CRYPTOJS_TOKEN)
    .toString(cryptojs.enc.Base64);
  User.findOne({ email: hashedEmail })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            userId: user._id,
<<<<<<< HEAD
            token: jwt.sign({ userId: user._id }, process.env.SECRET_TOKEN, {
=======
            token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
>>>>>>> 642f23bd16daa34fa6333fdf9bd60e2f301d37a0
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
