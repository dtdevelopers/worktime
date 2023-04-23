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

    const handleDelete = useCallback((idEmployee: number) => {
        console.log(idEmployee)
    }, [])

    return (
        <div className="flex flex-col gap-2">
            <h1>Gerenciar Usuários</h1>
            <Outlet />
            <div>
                <button onClick={() => navigate('create')}>Cadastrar Novo Usuário</button>
            </div>
            <div>
                <div className='flex flex-row' style={{width: '100%'}}>
                    <div style={{width: '30%'}}>
                        <p>Nome</p>
                    </div>
                    <div style={{width: '30%'}}>
                        <p>Email</p>
                    </div>
                    <div style={{width: '10%'}}>
                        <p>Funcionário?</p>    
                    </div>
                    <div style={{width: '30%'}}>
                        <p>Ações</p>
                    </div>
                </div>
                <div>
                    {data.map((employee: IUser) => (
                        <div key={employee.id} className='flex flex-row' style={{width: '100%'}}>
                            <div style={{width: '30%'}}>
                                <h2>{employee.name}</h2>
                            </div>
                            <div style={{width: '30%'}}>
                                <p>{employee.email}</p>
                            </div>
                            <div style={{width: '10%'}}>
                                {employee.isEmployee ? 'Sim' : 'Não'}    
                            </div>
                            <div className='flex flex-row' style={{justifyContent: 'space-between', width: '30%'}}>
                                <button
                                    title="Controle de Jornada" 
                                    onClick={() => navigate(`journey-control/${employee.id}`)}
                                >
                                    Controle de Jornada
                                </button>
                                <button
                                    title="Editar Perfil" 
                                    onClick={() => navigate(`edit/${employee.id}`)}
                                >
                                    Editar Perfil
                                </button>
                                <button 
                                    title="Excluir Usuário"
                                    onClick={() => handleDelete(employee.id)}
                                >
                                    Excluir Usuário
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Employee;
