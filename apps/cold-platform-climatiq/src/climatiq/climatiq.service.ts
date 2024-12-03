import { Injectable } from '@nestjs/common';
import { BaseWorker, PrismaService } from '@coldpbc/nest';
import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig } from 'axios';
import { ConfigService } from '@nestjs/config';
import { pick } from 'lodash';

export type EnergyPayload = {
	emission_factor: {
		activity_id: string;
		data_version?: string;
		region?: string;
	};
	parameters: {
		energy: number;
		energy_unit: string;
	};
};

@Injectable()
export class ClimatiqService extends BaseWorker {
	axiosConfig: AxiosRequestConfig;
	energyPayload: EnergyPayload;

	sectorList = ['Consumer Goods and Services', 'Transport', 'Land Use', 'Materials and Manufacturing', 'Waste'];

	constructor(private readonly config: ConfigService, private readonly axios: HttpService, private readonly prisma: PrismaService) {
		super(ClimatiqService.name);

		this.axiosConfig = {
			headers: {
				Authorization: `Bearer ${this.config.get('CLIMATIQ_API_KEY')}`,
			},
		};

		this.energyPayload = {
			emission_factor: {
				activity_id: 'electricity-supply_grid-source_residual_mix',
				data_version: '^1',
				region: 'US',
			},
			parameters: {
				energy: 0,
				energy_unit: 'kWh',
			},
		};
	}

	async getEmissionEstimate(data: EnergyPayload) {
		const response = await this.axios.post('https://beta4.api.climatiq.io/estimate', data, this.axiosConfig).toPromise();

		if (!response?.data) {
			return null;
		}

		const emission = response.data;

		return emission;
	}

	async getComputeMetadata() {
		return this.axios.get('https://api.climatiq.io/compute', this.axiosConfig);
	}

	async syncSectorCategories(req: any, sector: string, region = 'GLOBAL', category?: string, version?: string): Promise<void> {
		if (!sector) {
			for (const sectorKey of this.sectorList) {
				await this.syncSectorCategories(req, sectorKey, region);
			}
			return;
		}

		const dataVersion = version || '^19';
		const params = { sector, data_version: dataVersion, page: 1, region };
		const endpoint = 'https://api.climatiq.io/search';

		try {
			await this.syncPagedActvities(endpoint, params);
		} catch (e: any) {
			this.logger.error(e.message);
		}
	}

	private async syncPagedActvities(endpoint: string, params: any): Promise<void> {
		let hasNextPage = true;
		let page = 1;

		while (hasNextPage) {
			this.logger.info(`Syncing sector categories for ${params.sector} - page ${page}`, params);

			const response = await this.axios.axiosRef.get(endpoint, {
				headers: this.axiosConfig.headers,
				params: { ...params, page },
			});

			const data = response.data;
			hasNextPage = page < data.last_page;

			if (data.results) {
				await this.processResponseData(data.results, params);
			}

			page++;
		}
	}

	private async processResponseData(results: any[], params: any): Promise<void> {
		for (const item of results) {
			if (item.sector === params.sector) {
				const activity = await this.prisma.climatiq_actvities.upsert({
					where: { id: item.id },
					update: { ...item },
					create: { ...item },
				});

				this.logger.info(`Synced sector category ${activity.name}`, { ...pick(activity, ['activity_id', 'sector', 'name']), params });
			}
		}
	}
}
