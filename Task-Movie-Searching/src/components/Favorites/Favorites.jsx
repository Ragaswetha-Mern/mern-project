import React from "react";
import MovieCard from "../MovieCard/MovieCard";
import "./Favorites.css";

const Favorites = ({ favorites, onRemove, onMovieClick }) => (
  <div className="favorites flex overflow-x-auto gap-8 p-6 scrollbar-thin scrollbar-thumb-[#00a8e1] scrollbar-track-[#232526] snap-x snap-mandatory">
    {favorites.length === 0 ? (
      <div className="flex flex-col items-center justify-center w-full py-12">
        <span className="text-5xl text-gray-400 mb-4">🤍</span>
        <p className="text-center text-xl text-gray-400 font-semibold">
          No favorites added yet.
        </p>
      </div>
    ) : (
      favorites.map((movie) => (
        <div
          key={movie.imdbID}
          className="relative min-w-[340px] max-w-sm snap-center bg-gradient-to-br from-[#232526] via-[#414345] to-[#00a8e1] rounded-3xl shadow-2xl p-6 flex flex-col items-center transition-transform duration-300 hover:scale-105 hover:shadow-2xl border-4 border-[#00a8e1] cursor-pointer"
          onClick={() => onMovieClick(movie.imdbID)}
        >
          <MovieCard movie={movie} />
          <button
            className="absolute top-4 right-4 bg-red-600 text-white rounded-full p-2 shadow-lg font-bold hover:scale-125 transition-transform duration-200 border-2 border-gray-800 flex items-center justify-center"
            onClick={(e) => {
              e.stopPropagation();
              onRemove(movie.imdbID);
            }}
            title="Remove from Favorites"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      ))
    )}
  </div>
);

export default Favorites;
