import express, { Router, Request, Response } from "express";
const morgan = require("morgan");
import db from "./queries";
const port = 5000;
const multer = require("multer");
import { multerConfig } from "./config/multer";
const app = express();

app.use(morgan("dev"));
app.use(express.json());

//Routes
//=========================Image Routes=========================================
app.post("/upload/:placeId", multer(multerConfig).single("file"), db.createImage);
app.get("/upload/:placeId", db.getImageFromPlaceId);


// ========================Title Routes=========================================

app.get("/places", db.getPlaces);
app.get("/places/:id", db.getPlacesById);
app.post("/places", db.createPlace);
app.delete("/places/:id", db.deletePlace);
app.put("/places/:id/:language", db.updatePlace);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
