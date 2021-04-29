
const fs = require('fs');
// const Buffer = require('buffer');
const CONST= require('../config/data.config.js');
var router = require("express").Router();
// create a folder for user
var userFiles = CONST.userFiles;
if (!fs.existsSync(userFiles)){
    fs.mkdirSync(userFiles);
}
// Create a new file
router.put("/", function(req, res){
    const file = req.body;
    //const base64data = file.base64data;
    //let data = file.base64data.replace(/^data:image\/png;base64,/, '');
    let data = file.base64data.split(';base64,').pop();
    console.log(data);
    //from base64 to buffer
    let  buffer = Buffer.from(data, "base64");
    fs.writeFile(userFiles+file.fileName, buffer, (err) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.set('Location', file.fileName);
        res.status(200);
        //send the path relatif to front
        res.send(JSON.stringify(file.fileName));
        console.log(file.fileName);
      }
    });
})
  // delete a file
  router.delete("/**", function(req, res){
    console.log(req.url);
    const fileName = req.url.substring(1).replace(/%20/g, '');
    fs.unlink(userFiles + fileName, (err) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.status(204);
        res.send(JSON.stringify('deleted '+ fileName));
      }
    });
    });

  //get one file
  router.get("/**",function(req, res){
    console.log(req.url);
    const fileName = req.url.substring(1).replace(/%20/g, '');
    fs.readFile(userFiles + fileName,"utf8",(err,data) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        // res.writeHead(200, {'Content-Type': 'image/png'}) 
        let file = {fileName: fileName, base64data: data};
        console.log(file)
        // res.end(data,'Base64');
        res.status(200).json(file);
      }
    });
    });

  module.exports = router;