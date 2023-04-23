import {FormProvider} from "react-hook-form";

const EmployeePersonalForm = ({ 
    handleAction, 
    isLoading,
    methods 
}: {
    handleAction: (values: any) => void, 
    isLoading: boolean,
    methods: any
}) => {
    return (
        <FormProvider {...methods}>
            <form
                className='flex w-80 flex-col items-center justify-center'
                onSubmit={methods.handleSubmit(handleAction)}
            >
                <input
                    {...methods.register('name')}
                    className='mt-12 w-full rounded-md text-emphasis-medium dark:text-emphasisDark-medium bg-inverseDark-90 dark:bg-inverseLight-50 py-3 px-4 text-sm font-normal leading-5'
                    placeholder='Inform your name'
                />
                <input
                    {...methods.register('document')}
                    className='mt-12 w-full rounded-md text-emphasis-medium dark:text-emphasisDark-medium bg-inverseDark-90 dark:bg-inverseLight-50 py-3 px-4 text-sm font-normal leading-5'
                    placeholder='Inform your document'
                />
                <input
                    type={'date'}
                    {...methods.register('birthdate')}
                    className='mt-12 w-full rounded-md text-emphasis-medium dark:text-emphasisDark-medium bg-inverseDark-90 dark:bg-inverseLight-50 py-3 px-4 text-sm font-normal leading-5'
                />
                <input
                    type={'email'}
                    {...methods.register('email')}
                    className='mt-12 w-full rounded-md text-emphasis-medium dark:text-emphasisDark-medium bg-inverseDark-90 dark:bg-inverseLight-50 py-3 px-4 text-sm font-normal leading-5'
                    placeholder='Inform your e-mail'
                />
                <input
                    {...methods.register('phone')}
                    className='mt-12 w-full rounded-md text-emphasis-medium dark:text-emphasisDark-medium bg-inverseDark-90 dark:bg-inverseLight-50 py-3 px-4 text-sm font-normal leading-5'
                    placeholder='Inform your phone'
                />
                <input
                    type={'password'}
                    className='mt-6 w-full rounded-md text-emphasis-medium dark:text-emphasisDark-medium bg-inverseDark-90 dark:bg-inverseLight-50 py-3 px-4 text-sm font-normal leading-5'
                    placeholder='Inform your password'
                />
                <button
                    disabled={isLoading}
                    type='submit'
                    className='flex justify-center my-6 w-full rounded-md bg-secondary py-3 text-sm font-medium leading-5 text-white'
                >
                    Cadastrar
                </button>
            </form>
        </FormProvider>
    );
}

export default EmployeePersonalForm;
