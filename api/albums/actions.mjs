import queries from "./queries.mjs";
import artistQueries from "../artists/queries.mjs";
import expressValidator from "express-validator";
import jwtDecode from "jwt-decode";
import connectionSequelize from "../database/sequelize-database.mjs";
import likedAlbum from "../models/LikedAlbum.mjs";

var getAllAlbumsForAllArtists = async (req, res, next) => {
  try {
    var result = await queries.getAllAlbumsQuery();
    res.send(result);
  } catch (error) {
    res.send(error);
  }
};

var getAllAlbumsForSpecificArtist = async (req, res, next) => {
  var artistId = parseInt(req.params.id);
  try {
    var result = await queries.getAllAlbumsForSpecificArtistQuery(artistId);
    if (result.length < 1) {
      var error = new Error("No albums for this artist");
      error.status = 404;
      next(error);
    } else {
      res.send(result);
    }
  } catch (error) {
    res.send(error);
  }
};

var getSpecificAlbum = async (req, res, next) => {
  var albumId = req.params.albumid;
  var artistId = req.params.id;

  try {
    var result = await queries.getSpecificAlbumQuery(albumId, artistId);
    if (result.length < 1) {
      var error = new Error("Album doesnt exist");
      error.status = 404;
      next(error);
    } else {
      res.send(result);
    }
  } catch (error) {
    res.send(error);
  }
};

var createAlbum = async (req, res, next) => {
  var errors = expressValidator.validationResult(req);
  if (errors.errors.length > 0) {
    res.send(errors);
  } else {
    try {
      const album = req.body;
      const artistId = req.params.id;
      await queries.createAlbumQuery(album, artistId);
      res.status(201).send("Album has been created!");
    } catch (error) {
      res.send(error.message);
    }
  }
};

var deleteAlbum = async (req, res, next) => {
  var albumId = req.params.albumid;
  var artistId = req.params.id;
  var album = await queries.getSpecificAlbumQuery(albumId, artistId);

  try {
    await queries.deleteAlbumsQuery(album[0].Id);
    res.send(`Album with id ${album.Id} has been deleted`);
  } catch (error) {
    next(error);
  }
};
var updateAlbum = async (req, res) => {
  const changedAlbum = req.body;

  var albumId = req.params.albumid;
  var artistId = req.params.id;
  var album = await queries.getSpecificAlbumQuery(albumId, artistId);

  var errors = expressValidator.validationResult(req);
  if (errors.errors.length > 0) {
    res.send(errors);
  } else {
    try {
      var updatedUser = await queries.updateAlbumQuery(
        album[0].Id,
        changedAlbum
      );
      res.status(201).send(`Album with id ${req.params.id} has been updated`);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
};

var likeAlbum = async (req, res, next) => {
  var albumId = req.params.albumid;
  var artistId = req.params.id;

  try {
    var result = await artistQueries.getSpecificArtistQuery(artistId);
    if (result.length < 1) {
      var error = new Error("Artist parameter is not valid");
      error.status = 404;
      next(error);
    }
  } catch (error) {
    res.send(error);
  }

  try {
    var albumResult = await queries.getSpecificAlbumQuery(albumId, artistId);
    if (albumResult.length < 1) {
      var error = new Error("Album doesnt exist");
      error.status = 404;
      next(error);
    }
  } catch (error) {
    res.send(error);
  }

  var realAlbumId = albumResult[0].Id;

  if (req.headers.authorization === undefined) {
    var error = new Error("You have to be authorized to like Album");
    error.status = 401;
    next(error);
  } else {
    var header = req.headers.authorization.split(" ");
    var token = header[1];
    var decodedToken = jwtDecode(token);

    try {
      var checkIfAlbumIsAlreadyLiked = await likedAlbum.findAll({
        where: {
          UserId: decodedToken.dbUser.Id,
          AlbumId: realAlbumId
        }
      });
    } catch (error) {
      res.send(error);
    }

    if (checkIfAlbumIsAlreadyLiked.length > 0) {
      var error = new Error("Album alredy liked by this user");
      error.status = 400;
      next(error);
    } else {
      try {
        await likedAlbum.create({
          UserId: decodedToken.dbUser.Id,
          AlbumId: realAlbumId
        });
        res
          .status(201)
          .json(
            `Successfully liked album with AlbumId ${realAlbumId} by User${decodedToken.dbUser.Id}`
          );
      } catch (error) {
        res.send(error.message);
      }
    }
  }
};

export {
  getAllAlbumsForAllArtists,
  getAllAlbumsForSpecificArtist,
  getSpecificAlbum,
  createAlbum,
  deleteAlbum,
  updateAlbum,
  likeAlbum
};
