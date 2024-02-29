import { SurveyFilterService } from './survey.filter.service';
import { empty_survey } from './fixtures/mocks';
import { set } from 'lodash';

describe('SurveyFilterService', () => {
  let service: SurveyFilterService;

  beforeEach(async () => {
    service = new SurveyFilterService();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('testing progress filter', () => {
    it('empty survey should return empty progress', async () => {
      const response = await service.filterDependencies(empty_survey);
      expect(response.progress).toBeDefined();
      expect(response.progress).toMatchSnapshot();
    });
    describe('answering MFG questions', () => {
      it('1 Answer: should match snapshot', async () => {
        const mfg_1_true = Object.assign({}, empty_survey);
        set(mfg_1_true.sections['MFG'].follow_up['MFG-1'], 'value', true);

        const response = await service.filterDependencies(mfg_1_true);
        expect(response.progress).toMatchSnapshot();
      });
      it('2 Answers: should match snapshot', async () => {
        const mfg_1_true = Object.assign({}, empty_survey);
        set(mfg_1_true.sections['MFG'].follow_up['MFG-1'], 'value', true);
        set(mfg_1_true.sections['MFG'].follow_up['MFG-2'], 'value', true);

        const response = await service.filterDependencies(mfg_1_true);
        expect(response.progress).toMatchSnapshot();
      });
      it('3 Answers: should match snapshot', async () => {
        const mfg_1_true = Object.assign({}, empty_survey);
        set(mfg_1_true.sections['MFG'].follow_up['MFG-1'], 'value', true);
        set(mfg_1_true.sections['MFG'].follow_up['MFG-2'], 'value', true);

        const response = await service.filterDependencies(mfg_1_true);
        expect(response.progress).toMatchSnapshot();
      });
      it('4 Answers: should match snapshot', async () => {
        const mfg_1_true = Object.assign({}, empty_survey);
        set(mfg_1_true.sections['MFG'].follow_up['MFG-1'], 'value', true);
        set(mfg_1_true.sections['MFG'].follow_up['MFG-2'], 'value', true);
        set(mfg_1_true.sections['MFG'].follow_up['MFG-3'], 'value', true);
        set(mfg_1_true.sections['MFG'].follow_up['MFG-4'], 'value', true);

        const response = await service.filterDependencies(mfg_1_true);
        expect(response.progress).toMatchSnapshot();
      });
    });
    describe('simulating AI answers', () => {
      it('Should contain 0 review items', async () => {
        const ai_sample = Object.assign({}, empty_survey);
        set(ai_sample.sections['MFG'].follow_up['MFG-1'], 'ai_response.answer', true);

        const response = await service.filterDependencies(ai_sample);
        expect(response.progress).toMatchSnapshot();
      });
      it('Should contain 1 review items', async () => {
        const ai_sample2: any = Object.assign({}, empty_survey);
        set(ai_sample2.sections['MFG'].follow_up['MFG-1'], 'ai_response.answer', true);
        set(ai_sample2.sections['MFG'].follow_up['MFG-2'], 'ai_response.answer', 'test answer');
        set(ai_sample2.sections['MFG'].follow_up['MFG-1'], 'value', true);

        delete ai_sample2.sections['MFG'].follow_up['MFG-2'].value;
        delete ai_sample2.sections['MFG'].follow_up['MFG-3'].value;
        delete ai_sample2.sections['MFG'].follow_up['MFG-4'].value;

        const response = await service.filterDependencies(ai_sample2);
        expect(response.progress).toMatchSnapshot();
      });
      it('Should contain 2 review items', async () => {
        const ai_sample3: any = Object.assign({}, empty_survey);
        set(ai_sample3.sections['MFG'].follow_up['MFG-1'], 'ai_response.answer', true);
        set(ai_sample3.sections['MFG'].follow_up['MFG-2'], 'ai_response.answer', true);
        set(ai_sample3.sections['MFG'].follow_up['MFG-3'], 'ai_response.answer', true);
        set(ai_sample3.sections['MFG'].follow_up['MFG-1'], 'value', true);
        delete ai_sample3.sections['MFG'].follow_up['MFG-2'].value;
        delete ai_sample3.sections['MFG'].follow_up['MFG-3'].value;
        delete ai_sample3.sections['MFG'].follow_up['MFG-4'].value;

        const response = await service.filterDependencies(ai_sample3);
        expect(response.progress).toMatchSnapshot();
      });
      it('Should contain 3 review items', async () => {
        const ai_sample4: any = Object.assign({}, empty_survey);
        set(ai_sample4.sections['MFG'].follow_up['MFG-1'], 'ai_response.answer', true);
        set(ai_sample4.sections['MFG'].follow_up['MFG-2'], 'ai_response.answer', true);
        set(ai_sample4.sections['MFG'].follow_up['MFG-3'], 'ai_response.answer', true);
        set(ai_sample4.sections['MFG'].follow_up['MFG-4'], 'ai_response.answer', true);
        set(ai_sample4.sections['MFG'].follow_up['MFG-1'], 'value', true);
        delete ai_sample4.sections['MFG'].follow_up['MFG-2'].value;
        delete ai_sample4.sections['MFG'].follow_up['MFG-3'].value;
        delete ai_sample4.sections['MFG'].follow_up['MFG-4'].value;

        const response = await service.filterDependencies(ai_sample4);
        expect(response.progress).toMatchSnapshot();
      });
    });
  });
  describe('testing boolean values', () => {
    describe('setting MFG-1 to true', () => {
      it('survey should contain MFG-2', async () => {
        const mfg_1_true = Object.assign({}, empty_survey);
        set(mfg_1_true.sections['MFG'].follow_up['MFG-1'], 'value', true);

        const response = await service.filterDependencies(mfg_1_true);
        expect(response.sections.MFG.follow_up['MFG-2']).toBeDefined();
      });
      it('survey should contain MFG-3', async () => {
        const mfg_1_true = Object.assign({}, empty_survey);
        set(mfg_1_true.sections['MFG'].follow_up['MFG-1'], 'value', true);

        const response = await service.filterDependencies(mfg_1_true);
        expect(response.sections.MFG.follow_up['MFG-3']).toBeDefined();
      });
      it('survey should contain MFG-4', async () => {
        const mfg_1_true = Object.assign({}, empty_survey);
        set(mfg_1_true.sections['MFG'].follow_up['MFG-1'], 'value', true);

        const response = await service.filterDependencies(mfg_1_true);
        expect(response.sections.MFG.follow_up['MFG-4']).toBeDefined();
      });
    });

    describe('setting MFG-1 to false', () => {
      it('survey should not contain MFG-2', async () => {
        const mfg_1_false = Object.assign({}, empty_survey);
        set(mfg_1_false.sections['MFG'].follow_up['MFG-1'], 'value', false);

        const response = await service.filterDependencies(mfg_1_false);
        expect(response.sections.MFG.follow_up['MFG-2']).toBeUndefined();
      });
      it('survey should not contain MFG-3', async () => {
        const mfg_1_false = Object.assign({}, empty_survey);
        set(mfg_1_false.sections['MFG'].follow_up['MFG-1'], 'value', false);

        const response = await service.filterDependencies(mfg_1_false);
        expect(response.sections.MFG.follow_up['MFG-3']).toBeUndefined();
      });
      it('survey should not contain MFG-4', async () => {
        const mfg_1_false = Object.assign({}, empty_survey);
        set(mfg_1_false.sections['MFG'].follow_up['MFG-1'], 'value', false);

        const response = await service.filterDependencies(mfg_1_false);
        expect(response.sections.MFG.follow_up['MFG-4']).toBeUndefined();
      });
    });
  });

  describe('testing numerical values', () => {
    it('survey should contain APK-3', async () => {
      const numeric = Object.assign({}, empty_survey);
      set(numeric.sections['APK'].follow_up['APK-1'], 'value', 50);
      set(numeric.sections['APK'].follow_up['APK-2'], 'value', 100);

      const response = await service.filterDependencies(numeric);
      expect(response.sections.APK.follow_up['APK-3']).toBeDefined();
    });

    it('survey should contain APK-7', async () => {
      const numeric = Object.assign({}, empty_survey);
      set(numeric.sections['APK'].follow_up['APK-1'], 'value', 50);
      set(numeric.sections['APK'].follow_up['APK-2'], 'value', 100);

      const response = await service.filterDependencies(numeric);
      expect(response.sections.APK.follow_up['APK-7']).toBeDefined();
    });

    it('survey should not contain APK-8', async () => {
      const numeric = Object.assign({}, empty_survey);
      set(numeric.sections['APK'].follow_up['APK-1'], 'value', 50);
      set(numeric.sections['APK'].follow_up['APK-2'], 'value', 100);

      const response = await service.filterDependencies(numeric);
      expect(response.sections.APK.follow_up['APK-8']).toBeUndefined();
    });
  });

  describe('testing array values', () => {
    const valid_select_value = ['Apparel', 'Footwear', 'Packs', 'Ski wax', 'Sleeping bags', 'Tents', 'Treatments for gear and clothing'];
    const invalid_select_value = [
      'Accessories (textile-based)',
      'Cookware',
      'Headwear',
      'Other textile products',
      'Products that contain down',
      'Products that contain leather',
      'Products that contain wool',
      'Sunscreens or other formulated sun-protection products',
      'Water bottles, food containers, dinnerware or utensils',
      'None of the above',
    ];

    for (const value of valid_select_value) {
      describe(`setting GEN-8 selection to: ${value}`, () => {
        it(`survey should contain PFAS-A1`, async () => {
          const select_value = Object.assign({}, empty_survey);

          set(select_value.sections['GEN'].follow_up['GEN-8'], 'value', [`${value}`]);
          const response = await service.filterDependencies(select_value);
          expect(response.sections.PFAS.follow_up['PFAS-A1']).toBeDefined();
        });
      });
    }

    for (const value of invalid_select_value) {
      describe(`setting GEN-8 selection to: ${value}`, () => {
        it(`survey should not contain PFAS-A1`, async () => {
          const select_value = Object.assign({}, empty_survey);

          set(select_value.sections['GEN'].follow_up['GEN-8'], 'value', [`${value}`]);
          const response = await service.filterDependencies(select_value);
          expect(response.sections.PFAS).toBeUndefined();
        });
      });
    }

    describe('setting multiple GEN-8 selections', () => {
      it(`if all valid selections, survey should contain PFAS-A1`, async () => {
        const select_value = Object.assign({}, empty_survey);

        set(select_value.sections['GEN'].follow_up['GEN-8'], 'value', ['Apparel', 'Footwear', 'Packs']);
        const response = await service.filterDependencies(select_value);
        expect(response.sections.PFAS.follow_up['PFAS-A1']).toBeDefined();
      });
      it(`if mixed valid and invalid, survey should contain PFAS-A1`, async () => {
        const select_value = Object.assign({}, empty_survey);

        set(select_value.sections['GEN'].follow_up['GEN-8'], 'value', ['Apparel', 'Footwear', 'Packs', 'None of the above']);
        const response = await service.filterDependencies(select_value);
        expect(response.sections.PFAS.follow_up['PFAS-A1']).toBeDefined();
      });
      it(`if all invalid, survey should not contain PFAS-A1`, async () => {
        const select_value = Object.assign({}, empty_survey);

        set(select_value.sections['GEN'].follow_up['GEN-8'], 'value', ['Products that contain down', 'Products that contain leather', 'Products that contain wool']);
        const response = await service.filterDependencies(select_value);
        expect(response.sections.PFAS).toBeUndefined();
      });
    });

    describe('testing section filter', () => {
      describe('setting GEN-8 selection to: Products that contain down', () => {
        it('survey should contain DWN section', async () => {
          const section_filter = Object.assign({}, empty_survey);

          set(section_filter.sections['GEN'].follow_up['GEN-8'], 'value', ['Products that contain down']);
          const dwnResponse = await service.filterDependencies(section_filter);
          expect(dwnResponse.sections['DWN']).toBeDefined();
        });
      });

      describe('setting GEN-8 selection to: Apparel', () => {
        it('survey should NOT contain DWN section', async () => {
          const no_down = Object.assign({}, empty_survey);
          set(no_down.sections['GEN'].follow_up['GEN-8'], 'value', ['Apparel']);

          const dwnResponse = await service.filterDependencies(no_down);
          expect(dwnResponse.sections['DWN']).toBeUndefined();
        });
      });
    });
  });
  describe('survey with no values', () => {
    it('should contain no dependencies', async () => {
      const no_dependencies = Object.assign({}, empty_survey);
      const response = await service.filterDependencies(no_dependencies);

      expect(response).toMatchSnapshot();
    });
  });
});
