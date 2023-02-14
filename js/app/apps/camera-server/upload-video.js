const express = require('express');
const fs = require('fs');
const { getTimestamp , hashCode, getUserBase64Hash}  = require('./utils');
const router = express.Router();

router.post('/upload', (req, res) => {
    const blob = req.body; 
    const base64data = getUserBase64Hash(req)
    const filenameCode = hashCode(base64data);
    const dir = __dirname+`\\uploads\\${filenameCode}`
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    const fileName = `${dir}\\${getTimestamp()}.webm`;
    console.log(req,1)
    const buffer = Buffer.from(blob);
    fs.writeFile(fileName, buffer, 'binary', (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error saving file');
        } else {
            console.log(`File ${fileName} saved successfully`);
            res.status(200).send('File saved successfully');
        }
    });
});

module.exports = router;