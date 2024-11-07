import App from '../components/App';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';

describe('render', () => {
  it('renders the main page', () => {
    render(<App />);
    expect(true).toBeTruthy();
  });
});
