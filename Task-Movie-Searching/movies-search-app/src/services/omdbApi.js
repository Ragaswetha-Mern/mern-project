// OMDB API service functions
// Replace 'YOUR_OMDB_API_KEY' with your actual OMDB API key
const API_KEY = "YOUR_OMDB_API_KEY";
const BASE_URL = "https://www.omdbapi.com/";

// Search movies by title/keyword and type (movie, series, episode)
export async function searchMovies(query, type = "", page = 1) {
  const url = `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}${
    type ? `&type=${type}` : ""
  }&page=${page}`;
  const response = await fetch(url);
  const data = await response.json();
  if (data.Response === "True") {
    return {
      movies: data.Search,
      totalResults: parseInt(data.totalResults, 10),
    };
  } else {
    throw new Error(data.Error || "No results found");
  }
}

// Get detailed info for a single movie by imdbID
export async function getMovieDetails(imdbID) {
  const url = `${BASE_URL}?apikey=${API_KEY}&i=${imdbID}&plot=full`;
  const response = await fetch(url);
  const data = await response.json();
  if (data.Response === "True") {
    return data;
  } else {
    throw new Error(data.Error || "Movie not found");
  }
}
