import {FormProvider} from "react-hook-form";
import { IUser } from "../../../../types/user";
import {useForm} from "react-hook-form";

export type TFormException = {
    description: string;
    duration?: number;
    durationType?: string;
    occurrenceDate?: Date;
    idEmployee?: number;
    fileId?: string;
    isResolved?: boolean;
}

const ExceptionForm = ({ 
    handleAction, 
    isLoading,
    isEditing = false,
    initialData,
    employees,
    durationTypes
}: {
    handleAction: (values: TFormException) => void, 
    isLoading: boolean,
    isEditing?: boolean,
    initialData?: TFormException,
    employees: IUser[],
    durationTypes: any
}) => {
    const methods = useForm({
        defaultValues: initialData as TFormException,
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
                <label>Descrição:</label>
                <input
                    {...methods.register('description')}
                    placeholder="Digite uma descrição"
                    className='mt-12 w-full rounded-md text-emphasis-medium dark:text-emphasisDark-medium bg-inverseDark-90 dark:bg-inverseLight-50 py-3 px-4 text-sm font-normal leading-5'
                />
                <label>Data:</label>
                <input
                    type={'date'}
                    {...methods.register('occurrenceDate')}
                    className='mt-12 w-full rounded-md text-emphasis-medium dark:text-emphasisDark-medium bg-inverseDark-90 dark:bg-inverseLight-50 py-3 px-4 text-sm font-normal leading-5'
                />
                <label>Duração:</label>
                <input
                    type={'number'}
                    {...methods.register('duration')}
                    className='mt-12 w-full rounded-md text-emphasis-medium dark:text-emphasisDark-medium bg-inverseDark-90 dark:bg-inverseLight-50 py-3 px-4 text-sm font-normal leading-5'
                />
                <label>Tipo de Duração:</label>
                <select
                    {...methods.register('durationType')}
                    className='mt-12 w-full rounded-md text-emphasis-medium dark:text-emphasisDark-medium bg-inverseDark-90 dark:bg-inverseLight-50 py-3 px-4 text-sm font-normal leading-5'
                >
                    {durationTypes?.map((type) => <option key={type.id} value={type.id}>{type.name}</option>)}
                </select>
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
