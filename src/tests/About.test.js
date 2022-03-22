import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente About', () => {
  test('Testa se a página contém um heading h2 com o texto About Pokédex.', () => {
    renderWithRouter(<About />);
    const pokedexText = screen.getByRole('heading', { name: /About Pokédex/i, level: 2 });
    expect(pokedexText).toBeDefined();
  });
  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    renderWithRouter(<About />);
    const text1 = 'This application simulates a Pokédex,';
    const text2 = ' a digital encyclopedia containing all Pokémons';
    const text3 = text1 + text2;

    const paragraph1 = screen.getByText(text3);
    const paragraph2 = screen.getByText(
      'One can filter Pokémons by type, and see more details for each one of them',
    );

    expect(paragraph1).toBeDefined();
    expect(paragraph2).toBeDefined();
  });
  test('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    renderWithRouter(<About />);

    const image = screen.getByAltText('Pokédex');
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
