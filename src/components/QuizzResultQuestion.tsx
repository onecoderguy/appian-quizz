import QuizzAnswerProps from "@/interfaces/QuizzAnswerProps";
import QuizzQuestionProps from "@/interfaces/QuizzQuestionProps";

const QuizzResultQuestion = ({ question, result, selectedAnswerId }: {
    question: QuizzQuestionProps,
    result: QuizzQuestionProps,
    selectedAnswerId: number
}) => {
    const getSelectedAnswer = () => {
        const selectedAnswer: QuizzAnswerProps = question.answers.filter((answer) => answer.id === selectedAnswerId)[0];

        return selectedAnswer.answer;
    }

    const getCorrectAnswer = () => {
        const selectedAnswer: QuizzAnswerProps = result.answers.filter((answer) => answer.correctAnswer)[0];

        return selectedAnswer.answer;
    }

    return (
        <li className="p-3 bg-green rounded-lg">
            <p className="text-white">
                <strong>
                    {question.question}
                </strong>
            </p>
            <p>
                Sua resposta:{" "}
                <span>
                    {
                        getSelectedAnswer()
                    }
                </span>
            </p>
            <p>
                Resposta correta:
                {
                    getCorrectAnswer()
                }
            </p>
        </li>
    )
}

export default QuizzResultQuestion;