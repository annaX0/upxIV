const express = require("express");
const {
  newOng,
  getOngs,
  getHome,
  getLogin,
  newAnimal,
  getAnimais,
  editAnimal,
  deleteAnimal,
} = require("../controller/newOng");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const register = express.Router();
const home = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "public");
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    const uniqueFilename =
      req.body.nome + file.fieldname + "_" + Date.now() + fileExt;
    cb(null, uniqueFilename);
  },
});

const upload = multer({
  storage: storage,
});

register.post("/registerong", upload.single("img"), (req, res) => {
  newOng(req, res);
});

register.use("/public", express.static(path.join(__dirname, "public")));

register.get("/getOngs/:idong", getOngs, (req, res) => {
  getOngs(req, res);
});

register.get("/", getHome);
register.post("/login", getLogin);

register.post(
  "/newAnimal/:idong",
  upload.single("img"),
  newAnimal,
  (res, req) => {
    newAnimal(req, res);
  }
);

register.put("/editAnimal/:id", editAnimal);
register.delete("/deleteAnimal/:id", deleteAnimal);

register.get("/getAnimals/:idong", getAnimais, (req, res) => {
  getAnimais(req, res);
});
module.exports = register;
