const bd = require('./bd');
const sequelize = bd.sequelize;
const Sequelize = require("sequelize");
const User = require('../models/userModel');
const Case = require('../models/caseModel');

//créer l'Objet visitSchema
  const visitSchema =  {
    visitName: {
        type: Sequelize.STRING,
        // unique: true,
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
    //foreign key (ManyToOne) 
    idUser: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    },
    //foreign key (ManyToOne) 
    idCase: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Case,
            key: 'id',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    }    
  };
   
// définir visitShema comme un model(table) de sequelize(base de données)
module.exports = sequelize.define('visit',visitSchema, 
  //par default "tableName" serait "roles" (au pluriel), "timestamps" crée 2 champs automatique 
  //pour les dates de création et de modification (très pratique si nécessaire) 
  //et "underscored" permet de créer automatiquement des champs de "relation" entre les tables de type "role_id" plutôt que "UserId"
  {tableName: 'visit', timestamps: true, underscored: false}
);

