import { Tools } from './tools';
import { DarklyService } from '@coldpbc/nest';

describe('Tools', () => {
  it('should be defined', () => {
    expect(new Tools({} as DarklyService)).toBeDefined();
  });
});
