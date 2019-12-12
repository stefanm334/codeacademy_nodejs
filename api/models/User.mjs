import Sequelize from 'sequelize'
import connectionSequelize from '../database/sequelize-database.mjs'


const User = connectionSequelize.define('user', {
  
    Name: {
        type: Sequelize.STRING,
    
    },
    Surname: {
        type: Sequelize.STRING
    },
    Email: {
        type: Sequelize.STRING,
        validate : {
            isEmail : true
        }
    },
    Password: {
        type: Sequelize.STRING
    }




}, {
    freezeTableName: true,
    timestamps: false
})



export default User