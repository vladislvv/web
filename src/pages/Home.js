import React, { useState, useEffect } from 'react';

function Home() {
    const [movies, setMovies] = useState([]);
    const [query, setQuery] = useState('');

    const fetchMovies = async () => {
        try {
            const response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=your_api_key`);
            const data = await response.json();
            if (data.Search) {
                setMovies(data.Search);
            }
        } catch (error) {
            console.error('Ошибка загрузки фильмов:', error);
        }
    };

    useEffect(() => {
        if (query) fetchMovies();
    }, [query]);

    return (
        <div>
            <input 
                type="text" 
                placeholder="Поиск фильмов..." 
                value={query} 
                onChange={(e) => setQuery(e.target.value)} 
            />
            <div>
                {movies.map((movie) => (
                    <div key={movie.imdbID}>
                        <h3>{movie.Title}</h3>
                        <img src={movie.Poster} alt={movie.Title} />
                        <a href={`/movie/${movie.imdbID}`}>Подробнее</a>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
