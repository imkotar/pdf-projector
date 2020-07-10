const express = require('express');
const router = express.Router();
const pdfparse = require('pdf-parse')
const path = require('path');
const fs = require('fs');

router.post('/upload', (req,res) => {
  if (req.files) {
    const file = req.files.file
    const filename = file.name
    file.mv('./src/uploads/'+filename, (err) =>{
      if(err){
        res.send(err)
      }
      else {
        res.send(filename)
      }
    })
  }
})

router.get('/all', async (req, res) => {
  fs.readdir(path.join(__dirname, `../uploads/`), function (err, files) {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }
    res.json(files)
  })
})

router.post('/', (req, res) => {
  try{
    const directoryPath = path.join(__dirname, `../uploads/${req.body.filename}`);
    let numOfPages = Number
    let error = null
    pdfparse(fs.readFileSync(directoryPath))
      .then((data) => { numOfPages = data.numpages })
      .catch(function(err){
        error = err.message
        console.log(err.message)
    })
    fs.readFile(directoryPath, function (err, pdf) {
      if(!fs.existsSync(directoryPath)) {
        error = 'there is no file'
      }
      const data = {
        pdf: pdf,
        filename: req.body.filename,
        numOfPages: numOfPages,
        errorPdf: error
      }
      res.contentType("application/pdf")
      res.send(data)
    })
  } catch(err){
      res.json(err)
  }
})

router.patch('/remove', (req, res) => {
  const directoryPath = path.join(__dirname, `../uploads/${req.body.filename}`);
    fs.unlink(directoryPath, function (err) {
      if (err) {
        return err
      }
      fs.readdir(path.join(__dirname, `../uploads/`), function (err, files) {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        const data = {
          msg: 'file deleted',
          filename: req.body.filename,
          PDFList: files
        }
        res.send(data)
      })
    })
})

module.exports = router;