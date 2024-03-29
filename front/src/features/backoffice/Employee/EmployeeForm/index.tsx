import {FormProvider, useForm} from "react-hook-form";

export type TFormUser = {
    name: string;
    document: string;
    birthdate: Date;
    email: string;
    phone: string;
    hireDate: Date,
    monthlyWorkload: number,
    password: string;
}

const EmployeeForm = ({
    handleAction,
    isLoading,
    initialData,
    isEditing = false
}: {
    handleAction: (values: TFormUser) => void,
    isLoading: boolean,
    initialData?: TFormUser,
    isEditing?: boolean
}) => {
    const methods = useForm({
        defaultValues: initialData as TFormUser || {
            name: '',
            document: '',
            birthdate: '',
            email: '',
            phone: '',
            password: ''
        },
    });

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
                    placeholder='Inform your name'
                />
                <div className="flex flex-row">
                    <div>
                        <label>Documento:</label>
                        <input
                            {...methods.register('document')}
                            className='mt-12 w-full rounded-md text-emphasis-medium dark:text-emphasisDark-medium bg-inverseDark-90 dark:bg-inverseLight-50 py-3 px-4 text-sm font-normal leading-5'
                            placeholder='Inform your document'
                        />
                    </div>
                    <div>
                        <label>Data de Nascimento:</label>
                        <input
                            type={'date'}
                            {...methods.register('birthdate')}
                            className='mt-12 w-full rounded-md text-emphasis-medium dark:text-emphasisDark-medium bg-inverseDark-90 dark:bg-inverseLight-50 py-3 px-4 text-sm font-normal leading-5'
                        />
                    </div>
                </div>
                <div className="flex flex-row">
                    <div>
                        <label>E-mail:</label>
                        <input
                            type={'email'}
                            {...methods.register('email')}
                            className='mt-12 w-full rounded-md text-emphasis-medium dark:text-emphasisDark-medium bg-inverseDark-90 dark:bg-inverseLight-50 py-3 px-4 text-sm font-normal leading-5'
                            placeholder='Inform your e-mail'
                        />
                    </div>
                    <div>
                        <label>Telefone:</label>
                        <input
                            {...methods.register('phone')}
                            className='mt-12 w-full rounded-md text-emphasis-medium dark:text-emphasisDark-medium bg-inverseDark-90 dark:bg-inverseLight-50 py-3 px-4 text-sm font-normal leading-5'
                            placeholder='Inform your phone'
                        />
                    </div>
                </div>
                <label>Senha:</label>
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
                    {isEditing ? 'Atualizar' : 'Cadastrar'}
                </button>
            </form>
        </FormProvider>
    );
}

export default EmployeeForm;
