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

    // Map the data to a consistent JSON structure
    const genericDataStructure = rawData.map((item) => ({
        productName: item.CSVProductName || item.JsonProductName || item.ExcelProductName || item.XMLProductName || '',
        price: parseFloat(item.CSVPrice || item.JsonPrice || item.ExcelPrice || item.XMLPrice || 0),
        deliveryDays: parseInt(item.CSVDeliveryDays || item.JsonDeliveryDays || item.ExcelDeliveryDays || item.XMLDeliveryDays || 0, 10),
        description: item.CSVDescription || item.JsonDescription || item.ExcelDescription || item.XMLDescription || '',
        discount: parseFloat(item.CSVDiscount || item.JsonDiscount || item.ExcelDiscount || item.XMLDiscount || 0),
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
