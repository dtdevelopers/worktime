import {FormProvider, useForm} from "react-hook-form";
import {useAuthStore} from "../../../store";

const Login = () => {
    const { authenticate, isLoading } = useAuthStore();
    const methods = useForm({
        defaultValues: { username: '', password: '' },
    });

    return (
        <div className="flex flex-col w-full h-full flex-1 justify-center items-center">
            <FormProvider {...methods}>
                <form
                    className='flex w-80 flex-col items-center justify-center'
                    onSubmit={methods.handleSubmit(authenticate)}
                >
                    <h1 className='mt-8 text-3xl font-bold text-emphasis-high dark:text-emphasisDark-high'>worktime</h1>
                    <span className='text-md font-semibold leading-8 text-emphasis-medium dark:text-emphasisDark-medium'>
                        Access your account
                      </span>
                    <input
                        {...methods.register('username')}
                        className='mt-12 w-full rounded-md text-emphasis-medium dark:text-emphasisDark-medium bg-inverseDark-90 dark:bg-inverseLight-50 py-3 px-4 text-sm font-normal leading-5'
                        placeholder='Inform your e-mail or username'
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
    );
}

export default Login;
