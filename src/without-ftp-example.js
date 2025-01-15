// Imports required parsers
const { parseXML, parseCSV, parseXLSX, parseJSON } = require('./parsers');


/**
 * Generic data converter that can handle CSV, JSON, XLSX, and XML files.
 * It maps the file data to a consistent JSON structure, regardless of the file type.
 * @param {string} filePath - The path to the file to be converted.
 * @param {string} fileType - The type of the file (csv, json, xlsx, xml).
 * @returns {Array} An array of objects, each containing the normalized data.
 */
const genericDataConverter = async (filePath, fileType) => {

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
    const structure = await parseJSON(`config/mappings/${fileType}-structure.json`);

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
        const filePath = 'data/input/sample.xml';

        // Get the actual file type (e.g., xml, json, csv, xlsx)
        const fileType = filePath.split('.').pop();

        // Invoke the generic data converter 
        const genericData = await genericDataConverter(filePath, fileType);

        // Print the output
        console.log('genericData JSON Output:', genericData);

    } catch (error) {
        console.error('Error:', error.message);
    }
})();
