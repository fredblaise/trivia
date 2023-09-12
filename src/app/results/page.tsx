"use client";

import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const page = () => {
  const searchParams = useSearchParams();
  const score = Number(searchParams.get("score"));
  const amount = Number(searchParams.get("amount"));

  return (
    <div className="m-auto grid h-full w-full max-w-xl grid-cols-1 place-content-center gap-4 text-center text-white">
      <h1 className="text-6xl font-semibold">Results</h1>
      <div className="flex flex-col gap-4 rounded bg-gray-700 p-4">
        <p>Your score is {Math.round((score / amount) * 100)}%</p>
        <p>Correct Questions: {score}</p>
        <p>Incorrect Questions: {amount - score}</p>
        <Link href="/" className="mx-auto w-full md:max-w-sm">
          <button className="text-center transition  md:hover:border-transparent md:hover:bg-blue-500">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default page;
