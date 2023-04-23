import {toast} from "react-toastify";
import {useQuery} from "react-query";
import {UserService} from "../../../../services/user";
import {Outlet, useNavigate, useParams} from 'react-router-dom';
import {IUser} from "../../../types/user";
import {useCallback} from "react";

const EmployeeJourneyControl = () => {
    const navigate = useNavigate();
    const { id } = useParams;

    const { data, refetch, isLoading } = useQuery(`employee-workload-${id}`, () => UserService.findAll(), {
        refetchOnWindowFocus: false,
        initialData: [],
        onSuccess: (_data) => {
            console.log(_data);
        },
        onError: (err: Error) => {
            toast.error(err.message);
        },
    });

    return (
        <div className="flex flex-col gap-2">
            <h1>Controle de Jornada</h1>
            <Outlet />
            <div>
                <p></p>
            </div>
            <div className='flex flex-row' style={{justifyContent: 'space-between'}}>
                <button 
                    title="Cadastrar Horários"
                    onClick={() => navigate(`/journey-control/workload/create-${id}`)}
                >
                    Cadastrar Horários
                </button>
                <button
                    title="Cadastrar Eventos" 
                    onClick={() => navigate(`/journey-control/event/create-${id}`)}
                >
                    Cadastrar Eventos
                </button>
                <button 
                    title="Cadastrar Férias"
                    onClick={() => navigate(`/journey-control/vacation/create-${id}`)}
                >
                    Cadastrar Férias
                </button>
            </div>
        </div>
    );
}

export default EmployeeJourneyControl;
