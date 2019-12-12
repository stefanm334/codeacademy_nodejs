import queries from "./queries.mjs";
import expressValidator from "express-validator";
import PreferedArtist from "../models/PreferedArtist.mjs";
import jwtDecode from "jwt-decode";
import connectionSequelize from "../database/sequelize-database.mjs";

var getAllArtists = async (req, res, next) => {
  try {
    var result = await queries.getAllArtistsQuery();
    res.send(result);
  } catch (error) {
    res.send(error);
  }
};

var getSpecificArtist = async (req, res, next) => {
  try {
    var result = await queries.getSpecificArtistQuery(req.params.id);
    if (result.length < 1) {
      var error = new Error("Artist doesnt exist");
      error.status = 404;
      next(error);
    } else {
      res.send(result);
    }
  } catch (error) {
    res.send(error);
  }
};

var createArtist = async (req, res, next) => {
  var errors = expressValidator.validationResult(req);
  if (errors.errors.length > 0) {
    res.send(errors);
  } else {
    try {
      const artist = req.body;
      await queries.createArtistQuery(artist);
      res.status(201).send("Artist has been created!");
    } catch (error) {
      res.send(error.message);
    }
  }
};

var deleteArtist = async (req, res, next) => {
  try {
    await queries.deleteArtistsQuery(req.params.id);
    res.send(`Artist with id ${req.params.id} has been deleted`);
  } catch (error) {
    res.send(error);
  }
};
var updateArtist = async (req, res) => {
  const artist = req.body;
  const artistId = req.params.id;

  var errors = expressValidator.validationResult(req);
  if (errors.errors.length > 0) {
    res.send(errors);
  } else {
    try {
      const user = await queries.updateArtistQuery(artistId, artist);
      res.status(201).send(`Artist with id ${req.params.id} has been updated`);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
};

var likeArtist = async (req, res, next) => {
  var artistId = req.params.id;

  try {
    var result = await queries.getSpecificArtistQuery(artistId);
    if (result.length < 1) {
      var error = new Error("Artist doesnt exist");
      error.status = 404;
      next(error);
    }
  } catch (error) {
    res.send(error);
  }

  if (req.headers.authorization === undefined) {
    var error = new Error("You have to be authorized to like Artist");
    error.status = 401;
    next(error);
  } else {
    var header = req.headers.authorization.split(" ");
    var token = header[1];
    var decodedToken = jwtDecode(token);

    try {
      var checkIfArtistIsAlreadyLiked = await PreferedArtist.findAll({
        where: {
          UserId: decodedToken.dbUser.Id,
          ArtistId: artistId
        }
      });
    } catch (error) {
      res.send(error);
    }

    if (checkIfArtistIsAlreadyLiked.length > 0) {
      var error = new Error("Artist alredy liked by this user");
      error.status = 400;
      next(error);
    } else {
      try {
        await PreferedArtist.create({
          UserId: decodedToken.dbUser.Id,
          ArtistId: artistId
        });
        res
          .status(201)
          .json(
            `Successfully liked artist with ArtistId ${artistId} by User${decodedToken.dbUser.Id}`
          );
      } catch (error) {
        res.send(error.message);
      }
    }
  }
};

export {
  getAllArtists,
  getSpecificArtist,
  createArtist,
  deleteArtist,
  updateArtist,
  likeArtist
};
