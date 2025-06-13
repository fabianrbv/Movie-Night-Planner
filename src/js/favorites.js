const FAVORITES_KEY = 'movieNightFavorites';

export function getFavorites() {
  const data = localStorage.getItem(FAVORITES_KEY);
  return data ? JSON.parse(data) : [];
}

export function addFavorite(movie) {
  const favorites = getFavorites();
  if (!favorites.find(f => f.id === movie.id)) {
    favorites.push(movie);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
}

export function removeFavorite(movieId) {
  const favorites = getFavorites().filter(m => m.id !== movieId);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export function isFavorite(movieId) {
  return getFavorites().some(m => m.id === movieId);
}
