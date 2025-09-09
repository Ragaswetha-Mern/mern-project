import React from "react";
import MovieCard from "../MovieCard/MovieCard";
import "./MovieList.css";

const MovieList = ({
  movies,
  onMovieClick,
  favorites = [],
  onFavoriteToggle,
}) => (
  <div className="movie-list grid grid-cols-1 gap-4 p-2 sm:grid-cols-2 sm:gap-6 sm:p-4 md:grid-cols-3 md:gap-8 md:p-8 lg:grid-cols-4 xl:grid-cols-5 bg-gradient-to-br from-gray-900 via-black to-gray-800 rounded-2xl shadow-2xl">
    {movies.map((movie) => (
      <MovieCard
        key={movie.imdbID}
        movie={movie}
        onClick={() => onMovieClick(movie.imdbID)}
        isFavorite={favorites.some((fav) => fav.imdbID === movie.imdbID)}
        onFavoriteToggle={onFavoriteToggle}
      />
    ))}
  </div>
);

export default MovieList;
