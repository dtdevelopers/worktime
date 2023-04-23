import {useQuery} from "react-query";
import {UserService} from "../../../services/user";
import {toast} from "react-toastify";
import {IUser} from "../../../types/user";
import {useCallback} from "react";
import {Trash} from "@phosphor-icons/react";
import {ExceptionService} from "../../../services/exception";
import {IException} from "../../../types/exception";
import {VacationService} from "../../../services/vacation";
import {IVacation} from "../../../types/vacation";
import {EventService} from "../../../services/event";

const Home = () => {
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
    }, [employees])

    const deleteEmployeeExample = async (id?: number) => {
        if (id) {
            await UserService.delete(id);
            await refetchEmployees();
        }
    }

    const createExceptionExample = async () => {
        await ExceptionService.create({
            occurrenceDate: new Date(),
            duration: 1,
            durationType: 'day',
            description: 'Exception example',
            user: {
                id: 2,
            },
            isResolved: true,
            fileId: 'file id example'
        } as IException);
        await refetchExceptions();
    }

    const updateExceptionExample = useCallback(async () => {
        await ExceptionService.update(
            {
                ...exceptions?.[0],
                duration: Math.floor(Math.random() * 100)
            } as IException
        );
        await refetchExceptions();
    }, [exceptions])

    const deleteExceptionExample = async (id?: number) => {
        if (id) {
            await ExceptionService.delete(id);
            await refetchExceptions();
        }
    }

    const createVacationExample = async () => {
        await VacationService.create({
            startDate: new Date(),
            endDate: new Date(),
            user: {
                id: 2,
            },
        } as IVacation);
        await refetchVacations();
    }

    const updateVacationExample = useCallback(async () => {
        await VacationService.update(
            {
                ...vacations?.[0],
                startDate: new Date(),
                endDate: new Date(),
            } as IVacation
        );
        await refetchVacations();
    }, [vacations])

    const deleteVacationExample = async (id?: number) => {
        if (id) {
            await VacationService.delete(id);
            await refetchVacations();
        }
    }

    return (
        <div className="flex flex-col gap-2">
            <div className="flex flex-col my-6">
                <h1>FUNCIONARIOS</h1>
                <button
                    className="bg-primary my-2 self-center px-4 py-2 rounded-md text-white font-bold"
                    onClick={createEmployeeExample}
                >
                    Criar funcionário
                </button>
                <button
                    className="bg-secondary my-2 self-center px-4 py-2 rounded-md text-white font-bold"
                    onClick={updateEmployeeExample}
                >
                    Atualizar funcionário
                </button>
                {employees?.map(d => (
                        <div key={d.id} className="flex gap-2">
                            <p>{d.name}</p>|
                            <p>{d.email}</p>|
                            <p>{d.phone}</p>
                            {d.id !== 2 &&
                                <button
                                    onClick={() => deleteEmployeeExample(d.id)}
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
                    className="bg-primary my-2 self-center px-4 py-2 rounded-md text-white font-bold"
                    onClick={createExceptionExample}
                >
                    Criar exceção
                </button>
                <button
                    className="bg-secondary my-2 self-center px-4 py-2 rounded-md text-white font-bold"
                    onClick={updateExceptionExample}
                >
                    Atualizar exceção
                </button>
                {exceptions?.map(d => (
                        <div key={d.id} className="flex gap-2">
                            <p>{d.occurrenceDate?.toString()}</p>|
                            <p>{d.duration}</p>|
                            <p>{d.durationType}</p>|
                            <p>{d.description}</p>|
                            <p>{d.isResolved}</p>|
                            <p>{d.user?.name}</p>|
                            <button
                                onClick={() => deleteExceptionExample(d.id)}
                            >
                                <Trash size={20} />
                            </button>
                        </div>
                    )
                )}
            </div>
            <div className="flex flex-col my-6">
                <h1>FERIAS</h1>
                <button
                    className="bg-primary my-2 self-center px-4 py-2 rounded-md text-white font-bold"
                    onClick={createVacationExample}
                >
                    Criar ferias
                </button>
                <button
                    className="bg-secondary my-2 self-center px-4 py-2 rounded-md text-white font-bold"
                    onClick={updateVacationExample}
                >
                    Atualizar ferias
                </button>
                {vacations?.map(d => (
                        <div key={d.id} className="flex gap-2">
                            <p>{d.startDate?.toString()}</p>|
                            <p>{d.endDate?.toString()}</p>|
                            <p>{d.user?.name}</p>|
                            <button
                                onClick={() => deleteVacationExample(d.id)}
                            >
                                <Trash size={20} />
                            </button>
                        </div>
                    )
                )}
            </div>
            <div className="flex flex-col my-6">
                <h1>EVENTOS</h1>
                {events?.map(d => (
                        <div key={d.id} className="flex gap-2">
                            <p>{d.createdDate?.toString()}</p>|
                            <p>{d.type}</p>|
                            <p>{d.user?.name}</p>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}

export default Home;
