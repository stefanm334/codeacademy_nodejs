import express from "express";
import {getAllPlaylists,getAllPlaylistsForSpecificUser,getSpecificPlaylistForUser,createPlaylist,deletePlaylist,updatePlaylist} from "./actions.mjs"
var router = express.Router();

router.get("/api/playlists/" , getAllPlaylists);

router.get("/api/user/:userid/playlist",getAllPlaylistsForSpecificUser);
router.get("/api/user/:userid/playlist/:playlistid",getSpecificPlaylistForUser);
router.post("/api/user/:userid/playlist",createPlaylist);
router.delete("/api/user/:userid/playlist/:playlistid",deletePlaylist);
router.put("/api/user/:userid/playlist/:playlistid",updatePlaylist);


export default router;
