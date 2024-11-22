import {
  connectorConfig,
  listMovies,
  ListMoviesData,
  listMoviesRef,
} from "@/dataconnect-generated/js/default-connector";
import { executeQuery, getDataConnect, QueryRef } from "firebase/data-connect";
import { connectDataConnectEmulator } from "firebase/data-connect";

const dataConnect = getDataConnect(connectorConfig);

connectDataConnectEmulator(dataConnect, "localhost", 9399);

// Fetch  movies
export const handleGetMovies = async (): Promise<
  ListMoviesData["movies"] | null
> => {
  try {
    // using ref
    // const ref = listMoviesRef();
    // const { data } = await executeQuery(ref);
    // console.log("using ref", data.movies);

    const response = await listMovies();
    return response.data.movies;
  } catch (error) {
    // console.error("Error fetching top movies:", error);
    console.log("error", error);
    return null;
  }
};
