import { IUser } from "../../../../types/user";
import { toast } from "react-toastify";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { UserService } from "../../../../services/user";
import { useCallback, useMemo, useState } from "react";
import EmployeeForm, { TFormUser } from "../../Employee/EmployeeForm/index";
import TabVacation from "./TabVacation/index";
import TabException from "./TabException/index";

const Employee = () => {
    const { id }: { id?: string } = useParams();
    const [selectedTab, setSelectedTab] = useState('journey')

    const { data: employee, isLoading } = useQuery(
        `user-${id}`,
        () => UserService.find(Number(id)), {
        refetchOnWindowFocus: false,
        onSuccess: (_data: IUser) => {
            console.log(_data);
        },
        onError: (err: Error) => {
            toast.error(err.message);
        }
    });

    const handleEdit = useCallback(async (values: TFormUser) => {
        const { name, document, birthdate, email, phone, password, hireDate,  monthlyWorkload } = values
        await UserService.update(
            {
                id: Number(id),
                name,
                document,
                birthdate,
                email,
                phone,
                hireDate,
                monthlyWorkload,
                password
            }
        );
    }, [id])

    const renderForm = useMemo(() => {
        if (employee) {
            return (
                <EmployeeForm
                    initialData={employee}
                    handleAction={handleEdit}
                    isLoading={isLoading}
                    isEditing={true}
                />
            )
        }
        return null
    }, [employee, handleEdit, isLoading])

    const renderTabContent = useMemo(() => {
        if (selectedTab === 'journey') {
            return (
                <div />
            )
        }
        if (selectedTab === 'vacation') {
            return (
                <TabVacation idEmployee={Number(id)} />
            )
        }
        if (selectedTab === 'exception') {
            return (                
                <TabException idEmployee={Number(id)} />
            )
        }
    },[id, selectedTab])

    return (
        <div className="flex flex-col gap-2">
            <span className='text-md font-semibold leading-8 text-emphasis-medium dark:text-emphasisDark-medium'>
                Controle de Funcionário
            </span>
            <div>
                {renderForm}
            </div>
            <div>
                <button 
                    title="Jornada"
                    className="bg-primary text-gray-300 px-4 py-2 font-bold"
                    onClick={() => setSelectedTab('journey')}
                >
                    Jornada
                </button>
                <button 
                    title="Férias"
                    className="bg-primary text-gray-300 px-4 py-2 font-bold"
                    onClick={() => setSelectedTab('vacation')}
                >
                    Férias
                </button>
                <button 
                    title="Exceções"
                    className="bg-primary text-gray-300 px-4 py-2 font-bold"
                    onClick={() => setSelectedTab('exception')}
                >
                    Exceções
                </button>
            </div>
            <div>
                {renderTabContent}
            </div>
        </div>
    );
}

export default Employee;
