import React, { useState } from 'react';

export default function InputEmail(){
    const [email, setEmail] = useState('');

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Введенная почта:', email);
    // Здесь можно добавить код для обработки почты
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        className="mail-input"
        placeholder="почта"
        value={email}
        onChange={handleChange}
      />
    </form>
  );
}