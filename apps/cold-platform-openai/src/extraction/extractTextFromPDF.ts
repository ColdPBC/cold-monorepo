import { dynamicImport, MinimalNodeModule } from 'tsimportlib';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

async function loadPdfJs() {
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = dirname(__filename);

	const module: MinimalNodeModule = {
		filename: __filename,
	};
	const pdfjs = (await dynamicImport('pdfjs-dist/legacy/build/pdf.mjs', module)) as typeof import('pdfjs-dist');

	return pdfjs;
}
/**
 * Given a PDF, extract and return its text content.
 *
 * @param pdf A buffer containing the PDF contents.
 * @param options
 * @param options.pageSep Optionally specifiy the string used to join pages.
 * @param options.nodeSep Optionally specifiy the string used to join nodes in the document.
 * @returns A string containing the PDF converted to text.
 */
export async function pdfToText(pdf: Buffer | Uint8Array, options?: { pageSep?: string; nodeSep?: string }): Promise<string> {
	const pages = await pdfToPages(pdf, options);
	const pageSep = getStringOptionOrDefault((options || {}).pageSep, '\n\n');
	return pages.map(page => page.text).join(pageSep);
}

export type PageType = {
	page: number;
	text: string;
};

/**
 * Given a PDF, extract and return its pages as a list.
 *
 * @param pdf A buffer containing the PDF contents.
 * @param options
 * @param options.nodeSep Optionally specifiy the string used to join nodes in the document.
 * @returns A list of pages objects containing the page number and text content.
 */
export async function pdfToPages(pdf: Buffer | Uint8Array, options?: { nodeSep?: string }): Promise<PageType[]> {
	pdf = normalizeBuffer(pdf);
	const pdfjs = await loadPdfJs();
	const { getDocument } = pdfjs;
	//const getDocument = await import('pdfjs-dist/build/pdf.mjs');
	const document = await getDocument({
		data: pdf,
		useWorkerFetch: false,
		isEvalSupported: false,
		useSystemFonts: true,
	}).promise;

	const numPages = document.numPages;

	const pages: PageType[] = [];

	try {
		for (let pageNum = 1; pageNum <= numPages; pageNum++) {
			const page = await document.getPage(pageNum);
			try {
				const nodeSep = getStringOptionOrDefault((options || {}).nodeSep, '\n');
				const text = await extractTextFromPage(page, nodeSep);
				pages.push({ page: pageNum, text: text });
				// eslint-disable-next-line no-useless-catch
			} catch (error) {
				throw error;
			} finally {
				page.cleanup();
			}
		}
		// eslint-disable-next-line no-useless-catch
	} catch (error) {
		throw error;
	} finally {
		document.destroy();
	}

	return pages;
}

async function extractTextFromPage(page: any, sep: string) {
	const content = await page.getTextContent();
	return getTextItems(content.items)
		.map(item => item.str)
		.join(sep);
}

function getTextItems(items: Array<any>): any[] {
	return items.filter((item: any) => typeof (item as any).str === 'string') as any[];
}

function getStringOptionOrDefault(option: string | undefined, optionDefault: string) {
	return typeof option === 'string' ? option : optionDefault;
}

function normalizeBuffer(buffer: Buffer | Uint8Array) {
	return buffer instanceof Buffer ? new Uint8Array(buffer.buffer) : buffer;
}

import { promises as fs } from 'fs';
import pdf from 'pdf-parse';

export async function extractPdfText(filePath: string): Promise<string> {
	// Read the file into a buffer
	const dataBuffer = await fs.readFile(filePath);
	try {
		// Attempt to parse the PDF
		const data = await pdf(dataBuffer);

		// Option 1: Check if pdf.js reported that the document is encrypted
		if (data.info && data.info.Encrypted) {
			throw new Error('PDF is encrypted and cannot be read.');
		}

		// Option 2: If pdf-parse throws an error (caught below) or returns an empty text
		if (!data.text || data.text.trim() === '') {
			throw new Error('PDF text could not be extracted. It might be encrypted.');
		}

		return data.text;
	} catch (error: any) {
		// Check if the error message or error name indicates encryption
		if (
			error.name === 'PasswordException' ||
			(error.message && error.message.toLowerCase().includes('password')) ||
			(error.message && error.message.toLowerCase().includes('encrypted'))
		) {
			throw new Error('PDF is encrypted and cannot be read.');
		}
		// Rethrow other errors
		throw error;
	}
}
