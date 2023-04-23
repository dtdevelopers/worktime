import {toast} from "react-toastify";
import {useQuery} from "react-query";
import {UserService} from "../../../../services/user";
import {useForm} from "react-hook-form";
import {useCallback} from "react";
import EmployeePersonalForm from "../Form/index";
import { useParams } from "react-router-dom";

const EmployeeEdit = () => {
    const { id } = useParams();

    const { data, refetch, isLoading } = useQuery(`employee${id}`, () => UserService.findAll(), {
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
        defaultValues: data,
    });

    const handleEdit = useCallback((values: any) => {
        console.log("🚀 ~ handleEdit ~ values:", values)
    }, [])

    return (
        <div className="flex flex-col gap-2">
            <span className='text-md font-semibold leading-8 text-emphasis-medium dark:text-emphasisDark-medium'>
                Editar Funcionário
            </span>
            <div>
                <EmployeePersonalForm 
                    handleAction={handleEdit}
                    isLoading={isLoading}
                    methods={methods}
                />
            </div>
        </div>
    );
}

export default EmployeeEdit;
