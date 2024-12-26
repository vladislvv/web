import React, { useState, useEffect } from 'react';
import './Home.css';

function Home() {
    const [movies, setMovies] = useState([]);
    const [query, setQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [favorites, setFavorites] = useState([]); 

    const fetchMovies = async (page = 1) => {
        try {
            const response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=34fc1abd&page=${page}`);
            const data = await response.json();
            if (data.Search) {
                setMovies(data.Search);
                setTotalResults(parseInt(data.totalResults || 0));
            } else {
                setMovies([]);
                setTotalResults(0);
            }
        } catch (error) {
            console.error('Ошибка загрузки фильмов:', error);
        }
    };

    // Загружаем фильмы при изменении поискового запроса или страницы
    useEffect(() => {
        if (query) fetchMovies(currentPage);
    }, [query, currentPage]);

    // Загружаем избранные фильмы из MockAPI при монтировании компонента
    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await fetch('https://676a5618863eaa5ac0de052c.mockapi.io/tickets/favorites');
                const data = await response.json();
                setFavorites(data);
            } catch (error) {
                console.error('Ошибка загрузки избранных фильмов:', error);
            }
        };
        fetchFavorites();
    }, []);

    const toggleFavorite = async (movie) => {
        try {
            const isFavorite = favorites.some(fav => fav.imdbID === movie.imdbID);
            if (isFavorite) {
                await fetch(`https://676a5618863eaa5ac0de052c.mockapi.io/tickets/favorites/${movie.imdbID}`, {
                    method: 'DELETE',
                });
                setFavorites((prevFavorites) => prevFavorites.filter(fav => fav.imdbID !== movie.imdbID));
            } else {
                
                const newFavorite = { ...movie, rating: 0 };
                const response = await fetch('https://676a5618863eaa5ac0de052c.mockapi.io/tickets/favorites', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newFavorite),
                });
                const data = await response.json();
                setFavorites((prevFavorites) => [...prevFavorites, data]);
            }
        } catch (error) {
            console.error('Ошибка добавления/удаления фильма в избранное:', error);
        }
    };
    const updateRating = async (movieId, rating) => {
        try {
            const updatedMovie = { rating };
            const response = await fetch(`https://676a5618863eaa5ac0de052c.mockapi.io/tickets/favorites/${movieId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedMovie),
            });
            const data = await response.json();
            setFavorites((prevFavorites) =>
                prevFavorites.map((movie) => (movie.imdbID === movieId ? { ...movie, rating: data.rating } : movie))
            );
        } catch (error) {
            console.error('Ошибка обновления рейтинга фильма:', error);
        }
    };

    const totalPages = Math.ceil(totalResults / 10);

   
    const renderStars = (movie) => {
        const rating = movie.rating || 0; 
        const stars = [];

        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span
                    key={i}
                    onClick={() => updateRating(movie.imdbID, i)}
                    style={{
                        cursor: 'pointer',
                        color: i <= rating ? '#FFD700' : '#ccc',
                    }}
                >
                    &#9733;
                </span>
            );
        }

        return stars;
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Поиск фильмов..."
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                }}
            />
            <div className="home-container">
                {movies.map((movie) => (
                    <div key={movie.imdbID} className="movie-card">
                        <h3>{movie.Title}</h3>
                        <img src={movie.Poster} alt={movie.Title} />
                        <a href={`/movie/${movie.imdbID}`}>Подробнее</a>
                        <button onClick={() => toggleFavorite(movie)}>
                            {favorites.some(fav => fav.imdbID === movie.imdbID) ? 'Убрать из избранного' : 'Добавить в избранное'}
                        </button>
                        <div>
                            {renderStars(movie)}
                        </div>
                    </div>
                ))}
            </div>

            {totalPages > 1 && (
                <div className="pagination-container">
                    <button
                        onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        Назад
                    </button>
                    <span>
                        Страница {currentPage} из {totalPages}
                    </span>
                    <button
                        onClick={() => setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        Вперёд
                    </button>
                </div>
            )}
        </div>
    );
}

export default Home;
