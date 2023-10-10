import { useEffect, useState } from "react";
import './index.css';
import searchIcn from './search.svg'
import MovieCard from "./MovieCard";

function App() {
  const API_URL = 'http://www.omdbapi.com/?apikey=b8d78bfc'
  const fetchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`)
    const data = await response.json()
    setMovies(data.Search)
  }
  const [movieName, setMovieName] = useState('')
  const [movies, setMovies] = useState([])
  useEffect(() => {
    fetchMovies(movieName)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className="app">
      <h1>Movie App</h1>
      <div className="search">
        <input 
        type="text" 
        placeholder="Search for a movie"
        value={movieName} 
        onChange={(e) => setMovieName(e.target.value)}/>
        <img src={searchIcn} alt="search" 
        onClick= {() => fetchMovies(movieName)}  />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
}

export default App;
