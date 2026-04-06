import toast, { Toaster } from "react-hot-toast";

import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";
import Pagination from "../ReactPaginate/ReactPaginate";
import { fetchMovies } from "../../services/movieService";

import type { Movie } from "../../types/movie";

function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["movies", query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: query !== "",
    placeholderData: keepPreviousData,
  });

  console.log(data);

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
  };

  const handleSelect = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const totalPages = data?.total_pages ?? 0;

  return (
    <>
      <Toaster />
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <Loader />}
      {isError && !isLoading && <ErrorMessage />}
      {!isLoading && !isError && totalPages > 1 && (
        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      )}
      {!isLoading && !isError && (data?.results?.length ?? 0) > 0 && (
        <MovieGrid movies={data?.results ?? []} onSelect={handleSelect} />
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
