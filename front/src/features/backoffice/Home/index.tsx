import {useQuery} from "react-query";
import {UserService} from "../../../services/user";
import {IUser} from "../../../types/user";
import {useCallback} from "react";
import {Trash} from "@phosphor-icons/react";
import {ExceptionService} from "../../../services/exception";
import {IException} from "../../../types/exception";
import {VacationService} from "../../../services/vacation";
import {IVacation} from "../../../types/vacation";
import {EventService} from "../../../services/event";
import { IEvent } from "../../../types/event";

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
    }, [employees, refetchEmployees])

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
    }, [exceptions, refetchExceptions])

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
    }, [refetchVacations, vacations])

    const deleteVacationExample = async (id?: number) => {
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
                    className="bg-primary my-2 self-center px-4 py-2 rounded-md text-white font-bold"
                    onClick={createEmployeeExample}
                >
                    Criar funcionário
                </button>
                {employees?.map((d: IUser) => (
                        <div key={d.id} className="flex gap-2">
                            <p>{d.name}</p>|
                            <p>{d.email}</p>|
                            <p>{d.phone}</p>
                            <p>{d.isEmployee ? 'Sim' : 'Não'}</p>
                            <button
                                className="bg-secondary my-2 self-center px-4 py-2 rounded-md text-white font-bold"
                                onClick={updateEmployeeExample}
                            >
                                Atualizar
                            </button>
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
                {exceptions?.map((d: IException) => (
                        <div key={d.id} className="flex gap-2">
                            <p>{d.occurrenceDate?.toString()}</p>|
                            <p>{d.duration}</p>|
                            <p>{d.durationType}</p>|
                            <p>{d.description}</p>|
                            <p>{d.isResolved}</p>|
                            <p>{d.user?.name}</p>|
                            <button
                                className="bg-secondary my-2 self-center px-4 py-2 rounded-md text-white font-bold"
                                onClick={updateExceptionExample}
                            >
                                Atualizar
                            </button>
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
                <h1>FÉRIAS</h1>
                <button
                    className="bg-primary my-2 self-center px-4 py-2 rounded-md text-white font-bold"
                    onClick={createVacationExample}
                >
                    Criar férias
                </button>
                {vacations?.map((d: IVacation) => (
                        <div key={d.id} className="flex gap-2">
                            <p>{d.startDate?.toString()}</p>|
                            <p>{d.endDate?.toString()}</p>|
                            <p>{d.user?.name}</p>|
                            <button
                                className="bg-secondary my-2 self-center px-4 py-2 rounded-md text-white font-bold"
                                onClick={updateVacationExample}
                            >
                                Atualizar
                            </button>
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
                <button
                    className="bg-primary my-2 self-center px-4 py-2 rounded-md text-white font-bold"
                    onClick={() => {console.log(d.id)}}
                >
                    Criar evento
                </button>
                {events?.map((d: IEvent) => (
                        <div key={d.id} className="flex gap-2">
                            <p>{d.createdDate?.toString()}</p>|
                            <p>{d.type}</p>|
                            <p>{d.user?.name}</p>
                            <button
                                className="bg-secondary my-2 self-center px-4 py-2 rounded-md text-white font-bold"
                                onClick={() => {console.log(d.id)}}
                            >
                                Atualizar
                            </button>
                            <button
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
