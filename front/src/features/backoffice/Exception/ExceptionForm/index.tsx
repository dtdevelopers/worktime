import {FormProvider} from "react-hook-form";
import { IUser } from "../../../../types/user";

export type TFormException = {
    description: string;
    duration: number;
    durationType: string;
    occurrenceDate: Date;
    idEmployee: number;
    fileId: string;
}

const ExceptionForm = ({ 
    handleAction, 
    isLoading,
    isEditing = false,
    methods,
    employees,
    durationTypes
}: {
    handleAction: (values: TFormException) => void, 
    isLoading: boolean,
    isEditing?: boolean,
    methods: any,
    employees: IUser[],
    durationTypes: any
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
                    {...methods.register('description')}
                    className='mt-12 w-full rounded-md text-emphasis-medium dark:text-emphasisDark-medium bg-inverseDark-90 dark:bg-inverseLight-50 py-3 px-4 text-sm font-normal leading-5'
                />
                <input
                    type={'date'}
                    {...methods.register('occurrenceDate')}
                    className='mt-12 w-full rounded-md text-emphasis-medium dark:text-emphasisDark-medium bg-inverseDark-90 dark:bg-inverseLight-50 py-3 px-4 text-sm font-normal leading-5'
                />
                <input
                    type={'number'}
                    {...methods.register('duration')}
                    className='mt-12 w-full rounded-md text-emphasis-medium dark:text-emphasisDark-medium bg-inverseDark-90 dark:bg-inverseLight-50 py-3 px-4 text-sm font-normal leading-5'
                />
                <select 
                    name="durationType" 
                    {...methods.register('durationType')}
                >
                    {durationTypes?.map((type) => <option value={type.id}>{type.name}</option>)}
                </select>
                <input
                    {...methods.register('fileId')}
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

export default ExceptionForm;
