import {toast} from "react-toastify";
import {useQuery} from "react-query";
import {UserService} from "../../../../services/user";
import {useForm} from "react-hook-form";
import {useCallback} from "react";
import Form from "../Form/index";
import { useParams } from "react-router-dom";

const Edit = () => {
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

    const handleSubmit = useCallback((values: any) => {
        console.log(values)
    }, [])

    return (
        <div className="flex flex-col gap-2">
            <h1>Editar Funcionários</h1>
            <div>
                <Form 
                    handleSubmit={handleSubmit}
                    isLoading={isLoading}
                    methods={methods}
                />
            </div>
        </div>
    );
}

export default Edit;
