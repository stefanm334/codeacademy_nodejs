import Sequelize from 'sequelize'
import connectionSequelize from '../database/sequelize-database.mjs'


const LikedTrack = connectionSequelize.define('liked_albums', {
  
    UserId: {
        type: Sequelize.INTEGER
        
    },
    AlbumId: {
        type: Sequelize.INTEGER
    }


}, {
    freezeTableName: true,
    timestamps: false
})



export default LikedTrack