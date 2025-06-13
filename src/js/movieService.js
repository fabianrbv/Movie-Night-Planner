const API_KEY = '341e682c586005efd50a82dbd9b94a06';

const BASE_URL = 'https://api.themoviedb.org/3';
export async function getTrendingMovies() {
  const response = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results;
}

export async function searchMovies(query) {
  const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
  const data = await response.json();
  return data.results;
}

export async function getGenres() {
  const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
  const data = await response.json();
  return data.genres;
}

export async function getMoviesByGenre(genreId) {
  const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`);
  const data = await response.json();
  return data.results;
}

const YT_API_KEY = 'AIzaSyCKeGrxOrJHl7ZVPxYjogTMyYrGQgW33bc';
export async function getTrailer(movieTitle) {
  const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(movieTitle + " official trailer")}&key=${YT_API_KEY}&maxResults=1`);
  const data = await response.json();
  const video = data.items?.[0];
  return video ? `https://www.youtube.com/embed/${video.id.videoId}` : null;
}
