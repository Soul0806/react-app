const fs = require('fs');
const express = require("express");
const { raw } = require('body-parser');
const router = express.Router();

router.post('/write_json_prop', (req, res) => {
    const fileName = req.body.fileName;
    const key = req.body.data.key;
    const value = req.body.data.value;
    let content;
    if (fs.existsSync(fileName)) {
        const rawData = fs.readFileSync(fileName, { encoding: 'utf8' });
        if (rawData !== '') {
            const arr = JSON.parse(rawData)[key];
            if(arr.includes(value)) 
                return;
            arr.push(value);
            content = JSON.stringify({ [key]: arr });
        } else {
            content = JSON.stringify({[key]: [value]});
        }
    } else {
        content = JSON.stringify({[key]: [value]});
    }
    // const content = JSON.stringify(req.body.content);
    fs.writeFileSync(fileName, content, { encoding: 'utf8', flag: 'w' });
})

router.post('/writeFile', (req, res) => {
    const fileName = req.body.fileName;
    let content;
    if (fs.existsSync(fileName)) {
        const rawData = fs.readFileSync(fileName, { encoding: 'utf8' });
        if (rawData !== '') {
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
        if (!err) {
            result = data;
        }
        res.send(result);
    })
})

router.post('/todo/del/:id', (req, res) => {
    const fileName = req.body.fileName;
    let content;
    if (fs.existsSync(fileName)) {
        const rawData = fs.readFileSync(fileName, { encoding: 'utf8' });
        if (rawData !== '') {
            const sale = JSON.parse(rawData);
            sale.push(req.body.content);
            content = JSON.stringify(sale);
            fs.writeFileSync(fileName, content, { encoding: 'utf8', flag: 'w' });
        }
    }
})

module.exports = router;