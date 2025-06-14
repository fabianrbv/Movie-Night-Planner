import { getTrailer } from './movieService.js';
import { addFavorite, isFavorite, removeFavorite } from './favorites.js';

export function renderGenres(genres, container) {
  container.innerHTML = genres.map(g => `<button data-genre-id="${g.id}">${g.name}</button>`).join('');
}

export function renderMovies(movies, container) {
  container.innerHTML = '';
  movies.forEach(movie => {
    const card = document.createElement('div');
    card.classList.add('movie-card');

    const fav = isFavorite(movie.id);
    const favBtn = `<button class="fav-btn" data-id="${movie.id}">${fav ? '❤️' : '🤍'}</button>`;

    card.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w300${movie.poster_path}" alt="${movie.title}" />
      <h4>${movie.title}</h4>
      <p>⭐ ${movie.vote_average}</p>
      ${favBtn}
    `;

    // favoritos
    card.querySelector('.fav-btn')?.addEventListener('click', (e) => {
      e.stopPropagation();
      if (isFavorite(movie.id)) {
        removeFavorite(movie.id);
      } else {
        addFavorite(movie);
      }
      renderMovies(movies, container);
    });

    // dynamic card
    card.addEventListener('click', () => {
      window.location.href = `movie.html?id=${movie.id}`;
    });

    container.appendChild(card);
  });
}

export async function showMovieDetails(movie, container) {
  const trailerUrl = await getTrailer(movie.title);
  container.innerHTML = `
    <h2>${movie.title}</h2>
    <p>${movie.overview}</p>
    <p><strong>Release:</strong> ${movie.release_date}</p>
    <p><strong>Rating:</strong> ⭐ ${movie.vote_average}</p>
    ${trailerUrl ? `<iframe width="100%" height="315" src="${trailerUrl}" frameborder="0" allowfullscreen></iframe>` : '<p>Trailer not available.</p>'}
  `;
}
