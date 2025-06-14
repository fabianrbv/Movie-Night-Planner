const API_KEY = '341e682c586005efd50a82dbd9b94a06';
const BASE_URL = 'https://api.themoviedb.org/3';

async function getMovieDetails(id) {
  const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
  const data = await response.json();
  return data;
}

function getMovieIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

async function displayMovieDetails() {
  const id = getMovieIdFromURL();
  if (!id) return;

  const movie = await getMovieDetails(id);
  const container = document.getElementById('movieDetailsContainer');

  container.innerHTML = `
    <h1>${movie.title}</h1>
    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
    <p><strong>Release Date:</strong> ${movie.release_date}</p>
    <p><strong>Overview:</strong> ${movie.overview}</p>
  `;
}

displayMovieDetails();
