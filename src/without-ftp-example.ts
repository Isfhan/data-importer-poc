// Imports generic data converter
import DataConverter from './generic-data-converter.js';

// Imports types
import { FileType } from './types/index.js';

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

        // Print the output
        console.log('genericData JSON Output:', genericData);
    } catch (error: any) {
        console.error('Error:', error.message);
    }
})();
