import express from 'express'
import userRouter from '../users/routes.mjs'
import artistRouter from '../artists/routes.mjs'
import albumRouter from '../albums/routes.mjs'
import trackRouter from '../tracks/routes.mjs'
import playlistRouter from '../playlist/routes.mjs'
var router = express.Router();

router.use(userRouter)
router.use(artistRouter)
router.use(albumRouter)
router.use(trackRouter)
router.use(playlistRouter)

export default router