import { loadMap } from './GoogleMapInit';

describe('GoogleMapInit', () => {
  test('Throws error when key is not defined', () => {
    expect(() => {
      loadMap();
    }).toThrow('No api key defined');
  });
});
