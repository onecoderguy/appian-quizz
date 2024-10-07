import QuizzAnswerProps from "@/interfaces/QuizzAnswerProps";
import QuizzQuestionProps from "@/interfaces/QuizzQuestionProps";

const QuizzResultQuestion = ({ question, result, selectedAnswerId }: {
    question: QuizzQuestionProps,
    result: QuizzQuestionProps,
    selectedAnswerId: number
}): JSX.Element => {

    const getSelectedAnswer = (): string => {
        const selectedAnswer: QuizzAnswerProps = question.answers.filter((answer) => answer.id === selectedAnswerId)[0];

        return selectedAnswer?.answer ?? "Sem resposta, tempo esgotado.";
    }

    const getCorrectAnswer = (): string => {
        const selectedAnswer: QuizzAnswerProps = result.answers.filter((answer) => answer.correctAnswer)[0];

        return selectedAnswer.answer;
    }

    return (
        <li className={
            `p-3 rounded-lg ${getCorrectAnswer() === getSelectedAnswer() ? 'bg-green' : 'bg-red'}`
        }>
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
                Resposta correta:{" "}
                {
                    getCorrectAnswer()
                }
            </p>
        </li>
    )
}

export default QuizzResultQuestion;