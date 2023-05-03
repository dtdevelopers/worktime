import {toast} from "react-toastify";
import {useQuery} from "react-query";
import {UserService} from "../../../../services/user";
import {useCallback, useMemo} from "react";
import EventForm, { TFormEvent } from "../EventForm/index";
import { useParams } from "react-router-dom";
import { IEvent } from "../../../../types/event";
import { EventService } from "../../../../services/event";

const EventEdit = () => {
    const { id }: { id?: string } = useParams();

    const { data: employees, isLoading } = useQuery(`employees-list`, () => UserService.findAll(), {
        refetchOnWindowFocus: false,
        onSuccess: (_data) => {
            console.log(_data);
        },
        onError: (err: Error) => {
            toast.error(err.message);
        }
    });

    const { data: event } = useQuery(`event-${id}`, () => EventService.find(Number(id)), {
        refetchOnWindowFocus: false,
        onSuccess: (_data: IEvent) => {
            console.log(_data);
        },
        onError: (err: Error) => {
            toast.error(err.message);
        }
    });

    const handleEdit = useCallback(async (values: TFormEvent) => {
        const { createdDate, type, idEmployee } = values
        await EventService.update(
            {
                createdDate,
                type,
                user: {
                    id: Number(idEmployee)
                }
            }
        );
    }, [])

    const renderForm = useMemo(() => {
        if (event && employees) {
            return (
                <EventForm 
                    handleAction={handleEdit}
                    isLoading={isLoading}
                    isEditing={true}
                    initialData={{ ...event, idEmployee: event.user.id }}
                    employees={employees}
                />
            )
        }
        return null
    }, [employees, event, handleEdit, isLoading])

    return (
        <div className="flex flex-col gap-2">
            <span className='text-md font-semibold leading-8 text-emphasis-medium dark:text-emphasisDark-medium'>
                Editar Evento
            </span>
            <div>
                {renderForm}
            </div>
        </div>
    );
}

export default EventEdit;
