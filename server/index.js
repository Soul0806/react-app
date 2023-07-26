const https = require("https");

const express = require("express")
const cors = require("cors")
const db = require("./db.js");
const bodyParser = require('body-parser');
const app = express();

const fs = require('fs');

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// require('./readfile.js');

app.get("/", (req, res) => {
	const q = "SELECT * FROM specification";
	db.query(q, (err, data) => {
		if (err) return res.json(err)
		return res.json(data)
		// res.send({
		// 	message:"success",
		// 	status:200
		// })
	})
})

app.post("/tire", (req, res) => {
	const q = `INSERT INTO project.specification (format) VALUES (?)`;
	const value = req.body.format;
	// console.log(req);
	db.query(q, [value], (err, data) => {
		if (err) return res.json(err)
		return res.json(data)
		// res.send({
		// 	message:"success",
		// 	status:200
		// })
	})
})

app.post("/io/writeToJson", (req, res) => {
	// console.log(req.body);
	const fileName = req.body.fileName;
	const content = JSON.stringify(req.body.content);
	console.log(fileName, content);
	fs.writeFileSync(fileName, content, { encoding: 'utf8', flag: 'w' });
})

app.listen(9000, () => {
	console.log("success")
})


// https
//   .createServer(app)
//   .listen(4000, ()=>{
//     console.log('server is runing at port 4000')
//   });
