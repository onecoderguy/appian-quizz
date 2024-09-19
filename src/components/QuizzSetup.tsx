import { Suspense } from "react";

import QuizzSetupData from "@/interfaces/QuizzSetupData";
import QuizzSetupStepCodename from "./QuizzSetupStepCodename";
import QuizzSetupStepTopics from "./QuizzSetupStepTopics";
import QuizzSetupStepDuration from "./QuizzSetupStepDuration";

const setupSteps = [
    "codename",
    "topics",
    "duration"
];

const QuizzSetup = ({ setupData, setSetupData }: {
    setupData: QuizzSetupData,
    setSetupData: (newSetupData: QuizzSetupData) => void
}) => {

    const handleQuizzSetupData = (quizzSetupData: QuizzSetupData) => {
        setSetupData(quizzSetupData);

        return;
    };

    const handleQuizzStart = () => {
        fetch('/api/quizz-start', {
            method: 'POST',
            body: JSON.stringify({
                codename: setupData.codename,
                topics: setupData.topics.join(','),
                duration: setupData.duration
            })
        }).then(() => {
            window.location.reload()
        })
    };

    return (
        <>
            {
                setupSteps[setupData.step] === "codename" &&
                <QuizzSetupStepCodename
                    setupData={setupData}
                    handleQuizzSetupData={handleQuizzSetupData}
                />
                ||
                setupSteps[setupData.step] === "topics" &&
                <QuizzSetupStepTopics
                    setupData={setupData}
                    handleQuizzSetupData={handleQuizzSetupData}
                />
                ||
                setupSteps[setupData.step] === "duration" &&
                <QuizzSetupStepDuration
                    setupData={setupData}
                    handleQuizzSetupData={handleQuizzSetupData}
                    handleQuizzStart={handleQuizzStart}
                />
            }
        </>
    );
};

export default QuizzSetup;