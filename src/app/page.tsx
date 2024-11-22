"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { handleGetMovies } from "@/lib/movies-service";
import { ListMoviesData } from "@/dataconnect-generated/js/default-connector";
// import { ListMoviesData } from "@firebasegen/default-connector";

export default function Home() {
  const [movies, setMovies] = useState<ListMoviesData["movies"] | null>([]);

  useEffect(() => {
    async function fetchMovies() {
      const topMoviesData = await handleGetMovies();
      setMovies(topMoviesData);
    }

    fetchMovies();
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-3xl font-bold mb-8 text-center">FDC Movie App</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full">
          {movies && movies.length > 0 ? (
            movies.map((movie) => (
              <div
                key={movie.id}
                className="flex flex-col items-center border rounded-lg p-4 bg-white shadow-md hover:shadow-lg transition-shadow"
              >
                <Image
                  src={movie.imageUrl}
                  alt={movie.title}
                  width={200}
                  height={300}
                  className="rounded-lg object-cover"
                />
                <h2 className="mt-4 text-lg font-semibold">{movie.title}</h2>
                <p className="text-sm text-gray-600">{movie.genre}</p>
                <p className="text-sm text-gray-600">Rating: {movie.rating}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center w-full">
              Loading movies...
            </p>
          )}
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by Next.js
        </a>
      </footer>
    </div>
  );
}
