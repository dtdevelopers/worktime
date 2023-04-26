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
    const { id }: { id?: string } = useParams();

    const { data: employees, isLoading } = useQuery(`employees-list`, () => UserService.findAll(), {
        refetchOnWindowFocus: false,
        initialData: [],
        onSuccess: (_data) => {
            console.log(_data);
        },
        onError: (err: Error) => {
            toast.error(err.message);
        }
    });

    const { data: vacation } = useQuery(`event-${id}`, () => VacationService.find(Number(id)), {
        refetchOnWindowFocus: false,
        onSuccess: (_data: IVacation) => {
            console.log(_data);
        },
        onError: (err: Error) => {
            toast.error(err.message);
        }
    });

    const methods = useForm({
        defaultValues: vacation as IVacation,
    });

    const handleEditVacation = useCallback(async (values: TFormVacation) => {
        const { startDate, endDate, idEmployee } = values
        await VacationService.update(
            {
                startDate,
                endDate,
                user: {
                    id: Number(idEmployee)
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
                    handleAction={handleEditVacation}
                    isLoading={isLoading}
                    isEditing={true}
                    methods={methods}
                    employees={employees ?? []}
                />
            </div>
        </div>
    );
}

export default VacationEdit;
