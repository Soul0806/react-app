const fs = require('fs');
const express = require("express");
const router = express.Router();

router.post('/del', (req, res) => {
    const fileName = req.body.fileName;
    const id = req.body.id;

    if (fs.existsSync(fileName)) {
        const rawData = fs.readFileSync(fileName, { encoding: 'utf8' });
        if (rawData !== '') {
            const todos = JSON.parse(rawData);
            const filterdTodos = todos.filter(todo => {
                if (todo.id !== id)
                    return todo
            })
            const content = JSON.stringify(filterdTodos);
            fs.writeFileSync(fileName, content, { encoding: 'utf8', flag: 'w' });
        }
    }
})

module.exports = router;