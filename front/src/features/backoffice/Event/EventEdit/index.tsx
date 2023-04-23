import {toast} from "react-toastify";
import {useQuery} from "react-query";
import {UserService} from "../../../../services/user";
import {useForm} from "react-hook-form";
import {useCallback} from "react";
import EventForm, { TFormEvent } from "../EventForm/index";
import { useParams } from "react-router-dom";
import { IEvent } from "../../../../types/event";
import { EventService } from "../../../../services/event";

const EventEdit = () => {
    const { id } = useParams();

    const { data, isLoading } = useQuery(`employees-list`, () => UserService.findAll(), {
        refetchOnWindowFocus: false,
        initialData: [],
        onSuccess: (_data) => {
            console.log(_data);
        },
        onError: (err: Error) => {
            toast.error(err.message);
        },
    });

    const { event } = useQuery(`event-${id}`, () => EventService.find(id), {
        refetchOnWindowFocus: false,
        initialData: [],
    });

    const methods = useForm({
        defaultValues: event as IEvent,
    });

    const handleEdit = useCallback((values: TFormEvent) => {
        console.log("🚀 ~ handleEdit ~ values:", values)
    }, [])

    return (
        <div className="flex flex-col gap-2">
            <span className='text-md font-semibold leading-8 text-emphasis-medium dark:text-emphasisDark-medium'>
                Editar Evento
            </span>
            <div>
                <EventForm 
                    handleAction={handleEdit}
                    isLoading={isLoading}
                    isEditing={true}
                    methods={methods}
                    employees={data}
                />
            </div>
        </div>
    );
}

export default EventEdit;
