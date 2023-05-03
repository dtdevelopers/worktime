import {toast} from "react-toastify";
import {useQuery} from "react-query";
import {UserService} from "../../../../services/user";
import {useCallback} from "react";
import ExceptionForm, { TFormException } from "../ExceptionForm/index";
import { ExceptionService } from "../../../../services/exception";

const ExceptionCreate = () => {
    const { data: employees, isLoading } = useQuery(`employees-list`, () => UserService.findAll(), {
        refetchOnWindowFocus: false,
        initialData: [],
        onSuccess: (_data) => {
            console.log(_data);
        },
        onError: (err: Error) => {
            toast.error(err.message);
        },
    });

    const handleCreate = useCallback(async (values: TFormException) => {
        const { description, duration, durationType, occurrenceDate, idEmployee, fileId, isResolved } = values
        await ExceptionService.create({
            occurrenceDate,
            duration,
            durationType,
            description,
            isResolved,
            fileId,
            user: {
                id: Number(idEmployee)
            }
        });
    }, [])

    return (
        <div className="flex flex-col gap-2">
            <span className='text-md font-semibold leading-8 text-emphasis-medium dark:text-emphasisDark-medium'>
                Cadastrar Nova Exceção
            </span>
            <div>
                {employees && <ExceptionForm 
                    handleAction={handleCreate}
                    isLoading={isLoading}
                    employees={employees}
                    durationTypes={[]}
                />}
            </div>
        </div>
    );
}

export default ExceptionCreate;
