import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente <NotFound.js />', () => {
  test(`Teste se página contém um heading h2 
  com o texto Page requested not found 😭`, () => {
    renderWithRouter(<NotFound />);

    const error = screen.getByRole('heading', { name: /Page requested not found /i,
      level: 2 });
    expect(error).toBeDefined();
  });

  test('Testa se a página mostra a imagem', () => {
    renderWithRouter(<NotFound />);
    const image = screen.getByAltText(
      'Pikachu crying because the page requested was not found',
    );
    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
