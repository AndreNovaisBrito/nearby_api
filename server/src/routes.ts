import { Router, Request, Response } from "express";
import { multerConfig } from './config/multer'
const multer = require("multer");

const routes = Router();

routes.get("/", (request: Request, response: Response) => {
    return response.json({message: 'Hello router'})
});

routes.post('/upload', multer(multerConfig).single('file'), (request: Request, response: Response) => {
    console.log(request.file)
    // const { filename, mimetype, size } = request.file;
    // const filepath = request.file!.path;

    return response.json({message: 'Image Uploaded'});
});
export default routes;
