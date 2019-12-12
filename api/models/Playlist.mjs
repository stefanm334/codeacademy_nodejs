import Sequelize from 'sequelize'
import connectionSequelize from '../database/sequelize-database.mjs'


const Playlist = connectionSequelize.define('playlist', {

    Title: {
        type: Sequelize.STRING
    },
    CreatedBy: {
        type: Sequelize.INTEGER
    },
    IsPublic: {
        type: Sequelize.TINYINT
    
    }


}, {
    freezeTableName: true,
    timestamps: false
})



export default Playlist