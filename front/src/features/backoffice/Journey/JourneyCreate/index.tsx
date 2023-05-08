import {useForm} from "react-hook-form";
import {useCallback} from "react";
import VacationForm from "../JourneyForm/index";

const JourneyCreate = () => {
    const methods = useForm({
        defaultValues: { 
            startDate: undefined,
            endDate: undefined,
            idEmployee: 0
        },
    });

    const handleCreateVacation = useCallback(async () => {
        console.log('bla')
    }, [])

    return (
        <div className="flex flex-col gap-2">
            <span className='text-md font-semibold leading-8 text-emphasis-medium dark:text-emphasisDark-medium'>
                Cadastrar Nova Jornada
            </span>
            <div>
                <VacationForm 
                    handleAction={handleCreateVacation}
                    methods={methods}
                />
            </div>
        </div>
    );
}

export default JourneyCreate;
