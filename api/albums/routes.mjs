import express from 'express'
import {getAllAlbumsForAllArtists,getSpecificAlbum,createAlbum,deleteAlbum,updateAlbum,getAllAlbumsForSpecificArtist,likeAlbum } from '../albums/actions.mjs'
import {albumValidator,albumParameterValidator} from '../express-validator validations/album.mjs'

var router = express.Router();


router.get("/api/albums",getAllAlbumsForAllArtists)


router.get("/api/artist/:id/album",getAllAlbumsForSpecificArtist)
router.get("/api/artist/:id/album/:albumid",albumParameterValidator,getSpecificAlbum)
router.post("/api/artist/:id/album",albumValidator,createAlbum)
router.delete("/api/artist/:id/album/:albumid",albumParameterValidator,deleteAlbum)
router.put('/api/artist/:id/album/:albumid',albumValidator, updateAlbum);
router.post("/api/artist/:id/album/:albumid",likeAlbum)
export default router