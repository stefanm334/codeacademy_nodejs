
import connection from '../database/database.mjs'



var getAllArtistsQuery = ()=> {
    let query = "SELECT * from artist";
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


var getSpecificArtistQuery = (id)=> {
    let query = "SELECT * FROM artist WHERE Id = ?";
    return new Promise((resolve, reject) => {
        
        connection.query(query,id,(error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

var createArtistQuery = (artist) => {
    let query = "INSERT INTO artist (Name,Country,Age) VALUES (?,?,?);"
    let artistData = [artist.Name,artist.Country,artist.Age]
    return new Promise((resolve, reject) => {
        
        connection.query(query,artistData,(error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

var deleteArtistQuery = (id)=> {
    let query = "DELETE FROM artist WHERE artist.Id = ?";
    return new Promise((resolve, reject) => {
        
        connection.query(query,id,(error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

var updateArtistQuery = (id,artist) => {

    const query = 'UPDATE artist SET Name = ?, Country = ?, Age = ? WHERE artist.Id = ?';
    const artistData = [artist.Name,artist.Country,artist.Age];
    
    return new Promise((resolve, reject) => {
        connection.query(query, artistD, (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                console.log(results.affectedRows)
                if(results.affectedRows == 0) {
                    reject(new Error(`User with id ${id} doesnt exist `))
                }
                resolve(results);
            }
          });
    });
};

export default {getAllArtistsQuery,getSpecificArtistQuery,createArtistQuery,deleteArtistQuery,updateArtistQuery}