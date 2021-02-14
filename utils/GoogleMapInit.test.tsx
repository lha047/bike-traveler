import { loadMap } from './GoogleMapInit';

describe('GoogleMapInit', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules(); // Most important - it clears the cache
    process.env = { ...OLD_ENV }; // Make a copy
  });

  afterAll(() => {
    process.env = OLD_ENV; // Restore old environment
  });
  test('Creates script', () => {
    const res = loadMap();
    expect(res).toBeDefined();
  });

  test('Throws error when key is not defined', () => {
    process.env = { NEXT_PUBLIC_GOOGLE_MAPS_KEY: undefined };
    delete process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;
    expect(() => {
      loadMap();
    }).toThrow('No api key defined');
  });
});
