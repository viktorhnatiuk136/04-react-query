import axios from "axios";
import { toast } from "react-hot-toast";

import type { Movie } from "../types/movie";

interface MovieHTTPResponse {
  results: Movie[];
  total_pages: number;
}
const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export async function fetchMovies(
  query: string,
  page: number,
): Promise<MovieHTTPResponse> {
  try {
    const response = await axios.get<MovieHTTPResponse>(
      "https://api.themoviedb.org/3/search/movie",
      {
        params: { query: query, page: page },
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    toast.error("Failed to fetch movies");
    throw error;
  }
}
