# Data Importer POC

This project is a Proof of Concept (POC) for ArrowLine pallets data parsing and normalizing data into a consistent JSON structure and save it in database.

## Features

- **Data Parsing**: Processes input data to extract relevant information.
- **Data Normalization**: Transforms parsed data into a standardized JSON format.
- **Data Storage**: Persists the normalized JSON data into a database.

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Ve2Max/data-importer-poc.git
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

1. **Prepare your input data**: Place your data files in the `src/data/input` directory.

2. **Run build**:
   ```bash
   npm run build
   ```

3. **Run the data normalizer**:

   ```bash
   npm run start
   ```