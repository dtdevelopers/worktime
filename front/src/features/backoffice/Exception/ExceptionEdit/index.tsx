import {toast} from "react-toastify";
import {useQuery} from "react-query";
import {UserService} from "../../../../services/user";
import {useForm} from "react-hook-form";
import {useCallback} from "react";
import VacationForm, { TFormException } from "../ExceptionForm/index";
import { useParams } from "react-router-dom";
import { IException } from "../../../../types/exception";
import { EventService } from "../../../../services/event";
import { ExceptionService } from "../../../../services/exception";

const ExceptionEdit = () => {
    const { id } = useParams();

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

    const { exception } = useQuery(`exception-${id}`, () => ExceptionService.find(id), {
        refetchOnWindowFocus: false,
        initialData: [],
    });

    const methods = useForm({
        defaultValues: exception as IException,
    });

    const handleEditException = useCallback(async (values: TFormException) => {
        const { description, duration, durationType, occurrenceDate, idEmployee } = values
        await ExceptionService.update(
            {
                description,
                duration,
                durationType,
                occurrenceDate,
                user: {
                    id: Number(idEmployee)
                }
            }
        );
    }, [])

    return (
        <div className="flex flex-col gap-2">
            <span className='text-md font-semibold leading-8 text-emphasis-medium dark:text-emphasisDark-medium'>
                Editar Exceção
            </span>
            <div>
                <VacationForm 
                    handleAction={handleEditException}
                    isLoading={isLoading}
                    isEditing={true}
                    methods={methods}
                    employees={data}
                    durationTypes={[]}
                />
            </div>
        </div>
    );
}

export default ExceptionEdit;
