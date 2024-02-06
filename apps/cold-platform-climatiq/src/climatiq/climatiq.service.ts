import { Injectable } from '@nestjs/common';
import { BaseWorker, PrismaService } from '@coldpbc/nest';
import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig } from 'axios';

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

  constructor(private readonly config: ConfigService, private readonly axios: HttpService, private readonly prisma: PrismaService) {
    super(ClimatiqService.name);

    this.axiosConfig = {
      headers: {
        Authorization: '',
      },
    };

    this.axiosConfig.headers.Authorization = `Bearer ${this.config.getOrThrow('CLIMATIQ_API_KEY')}`;

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

    const emission = response.data;

    return emission;
  }

  async getComputeMetadata() {
    return this.axios.get('https://api.climatiq.io/compute', this.axiosConfig);
  }
}
