import { OrganizationComplianceNoteFilesService } from './organization_compliance_note_files.service';

describe('OrganizationComplianceNoteFilesService', () => {
  let service: OrganizationComplianceNoteFilesService;

  beforeEach(() => {
    service = new OrganizationComplianceNoteFilesService();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create returns expected message', () => {
    expect(service.create({})).toBe('This action adds a new organizationComplianceNoteFile');
  });

  it('findAll returns expected message', () => {
    expect(service.findAll()).toBe('This action returns all organizationComplianceNoteFiles');
  });

  it('findOne returns expected message', () => {
    expect(service.findOne(7)).toBe('This action returns a #7 organizationComplianceNoteFile');
  });

  it('update returns expected message', () => {
    expect(service.update(8, {})).toBe('This action updates a #8 organizationComplianceNoteFile');
  });

  it('remove returns expected message', () => {
    expect(service.remove(9)).toBe('This action removes a #9 organizationComplianceNoteFile');
  });
});
