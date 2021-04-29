const bd = require('./bd');
const sequelize = bd.sequelize;
const Sequelize = require("sequelize");
//créer l'Objet userSchema
  const organisationSchema =  {
    orgName: {
      type: Sequelize.STRING,
      // unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    orgCity: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    status: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      validate: {
        notEmpty: true,
      },
    },
  };
  
// définir userShema comme un model(table) de sequelize(base de données)
module.exports = sequelize.define('organisation',organisationSchema, 
  //par default "tableName" serait "roles" (au pluriel), "timestamps" crée 2 champs automatique 
  //pour les dates de création et de modification (très pratique si nécessaire) 
  //et "underscored" permet de créer automatiquement des champs de "relation" entre les tables de type "role_id" plutôt que "UserId"
  {tableName: 'organisation',timestamps: true, underscored: false}
);

