import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa o componente <Pokemon.js />', () => {
  test('Testa se é renderizado um card com informações de determinado pokémon.', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toBeDefined();
    expect(pokemonName).toHaveTextContent(/Pikachu/i);

    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toBeDefined();
    expect(pokemonType).toHaveTextContent(/Electric/i);

    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonWeight).toBeDefined();
    expect(pokemonWeight).toHaveTextContent(/Average weight: 6.0 kg/i);

    const pokedexImage = screen.getByAltText(/Pikachu sprite/i);
    expect(pokedexImage).toBeDefined();
    expect(pokedexImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test(`Testa se o card do Pokémon indicado na Pokédex contém um link de navegação 
  para exibir detalhes deste Pokémon. O link deve possuir a URL 
  /pokemons/<id>, onde <id> é o id do Pokémon exibido`, () => {
    const { history } = renderWithRouter(<App />);

    const linkDetails = screen.getByRole('link', { name: /More details/i });
    expect(linkDetails).toBeInTheDocument();
    userEvent.click(linkDetails);

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  test(`Testa se ao clicar no link de navegação do Pokémon, 
  é feito o redirecionamento da aplicação para a página de detalhes de Pokémon.`, () => {
    renderWithRouter(<App />);

    const linkDetails = screen.getByRole('link', { name: /More details/i });
    expect(linkDetails).toBeInTheDocument();
    userEvent.click(linkDetails);

    const titleDetails = screen.getByRole('heading', { name: /Pikachu Details/i });
    expect(titleDetails).toBeDefined();
  });

  test('Testa se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(<App />);

    const linkDetails = screen.getByRole('link', { name: /More details/i });
    expect(linkDetails).toBeInTheDocument();
    userEvent.click(linkDetails);

    const checkbox = screen.getByLabelText('Pokémon favoritado?');
    expect(checkbox).toBeInTheDocument();
    userEvent.click(checkbox);

    const home = screen.getByRole('link', { name: /Home/i });

    userEvent.click(home);

    const star = screen.getByAltText('Pikachu is marked as favorite');
    expect(star).toBeDefined();

    expect(star).toHaveAttribute('src', '/star-icon.svg');
  });
});
