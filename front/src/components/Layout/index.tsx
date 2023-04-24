import {Outlet, useNavigate} from 'react-router-dom';
import {useAuthStore} from "../../store";

const Layout = () => {
    const {logout} = useAuthStore();
    const navigate = useNavigate();
    return (
        <div className="flex h-full flex-col">
            <div className="flex flex-row" style={{justifyContent: 'space-between'}}>
                <button 
                    className="bg-primary text-gray-300 px-4 py-2 font-bold" 
                    onClick={() => navigate('/')}
                >
                    Home
                </button>
                <div>
                    <button className="bg-primary text-gray-300 px-4 py-2 font-bold" onClick={() => navigate('/control-screen')}>Controle</button>
                    <button className="bg-primary text-gray-300 px-4 py-2 font-bold" onClick={logout}>Sair</button>
                </div>
            </div>
            <Outlet />
        </div>
    );
}

export default Layout;
