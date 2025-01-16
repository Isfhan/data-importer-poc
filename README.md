# Data Importer POC

This project is a Proof of Concept (POC) for ArrowLine pallets data parsing and normalizing data into a consistent JSON structure and save it in database.

## Features

- **Data Parsing**: Processes input data to extract relevant information.
- **Data Normalization**: Transforms parsed data into a standardized JSON format.

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Ve2Max/data-normalizer-poc.git
   ```

2. **Navigate to the project directory**:

   ```bash
   cd data-importer-poc
   ```

3. **Install dependencies**:

   ```bash
   npm install
   ```

## Usage

1. **Prepare your input data**: Place your data files in the `data/input` directory.

2. **Run the data normalizer**:

   ```bash
   node src/without-ftp-example.js
   ```

<!-- 3. **Output**: The normalized JSON data will be available in the `data/output` directory. -->

## Project Structure

```plaintext
data-importer-poc/
├── config/             # Configuration files
├── data/
│   ├── input/          # Input data files
│   └── output/         # Output normalized JSON files
├── src/                # Source code
├── .gitignore          # Git ignore file
├── package-lock.json   # Package lock file
├── package.json        # Package configuration
```