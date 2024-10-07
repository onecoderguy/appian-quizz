import QuizzSetupDataProps from "@/interfaces/QuizzSetupDataProps";
import QuizzButton from "./QuizzButton";

const QuizzSetupStepCodename = ({
    quizzSetupData,
    handleQuizzSetupData
}: {
    handleQuizzSetupData: (newSetupData: QuizzSetupDataProps) => void,
    quizzSetupData: QuizzSetupDataProps
}): JSX.Element => {

    return (
        <>
            <div className="grid gap-2 justify-center">
                <h1 className="text-xl text-green text-center mb-3">
                    Insira seu codename
                </h1>
                <input
                    type="text"
                    name="codename"
                    id="codename"
                    className="bg-soft-grey text-black outline-none rounded w-full p-3 text-center"
                    value={quizzSetupData.codename || ""}
                    onChange={
                        (e) => handleQuizzSetupData({
                            ...quizzSetupData,
                            codename: e.target.value
                        })
                    }
                ></input>
            </div>
            <div className="flex justify-end gap-2 mt-2">
                <div>
                    {
                        <QuizzButton
                            text="Próximo"
                            disabled={quizzSetupData.codename.length < 3}
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

export default QuizzSetupStepCodename;