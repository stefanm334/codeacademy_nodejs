
import connection from '../database/database.mjs'



var getAllAlbumsQuery = () => {
    let query = "SELECT * from album";
    return new Promise((resolve, reject) => {

        connection.query(query, (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

var getAllAlbumsForSpecificArtistQuery = (artistId) => {
    let query = "SELECT * FROM album WHERE ArtistId = ?";
    return new Promise((resolve, reject) => {

        connection.query(query, artistId, (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}




var getSpecificAlbumQuery = (albumId, artistId) => {
    let query = "SELECT * FROM album WHERE ArtistId = ? LIMIT ?,1";
    return new Promise((resolve, reject) => {

        connection.query(query, [artistId, albumId - 1], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

var createAlbumQuery = (album, artistId) => {
    let query = "INSERT INTO album (Title,ReleaseYear,ArtistId,Genre) VALUES (?,?,?);"
    let albumData = [album.Title, album.ReleaseYear, artistId, album.Genre]
    return new Promise((resolve, reject) => {

        connection.query(query, albumData, (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

var deleteAlbumQuery = (id) => {
    let query = "DELETE FROM album WHERE album.Id = ?";
    return new Promise((resolve, reject) => {

        connection.query(query, id, (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

var updateAlbumQuery = (id, album) => {

    const query = 'UPDATE album SET Title = ?, ReleaseYear = ?, ArtistId = ? , Genre = ? WHERE album.Id = ?';
    const albumData = [album.Title, album.ReleaseYear, album.ArtistId, album.Genre, id];

    return new Promise((resolve, reject) => {
        connection.query(query, albumData, (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                console.log(results.affectedRows)
                if (results.affectedRows == 0) {
                    reject(new Error(`User with id ${id} doesnt exist `))
                }
                resolve(results);
            }
        });
    });
};

export default { getAllAlbumsQuery, getAllAlbumsForSpecificArtistQuery, getSpecificAlbumQuery, createAlbumQuery, deleteAlbumQuery, updateAlbumQuery }