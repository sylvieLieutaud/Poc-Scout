
// paramètres pour configuration la BDD en Postegresql
module.exports = Object.freeze({
    // server's name
    HOST: "localhost",
    // user's name
    USER: "scout",
    // user's password
    PASSWORD: "scout",
    // BBD's name
    DB: "test",
    // schema's name
    schema: 'scout',
    // system of configuration
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    // folder for register metadatas (img, audio and video)
    userFiles: './user_data/',
  });

  
