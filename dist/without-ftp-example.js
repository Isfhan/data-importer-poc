"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Imports generic data converter
const generic_data_converter_js_1 = __importDefault(require("./generic-data-converter.js"));
// Example usage of the generic data converter
(async () => {
    try {
        // Replace with your file path
        const filePath = './dist/data/input/sample.xml';
        // Get the actual file type (e.g., xml, json, csv, xlsx)
        const fileType = filePath.split('.').pop();
        // Initialize DataConverter
        const dataConverter = new generic_data_converter_js_1.default(filePath, fileType);
        // Invoke the data converter method
        const genericData = await dataConverter.convertData();
        // Print the output
        console.log('genericData JSON Output:', genericData);
    }
    catch (error) {
        console.error('Error:', error.message);
    }
})();
