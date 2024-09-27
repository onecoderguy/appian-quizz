import { useEffect, useState } from "react";

import QuizzQuestionProps from "@/interfaces/QuizzQuestionProps";
import QuizzSetupDataProps from "@/interfaces/QuizzSetupDataProps";
import QuizzLoader from "./QuizzLoader";
import QuizzResultQuestion from "./QuizzResultQuestion";
import QuizzAnswerProps from "@/interfaces/QuizzAnswerProps";

const QuizzResult = ({ selectedAnswers, questions, quizzSetupData }: {
    quizzSetupData: QuizzSetupDataProps,
    selectedAnswers: number[],
    questions: QuizzQuestionProps[]
}) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [results, setResults] = useState<QuizzQuestionProps[]>([]);

    useEffect(() => {
        fetch(`/api/questions?topics=${quizzSetupData.topics}&result=true`, {
            method: 'GET'
        })
            .then((result) => result.json())
            .then((result) => setResults(result.questions))
            .then(() => setLoading(false))
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    const getResults = () => {
        let countCorrects: number = 0;

        results.forEach((question, index) => {
            const correctAnswer = question.answers.filter((answer: QuizzAnswerProps) => answer.correctAnswer)[0];

            if (correctAnswer.id === selectedAnswers[index]) {
                countCorrects++;
            }
        });

        return countCorrects;
    }

    return (
        loading ?
            <QuizzLoader /> :
            <div className="text-center">
                <h2 className="text-2xl text-black font-bold mb-4">Resultados</h2>
                <p className="text-lg text-black">
                    Você acertou {getResults()} de {questions.length} perguntas.
                </p>
                <ul className="mt-4 space-y-2">
                    {questions.map((question, index) => (
                        <QuizzResultQuestion
                            question={question}
                            result={results[index]}
                            selectedAnswerId={selectedAnswers[index]}
                            key={question.id}
                        />
                    ))}
                </ul>
            </div>
    );
};

export default QuizzResult;