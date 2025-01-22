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
        // Initialize supabase
        const supabase = createClient(
            process.env.SUPABASE_URL as string,
            process.env.SUPABASE_SERVICE_ROLE_KEY as string,
            { db: { schema: 'test' } }
        );

        // Replace with your file path
        const filePath = './dist/data/input/sample.csv';

        // Get the actual file type (e.g., xml, json, csv, xlsx)
        const fileType = filePath.split('.').pop() as FileType;

        // The ID of the entity to which should be imported from entities table
        const entityId = 'cc936d10-9526-4db2-b38b-66bd616b5cdb';

        // Initialize DataConverter
        const dataConverter = new DataConverter(
            supabase,
            entityId,
            filePath,
            fileType
        );

        // Invoke the data converter method
        const genericData = await dataConverter.convertData();

        // Upsert data into the products table
        const { error } = await supabase.from('products').upsert(genericData);

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
