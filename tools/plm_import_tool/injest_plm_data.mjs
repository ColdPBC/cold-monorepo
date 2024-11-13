#!/usr/bin/env node

import { z } from 'zod';
import * as xlsx from 'xlsx/xlsx.mjs'
import fs from 'fs';
import * as csv from 'csv-parser';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import * as path from 'path';
import { capitalizeWords } from './utility/string_utilities.mjs';

xlsx.set_fs(fs);


// Command-line argument parsing with yargs
const argv = yargs(hideBin(process.argv))
	.option("input", {
		alias: "i",
		type: "string",
		description: "Path to the input xls/xlsx or csv files",
		demandOption: true,
	})
	.option("schema", {
		alias: "s",
		type: "string",
		description: "Path to the import Zod schema (as a JS/TS file)",
		demandOption: true,
	})
	.option("output", {
		alias: "o",
		type: "string",
		description: "Path to the output CSV file",
	})
	.help()
	.alias("help", "h").argv;

// Define the transformation logic to convert to the injestion format
console.log('Injesting from Schema:', path.resolve(argv.schema));
const { InputSchema } = await import(path.resolve(argv.schema));

console.log('Starting transformation...', path.resolve(argv.input));
// Read the Excel file provided as input
//const workbook = XLSX.readFile(Path.resolve(argv.input));
//const sheetName = workbook.SheetNames[0]; // Assuming the data is in the first sheet
//const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);



// Function to read and parse CSV or Excel files
const parseFile = async (filePath) => {
	if (filePath.endsWith('.csv')) {
		return new Promise((resolve, reject) => {
			const results = [];
			fs.createReadStream(filePath)
				.pipe(csv())
				.on('data', (data) => results.push(data))
				.on('end', () => resolve(results))
				.on('error', (error) => reject(error));
		});
	} else if (filePath.endsWith('.xls') || filePath.endsWith('.xlsx')) {
		const workbook = xlsx.readFile(filePath);
		const sheetName = workbook.SheetNames[0];
		const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
		return sheetData;
	} else {
		throw new Error(`Unsupported file type: ${filePath}`);
	}
};

const transformAndSave = async (inputDirectory, outputDirectory = inputDirectory, transformedSchema) => {
	const files = fs.readdirSync(inputDirectory);
	
	for (const fileName of files) {
		const filePath = path.join(inputDirectory, fileName);
		
		// Skip non-spreadsheet files
		if (!filePath.endsWith('.csv') && !filePath.endsWith('.xls') && !filePath.endsWith('.xlsx')) {
			console.log(`Skipping unsupported file type: ${fileName}`);
			continue;
		}
		
		const failedRows = [];
		try {
			const data = await parseFile(filePath);
			
			// Validate and transform the rows
			let transformedData = data.map((row) => {
				try {
					const validatedRow = InputSchema.parse(row);
					return validatedRow;
				}catch (e) {
					console.error(`Error processing row:`, e.errors);
					failedRows.push(row);
					return null;
				}
			});
			
			
			// remove null rows from transformed data
			transformedData = transformedData.filter(row => row !== null);
			
			// add product_name to each row
			transformedData = transformedData.map(row => {
				row.productName = path.basename(filePath, path.extname(filePath));
				return row;
			});
			
			// Write transformed data to a new CSV
			fs.mkdirSync(`${outputDirectory}/transformed`, { recursive: true });
			const outputFileName = path.join(`${outputDirectory}/transformed`, `${path.basename(filePath, path.extname(filePath))}_transformed.csv`);
			const failedRowsFileName = path.join(`${outputDirectory}/transformed`, `${path.basename(filePath, path.extname(filePath))}_failed.csv`);
			const headers = Object.keys(transformedData[0]);
			const rows = [headers.join(','), ...transformedData.map((row) => headers.map((header) => row[header] || '').join(','))];
			//fs.writeFileSync(failedRowsFileName, failedRows.join(','));
			fs.writeFileSync(outputFileName, rows.join('\n'));
			console.log(`Transformed data saved to: ${outputFileName}`);
		} catch (error) {
			console.error(`Error processing file ${filePath}:`, error.message);
		}
	}
};

await transformAndSave(path.resolve(argv.input), path.resolve(argv.output || argv.input), InputSchema);
