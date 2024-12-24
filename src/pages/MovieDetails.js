import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await fetch(`https://www.omdbapi.com/?s=batman&apikey=30276778
`);
                const data = await response.json();
                setMovie(data);
            } catch (error) {
                console.error('Ошибка загрузки данных фильма:', error);
            }
        };

        fetchMovie();
    }, [id]);

    return (
        <div>
            {movie && (
                <div>
                    <h2>{movie.Title}</h2>
                    <img src={movie.Poster} alt={movie.Title} />
                    <p>{movie.Plot}</p>
                    <p>Рейтинг: {movie.imdbRating}</p>
                </div>
            )}
        </div>
    );
}

export default MovieDetails;
