import Track from '../models/Track.mjs'
import Album from '../models/Album.mjs'
import connectionSequelize from '../database/sequelize-database.mjs'


var getAllTrackSequelize = async () => {
    try {
        var result = await Track.findAll() //
        return (result)
    } catch (error) {
        return (error)
    }
}




var findRealTrackId = async (albumId,artistId,trackNumber) => {
    try {
        var result = await Track.findAll({
            where: {
                albumId,
                artistId

            },
            offset: trackNumber - 1,
            limit: 1

        });
        return result
    } catch (error) {
        return error
    }
}



export default { getAllTrackSequelize,findRealTrackId }