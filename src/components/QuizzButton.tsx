const QuizzButton = ({ text, disabled = false, fn }: {
    text: string,
    disabled?: boolean,
    fn: () => void
}) => {
    return (
        <button
            className="bg-black text-white rounded justify-self-start p-2 disabled:opacity-25 disabled:cursor-not-allowed"
            disabled={disabled}
            onClick={
                () => fn()
            }
        >
            {text}
        </button>
    );
};

export default QuizzButton;