#!/usr/bin/env node

import { z } from 'zod';
import * as XLSX from 'xlsx/xlsx.mjs'
import fs from 'fs';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import * as Path from 'node:path';
XLSX.set_fs(fs);


// Command-line argument parsing with yargs
const argv = yargs(hideBin(process.argv))
	.option("input", {
		alias: "i",
		type: "string",
		description: "Path to the input XLSX file",
		demandOption: true,
	})
	.option("schema", {
		alias: "s",
		type: "string",
		description: "Path to the Zod schema (as a JS/TS file)",
		demandOption: true,
	})
	.option("output", {
		alias: "o",
		type: "string",
		description: "Path to the output CSV file",
		default: "output.csv",
	})
	.help()
	.alias("help", "h").argv;

// Define the transformation logic to convert to the injestion format
console.log('Injesting from Schema:', Path.resolve(argv.schema));
const { InputSchema } = await import(Path.resolve(argv.schema));

console.log('Starting transformation...', Path.resolve(argv.input));
const InjestionSchema = InputSchema.transform(data => {
	// Extract supplier name and country from the supplierInfo field
	const [supplierName, country] = data.supplierInfo ? data.supplierInfo.split(' ').slice(0, 2) : [null, null];

	return {
		productName: data.productName,
		upc: data.sku,
		seasonCode: 'DEFAULT', // Default value
		tier1SupplierName: data.tier1SupplierName || 'Unknown Supplier',
		materialName: data.materialName,
		tier2SupplierName: data.productVendorName,
		tier2SupplierCountry: country || 'Unknown Country',
		blueSignMaterial: 'F', // Defaulted value
	};
});


// Load and parse the Zod schema dynamically

// Read the Excel file provided as input
const workbook = XLSX.readFile(Path.resolve(argv.input));
const sheetName = workbook.SheetNames[0]; // Assuming the data is in the first sheet
const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

// Transform the data using the Zod schema
const transformedData = sheetData.map((row)=> {
	try {
		const result = InputSchema.safeParse(row);
		if(result.success) {
			return result.data;
		} else {
			console.error('Error parsing row:', row, result.error.errors);
			return false;
		}
	} catch (error) {
		console.error('Error parsing row:', row, error.errors);
		process.exit(1);
	}
});

// Convert the transformed data into CSV format
const csvData = [
	Object.keys(transformedData[0]).join(','), // CSV header
	...transformedData.map(row => Object.values(row).join(',')),
].join('\n');

// Write the CSV data to the output file
fs.writeFileSync(argv.output, csvData);
console.log(`Transformation complete! Output saved to ${argv.output}`);
