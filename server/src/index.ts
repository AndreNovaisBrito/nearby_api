import express, { Router, Request, Response } from "express";
import db from "./queries";
const port = 5000;
import multer from 'multer'
import { multerConfig } from "./config/multer";
const app = express();

app.use(express.json());

//Routes


//=========================Image Routes=========================================
app.post("/upload/:placeId", multer(multerConfig).single("file"), db.createImage);
app.get("/upload/:placeId", db.getImageFromPlaceId);
app.delete("/upload/:placeId", db.deleteImageFromPlaceId);
app.put("/upload/:placeId", multer(multerConfig).single("file"), db.updateImageFromPlaceId);




// ========================Title Routes=========================================

app.get("/places", db.getPlaces);
app.get("/places/:id", db.getPlacesById);
app.post("/places", db.createPlace);
app.delete("/places/:id", db.deletePlace);
app.put("/places/:id/:language", db.updatePlace);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
