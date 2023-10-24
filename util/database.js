const Sequelize = require('sequelize');

// const sequelize = new Sequelize('groupchatapp', 'root', process.env.MYSQL_PASSWORD, {
  const sequelize = new Sequelize(process.env.MYSQL_DB, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {

  dialect: 'mysql',
  host: 'localhost',
 // logging: console.log
});

module.exports = sequelize;
