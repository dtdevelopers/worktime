import {toast} from "react-toastify";
import {useQuery} from "react-query";
import {UserService} from "../../../../services/user";
import {useCallback} from "react";
import EventForm, { TFormEvent } from "../EventForm/index";

const EventCreate = () => {
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

    const handleCreate = useCallback((values: TFormEvent) => {
        console.log(values)
    }, [])

    return (
        <div className="flex flex-col gap-2">
            <span className='text-md font-semibold leading-8 text-emphasis-medium dark:text-emphasisDark-medium'>
                Cadastrar Novo Evento
            </span>
            <div>
                <EventForm 
                    handleAction={handleCreate}
                    isLoading={isLoading}
                    employees={data ?? []}
                />
            </div>
        </div>
    );
}

export default EventCreate;
