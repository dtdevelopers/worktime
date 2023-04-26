import {toast} from "react-toastify";
import {UserService} from "../../../../services/user";
import {useCallback, useState} from "react";
import EmployeeForm, { TFormUser } from "../EmployeeForm/index";

const EmployeeCreate = () => {
    const [loading, setLoading] = useState(false)
    
    const handleCreateEmployee = useCallback(async (values: TFormUser) => {
        const { name, document, birthdate, email, phone, hireDate, monthlyWorkload, password } = values
        try {
            setLoading(true)
            await UserService.create({
                name,
                document,
                birthdate,
                email,
                phone,
                password,
                isEmployee: true,
                hireDate,
                monthlyWorkload
            });
        } catch (error) {
            toast.error('Erro ao Cadastrar Novo Funcionário!')
        } finally {
            setLoading(false)
        }
    }, [])

    return (
        <div className="flex flex-col gap-2">
            <span className='text-md font-semibold leading-8 text-emphasis-medium dark:text-emphasisDark-medium'>
                Cadastrar Novo Funcionário
            </span>
            <div>
                <EmployeeForm
                    handleAction={handleCreateEmployee}
                    isLoading={loading}
                />
            </div>
        </div>
    );
}

export default EmployeeCreate;
