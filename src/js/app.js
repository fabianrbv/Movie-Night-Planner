import { getTrendingMovies, getGenres, searchMovies, getMoviesByGenre } from './movieService.js';
import { renderMovies, renderGenres } from './utils.js';
import { getFavorites } from './favorites.js';

const movieList = document.getElementById('movieList');
const genreFilter = document.getElementById('genreFilter');
const searchInput = document.getElementById('searchInput');
const genreTitle = document.getElementById('genreTitle');

async function init() {
  const movies = await getTrendingMovies();
  const genres = await getGenres();
  renderMovies(movies, movieList);
  renderGenres(genres, genreFilter);
}

searchInput.addEventListener('input', async (e) => {
  const query = e.target.value.trim();
  if (query.length > 2) {
    const results = await searchMovies(query);
    renderMovies(results, movieList);
  }
});

genreFilter.addEventListener('click', async (e) => {
  const button = e.target.closest('button');
  if (button?.dataset.genreId) {
    const genreId = button.dataset.genreId;
    const genreName = button.textContent;
    const movies = await getMoviesByGenre(genreId);
    genreTitle.textContent = `Showing: ${genreName}`;
    renderMovies(movies, movieList);
  }
});

document.getElementById('homeBtn').addEventListener('click', async () => {
  const movies = await getTrendingMovies();
  genreTitle.textContent = '';
  renderMovies(movies, movieList);
});

document.getElementById('favoritesBtn').addEventListener('click', () => {
  const favorites = getFavorites();
  genreTitle.textContent = 'Your Favorites';
  renderMovies(favorites, movieList);
});

init();
