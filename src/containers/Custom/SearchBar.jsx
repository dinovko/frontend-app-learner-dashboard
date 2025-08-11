import React from 'react';
import './SearchBar.scss';

export default function SearchBar({}) {
  return (
    <div className="search-bar">
      <input type="text" placeholder="Название курса, автор или предмет" />
      <button className="search-btn">🔍</button>
      <div className="filters">
        <select>
          <option>Язык обучения</option>
        </select>
        <select>
          <option>Формат обучения</option>
        </select>
        <select>
          <option>Количество часов</option>
        </select>
        <button className="apply-btn">Искать</button>
      </div>
    </div>
  );
}
