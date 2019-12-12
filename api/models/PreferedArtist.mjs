import Sequelize from 'sequelize'
import connectionSequelize from '../database/sequelize-database.mjs'


const PreferedArtist = connectionSequelize.define('prefered_artists', {
  
    UserId: {
        type: Sequelize.INTEGER
        
    },
    ArtistId: {
        type: Sequelize.INTEGER
    }


}, {
    freezeTableName: true,
    timestamps: false
})



export default PreferedArtist