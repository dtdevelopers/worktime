import { toast } from "react-toastify";
import { useQuery } from "react-query";
import { IVacation } from "../../../../../types/vacation";
import { useNavigate } from 'react-router-dom';
import { Pencil, Trash } from "@phosphor-icons/react";
import { VacationService } from "../../../../../services/vacation";
import { useCallback, useMemo } from "react";

const TabVacation = ({ idEmployee }: { idEmployee: number }) => {
    const navigate = useNavigate();

    const { data: vacations, refetch: refetchVacations} = useQuery(`vacation-${idEmployee}`, () => VacationService.findByUser(Number(idEmployee)), {
        refetchOnWindowFocus: false,
        onSuccess: (_data: IVacation[]) => {
            console.log(_data);
        },
        onError: (err: Error) => {
            toast.error(err.message);
        }
    });

    const handleDelete = useCallback(async (id?: number) => {
        if (id) {
            await VacationService.delete(id);
            await refetchVacations();
        }
    }, [refetchVacations])

    const renderTable = useMemo(() => {
        if (vacations) {
            return (
                <div>
                    {vacations?.map((d: IVacation) => (
                        <div key={d.id} className="flex gap-2">
                            <p>{d.startDate?.toString()}</p>|
                            <p>{d.endDate?.toString()}</p>|
                            <button
                                title="Editar"
                                className="bg-secondary my-2 self-center px-4 py-2 rounded-md text-white font-bold"
                                onClick={() => navigate(`vacation/edit/${d.id}`)}
                            >
                                <Pencil size={20} />
                            </button>
                            <button
                                title="Excluir"
                                onClick={() => handleDelete(d.id)}
                            >
                                <Trash size={20} />
                            </button>
                        </div>
                    ))}
                </div>
            )
        }
        return null
    }, [handleDelete, navigate, vacations])


    return (
        <div>
            <button
                title="Adicionar"
                className="bg-primary my-2 self-center px-4 py-2 rounded-md text-white font-bold"
                onClick={() => navigate('vacation/create')}
            >
                Adicionar
            </button>
            {renderTable}
        </div>
    );
}

export default TabVacation;
