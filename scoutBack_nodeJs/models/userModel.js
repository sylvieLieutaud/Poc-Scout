const bd = require('./bd');
const sequelize = bd.sequelize;
const Sequelize = require("sequelize");
const Organisation = require('../models/organisationModel');

//créer l'Objet userSchema
  const userSchema =  {
    lastName: {
      type: Sequelize.STRING,
      // unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type:Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    password: {
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
    //foreign key
    idOrg: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
          model: Organisation,
          key: 'id',
          deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
      }
  }    
  };
  
// définir userShema comme un model(table) de sequelize(base de données)
module.exports = sequelize.define('user',userSchema, 
  //par default "tableName" serait "roles" (au pluriel), "timestamps" crée 2 champs automatique 
  //pour les dates de création et de modification (très pratique si nécessaire) 
  //et "underscored" permet de créer automatiquement des champs de "relation" entre les tables de type "role_id" plutôt que "UserId"
  {tableName: 'user', timestamps: true, underscored: false}
);

