import {toast} from "react-toastify";
import {useQuery} from "react-query";
import {UserService} from "../../../services/user";
import {Outlet, useNavigate} from 'react-router-dom';
import {IUser} from "../../../types/user";
import {useCallback} from "react";

const Employee = () => {
    const navigate = useNavigate();
    const { data, refetch, isLoading } = useQuery('employee-list', () => UserService.findAll(), {
        refetchOnWindowFocus: false,
        initialData: [],
        onSuccess: (_data) => {
            console.log(_data);
        },
        onError: (err: Error) => {
            toast.error(err.message);
        },
    });

    const handleDelete = useCallback((values: any) => {
        console.log(values)
    }, [])

    return (
        <div className="flex flex-col gap-2">
            <h1>Funcionários</h1>
            <Outlet />
            <div>
                <button onClick={() => navigate('create')}>Cadastrar</button>
            </div>
            <div>
                <div className='flex flex-row'>
                    <div>
                        <p>Nome</p>
                    </div>
                    <div>
                        <p>Email</p>
                    </div>
                    <div>
                        <p>Funcionário?</p>    
                    </div>
                    <div>
                        <p>Ações</p>
                    </div>
                </div>
                <div>
                    {data.map((employee: IUser) => (
                        <div key={employee.id} className='flex flex-row'>
                            <div>
                                <h2>{employee.name}</h2>
                            </div>
                            <div>
                                <p>{employee.email}</p>
                            </div>
                            <div>
                                {employee.isEmployee ? 'Sim' : 'Não'}    
                            </div>
                            <div>
                                <button onClick={() => navigate(`edit/${employee.id}`)}>Editar</button>
                            </div>
                            <div>
                                <button onClick={() => handleDelete('register-employee')}>Excluir</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Employee;
