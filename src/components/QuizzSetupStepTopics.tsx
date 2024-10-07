"use client"

import QuizzSetupDataProps from "@/interfaces/QuizzSetupDataProps";
import QuizzSetupTopicProps from "@/interfaces/QuizzSetupTopicProps";
import { useState, useEffect } from "react";
import QuizzButton from "./QuizzButton";
import QuizzLoader from "./QuizzLoader";

const QuizzSetupStepTopics = ({
    quizzSetupData,
    handleQuizzSetupData
}: {
    handleQuizzSetupData: (newSetupData: QuizzSetupDataProps) => void,
    quizzSetupData: QuizzSetupDataProps
}): JSX.Element => {

    const [topics, setTopics] = useState<QuizzSetupTopicProps[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchTopics = (): void => {
            fetch('/api/topics')
                .then((result) => result.json())
                .then((result) => setTopics(result.topics))
                .then(() => setLoading(false))
                .catch((err) => {
                    console.log(err.message);
                });
        };

        fetchTopics();
    }, []);

    const toggleTopics = (toggledTopic: number): void => {
        if (quizzSetupData.topics.includes(toggledTopic)) {
            const newTopicsSetupData = quizzSetupData
                .topics
                .filter(
                    (topic) => topic !== toggledTopic
                );

            handleQuizzSetupData({
                ...quizzSetupData,
                topics: newTopicsSetupData
            });
        } else {
            const newTopicsSetupData = quizzSetupData.topics;
            newTopicsSetupData.push(toggledTopic);

            handleQuizzSetupData({
                ...quizzSetupData,
                topics: newTopicsSetupData
            });
        };
    }

    return (
        <>
            <div className="grid gap-2 justify-center w-100">
                <h1 className="text-xl text-green text-center mb-3">
                    Escolha os módulos que deseja incluir
                </h1>
                <div className="p-4 rounded-lg">
                    {
                        loading ?
                            <QuizzLoader />
                            :
                            <div className="grid grid-cols-2 gap-4">
                                {topics.map((topic, index) => (
                                    <button
                                        key={index}
                                        className={`px-4 py-2 rounded-lg border transition ${quizzSetupData.topics.includes(topic.id)
                                            ? "bg-green text-white border-green"
                                            : "bg-white text-gray-800 border-gray-300"
                                            }`}
                                        onClick={
                                            () => toggleTopics(topic.id)
                                        }
                                    >
                                        {topic.topic}
                                    </button>
                                ))}
                            </div>
                    }
                </div>
            </div>
            <div className="flex justify-between gap-2 mt-2">
                <div>
                    {
                        quizzSetupData.step > 0 &&
                        <QuizzButton
                            text="Anterior"
                            fn={
                                () => handleQuizzSetupData({
                                    ...quizzSetupData,
                                    step: quizzSetupData.step - 1
                                })
                            }
                        />
                    }
                </div>
                <div>
                    {
                        quizzSetupData.step < 2 &&
                        <QuizzButton
                            text="Próximo"
                            disabled={quizzSetupData.topics.length === 0}
                            fn={
                                () => handleQuizzSetupData({
                                    ...quizzSetupData,
                                    step: quizzSetupData.step + 1
                                })
                            }
                        />
                    }
                </div>
            </div>
        </>
    );
}

export default QuizzSetupStepTopics;