import express from 'express'
import { getAllTracks, getSpecificTrack, createTrack,deleteTrack,updateTrack,getAllTracksForSpecifilUserAndAlbum,likeTrack } from './actions.mjs';
import {trackValidator} from '../express-validator validations/track.mjs'
var router = express.Router();


router.get("/api/tracks", getAllTracks) //

router.get("/api/artist/:id/album/:albumid/track/", getAllTracksForSpecifilUserAndAlbum)
router.get("/api/artist/:id/album/:albumid/track/:trackid", getSpecificTrack)
router.post("/api/artist/:id/album/:albumid/track", trackValidator,createTrack)
router.delete("/api/artist/:id/album/:albumid/track/:trackid",deleteTrack)
router.put('/api/artist/:id/album/:albumid/track/:trackid',trackValidator, updateTrack);
router.post("/api/artist/:id/album/:albumid/track/:trackid",likeTrack)


export default router