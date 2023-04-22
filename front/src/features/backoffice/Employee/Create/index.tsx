import {toast} from "react-toastify";
import {useQuery} from "react-query";
import {UserService} from "../../../../services/user";
import {useForm} from "react-hook-form";
import {useCallback} from "react";
import Form from "../Form/index";

const Create = () => {
    const { data, refetch, isLoading } = useQuery(`employee`, () => UserService.findAll(), {
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
            name: '', 
            document: '', 
            birthdate: '',
            email: '',
            phone: '',
            password: '' 
        },
    });

    const handleCreate = useCallback((values: any) => {
        console.log(values)
    }, [])

    return (
        <div className="flex flex-col gap-2">
            <span className='text-md font-semibold leading-8 text-emphasis-medium dark:text-emphasisDark-medium'>
                Cadastrar Novo Funcionário
            </span>
            <div>
                <Form 
                    handleAction={handleCreate}
                    isLoading={isLoading}
                    methods={methods}
                />
            </div>
        </div>
    );
}

export default Create;
