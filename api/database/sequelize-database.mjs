import dotenv from 'dotenv'
dotenv.config()
import Sequelize from 'sequelize'

// var opts = {
//     define: {
//         //prevent sequelize from pluralizing table names
//         freezeTableName: true
//     }
// }

const connectionSequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
  dialect: 'mysql'
})


export default connectionSequelize