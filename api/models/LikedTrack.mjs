import Sequelize from 'sequelize'
import connectionSequelize from '../database/sequelize-database.mjs'


const LikedTrack = connectionSequelize.define('liked_tracks', {
  
    UserId: {
        type: Sequelize.INTEGER
        
    },
    TrackId: {
        type: Sequelize.INTEGER
    }


}, {
    freezeTableName: true,
    timestamps: false
})



export default LikedTrack