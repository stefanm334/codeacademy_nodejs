import Sequelize from 'sequelize'
import connectionSequelize from '../database/sequelize-database.mjs'


const Track = connectionSequelize.define('track', {
  
    Title: {
        type: Sequelize.STRING
    },
    AlbumId: {
        type: Sequelize.INTEGER
        
    },
    Duration: {
        type: Sequelize.INTEGER
    },
    Url: {
        type: Sequelize.STRING
    },
    ArtistId: {
        type: Sequelize.INTEGER
    }





}, {
    freezeTableName: true,
    timestamps: false
})



export default Track