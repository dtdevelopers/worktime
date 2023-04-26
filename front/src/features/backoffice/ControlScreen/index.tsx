import {useQuery} from "react-query";
import {UserService} from "../../../services/user";
import {IUser} from "../../../types/user";
import {Trash, User, Clock, Airplane, FirstAidKit} from "@phosphor-icons/react";
import {useNavigate} from 'react-router-dom';

const ControlScreen = () => {
    const navigate = useNavigate();

    const { data: employees, refetch: refetchEmployees } = useQuery('employee-list', () => UserService.findAll(), {
        refetchOnWindowFocus: false,
        initialData: [],
    });

    const deleteEmployee = async (id?: number) => {
        if (id) {
            await UserService.delete(id);
            await refetchEmployees();
        }
    }

    return (
        <div className="flex flex-col gap-2">
            <div className="flex flex-col my-6">
                <h1>BLA</h1>
                {employees?.filter((d: IUser) => d.isEmployee === true
                    ).map((d: IUser) => (
                        <div key={d.id} className="flex gap-2">
                            <p>{d.name}</p>|
                            <p>{d.document}</p>|
                            <p>{d.email}</p>|
                            <p>{d.hireDate?.toString()}</p>|
                            <p>{d.monthlyWorkload}</p>
                            <button
                                title="Controle de Horas"
                                className="bg-secondary my-2 self-center px-4 py-2 rounded-md text-white font-bold"
                                onClick={() => navigate(`journey/${d.id}`)}
                            >
                                <Clock size={20} />
                            </button>
                            <button
                                title="Férias"
                                className="bg-secondary my-2 self-center px-4 py-2 rounded-md text-white font-bold"
                                onClick={() => navigate(`vacation/${d.id}`)}
                            >
                                <Airplane size={20} />
                            </button>
                            <button
                                title="Exceções"
                                className="bg-secondary my-2 self-center px-4 py-2 rounded-md text-white font-bold"
                                onClick={() => navigate(`exception/${d.id}`)}
                            >
                                <FirstAidKit size={20} />
                            </button>
                            <button
                                title="Editar Perfil"
                                className="bg-secondary my-2 self-center px-4 py-2 rounded-md text-white font-bold"
                                onClick={() => navigate(`/employee/edit/${d.id}`)}
                            >
                                <User size={20} />
                            </button>
                            {d.id !== 2 &&
                                <button
                                    title="Excluir"
                                    onClick={() => deleteEmployee(d.id)}
                                >
                                    <Trash size={20} />
                                </button>
                            }
                        </div>
                    )
                )}
            </div>
        </div>
    );
}

export default ControlScreen;
