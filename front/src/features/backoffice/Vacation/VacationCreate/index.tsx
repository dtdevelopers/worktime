import {toast} from "react-toastify";
import {useQuery} from "react-query";
import {UserService} from "../../../../services/user";
import {useForm} from "react-hook-form";
import {useCallback} from "react";
import {VacationService} from "../../../../services/vacation";
import VacationForm, { TFormVacation } from "../VacationForm/index";

const VacationCreate = () => {
    const { data, isLoading } = useQuery(`employees-list`, () => UserService.findAll(), {
        refetchOnWindowFocus: false,
        initialData: [],
        onSuccess: (_data) => {
            console.log(_data);
        },
        onError: (err: Error) => {
            toast.error(err.message);
        },
    });

    const methods = useForm({
        defaultValues: { 
            startDate: undefined,
            endDate: undefined,
            idEmployee: 0
        },
    });

    const handleCreateVacation = useCallback(async (values: TFormVacation) => {
        const { startDate, endDate, idEmployee } = values
        await VacationService.create({
            startDate,
            endDate,
            user: {
                id: Number(idEmployee)
            },
        });
    }, [])

    return (
        <div className="flex flex-col gap-2">
            <span className='text-md font-semibold leading-8 text-emphasis-medium dark:text-emphasisDark-medium'>
                Cadastrar Nova Férias
            </span>
            <div>
                <VacationForm 
                    handleAction={handleCreateVacation}
                    isLoading={isLoading}
                    methods={methods}
                    employees={data ?? []}
                />
            </div>
        </div>
    );
}

export default VacationCreate;
