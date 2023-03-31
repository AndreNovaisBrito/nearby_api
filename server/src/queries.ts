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

const createPlace = (request: Request, response: Response):void => {
  const place = request.body[0]
  

  pool.query('INSERT INTO places (en, pt, fr, es) VALUES ($1, $2, $3, $4) RETURNING *', [place.en, place.pt, place.fr, place.es], (error: Error, results: any) => {
    if (error) {
      throw error
    }
    response.status(201).send(results.rows[0])
  })
}

const deletePlace = (request: Request, response: Response) => {
  const id = parseInt(request.params.id)
  pool.query('DELETE FROM places WHERE id = $1', [id], (error: Error, results: any):void => {
    if (error) {
      throw error
    }
    response.status(200).send({ id : id })
  })
}

const updateEnglishPlace = (request: Request, response: Response):void => {
  const id = parseInt(request.params.id)
  const title = request.body[0].update

  pool.query(
    'UPDATE places SET en = $1 WHERE id = $2',
    [title, id],
    (error: Error, results: any) => {
      if (error) {
        throw error
      }
      response.status(200).send(results.rows[0])
    }
  )
}

const updatePortuguesePlace = (request: Request, response: Response):void => {
  const id = parseInt(request.params.id)
  const title = request.body[0].update

  pool.query(
    'UPDATE places SET pt = $1 WHERE id = $2',
    [title, id],
    (error: Error, results: any) => {
      if (error) {
        throw error
      }
      response.status(200).send(results.rows[0])
    }
  )
}

const updateFrenchPlace = (request: Request, response: Response):void => {
  const id = parseInt(request.params.id)
  const title = request.body[0].update

  pool.query(
    'UPDATE places SET fr = $1 WHERE id = $2',
    [title, id],
    (error: Error, results: any) => {
      if (error) {
        throw error
      }
      response.status(200).send(results.rows[0])
    }
  )
}

const updateSpanishPlace = (request: Request, response: Response):void => {
  const id = parseInt(request.params.id)
  const title = request.body[0].update

  pool.query(
    'UPDATE places SET es = $1 WHERE id = $2',
    [title, id],
    (error: Error, results: any) => {
      if (error) {
        throw error
      }
      response.status(200).send(results.rows[0])
    }
  )
}

export default module.exports = {
  getPlaces,
  getPlacesById,
  createPlace,
  deletePlace,
  updateEnglishPlace,
  updatePortuguesePlace,
  updateFrenchPlace,
  updateSpanishPlace,
};