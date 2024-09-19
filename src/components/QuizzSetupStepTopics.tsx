"use client"

import QuizzSetupData from "@/interfaces/QuizzSetupData";
import QuizzSetupTopic from "@/interfaces/QuizzSetupTopic";
import { useState, useEffect } from "react";
import QuizzButton from "./QuizzButton";

const QuizzSetupStepTopics = ({
    setupData,
    handleQuizzSetupData
}: {
    handleQuizzSetupData: (newSetupData: QuizzSetupData) => void,
    setupData: QuizzSetupData
}) => {

    const [topics, setTopics] = useState<QuizzSetupTopic[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetch('/api/topics')
            .then((result) => result.json())
            .then((result) => setTopics(result.topics))
            .then(() => setLoading(false))
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    const toggleTopics = (toggledTopic: string) => {
        if (setupData.topics.includes(toggledTopic)) {
            const newTopicsSetupData = setupData
                .topics
                .filter(
                    (topic) => topic !== toggledTopic
                );

            handleQuizzSetupData({
                ...setupData,
                topics: newTopicsSetupData
            });
        } else {
            const newTopicsSetupData = setupData.topics;
            newTopicsSetupData.push(toggledTopic);
            console.log(newTopicsSetupData);

            handleQuizzSetupData({
                ...setupData,
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
                            <div className="flex justify-center">
                                <span className="spinner"></span>
                            </div>
                            :
                            <div className="grid grid-cols-2 gap-4">
                                {topics.map((topic, index) => (
                                    <button
                                        key={index}
                                        className={`px-4 py-2 rounded-lg border transition ${setupData.topics.includes(topic.topic)
                                            ? "bg-green text-white border-green"
                                            : "bg-white text-gray-800 border-gray-300"
                                            }`}
                                        onClick={() => toggleTopics(topic.topic)}
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
                        setupData.step > 0 &&
                        <QuizzButton
                            text="Anterior"
                            fn={
                                () => handleQuizzSetupData({
                                    ...setupData,
                                    step: setupData.step - 1
                                })
                            }
                        />
                    }
                </div>
                <div>
                    {
                        setupData.step < 2 &&
                        <QuizzButton
                            text="Próximo"
                            disabled={setupData.topics.length === 0}
                            fn={
                                () => handleQuizzSetupData({
                                    ...setupData,
                                    step: setupData.step + 1
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