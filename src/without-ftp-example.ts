// Imports required parsers
import { parseXML, parseCSV, parseXLSX, parseJSON } from './parsers.js';

/**
 * Generic data converter function that can parse and convert different types of data (XML, CSV, XLSX, JSON) into a consistent JSON structure.
 * @param {string} filePath - Path to the file to be parsed.
 * @param {string} fileType - Type of the file to be parsed (xml, csv, xlsx, json).
 * @returns {Promise<Object[]>} - A promise resolving to an array of objects representing the parsed data in a consistent JSON structure.
 */
const genericDataConverter = async (
    filePath: string,
    fileType: 'xml' | 'csv' | 'xlsx' | 'json'
) => {
    // Declare a variable to store the raw data
    let rawData;

    // Handle parsing based on different file types
    switch (fileType.toLowerCase()) {
        case 'xml':
            // Parse the XML file
            rawData = await parseXML(filePath);
            // Extract the 'Product' array from the 'Products' object
            rawData = rawData?.Products?.Product;
            break;
        case 'csv':
            // Parse the CSV file
            rawData = await parseCSV(filePath);
            break;
        case 'xlsx':
            // Parse the XLSX file
            rawData = parseXLSX(filePath);
            break;
        case 'json':
            // Parse the JSON file
            rawData = await parseJSON(filePath);
            break;
        default:
            throw new Error('Unsupported file type');
    }

    // Get the structure mapping from the JSON file based on the file type
    const structure = await parseJSON(
        `./dist/config/mappings/${fileType}-structure.json`
    );

    // Map the data to a consistent JSON structure
    const genericDataStructure = rawData.map((item: any) => ({
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
        const fileType = filePath.split('.').pop() as
            | 'xml'
            | 'csv'
            | 'xlsx'
            | 'json';

        // Invoke the generic data converter
        const genericData = await genericDataConverter(filePath, fileType);

        // Print the output
        console.log('genericData JSON Output:', genericData);
    } catch (error: any) {
        console.error('Error:', error.message);
    }
})();
