import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import Pokedex from '../components/Pokedex';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('', () => {
  test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ { 4: false } }
    />);

    const text = screen.getByRole('heading', { name: /Encountered pokémons/i, level: 2 });
    expect(text).toBeDefined();
  });
});
