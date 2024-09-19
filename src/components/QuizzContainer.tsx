"use client"
import { useState } from "react";

import QuizzQuestion from "./QuizzQuestion";
import QuizzSetup from "./QuizzSetup";

import QuizzSetupData from "@/interfaces/QuizzSetupData";

const questionsData = [
  {
    question: "Qual é a capital da França?",
    options: ["Paris", "Londres", "Berlim", "Madrid"],
    correctAnswer: "Paris",
  },
  {
    question: "Qual é o maior planeta do sistema solar?",
    options: ["Terra", "Júpiter", "Marte", "Saturno"],
    correctAnswer: "Júpiter",
  },
];

const QuizContainer = ({ cookie }: { cookie: QuizzSetupData }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [quizzSetupData, setQuizzSetupData] = useState<QuizzSetupData>(cookie);

  const handleAnswerSelect = (answer: string): void => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestionIndex] = answer;
    setSelectedAnswers(newSelectedAnswers);

    if (currentQuestionIndex < questionsData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
    // } else {
    //   setShowResults(true);
    // }
  };

  const verifyIfHaveActiveQuizz = () => {
    return quizzSetupData.start === null && quizzSetupData.end === null ?
      <QuizzSetup
        setupData={quizzSetupData}
        setSetupData={setQuizzSetupData}
      />
      :
      <QuizzQuestion
        question={questionsData[currentQuestionIndex]}
        onSelect={handleAnswerSelect}
      />
  }

  return (
    <div className="flex flex-col items-center justify-center w-screen">
      <div className="bg-white shadow-lg p-6 rounded-lg w-full max-w-xl">
        {
          verifyIfHaveActiveQuizz()
        }
      </div>
    </div>
  );
};

export default QuizContainer;
