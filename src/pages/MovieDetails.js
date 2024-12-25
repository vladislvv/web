import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './MovieDetails.css';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const response = await fetch(`http://www.omdbapi.com/?i=${id}&apikey=34fc1abd`);
      const data = await response.json();
      setMovie(data);
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) return <p>Загрузка...</p>;

  return (
    <div>
      <h2>{movie.Title}</h2>
      <p>{movie.Year}</p>
      <p>{movie.Plot}</p>
      <button 
        onClick={() => {
          const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
          if (!favorites.some(fav => fav.imdbID === movie.imdbID)) {
            favorites.push(movie);
            localStorage.setItem('favorites', JSON.stringify(favorites));
          }
        }}
      >
        Добавить к Фаворитам 
      </button>
    </div>
  );
};

export default MovieDetails;