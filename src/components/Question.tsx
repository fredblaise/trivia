import React, { MouseEvent } from "react";
import { TriviaQuestion } from "@/app/my-types";
import { decode } from "html-entities";

interface QuestionProps {
  question: TriviaQuestion;
  index: number;
  handleAnswerClick: (
    e: MouseEvent<HTMLButtonElement>,
    selectedAnswer: string,
    alreadyAnswered: boolean,
    index: number,
  ) => void;
}

function Question({ question, index, handleAnswerClick }: QuestionProps) {
  return (
    <div className="flex flex-col gap-4 rounded bg-gray-700 p-4">
      <p>{decode(question.question)}</p>
      <div className="grid grid-cols-2 gap-4">
        {question.all_answers.map((answer, idx) => (
          <button
            className={`...`}
            key={`question${index}_answer${idx}`}
            onClick={(e) =>
              handleAnswerClick(e, answer, question.alreadyAnswered, index)
            }
          >
            {decode(answer)}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Question;
