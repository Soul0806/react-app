// 使用 callback
const parse = require('csv-parse');
const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');
const db = require("./db");

const inputFilePath = path.resolve(__dirname, './tire.csv');

main();

async function main() {
    const inputFile = await fsPromises.readFile(inputFilePath);
    const parsedResult = await parseCSV(inputFile, {
        delimiter: ',',
    });
    let specs = [];
    let resultConcat = [].concat(...parsedResult);
    specs = resultConcat.filter(item => item != '');

    // write data to local file >> specs.txt
    const fileName = 'specs.txt';
    const content = specs.join("\r\n")
    fs.writeFileSync(fileName, content);

    specs.forEach(item => {
        const q = "INSERT INTO specification (`format`) VALUES (?)";
        const value = item;
        db.query(q, [value], (err, data) => {
            if (err) return console.log('error');
            return console.log('Add successful');
        })
    })


}

function parseCSV(input, options) {
    return new Promise((resolve, reject) => {
        parse.parse(input, options, (error, output) => {
            if (error) {
                console.error('[ERROR] parseCSV: ', error.message);
                reject('[ERROR] parseCSV: ', error.message);
            }

            resolve(output);
        });
    });
}