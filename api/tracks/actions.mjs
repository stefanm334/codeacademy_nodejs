import queries from "./queries.mjs";
import Track from "../models/Track.mjs";
import LikedTrack from "../models/LikedTrack.mjs";
import albumQueries from "../albums/queries.mjs";
import artistQueries from "../artists/queries.mjs";
import connectionSequelize from "../database/sequelize-database.mjs";
import expressValidator from "express-validator";
import jwtDecode from "jwt-decode"; 
import PlaylistTracks from "../models/PlaylistTracks.mjs"

var getAllTracks = async (req, res, next) => {
  try {
    var result = await queries.getAllTrackSequelize();
    res.send(result).status(200);
  } catch (error) {
    next(error);
  }
};

var getAllTracksForSpecifilUserAndAlbum = async (req, res, next) => {
  var artistId = req.params.id;
  var urlAlbumId = parseInt(req.params.albumid);
  var album = await albumQueries.getSpecificAlbumQuery(urlAlbumId, artistId);
  var realAlbumId = album[0].Id;

  try {
    var result = await Track.findAll({
      where: {
        AlbumId: realAlbumId,
        ArtistId: artistId
      }
    });
    res.send(result);
  } catch (error) {
    next(error);
  }
};

var getSpecificTrack = async (req, res, next) => {
  var artistId = req.params.id;
  var urlAlbumId = parseInt(req.params.albumid);
  var album = await albumQueries.getSpecificAlbumQuery(urlAlbumId, artistId);
  var realAlbumId = album[0].Id;
  var trackNumber = parseInt(req.params.trackid);

  try {
    var result = await Track.findAll({
      where: {
        AlbumId: realAlbumId,
        ArtistId: artistId
      },
      offset: trackNumber - 1,
      limit: 1
    });
    if (result.length < 1) {
      var error = new Error("Track not found");
      error.status = 404;
      next(error);
    } else {
      res.send(result);
    }
  } catch (error) {
    error.status = 404;
    next(error);
  }
};

var createTrack = async (req, res, next) => {
  var artistId = req.params.id;
  var urlAlbumId = parseInt(req.params.albumid);
  var album = await albumQueries.getSpecificAlbumQuery(urlAlbumId, artistId);
  var AlbumId = album[0].Id;

  var errors = expressValidator.validationResult(req);
  if (errors.errors.length > 0) {
    res.send(errors);
  } else {
    let { Title, Duration, Url, ArtistId } = req.body;
    try {
      await Track.create({
        Title,
        AlbumId,
        Duration,
        Url,
        ArtistId
      });
      res
        .status(201)
        .send(
          `Successfully created track with Tittle ${Title} , AlbumId ${AlbumId} , Duration ${Duration} , Url ${Url} , ArtistId ${ArtistId}`
        );
    } catch (error) {
      res.send(error.message);
    }
  }
};

var deleteTrack = async (req, res, next) => {
  var artistId = req.params.id;
  var urlAlbumId = parseInt(req.params.albumid);
  var album = await albumQueries.getSpecificAlbumQuery(urlAlbumId, artistId);
  var realAlbumId = album[0].Id;

  var track = await queries.findRealTrackId(realAlbumId, artistId, trackNumber);
  var realTrackId = track[0].dataValues.id;

  try {
    var result = await Track.destroy({
      where: {
        id: realTrackId
      }
    });
    res
      .status(200)
      .send(
        `Delete track with databaseID ${realTrackId} by AristId ${track[0].dataValues.ArtistId} and AlbumId ${track[0].dataValues.AlbumId}`
      );
  } catch (error) {
    next(error);
  }
};

var updateTrack = async (req, res) => {
  var artistId = req.params.id;
  var urlAlbumId = parseInt(req.params.albumid);
  var trackNumber = parseInt(req.params.trackid);

  var album = await albumQueries.getSpecificAlbumQuery(urlAlbumId, artistId);
  var albumId = album[0].Id;

  var track = await queries.findRealTrackId(albumId, artistId, trackNumber);
  var realTrackId = track[0].dataValues.id;

  var errors = expressValidator.validationResult(req);
  if (errors.errors.length > 0) {
    res.send(errors);
  } else {
    try {
      Track.update(req.body, {
        where: {
          id: realTrackId
        }
      });
      res.send(`Succesfull update on track with id ${realTrackId}`);
    } catch (error) {
      next(error);
    }
  }
};

var likeTrack = async (req, res, next) => {
  var artistId = req.params.id;
  var urlAlbumId = parseInt(req.params.albumid);
  var trackNumber = parseInt(req.params.trackid);

  try {
    var result = await artistQueries.getSpecificArtistQuery(artistId);
    if (result.length < 1) {
      var error = new Error("Artist doesnt exist");
      error.status = 404;
      next(error);
    }
  } catch (error) {
    res.send(error);
  }

  try {
    var albumResult = await albumQueries.getSpecificAlbumQuery(
      urlAlbumId,
      artistId
    );
  } catch (error) {
    res.send(error);
  }

  if (!albumResult[0]) {
    var error = new Error("Invalid album parameters/ album doesnt exist");
    error.status = 404;
    next(error);
  }
  var albumId = albumResult[0].Id;

  try {
    var track = await queries.findRealTrackId(albumId, artistId, trackNumber);
    var realTrackId = track[0].dataValues.id;
  } catch (error) {
    res.status(404).json("Cannot like track that doesnt exist");
  }

  if (req.headers.authorization === undefined) {
    var error = new Error("You have to be authorized to like Track");
    error.status = 401;
    next(error);
  } else {
    var header = req.headers.authorization.split(" ");
    var token = header[1];
    var decodedToken = jwtDecode(token);

    try {
      var checkIfTrackIsAlreadyLiked = await LikedTrack.findAll({
        where: {
          UserId: decodedToken.dbUser.Id,
          TrackId: realTrackId
        }
      });
    } catch (error) {
      res.send(error);
    }

    if (checkIfTrackIsAlreadyLiked.length > 0) {
      var error = new Error("Track alredy liked by this user");
      error.status = 400;
      next(error);
    } else {
      try {
        await LikedTrack.create({
          UserId: decodedToken.dbUser.Id,
          TrackId: realTrackId
        });
        res
          .status(201)
          .json(
            `Successfully like track with TrackId ${realTrackId} by User${decodedToken.dbUser.Id}`
          );
      } catch (error) {
        res.send(error.message);
      }
    }
  }
};

var addTrackToPlaylist = async (req, res, next) => {
  var artistId = req.params.id;
  var urlAlbumId = parseInt(req.params.albumid);
  var trackNumber = parseInt(req.params.trackid);

  try {
    var result = await artistQueries.getSpecificArtistQuery(artistId);
    if (result.length < 1) {
      var error = new Error("Artist doesnt exist");
      error.status = 404;
      next(error);
    }
  } catch (error) {
    res.send(error);
  }

  try {
    var albumResult = await albumQueries.getSpecificAlbumQuery(
      urlAlbumId,
      artistId
    );
  } catch (error) {
    res.send(error);
  }

  if (!albumResult[0]) {
    var error = new Error("Invalid album parameters/ album doesnt exist");
    error.status = 404;
    next(error);
  }
  var albumId = albumResult[0].Id;

  try {
    var track = await queries.findRealTrackId(albumId, artistId, trackNumber);
    var realTrackId = track[0].dataValues.id;
  } catch (error) {
    res.status(404).json("Track id doesnt exist");
  }

  if (req.headers.authorization === undefined) {
    var error = new Error("You have to be authorized to add track to playlist");
    error.status = 401;
    next(error);
  } else {
    var header = req.headers.authorization.split(" ");
    var token = header[1];
    var decodedToken = jwtDecode(token);
  }

  console.log(decodedToken)

  try {
     var playlistTrack = PlaylistTracks.create({
      PlaylistId: req.body.PlaylistId,
      TrackId: realTrackId
    });
    res
      .status(201)
      .json(
        `Successfully added track with TrackId ${realTrackId} to playlist${req.body.PlaylistId}`
      );
  } catch (error) {
    res.send(error.message);
  }
  


};

export {
  getAllTracks,
  getSpecificTrack,
  createTrack,
  deleteTrack,
  updateTrack,
  getAllTracksForSpecifilUserAndAlbum,
  likeTrack,
  addTrackToPlaylist
};
