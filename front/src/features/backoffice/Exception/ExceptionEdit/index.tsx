import {toast} from "react-toastify";
import {useQuery} from "react-query";
import {UserService} from "../../../../services/user";
import {useForm} from "react-hook-form";
import {useCallback} from "react";
import VacationForm, { TFormException } from "../ExceptionForm/index";
import { useParams } from "react-router-dom";
import { IException } from "../../../../types/exception";

const ExceptionEdit = () => {
    const { id } = useParams();

    const { data, isLoading } = useQuery(`exception-${id}`, () => UserService.findAll(), {
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
        defaultValues: data as IException,
    });

    const handleEdit = useCallback((values: TFormException) => {
        console.log("🚀 ~ handleEdit ~ values:", values)
    }, [])

    return (
        <div className="flex flex-col gap-2">
            <span className='text-md font-semibold leading-8 text-emphasis-medium dark:text-emphasisDark-medium'>
                Editar Exceção
            </span>
            <div>
                <VacationForm 
                    handleAction={handleEdit}
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
