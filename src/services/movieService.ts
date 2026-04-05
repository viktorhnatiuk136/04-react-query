import axios from "axios";
import { toast } from "react-hot-toast";

import type { Movie } from "../types/movie";

interface MovieHTTPResponse {
  results: Movie[];
}
const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export async function fetchMovies(query: string): Promise<Movie[]> {
  try {
    const response = await axios.get<MovieHTTPResponse>(
      "https://api.themoviedb.org/3/search/movie",
      {
        params: { query: query },
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      },
    );
    return response.data.results;
  } catch (error) {
    toast.error("Failed to fetch movies");
    return [];
  }
}
