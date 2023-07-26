const https = require("https");

const express = require("express")
const app = express();
const cors = require("cors")
const db = require("./db.js");
// const bodyParser = require('body-parser');
// const fs = require('fs');

// routers 
const io = require('./routes/IO');

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/io', io);

// require('./readfile.js');

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

app.listen(9000, () => {
	console.log("success")
})


// https
//   .createServer(app)
//   .listen(4000, ()=>{
//     console.log('server is runing at port 4000')
//   });