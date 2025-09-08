import React from "react";
import MovieCard from "../MovieCard/MovieCard";
import "./MovieList.css";

const MovieList = ({ movies, onMovieClick }) => (
  <div className="movie-list grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 p-8 bg-black">
    {movies.map((movie) => (
      <MovieCard
        key={movie.imdbID}
        movie={movie}
        onClick={() => onMovieClick(movie.imdbID)}
      />
    ))}
  </div>
);

export default MovieList;
