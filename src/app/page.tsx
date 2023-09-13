"use client";

import React, { useRef } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const amount = useRef<number>(5);
  const category = useRef<number>(9);

  return (
    <main className=" m-auto grid h-full w-full max-w-xl grid-cols-1 place-content-center gap-4 p-4 text-center text-white">
      <section className="flex flex-col gap-4">
        <h1 className="text-6xl font-semibold">Trivia App</h1>
        <p>Trivia questions pulled from the Open Trivia Database</p>
      </section>
      <div className="flex flex-col gap-4 rounded bg-gray-700 p-4 text-white">
        <div className="flex flex-col gap-4 text-start">
          <label htmlFor="amount">Number of Questions</label>
          <input
            type="number"
            name="amount"
            id="amount"
            className="rounded border border-white bg-transparent p-3"
            defaultValue={amount.current}
            onChange={(e) => (amount.current = e.target.valueAsNumber)}
          />
          <label htmlFor="category">Category</label>
          <select
            name="category"
            id="category"
            className="rounded border border-white bg-transparent p-3"
            defaultValue={category.current}
            onChange={(e) => (category.current = Number(e.target.value))}
          >
            <option value={9}>General Knowledge</option>
            <option value={21}>Sports</option>
            <option value={22}>Georgraphy</option>
            <option value={25}>Art</option>
            <option value={20}>Mythology</option>
          </select>
        </div>
      </div>
      <button
        type="submit"
        className="mx-auto max-w-sm text-center transition md:hover:border-transparent md:hover:bg-blue-500"
        onClick={() =>
          router.push(
            `/quiz?amount=${amount.current}&category=${category.current}`,
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
