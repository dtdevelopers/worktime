import {HashRouter, Route, Routes as ReactRoutes} from 'react-router-dom';
import {QueryClient, QueryClientProvider} from 'react-query';
import Layout from '../components/Layout';
import useAuthStore from '../store/Auth';
import {toast, ToastContainer, Zoom} from 'react-toastify';
import Login from "../features/public/Login";
import api from "../services/api";
import Home from "../features/backoffice/Home";
import EmployeeCreate from '../features/backoffice/Employee/EmployeeCreate/index';
import EmployeeEdit from '../features/backoffice/Employee/EmployeeEdit/index';
import EventCreate from '../features/backoffice/Event/EventCreate/index';
import EventEdit from '../features/backoffice/Event/EventEdit/index';
import VacationEdit from '../features/backoffice/Vacation/VacationEdit/index';
import VacationCreate from '../features/backoffice/Vacation/VacationCreate/index';
import ExceptionCreate from '../features/backoffice/Exception/ExceptionCreate/index';
import ExceptionEdit from '../features/backoffice/Exception/ExceptionEdit/index';
import ControlScreen from '../features/backoffice/ControlScreen/index';
import Employee from '../features/backoffice/ControlScreen/Employee/index';

export const queryClient = new QueryClient();

function Routes() {
    const { isAuthenticated, logout } = useAuthStore();

    api.addResponseTransform( response => {
        if (!response.ok) {
            if (response.status === 401) {
                toast.error(response.data.message)
                logout();
            }
            throw response;
        }
    });

  return (
    <QueryClientProvider client={queryClient}>
          <ToastContainer
              position='top-right'
              autoClose={2500}
              hideProgressBar={true}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              transition={Zoom}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme={'light'}
          />
        <HashRouter>
          <ReactRoutes>
            {isAuthenticated ? (
              <Route path='/' element={<Layout />}>
                  <Route
                      key={'home'}
                      path={''}
                      element={<Home />}
                  />
                  <Route
                    key={'employee-create'}
                    path={'employee/create'}
                    element={<EmployeeCreate />}
                  />
                  <Route
                    key={'employee-edit'}
                    path={'employee/edit/:id'}
                    element={<EmployeeEdit />}
                  />
                  <Route
                    key={'event-create'}
                    path={'event/create'}
                    element={<EventCreate />}
                  />
                  <Route
                    key={'event-edit'}
                    path={'event/edit/:id'}
                    element={<EventEdit />}
                  />
                  <Route
                    key={'exception-create'}
                    path={'exception/create'}
                    element={<ExceptionCreate />}
                  />
                  <Route
                    key={'exception-edit'}
                    path={'exception/edit/:id'}
                    element={<ExceptionEdit />}
                  />
                  <Route
                    key={'vacation-create'}
                    path={'vacation/create'}
                    element={<VacationCreate />}
                  />
                  <Route
                    key={'vacation-edit'}
                    path={'vacation/edit/:id'}
                    element={<VacationEdit />}
                  />
                  <Route
                    key={'control-screen'}
                    path={'control-screen'}
                    element={<ControlScreen />}
                  />
                    <Route
                      key={'employee'}
                      path={'employee/:id'}
                      element={<Employee />}
                    />
                  <Route path='*' element={<span>wildcard</span>} />
              </Route>
            ) : (
              <>
                <Route path='/' element={<Login />} />
                <Route path='*' element={<Login />} />
              </>
            )}
          </ReactRoutes>
        </HashRouter>
    </QueryClientProvider>
  );
}

export default Routes;
