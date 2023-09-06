const fs = require('fs');
const express = require("express");
const { raw } = require('body-parser');
const router = express.Router();

router.post('/writeFile', (req, res) => {
    const fileName = req.body.fileName;
    const rawData = fs.readFileSync(fileName, { encoding: 'utf8'});
    let content;
    if (fs.existsSync(fileName)) {
        const rawData = fs.readFileSync(fileName, { encoding: 'utf8'});
        if(rawData !== '') {
            const sale = JSON.parse(rawData);
            sale.push(req.body.content);
            content = JSON.stringify(sale);
        } else {
            content = JSON.stringify([]);
        }
    } else {
        content = JSON.stringify([req.body.content]);
    }
    // const content = JSON.stringify(req.body.content);
    fs.writeFileSync(fileName, content, { encoding: 'utf8', flag: 'w' });
})

router.post('/readFile', (req, res) => {
    const fileName = req.body.fileName;
    fs.readFile(fileName, (err, data) => {
        let result = [];
        // console.log(data);
        if (!err) {        
            if (data.length !== 0) 
                result = JSON.parse(data);
        }
        res.send(result);
    })
})

module.exports = router;