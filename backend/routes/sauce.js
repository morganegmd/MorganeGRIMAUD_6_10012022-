const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const stuffCtrl = require("../controllers/sauce");

router.get("/:id", auth, stuffCtrl.getOneSauce);
router.get("/", auth, stuffCtrl.getAllSauces);
router.post("/", auth, multer, stuffCtrl.createSauce);
router.put("/:id", auth, multer, stuffCtrl.updateSauce);
router.delete("/:id", auth, stuffCtrl.deleteSauce);
router.post("/:id/like", auth, stuffCtrl.sauceLikes);

module.exports = router;
