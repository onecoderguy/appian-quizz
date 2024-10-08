import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  Filler
} from 'chart.js';

import QuizzOldResultData from '@/interfaces/QuizzOldResultData';
import QuizzSetupTopicProps from '@/interfaces/QuizzSetupTopicProps';

ChartJS
  .register(
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    Title,
    CategoryScale,
    Filler
  );

interface LineChartProps {
  data: QuizzOldResultData[];
  topics: QuizzSetupTopicProps[];
}

const QuizzResultsChart: React.FC<LineChartProps> = ({ data, topics }) => {

  const makePercent = (correctAnswers: number, totalQuestions: number): number => {
    if (totalQuestions === 0) {
      return 0;
    }

    return parseInt(((correctAnswers / totalQuestions) * 100).toFixed(1));
  };

  const labels = data.map(item => {
    const _topics = topics?.filter(
      (topic) => item
        .topics
        .split(",")
        .includes(topic.id.toString())
    )

    const label = [`${item.date}`, 'Módulos:'];
    label.push(_topics.map((_topic) => (_topic.topic)).toString());

    return label;
  });
  const values = data.map(
    item => makePercent(item.correctAnswers, item.totalQuestions)
  );

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Taxa de Acertos (%)',
        data: values,
        borderColor: '#86BC25',
        backgroundColor: 'rgba(134, 188, 37, .2)',
        fill: true,
        tension: 0.4,
        intStyle: 'circle',
        pointRadius: 10
      },
    ],
  };

  return (
    <Line
      data={chartData}
      options={{
        responsive: true,
        layout: {
          padding: 20
        },
        scales: {
          y: {
            min: 0,
            max: 100,
            title: {
              display: true,
              text: 'Taxa de Acertos (%)',
            },
          },
          x: {
            title: {
              display: true,
              text: 'Submissões por ordem de finalização',
            },
          },
        },
        plugins: {
          legend: {
            position: 'top'
          },
          title: {
            display: true,
            text: 'Taxa de acerto dos exames realizados'
          },
          subtitle: {
            display: true,
            text: ``
          },
          tooltip: {
            callbacks: {
              title: (tooltipItems) => {
                const date = tooltipItems[0].label;

                return `Data do Exame: ${date}`;
              },
              label: (tooltipItem) => {
                const accuracy = tooltipItem.raw;
                return `Taxa de Acertos: ${accuracy}%`;
              },
            }
          }
        }
      }}
    />
  );
};

export default QuizzResultsChart;
