import QuizzSetupDataProps from "@/interfaces/QuizzSetupDataProps";
import QuizzSetupStepTopics from "./QuizzSetupStepTopics";
import QuizzSetupStepDuration from "./QuizzSetupStepDuration";

const setupSteps = [
    "topics",
    "duration"
];

const QuizzSetup = ({ quizzSetupData, setSetupData }: {
    quizzSetupData: QuizzSetupDataProps,
    setSetupData: (newSetupData: QuizzSetupDataProps) => void
}): JSX.Element => {

    const handleQuizzSetupData = (quizzSetupData: QuizzSetupDataProps): void => {
        setSetupData(quizzSetupData);

        return;
    };

    const handleQuizzStart = async (): Promise<void> => {
        const fetchQuizzStart = async (): Promise<void> => {
            fetch('/api/quizz-start', {
                method: 'POST',
                body: JSON.stringify({
                    codename: quizzSetupData.codename,
                    topics: quizzSetupData.topics.join(','),
                    duration: quizzSetupData.duration
                })
            }).then(() => {
                window.location.reload()
            });
        }

        await fetchQuizzStart()
    };

    return (
        <>
            {
                setupSteps[quizzSetupData.step] === "topics" &&
                <QuizzSetupStepTopics
                    quizzSetupData={quizzSetupData}
                    handleQuizzSetupData={handleQuizzSetupData}
                />
                ||
                setupSteps[quizzSetupData.step] === "duration" &&
                <QuizzSetupStepDuration
                    quizzSetupData={quizzSetupData}
                    handleQuizzSetupData={handleQuizzSetupData}
                    handleQuizzStart={handleQuizzStart}
                />
            }
        </>
    );
};

export default QuizzSetup;