"use client";
import React, { useEffect, useState, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Question from "@/components/Question";
import { TriviaQuestion } from "@/app/my-types";

function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const amount = Number(searchParams.get("amount"));
  const category = Number(searchParams.get("category"));
  const [questions, setQuestions] = useState<TriviaQuestion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const numOfQuestions = useRef<number>(amount);
  const answered = useRef<number>(0);
  const score = useRef<number>(0);

  // Get the query parameter from the URL
  useEffect(() => {
    fetch(
      `https://opentdb.com/api.php?amount=${amount}&category=${category}&type=multiple`,
    )
      .then((response) => response.json())
      .then((data) => {
        const shuffledData = data.results.map((question: TriviaQuestion) => ({
          ...question,
          all_answers: shuffle([
            question.correct_answer,
            ...question.incorrect_answers,
          ]),
          chosen_answer: "",
          alreadyAnswered: false,
        }));
        setQuestions(shuffledData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching trivia questions:", error);
        setLoading(false);
      });
  }, [amount]);

  const shuffle = (array: string[]) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const handleAnswerClick = (
    e: any,
    selectedAnswer: string,
    alreadyAnswered: boolean,
    index: number,
  ) => {
    const parentElement = e.target.parentElement;
    for (const child of parentElement.children) {
      child.style.backgroundColor = "transparent";
      child.style.color = "white";
    }
    e.target.style.backgroundColor = "white";
    e.target.style.color = "#374151";

    questions[index].chosen_answer = selectedAnswer;

    if (!alreadyAnswered) {
      setQuestions((prevQuestions) => {
        const updatedQuestions = [...prevQuestions];
        updatedQuestions[index] = {
          ...updatedQuestions[index],
          alreadyAnswered: true,
        };
        return updatedQuestions;
      });
      answered.current += 1;
    }
  };

  const handleSubmit = () => {
    // Create a results object to store relevant data
    const results = questions.map((question) => ({
      question: question.question,
      correct_answer: question.correct_answer,
      chosen_answer: question.chosen_answer,
    }));

    // Calculate the score
    for (let i = 0; i < numOfQuestions.current; i++) {
      if (questions[i].chosen_answer === questions[i].correct_answer) {
        score.current = score.current + 1;
      }
    }

    const finalScore = Math.round((score.current / amount) * 100);

    // Store the results and score in local storage
    localStorage.setItem("triviaResults", JSON.stringify(results));
    localStorage.setItem("triviaScore", finalScore.toString());

    // Navigate to the results page
    router.push(`/results?score=${finalScore}&amount=${amount}`, {
      scroll: false,
    });
  };

  return (
    <>
      <div
        className={`${
          loading ? "block" : "hidden"
        } mx-auto my-8 flex max-w-4xl items-center justify-center gap-4 p-8 text-center text-5xl font-semibold text-white`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className="h-16 w-16 animate-spin"
          fill="white"
        >
          <path d="M304 48a48 48 0 10-96 0 48 48 0 1096 0zm0 416a48 48 0 10-96 0 48 48 0 1096 0zM48 304a48 48 0 100-96 48 48 0 100 96zm464-48a48 48 0 10-96 0 48 48 0 1096 0zM142.9 437A48 48 0 1075 369.1a48 48 0 1067.9 67.9zm0-294.2A48 48 0 1075 75a48 48 0 1067.9 67.9zM369.1 437a48 48 0 1067.9-67.9 48 48 0 10-67.9 67.9z"></path>
        </svg>
        <h1>Loading...</h1>
      </div>
      <div
        className={`${
          !loading ? "block" : "hidden"
        } mx-auto mt-8 flex max-w-4xl flex-col gap-4 p-4 text-white`}
      >
        <div className="text-4xl font-semibold text-white">Trivia Quiz</div>

        {questions.map((question, index) => (
          <Question
            key={index}
            question={question}
            index={index}
            handleAnswerClick={handleAnswerClick}
          />
        ))}

        <button
          className={`${
            answered.current === numOfQuestions.current
              ? "cursor-pointer transition md:hover:border-transparent md:hover:bg-blue-500"
              : "cursor-not-allowed border-neutral-600 text-neutral-600"
          } ml-auto w-full text-center md:w-1/4`}
          disabled={answered.current < numOfQuestions.current ? true : false}
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </>
  );
}

export default Search;
