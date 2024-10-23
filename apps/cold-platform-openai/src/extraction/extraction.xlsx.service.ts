import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseWorker, Cuid2Generator, GuidPrefixes, IAuthenticatedUser, PrismaService, S3Service } from '@coldpbc/nest';
import { ConfigService } from '@nestjs/config';
import * as XLSX from 'xlsx';
import * as puppeteer from 'puppeteer';
import { organizations } from '@prisma/client';
import { XlsLoader } from '../langchain/custom_loaders/xls.loader';
import { JSDOM } from 'jsdom';

@Injectable()
export class ExtractionXlsxService extends BaseWorker {
	constructor(readonly config: ConfigService, private readonly prisma: PrismaService, readonly s3: S3Service, readonly xlsLoader: XlsLoader) {
		super(ExtractionXlsxService.name);
	}

	public async convertXLS(bytes: Uint8Array, filePayload: any, user: IAuthenticatedUser, organization: organizations) {
		const browser: puppeteer.Browser = await puppeteer.launch({
			headless: true,
			args: ['--no-sandbox', '--disable-setuid-sandbox'],
		});
		try {
			const workbook = XLSX.read(bytes, { type: 'array' });
			const htmlTables: string[] = [];

			for (const sheetName of workbook.SheetNames) {
				const table = await this.toHTMLTable(workbook, sheetName);
				if (!table) {
					return undefined;
				}

				const trimmedTable = await this.parseTable(table);
				htmlTables.push(trimmedTable);
			}

			const joinedHtmlTables = htmlTables.join('<br />');

			const page = await browser.newPage();
			await page.setContent(joinedHtmlTables);
			const pdfBytes = await page.pdf({ scale: 0.1, displayHeaderFooter: true, outline: true, printBackground: true, format: 'A0', landscape: true });

			// Convert the binary string to a Buffer
			const buffer = Buffer.from(pdfBytes);

			const s3Image = await this.s3.uploadStreamToS3(user, organization.id, {
				originalname: `${filePayload.original_name.toString().replace(`${filePayload.original_name.toString().split('.').pop()}`, 'pdf')}`,
				buffer: buffer,
			});

			const orgFile = await this.prisma.organization_files.upsert({
				where: {
					s3Key: {
						bucket: s3Image.bucket,
						key: s3Image.key,
						organization_id: organization.id,
					},
				},
				create: {
					id: new Cuid2Generator(GuidPrefixes.OrganizationFile).scopedId,
					organization_id: organization.id,
					bucket: s3Image.bucket,
					key: s3Image.key,
					original_name: `${filePayload.original_name.toString().replace(`${filePayload.original_name.toString().split('.').pop()}`, 'pdf')}`,
					mimetype: 'application/pdf',
					encoding: '7bit',
					contentType: 'application/pdf',
					checksum: await S3Service.calculateBufferChecksum(buffer),
					size: buffer.length,
				},
				update: {
					key: s3Image.key,
					original_name: `${filePayload.original_name.toString().replace(`${filePayload.original_name.toString().split('.').pop()}`, 'pdf')}`,
					mimetype: 'application/pdf',
					encoding: '7bit',
					contentType: 'application/pdf',
					checksum: await S3Service.calculateBufferChecksum(buffer),
					size: buffer.length,
				},
			});

			this.logger.info(`converted ${filePayload.original_name} to image ${orgFile.original_name}`, { file: orgFile });

			return { bytes: pdfBytes, file: orgFile };
		} catch (e) {
			this.logger.error(e.message, e);
			if (browser) {
				await browser.disconnect();
				await browser.close();
			}

			return undefined;
		}
	}

	async joinByteArrays(byteArrays: Uint8Array[]) {
		// Concatenate all byte arrays into one
		const totalLength = byteArrays.reduce((acc, byteArray) => acc + byteArray.length, 0);
		const concatenatedArray = new Uint8Array(totalLength);

		let offset = 0;
		for (const byteArray of byteArrays) {
			concatenatedArray.set(byteArray, offset);
			offset += byteArray.length;
		}

		return concatenatedArray;
	}

	async parseTable(html: string) {
		const dom = new JSDOM(html);
		const document = dom.window.document;
		const rows = document.querySelectorAll('tr');

		let rowHasData = false;

		const rowsToStrip: Element[] = [];

		rows.forEach(row => {
			const cells = row.querySelectorAll('td');
			cells.forEach(cell => {
				const dataValue = cell.getAttribute('data-v');
				const dataType = cell.getAttribute('data-t');
				if (dataType && dataValue && dataValue !== '0' && dataType !== 'n') {
					rowHasData = true;
				} else {
					cell.remove();
				}
			});

			if (!rowHasData) {
				rowsToStrip.push(row);
			}
		});

		rowsToStrip.forEach(row => row.remove());

		return document.querySelector('table').outerHTML;
	}

	toHTMLTable = async (workbook: XLSX.WorkBook, sheetName) => {
		const sheet = workbook.Sheets[sheetName];
		const table = XLSX.utils.sheet_to_html(sheet);
		return table;
	};

	// Function to convert HTML table to image
	async htmlTableToImage(htmlTable: string) {
		try {
			const browser = await puppeteer.launch();
			const page = await browser.newPage();
			await page.setContent(htmlTable);
			const element = await page.$('table');
			// @ts-expect-error - unknnown
			const imageBytes = await element.screenshot({ type: 'png', encoding: 'binary' });
			await browser.close();

			return imageBytes;
		} catch (e) {
			this.logger.error(e.message, e);
			return undefined;
		}
	}
}
