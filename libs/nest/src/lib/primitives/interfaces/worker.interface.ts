import { CpuInfo, NetworkInterfaceInfo } from 'os';

export interface ISystemDetails {
  load_avg: number[];
  up_time: number;
  free_mem: number;
  total_mem: number;
  ips: NodeJS.Dict<NetworkInterfaceInfo[]>;
  cpus: CpuInfo[];
}

export interface IWorkerDetails {
  lib_version: string;
  pkg_version: string;
  pkg_name: string;
  host_name: string;
  home_dir: string;
  system_details: ISystemDetails;
}
