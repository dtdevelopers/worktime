import {useQuery} from "react-query";
import {UserService} from "../../../services/user";
import {IUser} from "../../../types/user";
import {useCallback} from "react";
import {Trash, Pencil} from "@phosphor-icons/react";
import {ExceptionService} from "../../../services/exception";
import {IException} from "../../../types/exception";
import {VacationService} from "../../../services/vacation";
import {IVacation} from "../../../types/vacation";
import {EventService} from "../../../services/event";
import {IEvent} from "../../../types/event";
import {useNavigate} from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const { data: employees, refetch: refetchEmployees } = useQuery('employee-list', () => UserService.findAll(), {
        refetchOnWindowFocus: false,
        initialData: [],
    });
    const { data: exceptions, refetch: refetchExceptions } = useQuery('excep-list', () => ExceptionService.findAll(), {
        refetchOnWindowFocus: false,
        initialData: [],
    });
    const { data: vacations, refetch: refetchVacations } = useQuery('vacat-list', () => VacationService.findAll(), {
        refetchOnWindowFocus: false,
        initialData: [],
    });
    const { data: events } = useQuery('event-list', () => EventService.findAll(), {
        refetchOnWindowFocus: false,
        initialData: [],
    });

    const createEmployeeExample = async () => {
        await UserService.create({
            name: 'Employee Example',
            email: 'example@example.com',
            document: '12345678910',
            phone: '12345678910',
            isEmployee: true
        } as IUser);
        await refetchEmployees();
    }

    const updateEmployeeExample = useCallback(async () => {
        await UserService.update(
            {
                ...employees?.[0],
                phone: Math.floor(Math.random() * 100).toString()
            } as IUser
        );
        await refetchEmployees();
    }, [employees, refetchEmployees])

    const deleteEmployee = async (id?: number) => {
        if (id) {
            await UserService.delete(id);
            await refetchEmployees();
        }
    }

    const deleteException = async (id?: number) => {
        if (id) {
            await ExceptionService.delete(id);
            await refetchExceptions();
        }
    }

    const deleteVacation = async (id?: number) => {
        if (id) {
            await VacationService.delete(id);
            await refetchVacations();
        }
    }

    return (
        <div className="flex flex-col gap-2">
            <div className="flex flex-col my-6">
                <h1>FUNCIONÁRIOS</h1>
                <button
                    title="Cadastrar"
                    className="bg-primary my-2 self-center px-4 py-2 rounded-md text-white font-bold"
                    onClick={() => navigate('employee/create')}
                >
                    Cadastrar funcionário
                </button>
                {employees?.map((d: IUser) => (
                        <div key={d.id} className="flex gap-2">
                            <p>{d.name}</p>|
                            <p>{d.email}</p>|
                            <p>{d.phone}</p>
                            <p>{d.isEmployee ? 'Sim' : 'Não'}</p>
                            <button
                                title="Editar"
                                className="bg-secondary my-2 self-center px-4 py-2 rounded-md text-white font-bold"
                                onClick={() => navigate(`employee/edit/${d.id}`)}
                            >
                                <Pencil size={20} />
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
            <div className="flex flex-col my-6">
                <h1>EXCEÇÃO</h1>
                <button
                    title="Cadastrar"
                    className="bg-primary my-2 self-center px-4 py-2 rounded-md text-white font-bold"
                    onClick={() => navigate('exception/create')}
                >
                    Cadastrar exceção
                </button>
                {exceptions?.map((d: IException) => (
                        <div key={d.id} className="flex gap-2">
                            <p>{d.occurrenceDate?.toString()}</p>|
                            <p>{d.duration}</p>|
                            <p>{d.durationType}</p>|
                            <p>{d.description}</p>|
                            <p>{d.isResolved}</p>|
                            <p>{d.user?.name}</p>|
                            <button
                                title="Editar"
                                className="bg-secondary my-2 self-center px-4 py-2 rounded-md text-white font-bold"
                                onClick={() => navigate(`exception/edit/${d.id}`)}
                            >
                                <Pencil size={20} />
                            </button>
                            <button
                                title="Excluir"
                                onClick={() => deleteException(d.id)}
                            >
                                <Trash size={20} />
                            </button>
                        </div>
                    )
                )}
            </div>
            <div className="flex flex-col my-6">
                <h1>FÉRIAS</h1>
                <button
                    title="Cadastrar"
                    className="bg-primary my-2 self-center px-4 py-2 rounded-md text-white font-bold"
                    onClick={() => navigate('vacation/create')}
                >
                    Cadastrar férias
                </button>
                {vacations?.map((d: IVacation) => (
                        <div key={d.id} className="flex gap-2">
                            <p>{d.startDate?.toString()}</p>|
                            <p>{d.endDate?.toString()}</p>|
                            <p>{d.user?.name}</p>|
                            <button
                                title="Editar"
                                className="bg-secondary my-2 self-center px-4 py-2 rounded-md text-white font-bold"
                                onClick={() => navigate(`vacation/edit/${d.id}`)}
                            >
                                <Pencil size={20} />
                            </button>
                            <button
                                title="Excluir"
                                onClick={() => deleteVacation(d.id)}
                            >
                                <Trash size={20} />
                            </button>
                        </div>
                    )
                )}
            </div>
            <div className="flex flex-col my-6">
                <h1>EVENTOS</h1>
                <button
                    title="Cadastrar"
                    className="bg-primary my-2 self-center px-4 py-2 rounded-md text-white font-bold"
                    onClick={() => navigate('event/create')}
                >
                    Cadastrar evento
                </button>
                {events?.map((d: IEvent) => (
                        <div key={d.id} className="flex gap-2">
                            <p>{d.createdDate?.toString()}</p>|
                            <p>{d.type}</p>|
                            <p>{d.user?.name}</p>
                            <button
                                title="Editar"
                                className="bg-secondary my-2 self-center px-4 py-2 rounded-md text-white font-bold"
                                onClick={() => navigate(`event/edit/${d.id}`)}
                            >
                                <Pencil size={20} />
                            </button>
                            <button
                                title="Excluir"
                                onClick={() => {console.log(d.id)}}
                            >
                                <Trash size={20} />
                            </button>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}

export default Home;
