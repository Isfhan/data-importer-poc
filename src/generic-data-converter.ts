// Imports required parsers
import { parseXML, parseCSV, parseXLSX, parseJSON } from './parsers.js';

// Imports uuid
import { v4 as generateUUID } from 'uuid';

// Imports types
import { FileType } from './types/index.js';
import type { SupabaseClient } from '@supabase/supabase-js';

class DataConverter {
    // Private properties
    private supabase: SupabaseClient<any, 'test', any>;
    private entityId: string;
    private filePath: string;
    private fileType: FileType;

    /**
     * Constructor for the DataConverter class.
     * @param {SupabaseClient} supabase - The Supabase client instance.
     * @param {string} entityId - The ID of the entity to which the data should be imported.
     * @param {string} filePath - The path to the file to be converted.
     * @param {FileType} fileType - The type of the file to be converted.
     */
    constructor(
        supabase: SupabaseClient<any, 'test', any>,
        entityId: string,
        filePath: string,
        fileType: FileType
    ) {
        this.supabase = supabase;
        this.entityId = entityId;
        this.filePath = filePath;
        this.fileType = fileType;
    }

    /**
     * Retrieves the raw data from a file of a given type.
     * @returns {Promise<any>} - A promise that resolves to the raw data.
     */
    private async getRawData() {
        switch (this.fileType.toLowerCase()) {
            case 'xml':
                // Parse the XML
                const response = await parseXML(this.filePath);
                // Select the 'Products' node
                const data = response?.Products.Product || [];
                // Return the data
                return Array.isArray(data)
                    ? data
                    : [
                          {
                              ...data,
                          },
                      ];
            case 'csv':
                // Parse the CSV
                return await parseCSV(this.filePath);
            case 'xlsx':
                // Parse the XLSX
                return parseXLSX(this.filePath);
            case 'json':
                // Parse the JSON
                return await parseJSON(this.filePath);
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
    private createGenericDataStructure(
        structure: { [genericFieldName: string]: string },
        rawData: any[]
    ): { [genericFieldName: string]: string }[] {
        // Return the mapped data
        return rawData.map((item) => {
            // Initialize the mapped item object
            const mappedItem: { [key: string]: string } = {};

            // Loop through the structure and add the values to the mapped item
            for (const [genericFieldName, dataColumnName] of Object.entries(
                structure
            )) {
                // Handle the id field
                if (genericFieldName === 'id') {
                    // If the value is not present so generate a uuid
                    if (
                        ['', null, undefined].includes(
                            item[dataColumnName]?.trim()
                        )
                    ) {
                        // Generate a UUID and add it to the mapped item
                        mappedItem[genericFieldName] = generateUUID();
                    } else {
                        // Add the value to the mapped item
                        mappedItem[genericFieldName] = item[dataColumnName];
                    }
                } else {
                    // Only add the value if is exists
                    if (item[dataColumnName]) {
                        // Add the value to the mapped item
                        mappedItem[genericFieldName] = item[dataColumnName];
                    }
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
    public async convertData(): Promise<
        { [genericFieldName: string]: string }[]
    > {
        // Get the raw data from the file
        const rawData = await this.getRawData();

        // Get the mapping structure json from supabase
        const { data, error } = await this.supabase
            .from('entities')
            .select('file_type,mapping_config')
            .eq('id', this.entityId)
            .single();

        // Check if there is an error
        if (error) {
            throw new Error(`Entity mapping error: ${error.message}`);
        }

        // Get the mapping structure json
        const structure: { [genericFieldName: string]: string } =
            data?.mapping_config;

        // Map the raw data to the structure and convert it to JSON
        return this.createGenericDataStructure(structure, rawData);
    }
}

export default DataConverter;
