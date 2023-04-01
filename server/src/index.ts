import express, { Router, Request, Response } from "express";
import db from "./queries";
import multer from 'multer'
import { multerConfig } from "./config/multer";

const port = 5000;
const app = express();

app.use(express.json());

// ========================Title Routes=========================================

app.get("/places", db.getPlaces);
app.get("/places/:id", db.getPlacesById);
app.post("/places", db.createPlace);
app.delete("/places/:id", db.deletePlace);
app.put("/places/:id/:language", db.updatePlace);

//=========================Image Routes=========================================

app.post("/upload/:placeId", multer(multerConfig).single("file"), db.createImage);
app.get("/upload/:placeId", db.getImageFromPlaceId);
app.get("/upload/:placeId/resized", db.getResizedImageFromPlaceId);

app.delete("/upload/:placeId", db.deleteImageFromPlaceId);
app.put("/upload/:placeId", multer(multerConfig).single("file"), db.updateImageFromPlaceId);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
