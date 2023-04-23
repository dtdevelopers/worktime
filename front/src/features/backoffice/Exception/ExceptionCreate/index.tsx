import {toast} from "react-toastify";
import {useQuery} from "react-query";
import {UserService} from "../../../../services/user";
import {useForm} from "react-hook-form";
import {useCallback} from "react";
import ExceptionForm, { TFormException } from "../ExceptionForm/index";

const ExceptionCreate = () => {
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
            description: '',
            duration: 0,
            durationType: '',
            occurrenceDate: undefined,
            idEmployee: 0,
            fileId: ''
        },
    });

    const handleCreate = useCallback((values: TFormException) => {
        console.log(values)
    }, [])

    return (
        <div className="flex flex-col gap-2">
            <span className='text-md font-semibold leading-8 text-emphasis-medium dark:text-emphasisDark-medium'>
                Cadastrar Nova Exceção
            </span>
            <div>
                <ExceptionForm 
                    handleAction={handleCreate}
                    isLoading={isLoading}
                    methods={methods}
                    employees={data}
                    durationTypes={[]}
                />
            </div>
        </div>
    );
}

export default ExceptionCreate;
