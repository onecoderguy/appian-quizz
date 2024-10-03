interface QuizzSetupDataProps {
    step: number,
    codename: string,
    topics: number[],
    duration: number,
    start: number | null,
    end: number | null,
    current?: number,
    answers?: number[]
}

export default QuizzSetupDataProps;