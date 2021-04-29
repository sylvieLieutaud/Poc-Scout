const bd = require('./bd');
const sequelize = bd.sequelize;
const Sequelize = require("sequelize");
const Visit = require('../models/visitModel');

//créer l'Objet collectSchema
  const collectSchema =  {
    gpsX: {
        type: Sequelize.NUMBER,
        // unique: true,
        allowNull: true,
        validate: {
            notEmpty: true,
        },
    },
    gpsY: {
      type: Sequelize.NUMBER,
      // unique: true,
      allowNull: true,
      validate: {
          notEmpty: true,
      },
    },
    text: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    audioURL: {
      type: Sequelize.STRING,
      allowNull: true,
      validate: {
        notEmpty: true,
      },
    },
    videoURL: {
      type: Sequelize.STRING,
      allowNull: true,
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
    //foreign key (ManyToOne) 
    idVisit: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Visit,
            key: 'id',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    },    
  };
   
// définir collectShema comme un model(table) de sequelize(base de données)
module.exports = sequelize.define('collect',collectSchema, 
  //par default "tableName" serait "roles" (au pluriel), "timestamps" crée 2 champs automatique 
  //pour les dates de création et de modification (très pratique si nécessaire) 
  //et "underscored" permet de créer automatiquement des champs de "relation" entre les tables de type "role_id" plutôt que "UserId"
  {tableName: 'collect', timestamps: true, underscored: false}
);

