const fs = require('fs-extra');
const xml2js = require('xml2js');
const csv = require('csv-parser');
const xlsx = require('@e965/xlsx');

const parseXML = async (filePath) => {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const parser = new xml2js.Parser({ explicitArray: false });
    return parser.parseStringPromise(fileContent);
};

const parseCSV = (filePath) => {
    return new Promise((resolve, reject) => {
        const results = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => resolve(results))
            .on('error', (error) => reject(error));
    });
};

const parseXLSX = (filePath) => {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    return xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
};

const parseJSON = async (filePath) => {
    return fs.readJSON(filePath);
};

module.exports = {
    parseXML,
    parseCSV,
    parseXLSX,
    parseJSON,
};
