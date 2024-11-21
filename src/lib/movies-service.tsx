import { listMovies, ListMoviesData } from "@firebasegen/default-connector";

// Fetch  movies
export const handleGetMovies = async (): Promise<
  ListMoviesData["movies"] | null
> => {
  try {
    const response = await listMovies();
    return response.data.movies;
  } catch (error) {
    console.error("Error fetching top movies:", error);
    return null;
  }
};
