import queries from './queries.mjs'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import expressValidator from 'express-validator';

var getAllUsers = async (req, res, next) => {

    try {
        var result = await queries.getAllUsersQuery()
        res.send(result)
    } catch (error) {
        res.send(error)
    }

}

var getSpecificUser = async (req, res, next) => {

    try {
        var result = await queries.getSpecificUserQuery(req.params.id)
        if (result.length < 1) {
            var error = new Error("No user with such id");
            error.status = 404;
            next(error);
        } else {
            res.status(200).send(result)
        }

    } catch (error) {
        res.send(error)
    }

}

var createUser = async (req, res, next) => {


    var checkIfEmailIsTaken = await queries.getUserByEmailQuery(req.body.Email)
    console.log(checkIfEmailIsTaken.length)
    if (checkIfEmailIsTaken.length > 0) {
        var error = new Error("Email is already in use");
        error.status = 404;
        next(error);
    }
    else {

        var errors = expressValidator.validationResult(req);

        if (errors.errors.length > 0) {
            res.send(errors)
        }
        else {

            try {
                const user = req.body;
                const passHash = bcrypt.hashSync(user.Password, 10);
                await queries.createUserQuery(user, passHash)
                res.status(201).send("User has been created!");
            } catch (error) {
                res.send(error.message)
            }
        }
    }

}

var deleteUser = async (req, res, next) => {

    try {
        await queries.deleteUserQuery(req.params.id)
        res.send(`User with id ${req.params.id} has been deleted`)
    } catch (error) {
        res.send(error)
    }

}

var updateUser = async (req, res) => {
    const userRequest = req.body;
    const userId = req.params.id
    var errors = expressValidator.validationResult(req);

    if (errors.errors.length > 0) {
        res.status(400).send(errors)
    } else {
        try {
            const user = await queries.updateUserQuery(userId, userRequest);
            res.status(201).send("User has been updated!");
        } catch (error) {
            res.status(500).send(error.message)
        }
    }


};



var loginUser = async (req, res) => {
    const email = req.body.Email;
    const pass = req.body.Password;
    console.log(req.body)

    var errors = expressValidator.validationResult(req);
    if (errors.errors.length > 0) {
        res.status(400).send(errors)
    }
    else {
        try {
            var user = await queries.getUserByEmailQuery(email);
            var dbUser = user[0];
            const matchPass = bcrypt.compareSync(pass, dbUser.Password);
            if (matchPass) {
                const token = jwt.sign({ dbUser }, 'abc', { expiresIn: '1h' })

                res.json(token);
            }
            else {
                res.status(401).send("Wrong password");
            }

        }
        catch (error) {
            res.status(500).send(error);
        }
    };

}



export { getAllUsers, getSpecificUser, createUser, deleteUser, updateUser, loginUser }