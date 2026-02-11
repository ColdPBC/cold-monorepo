import { MqttController } from './organizations.mqtt.service';

describe('MqttController', () => {
  const build = () => {
    const mqttService = {
      connect: jest.fn(),
      subscribe: jest.fn(),
      onMessage: jest.fn(),
    } as any;
    const config = {} as any;
    const prisma = {} as any;

    const controller = new MqttController(mqttService, config, prisma);
    return { controller, mqttService };
  };

  it('should be defined', () => {
    const { controller } = build();
    expect(controller).toBeDefined();
  });

  it('connects and subscribes on module init', async () => {
    const { controller, mqttService } = build();
    process.env.NODE_ENV = 'test';

    await controller.onModuleInit();

    expect(mqttService.connect).toHaveBeenCalled();
    expect(mqttService.subscribe).toHaveBeenCalledWith('$share/{ShareName}/platform/test/api/#');
    expect(mqttService.onMessage).toHaveBeenCalledWith(expect.any(Function));
  });

  it('onMessage handles unknown topics without throwing', async () => {
    const { controller } = build();

    await expect(controller.onMessage('platform/test/api/unknown', '{}')).resolves.toBeUndefined();
  });
});
