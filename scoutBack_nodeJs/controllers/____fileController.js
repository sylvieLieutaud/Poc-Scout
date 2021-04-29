const fs = require('fs');

//dossier des metadonnées
const userFiles = './user_data/';

//get all files
exports.getFile =(req, res) => {
  console.log(req.url);
  const fileName = req.url.substring(1).replace(/%20/g, '');
  fs.readFile(userFiles + fileName, (err,data) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.status(204);
      res.write(data);
    }
  });
//save a file
exports.upload = (req, res) => {
  const file = req.body;
  console.log(file.name);
  const base64data = file.content.replace(/^data:image\/png;base64,/, '');
  // const base64data = file.content;
  fs.writeFile(userFiles + file.name, base64data, 'base64', (err) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.set('Location', userFiles + file.name);
      res.status(200);
      res.send(file);
    }
  });
 };
 //delete a file
 exports.delete =(req, res) => {
  console.log(req.url);
  const fileName = req.url.substring(1).replace(/%20/g, '');
  fs.unlink(userFiles + fileName, (err) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.status(204);
      res.send({});
    }
  });
 }
}
