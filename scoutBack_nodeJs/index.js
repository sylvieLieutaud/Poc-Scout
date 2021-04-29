const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');


const userRouter = require('./routes/userRouter');
const caseRouter = require('./routes/caseRouter');
const visitRouter = require('./routes/visitRouter');
const collectRouter = require('./routes/collectRouter');
const photoRouter = require('./routes/photoRouter');
const organisationRouter = require('./routes/organisationRouter');
const fileRouter = require('./routes/fileRouter');

//connection à la BDD
const bd = require('./models/bd');
//bd.sequelize.sync();
// option pour initialiser la BD->force: true
// bd.sequelize.sync({ force: false }).then(() => {
//     console.log("connect to db.");
//   });

const app = express();
app.use(cors());
//gestion of files
app.use(bodyParser.json({limit: '200mb'}));
app.use(bodyParser.urlencoded({limit: "200mb", extended: true, parameterLimit:50000}));


//connection à localhost par le port 3000
const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

app.get("/", (req, res, next) => {
    // res.header("Access-Control-Allow-Origin", "localhost:4200");
    res.status(200).json({
        message: " Hello World ! ",
    });
});



//router pour les tables de BDD
app.use("/user",userRouter);
app.use("/case",caseRouter);
app.use("/visit",visitRouter);
app.use("/collect",collectRouter);
app.use("/photo",photoRouter);
app.use("/organisation",organisationRouter);


// router for save metadonnées in serve
app.use("/files", fileRouter);
// app.use('/files', express.static('./user_data/'));

module.exports = app;

