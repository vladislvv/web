import React, { useState } from 'react';

function Registration() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const userData = { name, email, password };

        try {
           
            const response = await fetch('https://676a5618863eaa5ac0de052c.mockapi.io/tickets/name', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Регистрация прошла успешно!');
            } else {
                setMessage('Ошибка при регистрации!');
            }
        } catch (error) {
            setMessage('Ошибка при отправке данных!');
        }

        setIsLoading(false);
    };

    return (
        <div>
            <h2>Регистрация</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Имя:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Пароль:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Загрузка...' : 'Зарегистрироваться'}
                </button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default Registration;
