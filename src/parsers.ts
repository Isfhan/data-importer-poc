// Imports required parsers
import fs from 'fs-extra';
import xml2js from 'xml2js';
import csv from 'csv-parser';
import xlsx from '@e965/xlsx';

/**
 * Parse an XML file and return its content as array of objects.
 * @param {string} filePath Path to the XML file to be parsed.
 * @returns {Promise<Object>} A promise resolving to the parsed XML content.
 */
export const parseXML = async (filePath: string) => {
    // Parse the XML file
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const parser = new xml2js.Parser({ explicitArray: false });
    return parser.parseStringPromise(fileContent);
};

/**
 * Parse a CSV file and return its content as an array of objects.
 * @param {string} filePath - Path to the CSV file to be parsed.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of objects representing the parsed CSV content.
 */
export const parseCSV = (filePath: string) => {
    // Parse the CSV file
    return new Promise((resolve, reject) => {
        const results: any = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data: any) => results.push(data))
            .on('end', () => resolve(results))
            .on('error', (error: any) => reject(error));
    });
};

/**
 * Parse an XLSX file and return its content as an array of objects.
 * @param {string} filePath - Path to the XLSX file to be parsed.
 * @returns {Array<Object>} An array of objects representing the parsed XLSX content.
 */
export const parseXLSX = (filePath: string) => {
    // Parse the XLSX file
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    return xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
};

/**
 * Parse a JSON file and return its content as an object.
 * @param {string} filePath - Path to the JSON file to be parsed.
 * @returns {Promise<Object>} A promise that resolves to the parsed JSON content.
 */
export const parseJSON = async (filePath: string) => {
    return fs.readJSON(filePath);
};
