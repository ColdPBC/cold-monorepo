import { Injectable } from '@nestjs/common';
import { BaseWorker } from '@coldpbc/nest';
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

  constructor(private readonly axios: HttpService) {
    super(ClimatiqService.name);

    this.axiosConfig = {
      headers: {
        Authorization: '',
      },
    };

    this.axiosConfig.headers.Authorization = `Bearer ${process.env.CLIMATIQ_API_KEY}`;

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

  getEmissionEstimate(data: EnergyPayload) {
    return this.axios.post('https://api.climatiq.io/estimate', data, this.axiosConfig);
  }

  async getComputeMetadata() {
    return this.axios.get('https://api.climatiq.io/compute', this.axiosConfig);
  }
}
