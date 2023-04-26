import {toast} from "react-toastify";
import {useQuery} from "react-query";
import {UserService} from "../../../../services/user";
import {useCallback} from "react";
import {useParams} from "react-router-dom";
import EmployeeForm, { TFormUser } from "../EmployeeForm/index";
import { IUser } from "../../../../types/user";

const EmployeeEdit = () => {
    const { id }: { id: string | undefined} = useParams();

    const { data: employee, isLoading } = useQuery(
        `user-${id}`,
        () => UserService.find(Number(id)), {
        refetchOnWindowFocus: false,
        initialData: null,
        onSuccess: (_data: IUser) => {
            console.log(_data);
        },
        onError: (err: Error) => {
            toast.error(err.message);
        }
    });

    const handleEditUser = useCallback(async (values: TFormUser) => {
        const { name, document, birthdate, email, phone, password } = values
        await UserService.update(
            {
                id: Number(id),
                name,
                document,
                birthdate,
                email,
                phone,
                password
            }
        );
    }, [id])

    return (
        <div className="flex flex-col gap-2">
            <span className='text-md font-semibold leading-8 text-emphasis-medium dark:text-emphasisDark-medium'>
                Editar Funcionário
            </span>
            <div>
                {employee &&
                    <EmployeeForm
                        initialData={employee}
                        handleAction={handleEditUser}
                        isLoading={isLoading}
                        isEditing={true}
                    />
                }
            </div>
        </div>
    );
}

export default EmployeeEdit;
