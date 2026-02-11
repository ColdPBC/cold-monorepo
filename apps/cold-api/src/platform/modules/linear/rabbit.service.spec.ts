import { Nack } from '@golevelup/nestjs-rabbitmq';
import { processing_status } from '@prisma/client';
import { LinearRabbitService } from './rabbit.service';

describe('LinearRabbitService', () => {
  const build = () => {
    const linearService = {
      createIngestionIssue: jest.fn(),
      createIngestionFailedIssue: jest.fn(),
    } as any;

    const service = new LinearRabbitService(linearService);
    return { service, linearService };
  };

  it('should be defined', () => {
    const { service } = build();
    expect(service).toBeDefined();
  });

  it('handles MANUAL_REVIEW messages', async () => {
    const { service, linearService } = build();
    linearService.createIngestionIssue.mockResolvedValue({ ok: true });

    const result = await service.subscribe({
      event: processing_status.MANUAL_REVIEW,
      data: JSON.stringify({ id: 'f1' }),
      from: 'tests',
      isRPC: true,
    });

    expect(linearService.createIngestionIssue).toHaveBeenCalledWith({ id: 'f1' });
    expect(result).toEqual({ ok: true });
  });

  it('handles PROCESSING_ERROR messages', async () => {
    const { service, linearService } = build();
    linearService.createIngestionFailedIssue.mockResolvedValue({ ok: true });

    await service.subscribe({
      event: processing_status.PROCESSING_ERROR,
      data: { id: 'f2' },
      from: 'tests',
      isRPC: false,
    });

    expect(linearService.createIngestionFailedIssue).toHaveBeenCalledWith({ id: 'f2' });
  });

  it('returns nack for unknown events', async () => {
    const { service, linearService } = build();

    const result = await service.subscribe({
      event: 'unknown',
      data: {},
      from: 'tests',
      isRPC: false,
    });

    expect(result).toBeInstanceOf(Nack);
    expect(linearService.createIngestionIssue).not.toHaveBeenCalled();
    expect(linearService.createIngestionFailedIssue).not.toHaveBeenCalled();
  });

  it('returns nack on parse errors', async () => {
    const { service } = build();

    const result = await service.subscribe({
      event: processing_status.MANUAL_REVIEW,
      data: '{',
      from: 'tests',
      isRPC: true,
    });

    expect(result).toBeInstanceOf(Nack);
  });
});
