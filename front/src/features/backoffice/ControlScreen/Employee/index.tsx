import {toast} from "react-toastify";
import {useQuery} from "react-query";
import {UserService} from "../../../../services/user";
import {useParams} from "react-router-dom";
import { IUser } from "../../../../types/user";
import { useMemo, useState } from "react";

const Employee = () => {
    const { id }: { id?: string } = useParams();
    const [selectedTab, setSelectedTab] = useState('journey')

    const { data: employee } = useQuery(
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

    const renderTabContent = useMemo(() => {
        if (selectedTab === 'journey') {
            return (
                <div />
            )
        }
        if (selectedTab === 'vacation') {
            return (
                <div />
            )
        }
        if (selectedTab === 'exception') {
            return (
                <div />
            )
        }
    },[selectedTab])

    return (
        <div className="flex flex-col gap-2">
            <span className='text-md font-semibold leading-8 text-emphasis-medium dark:text-emphasisDark-medium'>
                Controle de Funcionário
            </span>
            <div>
                <button 
                    className="bg-primary text-gray-300 px-4 py-2 font-bold"
                    onClick={() => setSelectedTab('journey')}
                >
                    Jornada
                </button>
                <button 
                    className="bg-primary text-gray-300 px-4 py-2 font-bold"
                    onClick={() => setSelectedTab('vacation')}
                >
                    Férias
                </button>
                <button 
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
