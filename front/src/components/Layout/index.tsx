import {Outlet, useNavigate} from 'react-router-dom';
import {useAuthStore} from "../../store";

const Layout = () => {
    const {logout} = useAuthStore();
    const navigate = useNavigate();
    return (
        <div className="flex h-full flex-col">
            <h1>layout header</h1>
            <Outlet />
            <button className="bg-primary text-gray-300 px-4 py-2 font-bold" onClick={() => navigate('employee')}>Funcionários</button>
            <button className="bg-primary text-gray-300 px-4 py-2 font-bold" onClick={logout}>Sair</button>
        </div>
    );
}

export default Layout;
