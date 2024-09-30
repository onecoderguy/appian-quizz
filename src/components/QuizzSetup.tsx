import QuizzSetupDataProps from "@/interfaces/QuizzSetupDataProps";
import QuizzSetupStepCodename from "./QuizzSetupStepCodename";
import QuizzSetupStepTopics from "./QuizzSetupStepTopics";
import QuizzSetupStepDuration from "./QuizzSetupStepDuration";

const setupSteps = [
    "codename",
    "topics",
    "duration"
];

const QuizzSetup = ({ quizzSetupData, setSetupData }: {
    quizzSetupData: QuizzSetupDataProps,
    setSetupData: (newSetupData: QuizzSetupDataProps) => void
}) => {

    const handleQuizzSetupData = (quizzSetupData: QuizzSetupDataProps) => {
        setSetupData(quizzSetupData);

        return;
    };

    const handleQuizzStart = () => {
        const fetchQuizzStart = (): void => {
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

        fetchQuizzStart()
    };

    return (
        <>
            {
                setupSteps[quizzSetupData.step] === "codename" &&
                <QuizzSetupStepCodename
                    quizzSetupData={quizzSetupData}
                    handleQuizzSetupData={handleQuizzSetupData}
                />
                ||
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