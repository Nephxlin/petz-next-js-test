import 'jest-styled-components';
import { screen, render } from '@testing-library/react';
import Hero from './index';

describe('Hero component', () => {
  it('renders Hero', () => {
    render(
      <Hero />
    );
    const hero = screen.getByTestId('hero-component')
    expect(hero).toBeInTheDocument();
    expect(hero).toHaveStyleRule('background', `url('/images/pokemon-hero.jpg') no-repeat center`);
    expect(hero).toMatchSnapshot();
  });
});
