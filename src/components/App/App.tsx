import toast, { Toaster } from "react-hot-toast";

import { useState } from "react";
import "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";
import { fetchMovies } from "../../services/movieService";

import type { Movie } from "../../types/movie";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
    try {
      setMovies([]);
      setLoading(true);
      setError(false);
      const moviesResult = await fetchMovies(query);
      if (moviesResult.length === 0) {
        toast("No movies found for your request.");
      }
      setMovies(moviesResult);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  return (
    <>
      <Toaster />
      <SearchBar onSubmit={handleSearch} />
      {loading && <Loader />}
      {error && !loading && <ErrorMessage />}
      {!loading && !error && movies.length > 0 && (
        <MovieGrid moviesList={movies} onSelect={handleSelect} />
      )}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </>
  );
}

export default App;
