const dbConfig = require("../config/data.config.js");
const Sequelize = require("sequelize");

//instance l'objet Sequelize
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  schema: dbConfig.schema,
  // operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

//vérifiecation de la connection de BDD
sequelize.authenticate().then(()=>{
    console.log('BDD Connection réussie');
  }).catch(()=>{
    console.error('Unable to connect to the database:', error);
  });

//export l'objet bd
const bd = module.exports = {};
bd.sequelize = sequelize;

