# Data Normalizer POC

This project is a Proof of Concept (POC) for parsing and normalizing data into a consistent JSON structure.

## Features

- **Data Parsing**: Processes input data to extract relevant information.
- **Data Normalization**: Transforms parsed data into a standardized JSON format.

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Isfhan/data-normalizer-poc.git
   ```

2. **Navigate to the project directory**:

   ```bash
   cd data-normalizer-poc
   ```

3. **Install dependencies**:

   ```bash
   npm install
   ```

## Usage

1. **Prepare your input data**: Place your data files in the `data/input` directory.

2. **Run the data normalizer**:

   ```bash
   npm start
   ```

<!-- 3. **Output**: The normalized JSON data will be available in the `data/output` directory. -->

## Project Structure

```plaintext
data-normalizer-poc/
├── config/             # Configuration files
├── data/
│   ├── input/          # Input data files
│   └── output/         # Output normalized JSON files
├── src/                # Source code
├── .gitignore          # Git ignore file
├── package-lock.json   # Package lock file
├── package.json        # Package configuration
```