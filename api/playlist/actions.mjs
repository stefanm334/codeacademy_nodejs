import connectionSequelize from "../database/sequelize-database.mjs";
import Playlist from "../models/Playlist.mjs";

var getAllPlaylists = async (req, res, next) => {
  try {
    var result = await Playlist.findAll(); //
    res.send(result);
  } catch (error) {
    res.send(error);
  }
};

var getAllPlaylistsForSpecificUser = async (req, res, next) => {
  try {
    var result = await Playlist.findAll({
      where: {
        CreatedBy: req.params.userid
      }
    });
    res.send(result);
  } catch (error) {
    res.send(error);
  }
};

var createPlaylist = async (req, res, next) => {
  try {
    var result = await Playlist.create({
      Title: req.body.Title,
      CreatedBy: req.params.userid,
      IsPublic: req.body.IsPublic
    });
    res.send(`Created Playlist`);
  } catch (error) {
    res.send(error);
  }
};

var getSpecificPlaylistForUser = async (req, res, next) => {
  var tempPlaylistId = parseInt(req.params.playlistid);
  try {
    var result = await Playlist.findAll({
      where: {
        CreatedBy: req.params.userid
      },
      limit: 1,
      offset: tempPlaylistId - 1
    });
    res.send(result);
  } catch (error) {
    res.send(error);
  }
};

var deletePlaylist = async (req, res, next) => {
  var tempPlaylistId = parseInt(req.params.playlistid);
  try {
    var result = await Playlist.findAll({
      where: {
        CreatedBy: req.params.userid
      },
      limit: 1,
      offset: tempPlaylistId - 1
    });
    var realPlaylistId = result[0].dataValues.id;
    await Playlist.destroy({
      where: {
        Id: realPlaylistId
      }
    });
    res.send(`Deleted playlist with id ${realPlaylistId}`);
  } catch (error) {
    res.send(error);
  }
};

var updatePlaylist = async (req, res, next) => {
  var tempPlaylistId = parseInt(req.params.playlistid);
  try {
    var playlist = await Playlist.findAll({
      where: {
        CreatedBy: req.params.userid
      },
      limit: 1,
      offset: tempPlaylistId - 1
    });
    var realPlaylistId = playlist[0].dataValues.id;
    res.send(playlist);
  } catch (error) {
    res.send(error);
  }

  try {
    var update = await Playlist.update(req.body, {
      where: {
        Id: realPlaylistId
      }
    });
    res.send(`Updated playlist with id ${JSON.stringify(realPlaylistId)}`);
  } catch (error) {
    res.send(error);
  }
};

export {
  getAllPlaylists,
  getAllPlaylistsForSpecificUser,
  createPlaylist,
  getSpecificPlaylistForUser,
  deletePlaylist,
  updatePlaylist
};
