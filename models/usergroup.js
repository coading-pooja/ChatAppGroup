const Sequelize = require('sequelize'); //table
const sequelize = require('../util/database'); //connected object

const GroupUser =sequelize.define('usergroups', {
    isGroupAdmin:{ type:Sequelize.BOOLEAN, defaultValue: false},

    },
)

module.exports = GroupUser;
