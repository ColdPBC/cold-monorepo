import { ProductCarbonFootprintCalculator } from './pcf_calculator';

describe('ProductCarbonFootprintCalculator', () => {
  it('adds activities and returns per-activity impact', () => {
    const calculator = new ProductCarbonFootprintCalculator();

    const impact = calculator.addActivity('Cotton', 2, 3.5);

    expect(impact).toBe(7);
  });

  it('calculates total impact across activities', () => {
    const calculator = new ProductCarbonFootprintCalculator();
    calculator.addActivity('A', 2, 3);
    calculator.addActivity('B', 4, 0.5);

    expect(calculator.calculateTotal()).toBe(8);
  });

  it('returns per-activity breakdown', () => {
    const calculator = new ProductCarbonFootprintCalculator();
    calculator.addActivity('A', 2, 3);
    calculator.addActivity('B', 4, 0.5);

    expect(calculator.getBreakdown()).toEqual([
      { name: 'A', impact: 6 },
      { name: 'B', impact: 2 },
    ]);
  });
});
