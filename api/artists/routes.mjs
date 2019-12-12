import express from 'express'
import {getAllArtists,getSpecificArtist,createArtist,deleteArtist,updateArtist,likeArtist} from '../artists/actions.mjs'
import {artistValidator} from '../express-validator validations/artists.mjs'
var router = express.Router();


router.get("/api/artist",getAllArtists)
router.get("/api/artist/:id",getSpecificArtist)
router.post("/api/artist",artistValidator,createArtist)
router.delete("/api/artist/:id",deleteArtist)
router.put('/api/artist/:id',artistValidator, updateArtist);
router.post("/api/artist/:id",likeArtist)
export default router