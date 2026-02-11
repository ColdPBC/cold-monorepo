import { Nack } from '@golevelup/nestjs-rabbitmq';
import { RabbitService } from './rabbit.service';

describe('ServiceDefinitionsRabbitService', () => {
  const build = () => {
    const serviceDefinitions = {
      registerService: jest.fn(),
    } as any;

    const service = new RabbitService(serviceDefinitions);
    return { service, serviceDefinitions };
  };

  it('should be defined', () => {
    const { service } = build();
    expect(service).toBeDefined();
  });

  it('registers a service from event payload', async () => {
    const { service, serviceDefinitions } = build();
    serviceDefinitions.registerService.mockResolvedValue({ id: 's1' });

    const result = await service.subscribe({
      event: 'service.registered',
      data: JSON.stringify({ name: 'svc', service_type: 'provider', label: 'Service', definition: {} }),
      from: 'tests',
      isRPC: true,
    });

    expect(serviceDefinitions.registerService).toHaveBeenCalledWith('svc', 'provider', 'Service', {});
    expect(result).toEqual({ id: 's1' });
  });

  it('returns nack when payload parsing fails', async () => {
    const { service } = build();

    const result = await service.subscribe({
      event: 'service.registered',
      data: '{',
      from: 'tests',
      isRPC: true,
    });

    expect(result).toBeInstanceOf(Nack);
  });
});
