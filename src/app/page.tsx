"use client";

import React, { useRef } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const difficulty = useRef<string>("any");
  const category = useRef<number>(9);

  return (
    <main className=" m-auto grid h-full w-full max-w-xl grid-cols-1 place-content-center gap-4 p-4 text-center text-white">
      <section className="flex flex-col gap-4">
        <h1 className="text-6xl font-semibold">Trivia App</h1>
        <p>Trivia questions pulled from the Open Trivia Database</p>
      </section>
      <div className="flex flex-col gap-4 rounded bg-gray-700 p-4 text-white">
        <div className="flex flex-col gap-4 text-start">
          <label htmlFor="difficulty">Difficulty</label>
          <select
            name="difficulty"
            id="difficulty"
            className="rounded border border-white bg-transparent p-3"
            defaultValue={difficulty.current}
            onChange={(e) => (difficulty.current = e.target.value)}
          >
            <option value="any">Any Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          <label htmlFor="category">Category</label>
          <select
            name="category"
            id="category"
            className="rounded border border-white bg-transparent p-3"
            defaultValue={category.current}
            onChange={(e) => (category.current = Number(e.target.value))}
          >
            <option value={9}>General Knowledge</option>
            <option value={10}>Entertainment: Books</option>
            <option value={11}>Entertainment: Film</option>
            <option value={12}>Entertainment: Music</option>
            <option value={14}>Entertainment: Television</option>
            <option value={15}>Entertainment: Video Games</option>
            <option value={20}>Mythology</option>
            <option value={21}>Sports</option>
            <option value={22}>Geography</option>
            <option value={23}>History</option>
            <option value={25}>Art</option>
            <option value={27}>Animals</option>
          </select>
        </div>
      </div>
      <button
        type="submit"
        className="mx-auto max-w-sm text-center transition md:hover:border-transparent md:hover:bg-blue-500"
        onClick={() =>
          router.push(
            `/quiz?category=${category.current}&difficulty=${difficulty.current}`,
            {
              scroll: false,
            },
          )
        }
      >
        Start Quiz
      </button>
    </main>
  );
}
