import Sequelize from 'sequelize'
import connectionSequelize from '../database/sequelize-database.mjs'


const Artist = connectionSequelize.define('artist', {

    Name: {
        type: Sequelize.STRING
    },
    Country: {
        type: Sequelize.STRING
    },
    Age: {
        type: Sequelize.INTEGER
    }





}, {
    freezeTableName: true,
    timestamps: false
})



export default Artist