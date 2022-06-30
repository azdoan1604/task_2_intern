const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');
const fileUpload = require('express-fileupload');

const asset = require("./assets.json")

asset.css.forEach((e) => {
  app.get(e, (req, res) => {
    res.sendFile(__dirname + e)
  })
})
asset.js.forEach((e) => {
  app.get(e, (req, res) => {
    res.sendFile(__dirname + e)
  })
})
app.use(fileUpload());
const forceSSL = function () {
  return function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(
        ['https://', req.get('Host'), req.url].join('')
      );
    }
    next();
  }
};
app.use(express.static('./index.html'));

app.get('/', function (req, res) {
  let html = fs.readFileSync("./index.html", 'utf8')
  res.send(html);
});

app.post('/', async function (req, res) {
  console.log("up loads")
  if (!req.files) {
    res.send({
      status: false,
      message: 'No file uploaded'
    });
  } else {
    //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
    let avatar = req.files.files;
    //Use the mv() method to place the file in upload directory (i.e. "uploads")
    console.log(avatar)
    avatar.mv(__dirname +'/assets/data/' + avatar.name,function(err){
      
    });
    
    //send response
    res.send({
      status: true,
      message: 'File is uploaded',
      data: {
        name: avatar.name,
        mimetype: avatar.mimetype,
        size: avatar.size
      }
    });
  }
  // try {
  // } catch (err) {
  //   console.log("loi")
  //   res.status(500).send(err);
  // }
})

app.use(forceSSL());

app.listen(process.env.PORT || 1604);