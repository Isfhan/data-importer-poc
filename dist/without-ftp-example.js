"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import stuff from supabase
const supabase_js_1 = require("@supabase/supabase-js");
// Imports generic data converter
const generic_data_converter_js_1 = __importDefault(require("./generic-data-converter.js"));
// Imports dotenv
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from .env file
dotenv_1.default.config();
// Example usage of the generic data converter
(async () => {
    try {
        // Initialize supabase
        const supabase = (0, supabase_js_1.createClient)(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { db: { schema: 'test' } });
        // Replace with your file path
        const filePath = './dist/data/input/sample.csv';
        // Get the actual file type (e.g., xml, json, csv, xlsx)
        const fileType = filePath.split('.').pop();
        // The ID of the entity to which should be imported from entities table
        const entityId = 'cc936d10-9526-4db2-b38b-66bd616b5cdb';
        // Initialize DataConverter
        const dataConverter = new generic_data_converter_js_1.default(supabase, entityId, filePath, fileType);
        // Invoke the data converter method
        const genericData = await dataConverter.convertData();
        // Upsert data into the products table
        const { error } = await supabase.from('products').upsert(genericData);
        // Check if there is an error
        if (error) {
            // log the error message to the console
            console.error(`Error inserting data into Supabase table: ${error.message}`);
        }
    }
    catch (error) {
        // log the error message to the console if there is an error
        console.error('Error:', error.message);
    }
})();
