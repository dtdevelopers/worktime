import {FormProvider} from "react-hook-form";
import { IUser } from "../../../../types/user";

export type TFormVacation = {
    startDate: Date,
    endDate: Date,
    idEmployee: number
}

const VacationForm = ({ 
    handleAction, 
    isLoading,
    isEditing = false,
    methods,
    employees
}: {
    handleAction: (values: TFormVacation) => void, 
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
                <label>Funcionário:</label>
                <select 
                    name="idEmployee" 
                    {...methods.register('idEmployee')}
                    className='mt-12 w-full rounded-md text-emphasis-medium dark:text-emphasisDark-medium bg-inverseDark-90 dark:bg-inverseLight-50 py-3 px-4 text-sm font-normal leading-5'
                >
                    {employees?.map((employee) => <option key={employee.id} value={employee.id}>{employee.name}</option>)}
                </select>
                <label>Data de Início:</label>
                <input
                    type={'date'}
                    {...methods.register('startDate')}
                    className='mt-12 w-full rounded-md text-emphasis-medium dark:text-emphasisDark-medium bg-inverseDark-90 dark:bg-inverseLight-50 py-3 px-4 text-sm font-normal leading-5'
                />
                <label>Data de Fim:</label>
                <input
                    type={'date'}
                    {...methods.register('endDate')}
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

export default VacationForm;
