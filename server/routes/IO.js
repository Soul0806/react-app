const fs = require('fs');
const express = require("express");
const { raw } = require('body-parser');
const router = express.Router();

router.post('/writeFile', (req, res) => {
    const fileName = req.body.fileName;
    const content = JSON.stringify(req.body.content);
    fs.writeFileSync(fileName, content, { encoding: 'utf8', flag: 'w' });
})

router.post('/readFile', (req, res) => {
    const fileName = req.body.fileName;
    const rawdata = fs.readFileSync(fileName);
    res.send(JSON.parse(rawdata));
})

module.exports = router;