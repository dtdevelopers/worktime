import {FormProvider} from "react-hook-form";
import { WorkHours } from "./WorkHours";

export type TFormJourney = {
    name: string,
    tolerance: number
}

const week = [
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado',
    'Domingo'
]

const JourneyForm = ({ 
    handleAction,
    isEditing = false,
    methods
}: {
    handleAction: (values: TFormJourney) => void,
    isEditing?: boolean,
    methods: any
}) => {
    return (
        <FormProvider {...methods}>
            <form
                className='flex w-80 flex-col items-center justify-center'
                onSubmit={methods.handleSubmit(handleAction)}
            >
                <label>Nome:</label>
                <input
                    {...methods.register('name')}
                    className='mt-12 w-full rounded-md text-emphasis-medium dark:text-emphasisDark-medium bg-inverseDark-90 dark:bg-inverseLight-50 py-3 px-4 text-sm font-normal leading-5'
                />
                <label>Tolerância:</label>
                <input
                    type={'number'}
                    {...methods.register('tolerance')}
                    className='mt-12 w-full rounded-md text-emphasis-medium dark:text-emphasisDark-medium bg-inverseDark-90 dark:bg-inverseLight-50 py-3 px-4 text-sm font-normal leading-5'
                />
                <div className="flex" style={{ width: '100%' }}>
                    {
                        week.map((day) => {
                            return (
                                <div className="flex flex-col">
                                    <div>
                                        {day}
                                    </div>
                                    <WorkHours methods={methods} />
                                </ div>
                            )
                        })
                    }
                </div>
                <button
                    type='submit'
                    className='flex justify-center my-6 w-full rounded-md bg-secondary py-3 text-sm font-medium leading-5 text-white'
                >
                    {isEditing ? 'Atualizar' : 'Cadastrar'}
                </button>
            </form>
        </FormProvider>
    );
}

export default JourneyForm;