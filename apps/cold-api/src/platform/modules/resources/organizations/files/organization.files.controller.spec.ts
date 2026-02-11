import { OrganizationFilesController } from './organization.files.controller';
import { OrganizationFilesService } from './organization.files.service';
import { S3Service } from '@coldpbc/nest';

describe('OrganizationFilesController', () => {
  let controller: OrganizationFilesController;

  const service = {
    getFiles: jest.fn(),
    getUrl: jest.fn(),
    deleteFile: jest.fn(),
    uploadFile: jest.fn(),
    importData: jest.fn(),
    update: jest.fn(),
  };

  const s3 = { client: {} };
  beforeEach(() => {
    jest.clearAllMocks();
    controller = new OrganizationFilesController(service as unknown as OrganizationFilesService, s3 as unknown as S3Service);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('onModuleInit sets multer config', async () => {
    await controller.onModuleInit();
    expect(controller.multerConfig).toBeDefined();
    expect(controller.multerConfig.storage).toBeDefined();
  });

  it('getFiles delegates to service', async () => {
    service.getFiles.mockResolvedValue('ok');
    const req = { user: { id: 'u1' } } as any;

    await expect(controller.getFiles('org1', req, true)).resolves.toBe('ok');
    expect(service.getFiles).toHaveBeenCalledWith(req, 'org1', true);
  });

  it('getUrl delegates to service', async () => {
    service.getUrl.mockResolvedValue('url');
    const req = {} as any;

    await expect(controller.getUrl('org1', 'file1', req)).resolves.toBe('url');
    expect(service.getUrl).toHaveBeenCalledWith(req, 'file1');
  });

  it('deleteFile delegates to service', async () => {
    service.deleteFile.mockResolvedValue('deleted');
    const req = {} as any;

    await expect(controller.deleteFile('org1', 'file1', req)).resolves.toBe('deleted');
    expect(service.deleteFile).toHaveBeenCalledWith(req, 'org1', ['file1']);
  });

  it('uploadFile delegates to service', async () => {
    service.uploadFile.mockResolvedValue('uploaded');
    const req = {} as any;
    const files = [{ originalname: 'a.csv' }] as any;

    await expect(controller.uploadFile('org1', 'SDS' as any, files, req)).resolves.toBe('uploaded');
    expect(service.uploadFile).toHaveBeenCalledWith(req, 'org1', files, 'SDS');
  });

  it('uploadFile wraps service errors', async () => {
    service.uploadFile.mockImplementation(() => {
      throw new Error('boom');
    });

    await expect(controller.uploadFile('org1', 'SDS' as any, [] as any, {} as any)).rejects.toThrow('Failed to process the uploaded file.');
  });

  it('import delegates to service', async () => {
    service.importData.mockResolvedValue('imported');
    const req = {} as any;
    const files = [{ originalname: 'in.csv' }] as any;

    await expect(controller.import('org1', files, req)).resolves.toBe('imported');
    expect(service.importData).toHaveBeenCalledWith(req, 'org1', files);
  });

  it('import wraps service errors', async () => {
    service.importData.mockImplementation(() => {
      throw new Error('boom');
    });

    await expect(controller.import('org1', [] as any, {} as any)).rejects.toThrow('Failed to process the uploaded file.');
  });

  it('updateFile delegates to service', async () => {
    service.update.mockResolvedValue('updated');
    const req = {} as any;
    const data = { type: 'SDS' };

    await expect(controller.updateFile('org1', 'file1', data, req)).resolves.toBe('updated');
    expect(service.update).toHaveBeenCalledWith(req, 'file1', data);
  });
});
