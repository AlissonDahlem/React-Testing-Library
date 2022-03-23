import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import PokemonDetails from '../components/PokemonDetails';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';
import { updateFavoritePokemons } from '../services/pokedexService';
import App from '../App';

const favPokemons = { 4: false };
const idPokemon = { params: { id: '4' } };
const charmander = pokemons[1];

describe('Testa o componente <PokemonDetails.js />', () => {
  test('Verifica se as informações detalhadas do pokémon aparece na tela', () => {
    renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={ favPokemons }
        match={ idPokemon }
        pokemons={ pokemons }
        onUpdateFavoritePokemons={ updateFavoritePokemons }
      />,
    );

    const name = screen.getByRole('heading', {
      name: `${charmander.name} Details`,
      level: 2,
    });
    expect(name).toBeInTheDocument();

    const linkDetails = screen.queryByRole('link', {
      name: 'More details',
    });
    expect(linkDetails).toBeNull();

    const summary = screen.getByRole('heading', {
      name: 'Summary', level: 2,
    });
    expect(summary).toBeInTheDocument();

    const resum = screen.getByText(charmander.summary);
    expect(resum).toBeInTheDocument();
  });

  test('Verifica se existe seção com os mapas contendo localição do pokemon', () => {
    renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={ favPokemons }
        match={ idPokemon }
        pokemons={ pokemons }
        onUpdateFavoritePokemons={ updateFavoritePokemons }
      />,
    );

    const locationTitle = screen.getByRole('heading', {
      name: `Game Locations of ${charmander.name}`,
      level: 2,
    });
    expect(locationTitle).toBeInTheDocument();

    const { foundAt } = charmander;
    const images = screen.getAllByAltText(`${charmander.name} location`);
    // tive que pegar todas as imagens antes para testar no loop;

    foundAt.forEach((local, index) => {
      const location = screen.getByText(local.location);
      expect(location).toBeDefined();
      expect(images[index]).toHaveAttribute('src', local.map);
    });
  });

  test('Verifica se pode favoritar um pokémon através da página de detalhes.', () => {
    renderWithRouter(<App />);
    // para resolver o problema que estava tendo ao renderizar diretamento o PokemonDetails resolvi
    // renderizar o APP e seguir passo a passo até renderizar o PokemonDetails, ao contrario do que eu estava fazendo nos testes anteriores.

    const renderPokemonDetails = screen.getByRole('link', { name: /More details/i });
    expect(renderPokemonDetails).toBeInTheDocument();
    userEvent.click(renderPokemonDetails);

    const checkbox = screen.getByLabelText('Pokémon favoritado?');
    expect(checkbox).toBeInTheDocument();
    userEvent.click(checkbox);

    const pokemonFav = screen.getByAltText('Pikachu is marked as favorite');
    expect(pokemonFav).toBeInTheDocument();
    userEvent.click(checkbox);
    expect(pokemonFav).not.toBeInTheDocument();
  });
});
