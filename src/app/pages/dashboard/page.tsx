"use client"
import { useEffect, useState } from "react";

import QuizzResultsChart from "@/components/QuizzResultsChart";
import QuizzLoader from "@/components/QuizzLoader";

import QuizzOldResultData from "@/interfaces/QuizzOldResultData";
import QuizzSetupTopicProps from "@/interfaces/QuizzSetupTopicProps";

export default function Dashboard() {
  const [oldResults, setOldResults] = useState<QuizzOldResultData[]>([]);
  const [topics, setTopics] = useState<QuizzSetupTopicProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('/api/quizz-results')
      .then((res) => res.json())
      .then((res) => {
        const quizzOldResultData: QuizzOldResultData[] = res.results.map((item: QuizzOldResultData) => ({
          ...item,
          date: dateFormatter(new Date(item.date)),
        }));

        return quizzOldResultData;
      })
      .then((res) => setOldResults(res))
      .catch((err) => console.log(err.message));

    fetch('/api/topics')
      .then((res) => res.json())
      .then((res) => setTopics(res.topics))
      .catch((err) => console.log(err.message))
      .then(() => setLoading(false));
  }, []);

  const dateFormatter = (date: Date | number) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date).replace(',', '');
  };

  return (
    <div className="bg-white shadow-lg p-6 rounded-lg w-screen h-screen">
      {
        loading ?
          <QuizzLoader /> :
          <QuizzResultsChart data={oldResults} topics={topics}/>
      }
    </div>
  );
}