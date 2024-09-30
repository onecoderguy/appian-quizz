"use client"
import { useState, useEffect } from "react";

import QuizzSetup from "./QuizzSetup";
import QuizzQuestion from "./QuizzQuestion";
import QuizzResult from "./QuizzResult";
import QuizzLoader from "./QuizzLoader";

import QuizzSetupDataProps from "@/interfaces/QuizzSetupDataProps";
import QuizzQuestionProps from "@/interfaces/QuizzQuestionProps";

const QuizContainer = ({ cookie }: { cookie: QuizzSetupDataProps }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [questions, setQuestions] = useState<QuizzQuestionProps[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [quizzSetupData, setQuizzSetupData] = useState<QuizzSetupDataProps>(cookie);

  useEffect(() => {
    const fetchQuestions = (): void => {
      fetch(`/api/questions?topics=${quizzSetupData.topics}`, {
        method: 'GET'
      })
        .then((result) => result.json())
        .then((result) => setQuestions(result.questions))
        .catch((err) => {
          console.log(err.message);
        });
    };

    fetchQuestions();
  }, []);

  const handleAnswerSelect = (answer: number): void => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestionIndex] = answer;
    setSelectedAnswers(newSelectedAnswers);

    if (currentQuestionIndex < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    };
  };

  const quizzRouter = () => {

    return (
      quizzSetupData.start === null &&
        quizzSetupData.end === null ?
        <QuizzSetup
          quizzSetupData={quizzSetupData}
          setSetupData={setQuizzSetupData}
        /> :
        questions.length > 0 &&
          currentQuestionIndex < questions.length ?
          <QuizzQuestion
            question={questions[currentQuestionIndex]}
            onSelect={handleAnswerSelect}
          /> :
          currentQuestionIndex > 0 &&
            currentQuestionIndex === questions.length ?
            <QuizzResult
              quizzSetupData={quizzSetupData}
              selectedAnswers={selectedAnswers}
              questions={questions}
            /> :
            <QuizzLoader />
    )
  }

  return (
    <div className="flex flex-col items-center justify-center w-screen">
      <div className="bg-white shadow-lg p-6 rounded-lg w-full max-w-xl">
        {
          quizzRouter()
        }
      </div>
    </div>
  );
}
export default QuizContainer;
