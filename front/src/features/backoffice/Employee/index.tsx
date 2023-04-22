import {toast} from "react-toastify";
import {useQuery} from "react-query";
import {UserService} from "../../../services/user";

const Employee = () => {
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

    return (
        <div className="flex flex-col gap-2">
            <h1>Employees</h1>
            {data.map(d => (
                <div key={d.id}>
                    <h2>{d.name}</h2>
                    <p>{d.email}</p>
                </div>
            ))}
        </div>
    );
}

export default Employee;
