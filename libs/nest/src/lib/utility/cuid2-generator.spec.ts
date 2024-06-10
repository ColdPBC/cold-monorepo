/**
 * Unit tests for the `Cuid2Generator` Class' methods defined in `cuid2-generator.service.ts` file.
 */
import { Cuid2Generator } from './cuid2-generator.service';
import { GuidPrefixes } from '../repositories';

describe('Cuid2Generator', () => {
  beforeEach(() => {});

  describe('isColdCuid2', () => {
    for (const guidPrefixesKey in GuidPrefixes) {
      const cuid2Generator = new Cuid2Generator(GuidPrefixes[guidPrefixesKey]);
      const id = cuid2Generator.scopedId;
      console.log('id', id);
      const justID = cuid2Generator.id;

      it(`should return true if the id starts with '${cuid2Generator.prefix}_' and the second part is a valid CUID`, () => {
        expect(Cuid2Generator.isCUID2(justID)).toEqual(true);
        expect(Cuid2Generator.isColdCuid2(id)).toEqual(true);
      });
    }

    it('should return false if the second part of the ID is not a valid CUID', () => {
      const id = `${new Cuid2Generator(GuidPrefixes.OrganizationComplianceStatus)}_notAValidCUID`;
      expect(Cuid2Generator.isColdCuid2(id)).toEqual(false);
    });

    it('should return false if the ID does not start with a guidPrefixes key', () => {
      const id = `notAPrefix_${new Cuid2Generator(GuidPrefixes.Organization).id}`;
      expect(Cuid2Generator.isColdCuid2(id)).toEqual(false);
    });
  });
});
