const Sequelize = require('sequelize'); //table
const sequelize = require('../util/database'); //connected object

const Message =sequelize.define('messages', {
    message: {type: Sequelize.STRING},
    }, 
    
)

module.exports = Message;
