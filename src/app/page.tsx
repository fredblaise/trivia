"use client";

import React, { useRef } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const amount = useRef<number>(5);

  return (
    <main className=" m-auto grid h-full w-full max-w-xl grid-cols-1 place-content-center text-center text-white">
      <section className="flex flex-col gap-4 p-4">
        <h1 className="text-6xl font-semibold">Trivia App</h1>
        <p>Trivia questions pulled from the Open Trivia Database</p>
      </section>
      <div className="flex flex-col gap-4 rounded bg-gray-700 p-4 ">
        <div className="flex flex-col gap-4 text-white">
          <div className="flex flex-col text-start">
            <label htmlFor="amount">Number of Questions</label>
            <input
              type="number"
              name="amount"
              id="amount"
              className="rounded border border-white bg-transparent p-3"
              defaultValue={amount.current}
              onChange={(e) => (amount.current = e.target.valueAsNumber)}
            />
          </div>
          <button
            type="submit"
            className="mx-auto max-w-sm rounded border-transparent bg-blue-700 text-center text-white"
            onClick={() =>
              router.push(`/quiz?amount=${amount.current}`, {
                scroll: false,
              })
            }
          >
            Start Quiz
          </button>
        </div>
      </div>
    </main>
  );
}
