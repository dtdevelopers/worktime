import {toast} from "react-toastify";
import {useQuery} from "react-query";
import {UserService} from "../../../../services/user";
import {FormProvider, useForm} from "react-hook-form";
import { useCallback } from "react";

const Create = () => {
    const { data, refetch, isLoading } = useQuery(`employee`, () => UserService.findAll(), {
        refetchOnWindowFocus: false,
        initialData: [],
        onSuccess: (_data) => {
            console.log(_data);
        },
        onError: (err: Error) => {
            toast.error(err.message);
        },
    });

    const methods = useForm({
        defaultValues: data,
    });

    const handleSubmit = useCallback((values: any) => {
        console.log(values)
    }, [])

    return (
        <div className="flex flex-col gap-2">
            <h1>Cadastrar Funcionários</h1>
            <div>
                <FormProvider {...methods}>
                    <form
                        className='flex w-80 flex-col items-center justify-center'
                        onSubmit={(values) => handleSubmit(values)}
                    >
                        <span className='text-md font-semibold leading-8 text-emphasis-medium dark:text-emphasisDark-medium'>
                            Cadastrar Novo Usuário
                        </span>
                        <input
                            {...methods.register('name')}
                            className='mt-12 w-full rounded-md text-emphasis-medium dark:text-emphasisDark-medium bg-inverseDark-90 dark:bg-inverseLight-50 py-3 px-4 text-sm font-normal leading-5'
                            placeholder='Inform your name'
                        />
                        <input
                            type={'number'}
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
                            {...methods.register('email')}
                            className='mt-12 w-full rounded-md text-emphasis-medium dark:text-emphasisDark-medium bg-inverseDark-90 dark:bg-inverseLight-50 py-3 px-4 text-sm font-normal leading-5'
                            placeholder='Inform your e-mail'
                        />
                        <input
                            {...methods.register('password')}
                            type={'password'}
                            className='mt-6 w-full rounded-md text-emphasis-medium dark:text-emphasisDark-medium bg-inverseDark-90 dark:bg-inverseLight-50 py-3 px-4 text-sm font-normal leading-5'
                            placeholder='Inform your password'
                        />
                        <button
                            disabled={isLoading}
                            type='submit'
                            className='flex justify-center my-6 w-full rounded-md bg-secondary py-3 text-sm font-medium leading-5 text-white'
                        >
                            Sign up
                        </button>
                    </form>
                </FormProvider>
            </div>
        </div>
    );
}

export default Create;
