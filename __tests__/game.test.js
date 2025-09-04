const { randomRuns, describePlay } = require('../script');

describe('randomRuns', () => {
  afterEach(() => {
    jest.spyOn(Math, 'random').mockRestore();
  });

  test('returns 0 when random < 0.6', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.59);
    expect(randomRuns()).toBe(0);
  });

  test('returns 1 when random is between 0.6 and 0.8', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.7);
    expect(randomRuns()).toBe(1);
  });

  test('returns 2 when random is between 0.8 and 0.95', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.9);
    expect(randomRuns()).toBe(2);
  });

  test('returns 3 when random >= 0.95', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.97);
    expect(randomRuns()).toBe(3);
  });
});

describe('describePlay', () => {
  afterEach(() => {
    jest.spyOn(Math, 'random').mockRestore();
  });

  const plays = ['hit a single', 'hit a double'];

  test('formats scoring plays with correct pluralization', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0);
    expect(describePlay(plays, 2)).toBe('hit a single for 2 runs!');
  });

  test('formats zero run plays', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.6); // select second play
    expect(describePlay(plays, 0)).toBe('hit a double but fails to score.');
  });
});
