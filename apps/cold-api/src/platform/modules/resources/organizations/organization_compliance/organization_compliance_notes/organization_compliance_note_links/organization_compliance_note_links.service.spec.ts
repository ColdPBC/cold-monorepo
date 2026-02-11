import { OrganizationComplianceNoteLinksService } from './organization_compliance_note_links.service';

describe('OrganizationComplianceNoteLinksService', () => {
  let service: OrganizationComplianceNoteLinksService;

  beforeEach(() => {
    service = new OrganizationComplianceNoteLinksService();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create returns expected message', () => {
    expect(service.create({} as any)).toBe('This action adds a new organizationComplianceNoteLink');
  });

  it('findAll returns expected message', () => {
    expect(service.findAll()).toBe('This action returns all organizationComplianceNoteLinks');
  });

  it('findOne returns expected message', () => {
    expect(service.findOne(7)).toBe('This action returns a #7 organizationComplianceNoteLink');
  });

  it('update returns expected message', () => {
    expect(service.update(8, {} as any)).toBe('This action updates a #8 organizationComplianceNoteLink');
  });

  it('remove returns expected message', () => {
    expect(service.remove(9)).toBe('This action removes a #9 organizationComplianceNoteLink');
  });
});
