import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa o App.js', () => {
  test('Teste se o topo da aplicação contém um conjunto fixo de links de navegação',
    () => {
      renderWithRouter(<App />);
      const home = screen.getByRole('link', { name: /Home/i });
      expect(home).toBeDefined();
      const about = screen.getByRole('link', { name: /About/i });
      expect(about).toBeDefined();
      const favoritePokemons = screen.getByRole('link', { name: /Favorite Pokémons/i });
      expect(favoritePokemons).toBeDefined();
    });

  test(`Teste se a aplicação é redirecionada para a página inicial, na URL /
  ao clicar no link Home da barra de navegação`, () => {
    renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: /Home/i });
    userEvent.click(home);
    const encounteredPokemons = screen.getByRole('heading', {
      name: /Encountered pokémons/i, level: 2 });

    expect(encounteredPokemons).toBeDefined();
  });

  test(`Teste se a aplicação é redirecionada para a página de About, na URL 
  /about, ao clicar no link About da barra de navegação`, () => {
    renderWithRouter(<App />);
    const about = screen.getByRole('link', { name: /About/i });
    userEvent.click(about);
    const aboutPokedex = screen.getByRole('heading', {
      name: /About Pokédex/i, level: 2 });

    expect(aboutPokedex).toBeDefined();
  });

  test(`Teste se a aplicação é redirecionada para a página de Pokémons Favoritados, 
  na URL /favorites, ao clicar no link Favorite Pokémons da barra de navegação.`, () => {
    renderWithRouter(<App />);
    const favorites = screen.getByRole('link', { name: /Favorite Pokémons/i });
    userEvent.click(favorites);
    const favoritesPokemons = screen.getByRole('heading', {
      name: /Favorite pokémons/i, level: 2 });

    expect(favoritesPokemons).toBeDefined();
  });

  test(`Teste se a aplicação é redirecionada para a página 
  Not Found ao entrar em uma URL desconhecida.`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('/szdflkgjszdofpgszdfg54s4dfg54564dzsf65a4zsdf6a5sD4f6as5zd4f65asd4f');
    const pageNotFound = screen.getByRole('heading', {
      name: /Page requested not found/i, level: 2 });
    expect(pageNotFound).toBeDefined();
  });
});
