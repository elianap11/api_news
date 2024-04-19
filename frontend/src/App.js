import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import './App.css';

const apiKey = process.env.REACT_APP_API_KEY;



function Noticias() {
 const [articles, setArticles] = useState([]);
 const [query, setQuery] = useState('Argentina');
 const [currentPage, setCurrentPage] = useState(1); 
 const [totalPages, setTotalPages] = useState(1);
 const pageSize = 9;

 useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}&page=${currentPage}&pageSize=${pageSize}`);
        setArticles(response.data.articles);
 
        const totalResults = response.data.totalResults;
        const totalPages = Math.ceil(totalResults / pageSize);
        setTotalPages(totalPages);
      } catch (error) {
        console.error('Error al obtener noticias:', error);
      }
    };

    fetchNews();
 }, [query, currentPage]);

 const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
 };

 return (
    <div>
      <header>
        <h1>Noticias extraidas de News API</h1>
      </header>
      <div className="container">
        <form onSubmit={(e) => { e.preventDefault(); setQuery(e.target.elements.search.value); }}>
          <label htmlFor="search">Buscar noticias:</label>
          <input type="text" id="search" name="search" />
          <button type="submit">Buscar</button>
        </form>
        {articles.length > 0 ? (
          <div className="news-columns">
            {articles.map((article, index) => (
              <div className="news-item" key={index}>
                <h2>{article.title}</h2>
                <p>{article.description}</p>
                <a href={article.url} target="_blank" rel="noopener noreferrer">Leer más</a>
              </div>
            ))}
          </div>
        ) : (
          <p>No se encontraron noticias para la palabra clave ingresada.</p>
        )}

      
        <div className="pagination">
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Anterior</button>
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Siguiente</button>
        </div>
      </div>
    </div>
 );
}

export default Noticias;
