import Sequelize from 'sequelize'
import connectionSequelize from '../database/sequelize-database.mjs'


const PlaylistTracks = connectionSequelize.define('playlist_tracks', {

    TrackId: {
        type: Sequelize.INTEGER
    },
    PlaylistId: {
        type: Sequelize.INTEGER
    }
    


}, {
    freezeTableName: true,
    timestamps: false
})



export default PlaylistTracks