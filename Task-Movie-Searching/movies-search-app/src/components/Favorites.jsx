import React from "react";
import MovieCard from "./MovieCard";

const Favorites = ({ favorites, onRemove }) => (
  <div className="favorites grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
    {favorites.length === 0 ? (
      <p>No favorites added yet.</p>
    ) : (
      favorites.map((movie) => (
        <div key={movie.imdbID} className="relative">
          <MovieCard movie={movie} />
          <button
            className="absolute top-2 right-2 bg-red-500 text-white rounded px-2 py-1"
            onClick={() => onRemove(movie.imdbID)}
          >
            Remove
          </button>
        </div>
      ))
    )}
  </div>
);

export default Favorites;
