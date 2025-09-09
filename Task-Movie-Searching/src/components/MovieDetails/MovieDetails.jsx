import React from "react";
import "./MovieDetails.css";

const MovieDetails = ({ movie, favorites, setFavorites }) => {
  const isFavorite = favorites.some((fav) => fav.imdbID === movie?.imdbID);

  const handleFavoriteClick = () => {
    let updated;
    if (isFavorite) {
      updated = favorites.filter((fav) => fav.imdbID !== movie.imdbID);
    } else {
      updated = [...favorites, movie];
    }
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  if (!movie) {
    return (
      <div className="p-4 text-white bg-gradient-to-br from-[#232526] via-[#414345] to-[#00a8e1] rounded-xl shadow-xl animate-fade-in">
        No details available.
      </div>
    );
  }

  return (
    <div className="movie-details flex flex-col md:flex-row gap-8 p-6 bg-gradient-to-br from-[#232526] via-[#414345] to-[#00a8e1] rounded-2xl shadow-2xl items-center animate-fade-in">
      {/* Poster */}
      <img
        src={
          movie.Poster !== "N/A"
            ? movie.Poster
            : "https://via.placeholder.com/256x384?text=No+Image"
        }
        alt={movie.Title}
        className="w-56 h-80 object-cover rounded-xl border-4 border-[#00a8e1] shadow-lg mb-4 md:mb-0 transition-transform duration-500 hover:scale-105"
      />

      {/* Details Section */}
      <div className="flex-1 flex flex-col justify-center items-start gap-2">
        {/* Title with marquee animation and favorite icon */}
        <div className="w-full overflow-hidden h-10 flex items-center">
          <span className="marquee-title text-3xl font-extrabold text-[#00a8e1] drop-shadow-lg tracking-wide">
            {movie.Title}
          </span>
        </div>

        {/* Metadata Tags */}
        <div className="flex flex-wrap gap-4 mb-2">
          <span className="bg-[#00a8e1] text-white px-3 py-1 rounded-full font-bold shadow">
            {movie.Year}
          </span>
          <span className="bg-[#414345] text-white px-3 py-1 rounded-full font-bold shadow">
            {movie.Genre}
          </span>
          <span className="bg-[#232526] text-white px-3 py-1 rounded-full font-bold shadow">
            {movie.Runtime}
          </span>
          <span className="bg-[#232526] text-yellow-400 px-3 py-1 rounded-full font-bold shadow flex items-center gap-2">
            ⭐ {movie.imdbRating}
            <button
              className={`ml-2 text-xl focus:outline-none transition-transform duration-200 ${
                isFavorite
                  ? "text-red-500 scale-110"
                  : "text-gray-300 hover:text-red-400"
              }`}
              title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
              onClick={handleFavoriteClick}
            >
              {isFavorite ? "❤️" : "🤍"}
            </button>
          </span>
        </div>

        {/* Additional Details */}
        <p className="mb-2 text-white text-base">
          <span className="font-bold text-[#00a8e1]">Plot:</span> {movie.Plot}
        </p>
        <p className="mb-2 text-white text-base">
          <span className="font-bold text-[#00a8e1]">Cast:</span> {movie.Actors}
        </p>
        <p className="mb-2 text-white text-base">
          <span className="font-bold text-[#00a8e1]">Director:</span>{" "}
          {movie.Director}
        </p>
        <p className="mb-2 text-white text-base">
          <span className="font-bold text-[#00a8e1]">Language:</span>{" "}
          {movie.Language}
        </p>
        <p className="mb-2 text-white text-base">
          <span className="font-bold text-[#00a8e1]">Awards:</span>{" "}
          {movie.Awards}
        </p>
      </div>
    </div>
  );
};

export default MovieDetails;
