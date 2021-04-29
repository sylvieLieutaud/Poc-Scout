const bd = require('./bd');
const sequelize = bd.sequelize;
const Sequelize = require("sequelize");
const Collect = require('../models/collectModel');

//créer l'Objet photoSchema
  const photoSchema =  {
    fileName: {
      type: Sequelize.STRING,
      // unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    photoURL: {
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
      idCollect: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: Collect,
          key: 'id',
          deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
      }
  };
   
  // User.associate = models => {
  //   User.hasMany(models.Message);
  // };
// définir userShema comme un model(table) de sequelize(base de données)
module.exports = sequelize.define('photo',photoSchema, 
  //par default "tableName" serait "roles" (au pluriel), "timestamps" crée 2 champs automatique 
  //pour les dates de création et de modification (très pratique si nécessaire) 
  //et "underscored" permet de créer automatiquement des champs de "relation" entre les tables de type "role_id" plutôt que "UserId"
  {tableName: 'photo', timestamps: false, underscored: false}
);

