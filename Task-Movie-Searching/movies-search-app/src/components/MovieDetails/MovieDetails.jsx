import React from "react";
import "./MovieDetails.css";

const MovieDetails = ({ movie }) => {
  if (!movie) return <div className="p-4">No details available.</div>;
  return (
    <div className="movie-details flex flex-col md:flex-row gap-6 p-4">
      <img
        src={movie.Poster}
        alt={movie.Title}
        className="w-64 h-96 object-cover"
      />
      <div>
        <h2 className="text-2xl font-bold mb-2">{movie.Title}</h2>
        <p className="mb-1">Year: {movie.Year}</p>
        <p className="mb-1">Genre: {movie.Genre}</p>
        <p className="mb-1">Plot: {movie.Plot}</p>
        <p className="mb-1">Ratings: {movie.imdbRating}</p>
        <p className="mb-1">Cast: {movie.Actors}</p>
      </div>
    </div>
  );
};

export default MovieDetails;
