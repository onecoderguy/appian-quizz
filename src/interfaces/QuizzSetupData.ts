interface QuizzSetupData {
    step: number,
    codename: string,
    topics: string[],
    duration: number,
    start: number | null,
    end: number | null
}

export default QuizzSetupData;