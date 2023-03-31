import express, { Request, Response } from "express";
import bodyParser from "body-parser";
const morgan = require("morgan");
const multer = require('multer');
import db from './queries'
const port = 5000;

import path from "path"; 





// Create multer object
const imageUpload = multer({
    dest: 'images',
});


const app = express();
app.use(morgan("dev"));

app.use(bodyParser.json());
app.use(express.json());

// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//   })
// );

//Routes

// Image Upload Routes
// app.post('/image', imageUpload.single('image'), (req: RequestWithFile, res) => { 
//     // console.log(req.file);
//     res.json('/image api'); 
// });


// Image Get Routes
app.get("/image/:filename", (req, res) => {
  res.json("/image/:filename api");
});

// Title Routes

app.get('/places', db.getPlaces)
app.get('/places/:id', db.getPlacesById)
app.post('/places', db.createPlace)
app.delete('/places/:id', db.deletePlace)
app.put('/places/:id/en', db.updateEnglishPlace)
app.put('/places/:id/pt', db.updatePortuguesePlace)
app.put('/places/:id/fr', db.updateFrenchPlace)
app.put('/places/:id/es', db.updateSpanishPlace)







app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
