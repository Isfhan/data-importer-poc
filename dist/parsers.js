"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseJSON = exports.parseXLSX = exports.parseCSV = exports.parseXML = void 0;
// Imports required parsers
const fs_extra_1 = __importDefault(require("fs-extra"));
const xml2js_1 = __importDefault(require("xml2js"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const xlsx_1 = __importDefault(require("@e965/xlsx"));
/**
 * Parse an XML file and return its content as array of objects.
 * @param {string} filePath Path to the XML file to be parsed.
 * @returns {Promise<Object>} A promise resolving to the parsed XML content.
 */
const parseXML = async (filePath) => {
    // Parse the XML file
    const fileContent = await fs_extra_1.default.readFile(filePath, 'utf-8');
    const parser = new xml2js_1.default.Parser({ explicitArray: false });
    return parser.parseStringPromise(fileContent);
};
exports.parseXML = parseXML;
/**
 * Parse a CSV file and return its content as an array of objects.
 * @param {string} filePath - Path to the CSV file to be parsed.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of objects representing the parsed CSV content.
 */
const parseCSV = (filePath) => {
    // Parse the CSV file
    return new Promise((resolve, reject) => {
        const results = [];
        fs_extra_1.default.createReadStream(filePath)
            .pipe((0, csv_parser_1.default)())
            .on('data', (data) => results.push(data))
            .on('end', () => resolve(results))
            .on('error', (error) => reject(error));
    });
};
exports.parseCSV = parseCSV;
/**
 * Parse an XLSX file and return its content as an array of objects.
 * @param {string} filePath - Path to the XLSX file to be parsed.
 * @returns {Array<Object>} An array of objects representing the parsed XLSX content.
 */
const parseXLSX = (filePath) => {
    // Parse the XLSX file
    const workbook = xlsx_1.default.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    return xlsx_1.default.utils.sheet_to_json(workbook.Sheets[sheetName]);
};
exports.parseXLSX = parseXLSX;
/**
 * Parse a JSON file and return its content as an object.
 * @param {string} filePath - Path to the JSON file to be parsed.
 * @returns {Promise<Object>} A promise that resolves to the parsed JSON content.
 */
const parseJSON = async (filePath) => {
    return fs_extra_1.default.readJSON(filePath);
};
exports.parseJSON = parseJSON;
