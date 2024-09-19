import QuizzSetupData from "@/interfaces/QuizzSetupData";
import QuizzButton from "./QuizzButton";

const QuizzSetupStepDuration = ({ setupData, handleQuizzSetupData, handleQuizzStart }: {
    setupData: QuizzSetupData,
    handleQuizzSetupData: (newSetupData: QuizzSetupData) => void,
    handleQuizzStart: () => void
}) => {

    return (
        <>
            <div className="grid gap-2 justify-center w-100">
                <h1 className="text-xl text-green text-center mb-3">
                    Insira a duração que deseja se desafiar
                </h1>
                <input
                    type="number"
                    step={5}
                    name="duration"
                    id="codename"
                    className="bg-soft-grey text-black outline-none rounded w-full p-3 text-center"
                    value={setupData.duration || 0}
                    onChange={
                        (e) => handleQuizzSetupData({
                            ...setupData,
                            duration: parseInt(e.target.value)
                        })
                    }
                ></input>
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
                        setupData.step === 2 &&
                        <QuizzButton
                            text="Iniciar"
                            disabled={setupData.duration < 5}
                            fn={
                                () => handleQuizzStart()
                            }
                        />
                    }
                </div>
            </div>
        </>
    );
};

export default QuizzSetupStepDuration;