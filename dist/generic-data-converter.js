"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Imports required parsers
const parsers_js_1 = require("./parsers.js");
// Imports uuid
const uuid_1 = require("uuid");
class DataConverter {
    // Private properties
    filePath;
    fileType;
    /**
     * Initializes a new instance of the DataConverter class with the specified file path and file type.
     * @param {string} filePath - The path to the file to be processed.
     * @param {FileType} fileType - The type of the file (e.g., xml, csv, xlsx, json).
     */
    constructor(filePath, fileType) {
        this.filePath = filePath;
        this.fileType = fileType;
    }
    /**
     * Retrieves the raw data from a file of a given type.
     * @returns {Promise<any>} - A promise that resolves to the raw data.
     */
    async getRawData() {
        switch (this.fileType.toLowerCase()) {
            case 'xml':
                const response = await (0, parsers_js_1.parseXML)(this.filePath);
                return response?.Products?.Product || [];
            case 'csv':
                return await (0, parsers_js_1.parseCSV)(this.filePath);
            case 'xlsx':
                return (0, parsers_js_1.parseXLSX)(this.filePath);
            case 'json':
                return await (0, parsers_js_1.parseJSON)(this.filePath);
            default:
                throw new Error(`Unsupported file type: ${this.fileType}`);
        }
    }
    /**
     * Maps the raw data to a consistent JSON structure dynamically.
     * @param {Object.<string, string>} structure - An object with the keys being the generic field names and the values being the column names in the raw data.
     * @param {Array<Object>} rawData - Array of objects representing the raw data.
     * @returns {Array<Object>} - An array of objects with the mapped data.
     */
    createGenericDataStructure(structure, rawData) {
        // Return the mapped data
        return rawData.map((item) => {
            // Initialize the mapped item object
            const mappedItem = {};
            // Loop through the structure and add the values to the mapped item
            for (const [genericFieldName, dataColumnName] of Object.entries(structure)) {
                // Handle the id field
                if (genericFieldName === 'id') {
                    // If the value is not present so generate a uuid
                    if (['', null, undefined].includes(item[dataColumnName]?.trim())) {
                        // Generate a UUID and add it to the mapped item
                        mappedItem[genericFieldName] = (0, uuid_1.v4)();
                    }
                    else {
                        // Add the value to the mapped item
                        mappedItem[genericFieldName] = item[dataColumnName];
                    }
                }
                else {
                    // Add the value to the mapped item
                    mappedItem[genericFieldName] = item[dataColumnName] || '';
                }
            }
            // Return the mapped item object
            return mappedItem;
        });
    }
    /**
     * Converts the data from the specified file into a consistent JSON structure.
     * @returns {Promise<Object[]>} - A promise resolving to an array of objects representing the parsed data in a consistent JSON structure.
     */
    async convertData() {
        // Get the raw data from the file
        const rawData = await this.getRawData();
        // Get the mapping structure json
        const structure = await (0, parsers_js_1.parseJSON)(`./dist/config/mappings/${this.fileType}-structure.json`);
        // Map the raw data to the structure and convert it to JSON
        return this.createGenericDataStructure(structure, rawData);
    }
}
exports.default = DataConverter;
