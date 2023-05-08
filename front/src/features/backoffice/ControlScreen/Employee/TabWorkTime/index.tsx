import { toast } from "react-toastify";
import { useQuery } from "react-query";
import { useNavigate } from 'react-router-dom';
import { Pencil } from "@phosphor-icons/react";
import { useMemo } from "react";

const TabWorkTime = () => {
    const navigate = useNavigate();

    const workTime = useMemo(() => {
        return [
            {
                dia: '23/05/2023',
                entrada1: '00:00:00',
                saida1: '00:00:00',
                entrada2: null,
                saida2: null,
                horas_trabalhadas: '00:00:00',
                horas_extras: '00:00:00',
                horas_falta: '00:00:00',
                is_consistente: false
               }
        ]
    }, []) 

    const renderTable = useMemo(() => {
        if (workTime) {
            return (
                <div>
                    <div className="flex gap-2">
                        <p>Data</p>|
                        <p>Entrada</p>|
                        <p>Saída</p>|
                        <p>Entrada</p>|
                        <p>Saída</p>|
                        <p>Horas Trabalhadas</p>|
                        <p>Horas Extras</p>|
                        <p>Horas Falta</p>|
                        <p>Ações</p>
                    </div>
                    {workTime?.map((d: any) => (
                        <div key={d.id} className="flex gap-2">
                            <p>{d.dia?.toString()}</p>|
                            <p>{d.entrada1?.toString()}</p>|
                            <p>{d.saida1?.toString()}</p>|
                            <p>{d.entrada2?.toString()}</p>|
                            <p>{d.saida2?.toString()}</p>|
                            <p>{d.horas_trabalhadas?.toString()}</p>|
                            <p>{d.horas_extras?.toString()}</p>|
                            <p>{d.horas_falta?.toString()}</p>|
                            <button
                                title="Editar"
                                className="bg-secondary my-2 self-center px-4 py-2 rounded-md text-white font-bold"
                                onClick={() => navigate(`event/edit/${d.id}`)}
                            >
                                <Pencil size={20} />
                            </button>
                        </div>
                    ))}
                </div>
            )
        }
        return null
    }, [navigate, workTime])


    return (
        <div>
            {renderTable}
        </div>
    )
}

export default TabWorkTime;
