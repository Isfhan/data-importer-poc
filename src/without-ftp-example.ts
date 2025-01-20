// Import stuff from supabase
import { createClient } from '@supabase/supabase-js';

// Imports generic data converter
import DataConverter from './generic-data-converter.js';

// Imports dotenv
import dotenv from 'dotenv';

// Imports types
import { FileType } from './types/index.js';

// Load environment variables from .env file
dotenv.config();

// Example usage of the generic data converter
(async () => {
    try {
        // Replace with your file path
        const filePath = './dist/data/input/sample.xml';

        // Get the actual file type (e.g., xml, json, csv, xlsx)
        const fileType = filePath.split('.').pop() as FileType;

        // Initialize DataConverter
        const dataConverter = new DataConverter(filePath, fileType);

        // Invoke the data converter method
        const genericData = await dataConverter.convertData();

        // Initialize supabase
        const supabase = createClient(
            process.env.SUPABASE_URL as string,
            process.env.SUPABASE_SERVICE_ROLE_KEY as string,
            { db: { schema: 'test' } }
        );

        // Insert data into the products table
        const { error } = await supabase.from('products').insert(genericData);

        // Check if there is an error
        if (error) {
            // log the error message to the console
            console.error(
                `Error inserting data into Supabase table: ${error.message}`
            );
        }
    } catch (error: any) {
        // log the error message to the console if there is an error
        console.error('Error:', error.message);
    }
})();
