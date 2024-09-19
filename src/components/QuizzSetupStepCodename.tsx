import quizzSetupData from "@/interfaces/quizzSetupData";
import QuizzButton from "./QuizzButton";

const QuizzSetupStepCodename = ({
    setupData,
    handleQuizzSetupData
}: {
    handleQuizzSetupData: (newSetupData: quizzSetupData) => void,
    setupData: quizzSetupData
}) => {

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
                    value={setupData.codename || ""}
                    onChange={
                        (e) => handleQuizzSetupData({
                            ...setupData,
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
                            disabled={setupData.codename.length < 3}
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

export default QuizzSetupStepCodename;