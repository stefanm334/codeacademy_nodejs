import Sequelize from 'sequelize'
import connectionSequelize from '../database/sequelize-database.mjs'


const Album = connectionSequelize.define('album', {

    Title: {
        type: Sequelize.STRING
    },
    ReleaseYear: {
        type: Sequelize.INTEGER
    },
    ArtistId: {
        type: Sequelize.INTEGER
    },
    Genre: {
        type: Sequelize.STRING
    }



}, {
    freezeTableName: true,
    timestamps: false
})



export default Album