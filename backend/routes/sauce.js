const express = require("express");
const router = express.Router();
// on importe les controllers user
const sauceCtrl = require("../controllers/sauce");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
router.post("/", auth, multer, sauceCtrl.addSauce);
router.post("/:id/like", auth, sauceCtrl.likeDislikeSauce);
router.get("/", auth, sauceCtrl.getAllSauces);
router.get("/:id", auth, sauceCtrl.getOneSauce);
router.delete("/:id", auth, sauceCtrl.deleteOneSauce);
router.put("/:id", auth, multer, sauceCtrl.updateOneSauce);

module.exports = router;
