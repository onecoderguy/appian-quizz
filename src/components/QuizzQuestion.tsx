import QuizzQuestionProps from "@/interfaces/QuizzQuestionProps";

const QuizzQuestion = ({ question, onSelect }: {
    question: QuizzQuestionProps,
    onSelect: (answer: number) => void
}) => {

    return (
        <div>
            <h2 className="text-xl text-black font-semibold mb-4">{question.question}</h2>
            <ul className="space-y-2">
                {
                    question.answers.map(
                        (option, index) => (
                            <li key={index}>
                                <button
                                    onClick={() => onSelect(option.id)}
                                    className="w-full bg-green text-white p-3 rounded-lg hover:bg-soft-grey hover:text-black"
                                >
                                    {option.answer}
                                </button>
                            </li>
                        )
                    )
                }
            </ul>
        </div>
    );
};

export default QuizzQuestion;