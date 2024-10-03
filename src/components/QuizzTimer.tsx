import { useState, useEffect } from 'react';

const QuizzTimer = ({
    start,
    duration
}: {
    start: number;
    duration: number
}) => {
    const [timeLeft, setTimeLeft] = useState<number | null>(null);

    useEffect(() => {
        const durationInMs = duration * 60 * 1000;
        const endTime = start + durationInMs;

        const updateCountdown = () => {
            const currentTime = new Date().getTime();
            const remainingTime = endTime - currentTime;

            if (remainingTime > 0) {
                setTimeLeft(remainingTime);
            } else {
                setTimeLeft(0);
                clearInterval(timer);
            }
        };

        const timer = setInterval(updateCountdown, 1000);

        updateCountdown();

        return () => clearInterval(timer);
    }, [start, duration]);

    const formatTime = (ms: number) => {
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;

        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div className="align-center">
            {
                timeLeft !== null ? (
                    <>
                        <h1>Tempo restante: {formatTime(timeLeft)}</h1>
                        {timeLeft === 0 && <h2>O tempo acabou!</h2>}
                    </>
                ) : (
                    <h1>Calculando o tempo...</h1>
                )
            }
        </div>
    );
}

export default QuizzTimer;