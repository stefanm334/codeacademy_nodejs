import express from "express"
import dotenv from 'dotenv'
dotenv.config()
import bodyParser from 'body-parser'
import router from './router/router.mjs'
import connectionSequelize from './database/sequelize-database.mjs'
import middleware from './middlewares/common.mjs'
import jwt from 'express-jwt'
import unless from 'express-unless'

var app = express()
app.use(middleware.logger);

connectionSequelize.authenticate()
.then(() => console.log("Database connected via SEQUELIZE succesfully"))
.catch(error => console.log(error))

app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: '*/*' }));

// const publicRoutePaths = ['/api/login'];
// app.use(jwt({ secret: 'abc' }).unless({path: publicRoutePaths}));

app.use(router)



app.use(middleware.wrongRoute);
app.use(middleware.errorHandler);


const port = process.env.PORT || 8080
app.listen(port, () => {
    console.log(`API IS WORKING ON PORT ${port}!`);
})