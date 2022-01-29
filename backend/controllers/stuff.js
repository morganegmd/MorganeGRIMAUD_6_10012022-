const Thing = require("../models/thing");
const multer = require("multer");
const User = require("../models/user");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "--" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.includes("jpeg") ||
    file.mimetype.includes("png") ||
    file.mimetype.includes("jpg")
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const updateAnUserImage = async (req, res) => {
  const id = req.params._id;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const path = req.file.path.replace(/\\/g, "/");

  await User.findByIdAndUpdate(
    id,
    (req.body = { ProfilePicture: "http://localhost:5000/" + path }),
    { new: true }
  );
  res.json(updateAnUser);
};

let upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = multer("ProfilePicture", upload);
