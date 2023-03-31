import express, { Request, Response } from "express";

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

export default module.exports = {
  getPlaces,
  getPlacesById,
  createPlace,
  deletePlace,
  updatePlace,
};
