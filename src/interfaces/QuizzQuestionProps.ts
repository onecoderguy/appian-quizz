import QuizzAnswerProps from "./QuizzAnswerProps";

interface QuizzQuestionProps {
    id: number,
    topicId: number | null,
    question: string,
    active?: boolean,
    answers: QuizzAnswerProps[]
};

export default QuizzQuestionProps;