
import connection from '../database/database.mjs'



var getAllUsersQuery = () => {
    let query = "SELECT * from user";
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


var getSpecificUserQuery = (id) => {
    let query = "SELECT * FROM user WHERE Id = ?";
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

var createUserQuery = (user, pass) => {
    let query = "INSERT INTO user (Name,Surname,Email,Password) VALUES (?,?,?,?);"
    let userData = [user.Name, user.Surname, user.Email, pass]
    return new Promise((resolve, reject) => {

        connection.query(query, userData, (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

var deleteUserQuery = (id) => {
    let query = "DELETE FROM user WHERE user.Id = ?";
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

var updateUserQuery = (id, user, pass) => {

    const query = 'UPDATE user SET Name = ?, Surname = ?, Email = ?, Password = ? WHERE user.Id = ?';
    const userData = [user.Name, user.Surname, user.Email, pass, id];

    return new Promise((resolve, reject) => {
        connection.query(query, userData, (error, results, fields) => {
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


var getUserByEmailQuery = (email) => {
    let query = "SELECT * FROM user WHERE Email = ?";
    return new Promise((resolve, reject) => {
        connection.query(query, email, (error, results, fields) => {
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
}


export default { getAllUsersQuery, getSpecificUserQuery, createUserQuery, deleteUserQuery, updateUserQuery, getUserByEmailQuery }
