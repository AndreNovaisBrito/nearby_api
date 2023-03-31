import express, { Request, Response } from "express";
import { multerConfig } from "./config/multer";
const path = require("path");

const Pool = require("pg").Pool;
require("dotenv").config();

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
});

const getPlaces = (request: Request, response: Response): void => {
  pool.query(
    "SELECT * FROM places ORDER BY id ASC",
    (error: Error, results: any) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const getPlacesById = (request: Request, response: Response): void => {
  const id = parseInt(request.params.id);

  pool.query(
    "SELECT * FROM places WHERE id = $1",
    [id],
    (error: Error, results: any) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows[0]);
    }
  );
};

const createPlace = (request: Request, response: Response): void => {
  const place = request.body[0];

  pool.query(
    "INSERT INTO places (en, pt, fr, es) VALUES ($1, $2, $3, $4) RETURNING *",
    [place.en, place.pt, place.fr, place.es],
    (error: Error, results: any) => {
      if (error) {
        throw error;
      }
      response.status(201).send(results.rows[0]);
    }
  );
};

const deletePlace = (request: Request, response: Response) => {
  const id = parseInt(request.params.id);
  pool.query(
    "DELETE FROM places WHERE id = $1",
    [id],
    (error: Error, results: any): void => {
      if (error) {
        throw error;
      }
      response.status(200).send({ id: id });
    }
  );
};

const updatePlace = (request: Request, response: Response): void => {
  const id = parseInt(request.params.id);
  const title = request.body[0].update;
  const language = request.params.language;
  console.log(language);
  switch (language) {
    case "en":
      pool.query(
        "UPDATE places SET en = $1 WHERE id = $2",
        [title, id],
        (error: Error, results: any) => {
          if (error) {
            throw error;
          }
          response.status(200).send({ language: language, updated_to: title });
        }
      );
      break;

    case "pt":
      pool.query(
        "UPDATE places SET pt = $1 WHERE id = $2",
        [title, id],
        (error: Error, results: any) => {
          if (error) {
            throw error;
          }
          response.status(200).send({ language: language, updated_to: title });
        }
      );
      break;

    case "fr":
      pool.query(
        "UPDATE places SET fr = $1 WHERE id = $2",
        [title, id],
        (error: Error, results: any) => {
          if (error) {
            throw error;
          }
          response.status(200).send({ language: language, updated_to: title });
        }
      );
      break;

    case "es":
      pool.query(
        "UPDATE places SET es = $1 WHERE id = $2",
        [title, id],
        (error: Error, results: any) => {
          if (error) {
            throw error;
          }
          response.status(200).send({ language: language, updated_to: title });
        }
      );
      break;
    default:
      response.send({ error: "Not a valid Language" });
  }
};

const createImage = (request: Request, response: Response): void => {
  console.log(request.file);
  const filename = request.file!.filename;
  const filepath = request.file!.path;
  const mimetype = request.file!.mimetype;
  const size = request.file!.size;
  const placeId = parseInt(request.params.placeId);

  console.log(filename, filepath, mimetype, size, placeId);

  // Check if a row with the given place_id already exists
  pool.query(
    "SELECT id FROM image_files WHERE place_id = $1",
    [placeId],
    (error: Error, results: any) => {
      if (error) {
        throw error;
      }

      // If a row with the given place_id already exists, return an error
      if (results.rows.length > 0) {
        response.status(400).send({
          error: "An image for this place already exists",
        });
      } else {
        // Otherwise, insert the new row into the image_files table
        pool.query(
          "INSERT INTO image_files (filename, filepath, mimetype, size, place_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
          [filename, filepath, mimetype, size, placeId],
          (error: Error, results: any) => {
            if (error) {
              throw error;
            }
            response.status(201).send(results.rows[0]);
          }
        );
      }
    }
  );
};

const getImageFromPlaceId = (request: Request, response: Response): void => {
  const placeId = parseInt(request.params.placeId);
  pool.query(
    "SELECT * FROM image_files WHERE place_id = $1",
    [placeId],
    (error: Error, results: any) => {
      if (error) {
        throw error;
      }
      const image = results.rows[0];

      if (image) {
        return response.type(image.mimetype).sendFile(image.filepath);
      }
      return response.json({error: "Image does not exist"});
    }
  );
};

export default module.exports = {
  getPlaces,
  getPlacesById,
  createPlace,
  deletePlace,
  updatePlace,
  createImage,
  getImageFromPlaceId,
};
