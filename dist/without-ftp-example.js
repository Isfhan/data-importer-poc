"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Imports required parsers
const parsers_js_1 = require("./parsers.js");
/**
 * Generic data converter function that can parse and convert different types of data (XML, CSV, XLSX, JSON) into a consistent JSON structure.
 * @param {string} filePath - Path to the file to be parsed.
 * @param {string} fileType - Type of the file to be parsed (xml, csv, xlsx, json).
 * @returns {Promise<Object[]>} - A promise resolving to an array of objects representing the parsed data in a consistent JSON structure.
 */
const genericDataConverter = async (filePath, fileType) => {
    // Declare a variable to store the raw data
    let rawData;
    // Handle parsing based on different file types
    switch (fileType.toLowerCase()) {
        case 'xml':
            // Parse the XML file
            rawData = await (0, parsers_js_1.parseXML)(filePath);
            // Extract the 'Product' array from the 'Products' object
            rawData = rawData?.Products?.Product;
            break;
        case 'csv':
            // Parse the CSV file
            rawData = await (0, parsers_js_1.parseCSV)(filePath);
            break;
        case 'xlsx':
            // Parse the XLSX file
            rawData = (0, parsers_js_1.parseXLSX)(filePath);
            break;
        case 'json':
            // Parse the JSON file
            rawData = await (0, parsers_js_1.parseJSON)(filePath);
            break;
        default:
            throw new Error('Unsupported file type');
    }
    // Get the structure mapping from the JSON file based on the file type
    const structure = await (0, parsers_js_1.parseJSON)(`./dist/config/mappings/${fileType}-structure.json`);
    console.log(structure);
    // Map the data to a consistent JSON structure
    const genericDataStructure = rawData.map((item) => ({
        productName: item[structure.col_product_name] || '',
        price: parseFloat(item[structure.col_price] || 0),
        deliveryDays: parseInt(item[structure.col_delivery_days] || 0, 10),
        description: item[structure.col_description] || '',
        discount: parseFloat(item[structure.col_discount] || 0),
    }));
    return genericDataStructure;
};
// Example usage of the generic data converter
(async () => {
    try {
        // Replace with your file path
        const filePath = './dist/data/input/sample.csv';
        // Get the actual file type (e.g., xml, json, csv, xlsx)
        const fileType = filePath.split('.').pop();
        // Invoke the generic data converter
        const genericData = await genericDataConverter(filePath, fileType);
        // Print the output
        console.log('genericData JSON Output:', genericData);
    }
    catch (error) {
        console.error('Error:', error.message);
    }
})();
