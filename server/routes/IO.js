const fs = require('fs');
const express = require("express")
const router = express.Router();

router.post('/writeFile', (req, res) => {
    const fileName = req.body.fileName;
    const content = JSON.stringify(req.body.content);
    console.log(req.body);
    fs.writeFileSync(fileName, content, { encoding: 'utf8', flag: 'w' });
})

module.exports = router;