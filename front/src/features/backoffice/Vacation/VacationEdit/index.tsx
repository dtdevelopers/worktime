import {toast} from "react-toastify";
import {useQuery} from "react-query";
import {UserService} from "../../../../services/user";
import {useForm} from "react-hook-form";
import {useCallback} from "react";
import VacationForm, { TFormVacation } from "../VacationForm/index";
import { useParams } from "react-router-dom";
import {VacationService} from "../../../../services/vacation";
import { IVacation } from "../../../../types/vacation";

const VacationEdit = () => {
    const { id } = useParams();

    const { data, isLoading } = useQuery(`vacation-${id}`, () => UserService.findAll(), {
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
        defaultValues: data as IVacation,
    });

    const handleEdit = useCallback(async (values: TFormVacation) => {
        console.log("🚀 ~ handleEdit ~ values:", values)
        const { startDate, endDate, idEmployee } = values
        await VacationService.update(
            {
                startDate,
                endDate,
                user: {
                    id: idEmployee
                }
            }
        );
        toast.success('Férias atualizada com sucesso!');
    }, [])

    return (
        <div className="flex flex-col gap-2">
            <span className='text-md font-semibold leading-8 text-emphasis-medium dark:text-emphasisDark-medium'>
                Editar Férias
            </span>
            <div>
                <VacationForm 
                    handleAction={handleEdit}
                    isLoading={isLoading}
                    isEditing={true}
                    methods={methods}
                    employees={data}
                />
            </div>
        </div>
    );
}

export default VacationEdit;
