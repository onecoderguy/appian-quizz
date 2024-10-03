"use client"
import { useState, useEffect } from "react";

import QuizzSetup from "./QuizzSetup";
import QuizzQuestion from "./QuizzQuestion";
import QuizzResult from "./QuizzResult";
import QuizzLoader from "./QuizzLoader";

import QuizzSetupDataProps from "@/interfaces/QuizzSetupDataProps";
import QuizzQuestionProps from "@/interfaces/QuizzQuestionProps";
import QuizzTimer from "./QuizzTimer";

const QuizContainer = ({ cookie }: { cookie: QuizzSetupDataProps }) => {
  const [questions, setQuestions] = useState<QuizzQuestionProps[]>([]);
  const [quizzSetupData, setQuizzSetupData] = useState<QuizzSetupDataProps>(cookie);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(quizzSetupData.current ?? 0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(quizzSetupData.answers ?? []);

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
      fetchNextQuestion((currentQuestionIndex + 1).toString(), newSelectedAnswers.toString());
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    };
  };

  const fetchNextQuestion = async (current: string, answers: string): Promise<void> => {
    fetch('/api/quizz-next-question', {
      method: 'POST',
      body: JSON.stringify({
        current,
        answers
      })
    })
      .then(() => { })
      .catch((err) => {
        console.log(err.message);
      })
  }

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
      {
        quizzSetupData.start &&
        currentQuestionIndex < questions.length &&
        <QuizzTimer
          start={quizzSetupData.start}
          duration={quizzSetupData.duration}
        />
      }
      <div className="bg-white shadow-lg p-6 rounded-lg w-full max-w-xl">
        {
          quizzRouter()
        }
      </div>
    </div>
  );
}
export default QuizContainer;
