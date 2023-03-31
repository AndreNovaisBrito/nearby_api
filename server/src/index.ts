import express, { Router, Request, Response } from "express";
const morgan = require("morgan");
import db from "./queries";
const port = 5000;
// import routes from "./routes";
const multer = require("multer");
const routes = Router();

import { multerConfig } from './config/multer'



// // Create multer object
// const imageUpload = multer({
//   dest: "images",
// });

// Set middlewares
const app = express();
app.use(morgan("dev"));
app.use(routes);
// app.use(bodyParser.json());
app.use(express.json());

//Routes
//=========================Image Routes=========================================
routes.post('/upload/:placeId', multer(multerConfig).single('file'), db.createImage);


// ========================Title Routes=========================================

app.get("/places", db.getPlaces);
app.get("/places/:id", db.getPlacesById);
app.post("/places", db.createPlace);
app.delete("/places/:id", db.deletePlace);
app.put("/places/:id/:language", db.updatePlace);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
