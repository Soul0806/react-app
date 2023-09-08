const https = require("https");

const express = require("express")
const app = express();
const cors = require("cors")
const db = require("./db.js");
const fs = require('fs');
// const bodyParser = require('body-parser');
// const fs = require('fs');

// routers 
const io = require('./routes/IO');
const todo = require('./routes/todo');

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/io', io);
app.use('/todo', todo);

app.get("/", (req, res) => {
	const q = "SELECT * FROM specification";
	db.query(q, (err, data) => {
		if (err) return res.json(err)
		return res.json(data)
	})
})

app.post("/tire", (req, res) => {
	const q = `INSERT INTO project.specification (format) VALUES (?)`;
	const value = req.body.format;
	db.query(q, [value], (err, data) => {
		if (err) return res.json(err)
		return res.json(data)
	})
})

app.delete('/sale/:id', (req, res) => {
	const id = req.params.id;
	const fileName = 'static/sale.json';
	fs.readFile(fileName, (err, res) => {
		let result = '';
		if (!err) {
			data = JSON.parse(res);
		}
		const filteredData = data.filter(item => {
			if (item.id != id)
				return item;
		})
		const content = JSON.stringify(filteredData);
		fs.writeFileSync(fileName, content, { encoding: 'utf8', flag: 'w' });
	})
})


app.listen(9000, () => {
	console.log("Server is running at port 9000");
})


// https
//   .createServer(app)
//   .listen(4000, ()=>{
//     console.log('server is runing at port 4000')
//   });
