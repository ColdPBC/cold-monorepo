import puppeteer from 'puppeteer';
import { PDFDocument } from 'pdf-lib';
import { OpenAiBase64ImageUrl } from '../pinecone/pinecone.service';

export async function pdfByteArrayToScreenshots(pdfArray: Uint8Array): Promise<OpenAiBase64ImageUrl[]> {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	// Convert PDF byte array to base64 string
	const pdfBase64 = Buffer.from(pdfArray).toString('base64');
	const dataUrl = `data:application/pdf;base64,${pdfBase64}`;

	// Load the PDF in the page
	await page.goto('about:blank'); // Navigate to a blank page first
	await page.setContent(`<embed src="${dataUrl}" type="application/pdf" width="100%" height="100%">`);

	// Get the number of pages in the PDF
	const pdfLoadDoc = await PDFDocument.load(Buffer.from(pdfArray), { ignoreEncryption: true });
	const pageCount = pdfLoadDoc.getPageCount();

	const screenshots: OpenAiBase64ImageUrl[] = [];

	for (let i = 0; i < pageCount; i++) {
		// Navigate to the specific page
		await page.evaluate(pageNumber => {
			const pdf = document.querySelector('embed');
			if (pdf) {
				pdf.src = `${pdf.src}#page=${pageNumber}`;
			}
		}, i + 1);

		// Take a screenshot of the page
		const screenshot = await page.screenshot({ encoding: 'base64', fullPage: true });
		screenshots.push({
			type: 'image_url',
			image_url: { url: `data:image/png;base64,${screenshot}` },
		});
	}

	await browser.close();
	return screenshots;
}
