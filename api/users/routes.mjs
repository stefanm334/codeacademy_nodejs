import express from 'express'
import {getAllUsers,getSpecificUser,createUser,deleteUser,updateUser,loginUser} from '../users/action.mjs'
import {userValidator,loginValidator} from '../express-validator validations/users.mjs'
var router = express.Router();


router.get("/api/user",getAllUsers)
router.get("/api/user/:id",getSpecificUser)
router.post("/api/user",userValidator,createUser)
router.delete("/api/user/:id",deleteUser)
router.put('/api/user/:id', userValidator,updateUser);
router.post("/api/login",loginValidator,loginUser)

export default router