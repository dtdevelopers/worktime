import { toast } from "react-toastify";
import { useQuery } from "react-query";
import { IException } from "../../../../../types/exception";
import { useNavigate } from 'react-router-dom';
import { Pencil, Trash } from "@phosphor-icons/react";
import { ExceptionService } from "../../../../../services/exception";
import { useCallback, useMemo } from "react";

const TabException = ({ idEmployee }: { idEmployee: number }) => {
    const navigate = useNavigate();

    const { data: exceptions, refetch: refetchExceptions} = useQuery(`vacation-${idEmployee}`, () => ExceptionService.findByUser(Number(idEmployee)), {
        refetchOnWindowFocus: false,
        onSuccess: (_data: IException[]) => {
            console.log(_data);
        },
        onError: (err: Error) => {
            toast.error(err.message);
        }
    });

    const handleDelete = useCallback(async (id?: number) => {
        if (id) {
            await ExceptionService.delete(id);
            await refetchExceptions();
        }
    }, [refetchExceptions])

    const renderTable = useMemo(() => {
        if (exceptions) {
            return (
                <div>
                     {exceptions?.map((d: IException) => (
                        <div key={d.id} className="flex gap-2">
                            <p>{d.occurrenceDate?.toString()}</p>|
                            <p>{d.duration}</p>|
                            <p>{d.durationType}</p>|
                            <p>{d.description}</p>|
                            <p>{d.isResolved}</p>|
                            <button
                                title="Editar"
                                className="bg-secondary my-2 self-center px-4 py-2 rounded-md text-white font-bold"
                                onClick={() => navigate(`exception/edit/${d.id}`)}
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
    }, [handleDelete, navigate, exceptions])


    return (
        <div>
            <button
                title="Adicionar"
                className="bg-primary my-2 self-center px-4 py-2 rounded-md text-white font-bold"
                onClick={() => navigate('exception/create')}
            >
                Adicionar
            </button>
            {renderTable}
        </div>
    );
}

export default TabException;
