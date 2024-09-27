interface QuizzAnswerProps {
    id: number,
    questionId: number,
    answer: string,
    correctAnswer?: boolean,
    active?: boolean
}

export default QuizzAnswerProps;