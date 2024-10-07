const QuizzTimer = ({
    timeLeft
}: {
    timeLeft: number | null
}) => {

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