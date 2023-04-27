import {IUser} from "../../../../types/user";
import {useForm} from "react-hook-form";
import {FormProvider} from "react-hook-form";

export type TFormEvent = {
    createdDate: Date | undefined;
    type: string | undefined;
    idEmployee?: number
}

const EventForm = ({ 
    handleAction, 
    isLoading,
    isEditing = false,
    initialData,
    employees
}: {
    handleAction: (values: TFormEvent) => void, 
    isLoading: boolean,
    isEditing?: boolean,
    initialData?: TFormEvent,
    employees: IUser[]
}) => {

    const methods = useForm({
        defaultValues: initialData as TFormEvent  || {
            createdDate: undefined,
            type: '',
            idEmployee: 0
        }
    });

    return (
        <FormProvider {...methods}>
            <form
                className='flex w-80 flex-col items-center justify-center'
                onSubmit={methods.handleSubmit(handleAction)}
            >
                <label>Funcionário:</label>
                <select 
                    {...methods.register('idEmployee')}
                    className='mt-12 w-full rounded-md text-emphasis-medium dark:text-emphasisDark-medium bg-inverseDark-90 dark:bg-inverseLight-50 py-3 px-4 text-sm font-normal leading-5'
                > 
                    {employees?.map((employee) => <option key={employee.id} value={employee.id}>{employee.name}</option>)}
                </select>
                <label>Data:</label>
                <input
                    type={'date'}
                    {...methods.register('createdDate')}
                    className='mt-12 w-full rounded-md text-emphasis-medium dark:text-emphasisDark-medium bg-inverseDark-90 dark:bg-inverseLight-50 py-3 px-4 text-sm font-normal leading-5'
                />
                <label>Tipo:</label>
                <input
                    {...methods.register('type')}
                    placeholder="Digite um tipo"
                    className='mt-12 w-full rounded-md text-emphasis-medium dark:text-emphasisDark-medium bg-inverseDark-90 dark:bg-inverseLight-50 py-3 px-4 text-sm font-normal leading-5'
                />
                <button
                    disabled={isLoading}
                    type='submit'
                    className='flex justify-center my-6 w-full rounded-md bg-secondary py-3 text-sm font-medium leading-5 text-white'
                >
                    {isEditing ? 'Atualizar' : 'Cadastrar'}
                </button>
            </form>
        </FormProvider>
    );
}

export default EventForm;
