"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { decode } from "html-entities";

const ResultsPage = () => {
  const [results, setResults] = useState<any[]>([]);
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    // Retrieve and parse the trivia final score and results from local storage
    const storedResults = localStorage.getItem("triviaResults");
    const storedFinalScore = localStorage.getItem("triviaScore");
    if (storedFinalScore) {
      setScore(JSON.parse(storedFinalScore));
    }
    if (storedResults) {
      setResults(JSON.parse(storedResults));
    }

    // CLear local storage
    localStorage.removeItem("triviaResults");
    localStorage.removeItem("triviaScore");
  }, []);

  return (
    <div className="m-auto grid w-full max-w-4xl grid-cols-1 place-content-center gap-4 px-4 py-8 text-center text-white">
      <h1 className="text-6xl font-semibold">Results</h1>
      <div className="flex flex-col gap-4 rounded bg-gray-700 p-4">
        <p className="text-4xl">Your score is {score}%</p>

        <div className="mt-4">
          {results.map((result, index) => (
            <div key={index} className="mb-2 rounded bg-gray-800 p-4">
              <p>Question: {decode(result.question)}</p>
              <p>Correct Answer: {decode(result.correct_answer)}</p>
              <p>Your Answer: {decode(result.chosen_answer)}</p>
            </div>
          ))}
        </div>
      </div>
      <Link href="/" className="mx-auto w-full md:max-w-sm">
        <button className="text-center transition md:hover:border-transparent md:hover:bg-blue-500">
          Back to Home
        </button>
      </Link>
    </div>
  );
};

export default ResultsPage;
