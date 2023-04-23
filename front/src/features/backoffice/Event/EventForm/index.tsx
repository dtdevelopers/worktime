import {FormProvider} from "react-hook-form";
import { IUser } from "../../../../types/user";

export type TFormEvent = {
    createdDate: Date;
    type: string;
    idEmployee: number
}

const EventForm = ({ 
    handleAction, 
    isLoading,
    isEditing = false,
    methods,
    employees
}: {
    handleAction: (values: TFormEvent) => void, 
    isLoading: boolean,
    isEditing?: boolean,
    methods: any,
    employees: IUser[]
}) => {
    return (
        <FormProvider {...methods}>
            <form
                className='flex w-80 flex-col items-center justify-center'
                onSubmit={methods.handleSubmit(handleAction)}
            >
                <select
                    name="idEmployee" 
                    {...methods.register('idEmployee')}
                >
                    {employees?.map((employee) => <option value={employee.id}>{employee.name}</option>)}
                </select>
                <input
                    type={'date'}
                    {...methods.register('createdDate')}
                    className='mt-12 w-full rounded-md text-emphasis-medium dark:text-emphasisDark-medium bg-inverseDark-90 dark:bg-inverseLight-50 py-3 px-4 text-sm font-normal leading-5'
                />
                <input
                    {...methods.register('type')}
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