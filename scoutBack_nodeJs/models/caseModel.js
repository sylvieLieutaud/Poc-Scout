const bd = require('./bd');
const sequelize = bd.sequelize;
const Sequelize = require("sequelize");
const User = require('../models/userModel');

//créer l'Objet userSchema
  const caseSchema =  {
    caseName: {
      type: Sequelize.STRING,
      // unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    caseNumber: {
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
      idUser: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: User,
          key: 'id',
          deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
      }
  };
   
  // User.associate = models => {
  //   User.hasMany(models.Message);
  // };
// définir userShema comme un model(table) de sequelize(base de données)
module.exports = sequelize.define('case',caseSchema, 
  //par default "tableName" serait "roles" (au pluriel), "timestamps" crée 2 champs automatique 
  //pour les dates de création et de modification (très pratique si nécessaire) 
  //et "underscored" permet de créer automatiquement des champs de "relation" entre les tables de type "role_id" plutôt que "UserId"
  {tableName: 'case', timestamps: true, underscored: false}
);

