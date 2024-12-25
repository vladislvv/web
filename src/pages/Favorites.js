import React, { useState, useEffect } from 'react';
import './Favorites.css';

function Favorites() {
    const [favorites, setFavorites] = useState([]);

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

    // Функция для обновления рейтинга
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
            <h2>Избранное</h2>
            {favorites.length === 0 ? (
                <p>У вас нет избранных фильмов.</p>
            ) : (
                <div className="favorite-container">
                    {favorites.map((movie) => (
                        <div key={movie.imdbID} className="favorite-movie">
                            <h3>{movie.Title}</h3>
                            <img src={movie.Poster} alt={movie.Title} />
                            <a href={`/movie/${movie.imdbID}`}>Подробнее</a>
                            <div>
                                {renderStars(movie)} {/* Отображение звезд */}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Favorites;
