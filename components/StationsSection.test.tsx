import { StationsSection, LOADING_TEXT } from './StationsSection';
import { render } from '../tests/testUtils';
import { screen } from '@testing-library/react';

describe('StationsSection', () => {
  beforeEach(() => {
    render(<StationsSection stations={null} statuses={null} />);
  });
  test('Renders loading', async () => {
    expect(screen.getByText(LOADING_TEXT)).toBeInTheDocument();
  });
});