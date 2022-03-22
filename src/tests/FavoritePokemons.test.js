import React from 'react';
import { screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente <FavoritePokemons.js />', () => {
  test(`Testa se é exibido na tela a mensagem 
  No favorite pokemon found, se a pessoa não tiver pokémons favoritos.`, () => {
    renderWithRouter(<FavoritePokemons />);

    const mesage = screen.getByText('No favorite pokemon found');

    expect(mesage).toBeDefined();
  });

  test('Testa se é exibido todos os cards de pokémons favoritados.', () => {
    const favorite = [
      {
        id: 65,
        name: 'Alakazam',
        type: 'Psychic',
        averageWeight: {
          value: '48.0',
          measurementUnit: 'kg',
        },
        image: 'https://cdn2.bulbagarden.net/upload/8/88/Spr_5b_065_m.png',
        moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Alakazam_(Pok%C3%A9mon)',
        foundAt: [
          {
            location: 'Unova Accumula Town',
            map: 'https://cdn2.bulbagarden.net/upload/4/44/Unova_Accumula_Town_Map.png',
          },
        ],
        summary: 'Closing both its eyes heightens all its other senses. '
        + 'This enables it to use its abilities to their extremes.',
      },
    ];
    renderWithRouter(<FavoritePokemons pokemons={ favorite } />);

    const pokemon = screen.getByText('Alakazam');
    expect(pokemon).toBeInTheDocument();
  });
});
